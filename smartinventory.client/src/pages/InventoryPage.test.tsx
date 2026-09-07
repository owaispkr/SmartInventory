import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InventoryPage } from './InventoryPage';

/**
 * Tests for InventoryPage.
 * REQ-INV-002, REQ-INV-003, REQ-INV-005.
 * TC-INV-045: Loaded items are rendered in the table.
 * TC-INV-046: A load failure surfaces an error alert.
 * TC-INV-047: An empty inventory shows guidance.
 * TC-INV-048: Deleting an item removes it from the table.
 */
describe('InventoryPage', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  const jsonResponse = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

  const seeded = [
    { id: 1, name: 'Widget', quantity: 100, lowStockThreshold: 20 },
    { id: 2, name: 'Gadget', quantity: 50, lowStockThreshold: 10 },
  ];

  it('renders loaded inventory items', async () => {
    fetchMock.mockResolvedValue(jsonResponse(seeded));

    render(<InventoryPage />);

    expect(await screen.findByText('Widget')).toBeInTheDocument();
    expect(screen.getByRole('table', { name: /inventory items/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /low stock threshold/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: '20' })).toBeInTheDocument();
  });

  it('surfaces an error message when loading fails', async () => {
    fetchMock.mockResolvedValue(new Response('Unable to load inventory items.', { status: 500 }));

    render(<InventoryPage />);

    expect(await screen.findByRole('alert')).toHaveTextContent('Unable to load inventory items.');
  });

  it('shows guidance when there are no items', async () => {
    fetchMock.mockResolvedValue(jsonResponse([]));

    render(<InventoryPage />);

    expect(await screen.findByRole('status')).toHaveTextContent(/no inventory items yet/i);
  });

  it('removes an item from the table after deletion is confirmed', async () => {
    fetchMock
      .mockResolvedValueOnce(jsonResponse(seeded))
      .mockResolvedValueOnce(new Response(null, { status: 204 }));

    render(<InventoryPage />);

    await userEvent.click(await screen.findByRole('button', { name: 'Delete Widget' }));
    await userEvent.click(screen.getByRole('button', { name: /^delete$/i }));

    await waitFor(() => expect(screen.queryByText('Widget')).not.toBeInTheDocument());
    expect(screen.getByText('Gadget')).toBeInTheDocument();
  });
});
