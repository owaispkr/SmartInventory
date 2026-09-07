import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { InventoryFormDialog } from './InventoryFormDialog';

/**
 * Tests for InventoryFormDialog.
 * REQ-INV-003, REQ-INV-004.
 * TC-INV-038: Existing item values are pre-filled when editing.
 * TC-INV-039: A blank name is rejected before submitting.
 * TC-INV-040: A negative quantity is rejected before submitting.
 * TC-INV-041: Valid input is submitted with a trimmed name.
 */
describe('InventoryFormDialog', () => {
  it('pre-fills values when editing an existing item', () => {
    render(
      <InventoryFormDialog
        open
        item={{ id: 1, name: 'Widget', quantity: 100 }}
        onClose={vi.fn()}
        onSubmit={vi.fn()}
      />,
    );

    expect(screen.getByLabelText(/name/i)).toHaveValue('Widget');
    expect(screen.getByLabelText(/quantity/i)).toHaveValue(100);
  });

  it('shows a validation message when the name is blank', async () => {
    const onSubmit = vi.fn();
    render(<InventoryFormDialog open item={null} onClose={vi.fn()} onSubmit={onSubmit} />);

    await userEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(await screen.findByText('Name is required.')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('shows a validation message when the quantity is negative', async () => {
    const onSubmit = vi.fn();
    render(<InventoryFormDialog open item={null} onClose={vi.fn()} onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText(/name/i), 'Sprocket');
    const quantity = screen.getByLabelText(/quantity/i);
    await userEvent.clear(quantity);
    await userEvent.type(quantity, '-1');
    await userEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(await screen.findByText('Quantity must be zero or greater.')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits trimmed values and closes on success', async () => {
    const onSubmit = vi.fn().mockResolvedValue(true);
    const onClose = vi.fn();
    render(<InventoryFormDialog open item={null} onClose={onClose} onSubmit={onSubmit} />);

    await userEvent.type(screen.getByLabelText(/name/i), '  Sprocket  ');
    const quantity = screen.getByLabelText(/quantity/i);
    await userEvent.clear(quantity);
    await userEvent.type(quantity, '5');
    await userEvent.click(screen.getByRole('button', { name: /save/i }));

    expect(onSubmit).toHaveBeenCalledWith({ name: 'Sprocket', quantity: 5 });
    expect(onClose).toHaveBeenCalled();
  });
});
