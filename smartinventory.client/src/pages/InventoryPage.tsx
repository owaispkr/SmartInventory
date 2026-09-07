import AddIcon from '@mui/icons-material/Add';
import { Alert, Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import type { InventoryItem } from '../api/inventoryTypes';
import { AdjustStockDialog } from '../components/AdjustStockDialog';
import { ConfirmDeleteDialog } from '../components/ConfirmDeleteDialog';
import { InventoryFormDialog } from '../components/InventoryFormDialog';
import { InventoryTable } from '../components/InventoryTable';
import { useInventory } from '../hooks/useInventory';

type DialogMode = 'none' | 'form' | 'adjust' | 'delete';

/** Inventory management screen. REQ-INV-001 to REQ-INV-005. */
export function InventoryPage() {
  const { items, isLoading, error, createItem, updateItem, deleteItem, adjustStock, clearError } =
    useInventory();
  const [dialogMode, setDialogMode] = useState<DialogMode>('none');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const openDialog = (mode: DialogMode, item: InventoryItem | null) => {
    clearError();
    setSelectedItem(item);
    setDialogMode(mode);
  };

  const closeDialog = () => {
    setDialogMode('none');
    setSelectedItem(null);
  };

  const handleFormSubmit = (values: { name: string; quantity: number }) =>
    selectedItem ? updateItem(selectedItem.id, values) : createItem(values);

  return (
    <Box component="main" sx={{ p: 3, maxWidth: 900, mx: 'auto' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h4" component="h1">
          Smart Inventory
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => openDialog('form', null)}
        >
          Add item
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" onClose={clearError} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {isLoading ? (
        <Stack alignItems="center" sx={{ py: 4 }}>
          <CircularProgress aria-label="Loading inventory" />
        </Stack>
      ) : (
        <InventoryTable
          items={items}
          onEdit={(item) => openDialog('form', item)}
          onAdjust={(item) => openDialog('adjust', item)}
          onDelete={(item) => openDialog('delete', item)}
        />
      )}

      <InventoryFormDialog
        open={dialogMode === 'form'}
        item={selectedItem}
        onClose={closeDialog}
        onSubmit={handleFormSubmit}
      />
      <AdjustStockDialog
        open={dialogMode === 'adjust'}
        item={selectedItem}
        onClose={closeDialog}
        onSubmit={(delta) => adjustStock(selectedItem!.id, delta)}
      />
      <ConfirmDeleteDialog
        open={dialogMode === 'delete'}
        item={selectedItem}
        onClose={closeDialog}
        onConfirm={() => deleteItem(selectedItem!.id)}
      />
    </Box>
  );
}
