import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import type { InventoryItem } from '../api/inventoryTypes';

interface InventoryFormDialogProps {
  open: boolean;
  item: InventoryItem | null;
  onClose: () => void;
  onSubmit: (values: { name: string; quantity: number; lowStockThreshold: number }) => Promise<boolean>;
}

interface FormErrors {
  name?: string;
  quantity?: string;
  lowStockThreshold?: string;
}

/** Create and edit form for an inventory item. REQ-INV-003, REQ-INV-004. */
export function InventoryFormDialog({ open, item, onClose, onSubmit }: InventoryFormDialogProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('0');
  const [lowStockThreshold, setLowStockThreshold] = useState('0');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setName(item?.name ?? '');
      setQuantity(String(item?.quantity ?? 0));
      setLowStockThreshold(String(item?.lowStockThreshold ?? 0));
      setErrors({});
    }
  }, [open, item]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!name.trim()) {
      nextErrors.name = 'Name is required.';
    }

    const parsedQuantity = Number(quantity);
    if (!Number.isInteger(parsedQuantity)) {
      nextErrors.quantity = 'Quantity must be a whole number.';
    } else if (parsedQuantity < 0) {
      nextErrors.quantity = 'Quantity must be zero or greater.';
    }

    const parsedLowStockThreshold = Number(lowStockThreshold);
    if (!Number.isInteger(parsedLowStockThreshold)) {
      nextErrors.lowStockThreshold = 'Low stock threshold must be a whole number.';
    } else if (parsedLowStockThreshold < 0) {
      nextErrors.lowStockThreshold = 'Low stock threshold must be zero or greater.';
    }

    return nextErrors;
  };

  const handleSubmit = async () => {
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSaving(true);
    const succeeded = await onSubmit({
      name: name.trim(),
      quantity: Number(quantity),
      lowStockThreshold: Number(lowStockThreshold),
    });
    setIsSaving(false);
    if (succeeded) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>{item ? `Edit ${item.name}` : 'Add inventory item'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            error={Boolean(errors.name)}
            helperText={errors.name}
            required
            autoFocus
          />
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            error={Boolean(errors.quantity)}
            helperText={errors.quantity}
            inputProps={{ min: 0, step: 1 }}
            required
          />
          <TextField
            label="Low stock threshold"
            type="number"
            value={lowStockThreshold}
            onChange={(event) => setLowStockThreshold(event.target.value)}
            error={Boolean(errors.lowStockThreshold)}
            helperText={errors.lowStockThreshold}
            inputProps={{ min: 0, step: 1 }}
            required
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={isSaving}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
