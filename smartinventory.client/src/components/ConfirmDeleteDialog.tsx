import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import type { InventoryItem } from '../api/inventoryTypes';

interface ConfirmDeleteDialogProps {
  open: boolean;
  item: InventoryItem | null;
  onClose: () => void;
  onConfirm: () => Promise<boolean>;
}

/** Confirms permanent removal of an inventory item. REQ-INV-005. */
export function ConfirmDeleteDialog({ open, item, onClose, onConfirm }: ConfirmDeleteDialogProps) {
  const handleConfirm = async () => {
    const succeeded = await onConfirm();
    if (succeeded) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      <DialogTitle>Delete inventory item</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {item ? `Delete "${item.name}"? This cannot be undone.` : ''}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
