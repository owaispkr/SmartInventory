import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { AdjustStockDialog } from './AdjustStockDialog';

/**
 * Tests for AdjustStockDialog.
 * REQ-INV-001.
 * TC-INV-042: A zero adjustment is rejected.
 * TC-INV-043: An adjustment below zero stock is rejected.
 * TC-INV-044: A valid adjustment is submitted.
 */
describe('AdjustStockDialog', () => {
  const item = { id: 3, name: 'Gizmo', quantity: 2 };

  const setDelta = async (value: string) => {
    const field = screen.getByLabelText(/quantity change/i);
    await userEvent.clear(field);
    await userEvent.type(field, value);
  };

  it('rejects a zero adjustment', async () => {
    const onSubmit = vi.fn();
    render(<AdjustStockDialog open item={item} onClose={vi.fn()} onSubmit={onSubmit} />);

    await setDelta('0');
    await userEvent.click(screen.getByRole('button', { name: /apply/i }));

    expect(await screen.findByText('Adjustment must be non-zero.')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('rejects an adjustment that would go below zero', async () => {
    const onSubmit = vi.fn();
    render(<AdjustStockDialog open item={item} onClose={vi.fn()} onSubmit={onSubmit} />);

    await setDelta('-3');
    await userEvent.click(screen.getByRole('button', { name: /apply/i }));

    expect(
      await screen.findByText('Adjustment would result in a negative quantity.'),
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits a valid adjustment and closes', async () => {
    const onSubmit = vi.fn().mockResolvedValue(true);
    const onClose = vi.fn();
    render(<AdjustStockDialog open item={item} onClose={onClose} onSubmit={onSubmit} />);

    await setDelta('-2');
    await userEvent.click(screen.getByRole('button', { name: /apply/i }));

    expect(onSubmit).toHaveBeenCalledWith(-2);
    expect(onClose).toHaveBeenCalled();
  });
});
