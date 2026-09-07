import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  InventoryApiError,
  createInventoryItem,
  deleteInventoryItem,
  getInventoryItems,
  updateInventoryItem,
} from './inventoryClient';

/**
 * Tests for the inventory API client.
 * TC-INV-033: Items are requested from the inventory endpoint.
 * TC-INV-034: Create posts the request body.
 * TC-INV-035: Update issues a PUT to the item URL.
 * TC-INV-036: Delete tolerates a 204 empty response.
 * TC-INV-037: Failed responses raise InventoryApiError with the server message.
 */
describe('inventoryClient', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  const jsonResponse = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

  it('requests all inventory items', async () => {
    fetchMock.mockResolvedValue(
      jsonResponse([{ id: 1, name: 'Widget', quantity: 100, lowStockThreshold: 20, isLowStock: false }]),
    );

    const items = await getInventoryItems();

    expect(items).toHaveLength(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toContain('/api/Inventory');
    expect(init.method).toBe('GET');
  });

  it('posts the request body when creating an item', async () => {
    fetchMock.mockResolvedValue(
      jsonResponse({ id: 4, name: 'Sprocket', quantity: 5, lowStockThreshold: 2, isLowStock: false }, 201),
    );

    const created = await createInventoryItem({ name: 'Sprocket', quantity: 5, lowStockThreshold: 2 });

    expect(created.id).toBe(4);
    const [, init] = fetchMock.mock.calls[0];
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body)).toEqual({ name: 'Sprocket', quantity: 5, lowStockThreshold: 2 });
  });

  it('issues a PUT to the item url when updating', async () => {
    fetchMock.mockResolvedValue(
      jsonResponse({ id: 1, name: 'Widget Pro', quantity: 12, lowStockThreshold: 8, isLowStock: false }),
    );

    await updateInventoryItem(1, { name: 'Widget Pro', quantity: 12, lowStockThreshold: 8 });

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toContain('/api/Inventory/1');
    expect(init.method).toBe('PUT');
  });

  it('resolves when delete returns 204 with no content', async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 204 }));

    await expect(deleteInventoryItem(1)).resolves.toBeUndefined();
  });

  it('throws InventoryApiError carrying the server message', async () => {
    fetchMock.mockResolvedValue(new Response('Name is required.', { status: 400 }));

    await expect(createInventoryItem({ name: '', quantity: 1, lowStockThreshold: 0 })).rejects.toMatchObject({
      message: 'Name is required.',
      status: 400,
    });
    await expect(createInventoryItem({ name: '', quantity: 1, lowStockThreshold: 0 })).rejects.toBeInstanceOf(
      InventoryApiError,
    );
  });
});
