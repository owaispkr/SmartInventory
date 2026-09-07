import type {
  CreateInventoryItemRequest,
  InventoryItem,
  InventoryRequest,
  InventoryResponse,
  UpdateInventoryItemRequest,
} from './inventoryTypes';

/**
 * Thin typed wrapper around the SmartInventoryAPI inventory endpoints.
 * Keeps data access out of presentation components.
 */
export class InventoryApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'InventoryApiError';
  }
}

const baseUrl = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');

const inventoryUrl = (path = ''): string => `${baseUrl}/api/Inventory${path}`;

async function readErrorMessage(response: Response, fallback: string): Promise<string> {
  const text = await response.text().catch(() => '');
  if (!text) {
    return fallback;
  }

  try {
    const parsed: unknown = JSON.parse(text);
    if (typeof parsed === 'string') {
      return parsed;
    }

    if (parsed && typeof parsed === 'object' && 'title' in parsed) {
      const { title } = parsed as { title?: unknown };
      if (typeof title === 'string') {
        return title;
      }
    }
  } catch {
    // Body is plain text (the API returns string bodies for 400/404/409).
  }

  return text;
}

async function send<TResult>(
  path: string,
  init: RequestInit,
  fallbackMessage: string,
): Promise<TResult> {
  const response = await fetch(inventoryUrl(path), {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });

  if (!response.ok) {
    throw new InventoryApiError(await readErrorMessage(response, fallbackMessage), response.status);
  }

  if (response.status === 204) {
    return undefined as TResult;
  }

  return (await response.json()) as TResult;
}

/** REQ-INV-002: List inventory items. */
export function getInventoryItems(): Promise<InventoryItem[]> {
  return send<InventoryItem[]>('', { method: 'GET' }, 'Unable to load inventory items.');
}

/** REQ-INV-003: Create inventory item. */
export function createInventoryItem(request: CreateInventoryItemRequest): Promise<InventoryItem> {
  return send<InventoryItem>(
    '',
    { method: 'POST', body: JSON.stringify(request) },
    'Unable to create the inventory item.',
  );
}

/** REQ-INV-004: Update inventory item. */
export function updateInventoryItem(
  itemId: number,
  request: UpdateInventoryItemRequest,
): Promise<InventoryItem> {
  return send<InventoryItem>(
    `/${itemId}`,
    { method: 'PUT', body: JSON.stringify(request) },
    'Unable to update the inventory item.',
  );
}

/** REQ-INV-005: Delete inventory item. */
export function deleteInventoryItem(itemId: number): Promise<void> {
  return send<void>(
    `/${itemId}`,
    { method: 'DELETE' },
    'Unable to delete the inventory item.',
  );
}

/** REQ-INV-001: Adjust inventory item stock quantity. */
export function adjustInventoryStock(request: InventoryRequest): Promise<InventoryResponse> {
  return send<InventoryResponse>(
    '/adjust',
    { method: 'POST', body: JSON.stringify(request) },
    'Unable to adjust stock.',
  );
}
