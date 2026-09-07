import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import type { InventoryItem } from '../api/inventoryTypes';

interface AdjustStockDialogProps {
  open: boolean;
  item: InventoryItem | null;
  onClose: () => void;
  onSubmit: (quantityDelta: number) => Promise<boolean>;
}

/** Applies a relative stock adjustment to an item. REQ-INV-001. */
export function AdjustStockDialog({ open, item, onClose, onSubmit }: AdjustStockDialogProps) {
  const [delta, setDelta] = useState('1');
  const [error, setError] = useState<string | undefined>();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setDelta('1');
      setError(undefined);
    }
  }, [open, item]);

  const handleSubmit = async () => {
    const parsedDelta = Number(delta);
    if (!Number.isInteger(parsedDelta)) {
      setError('Adjustment must be a whole number.');
      return;
    }

    if (parsedDelta === 0) {
      setError('Adjustment must be non-zero.');
      return;
    }

    if (item && item.quantity + parsedDelta < 0) {
      setError('Adjustment would result in a negative quantity.');
      return;
    }

    setError(undefined);
    setIsSaving(true);
    const succeeded = await onSubmit(parsedDelta);
    setIsSaving(false);
    if (succeeded) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Adjust stock</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {item ? `${item.name} currently has ${item.quantity} in stock.` : ''}
        </DialogContentText>
        <TextField
          label="Quantity change"
          type="number"
          value={delta}
          onChange={(event) => setDelta(event.target.value)}
          error={Boolean(error)}
          helperText={error ?? 'Use a negative value to remove stock.'}
          sx={{ mt: 2 }}
          fullWidth
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={isSaving}>
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
}
