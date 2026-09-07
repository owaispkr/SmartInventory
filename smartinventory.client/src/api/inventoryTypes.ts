/**
 * Typed API contracts mirroring the SmartInventoryAPI models.
 * REQ-INV-001: Adjust inventory item stock quantity.
 * REQ-INV-002: List inventory items.
 * REQ-INV-003: Create inventory item.
 * REQ-INV-004: Update inventory item.
 * REQ-INV-005: Delete inventory item.
 */
export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  lowStockThreshold: number;
}

export interface CreateInventoryItemRequest {
  name: string;
  quantity: number;
}

export interface UpdateInventoryItemRequest {
  name: string;
  quantity: number;
}

export interface InventoryRequest {
  itemId: number;
  quantityDelta: number;
}

export interface InventoryResponse {
  itemId: number;
  name: string;
  quantity: number;
}
