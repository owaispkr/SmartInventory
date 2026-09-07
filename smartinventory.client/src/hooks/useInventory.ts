import { useCallback, useEffect, useState } from 'react';
import {
  adjustInventoryStock,
  createInventoryItem,
  deleteInventoryItem,
  getInventoryItems,
  updateInventoryItem,
} from '../api/inventoryClient';
import type {
  CreateInventoryItemRequest,
  InventoryItem,
  UpdateInventoryItemRequest,
} from '../api/inventoryTypes';

const messageFor = (error: unknown, fallback: string): string =>
  error instanceof Error && error.message ? error.message : fallback;

/**
 * Owns inventory data access and state so presentation components stay simple.
 * REQ-INV-001 to REQ-INV-005.
 */
export function useInventory() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      setItems(await getInventoryItems());
      setError(null);
    } catch (caught) {
      setError(messageFor(caught, 'Unable to load inventory items.'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const runCommand = useCallback(async (command: () => Promise<void>, fallback: string) => {
    try {
      await command();
      setError(null);
      return true;
    } catch (caught) {
      setError(messageFor(caught, fallback));
      return false;
    }
  }, []);

  const createItem = useCallback(
    (request: CreateInventoryItemRequest) =>
      runCommand(async () => {
        const created = await createInventoryItem(request);
        setItems((current) => [...current, created].sort((a, b) => a.id - b.id));
      }, 'Unable to create the inventory item.'),
    [runCommand],
  );

  const updateItem = useCallback(
    (itemId: number, request: UpdateInventoryItemRequest) =>
      runCommand(async () => {
        const updated = await updateInventoryItem(itemId, request);
        setItems((current) => current.map((item) => (item.id === itemId ? updated : item)));
      }, 'Unable to update the inventory item.'),
    [runCommand],
  );

  const deleteItem = useCallback(
    (itemId: number) =>
      runCommand(async () => {
        await deleteInventoryItem(itemId);
        setItems((current) => current.filter((item) => item.id !== itemId));
      }, 'Unable to delete the inventory item.'),
    [runCommand],
  );

  const adjustStock = useCallback(
    (itemId: number, quantityDelta: number) =>
      runCommand(async () => {
        const response = await adjustInventoryStock({ itemId, quantityDelta });
        setItems((current) =>
          current.map((item) =>
            item.id === itemId
              ? {
                  ...item,
                  name: response.name,
                  quantity: response.quantity,
                  lowStockThreshold: response.lowStockThreshold,
                  isLowStock: response.isLowStock,
                }
              : item,
          ),
        );
      }, 'Unable to adjust stock.'),
    [runCommand],
  );

  return {
    items,
    isLoading,
    error,
    refresh,
    createItem,
    updateItem,
    deleteItem,
    adjustStock,
    clearError: useCallback(() => setError(null), []),
  };
}
