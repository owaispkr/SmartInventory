using System.Collections.Concurrent;
using SmartInventoryAPI.Models;

namespace SmartInventoryAPI.Services;

/// <summary>
/// In-memory implementation of <see cref="IInventoryService"/>.
/// REQ-INV-001: Adjust inventory item stock quantity.
/// </summary>
/// <remarks>
/// Data is stored in-memory (ConcurrentDictionary) and is not persisted
/// across application restarts. Registered as a singleton so state is
/// shared across requests.
/// </remarks>
public class InventoryService : IInventoryService
{
    private readonly ConcurrentDictionary<int, InventoryItem> _items;

    // Guards multi-step operations (id generation, duplicate-name checks) that
    // cannot be expressed as a single atomic dictionary operation.
    private readonly object _writeLock = new();

    public InventoryService()
    {
        _items = new ConcurrentDictionary<int, InventoryItem>();

        // Synthetic seed data for demonstration purposes only.
        _items[1] = new InventoryItem { Id = 1, Name = "Widget", Quantity = 100, LowStockThreshold = 20 };
        _items[2] = new InventoryItem { Id = 2, Name = "Gadget", Quantity = 50, LowStockThreshold = 10 };
        _items[3] = new InventoryItem { Id = 3, Name = "Gizmo", Quantity = 0, LowStockThreshold = 5 };
    }

    public Task<InventoryItem?> GetItemAsync(int itemId)
    {
        _items.TryGetValue(itemId, out var item);
        return Task.FromResult(item);
    }

    public Task<IReadOnlyList<InventoryItem>> GetItemsAsync()
    {
        IReadOnlyList<InventoryItem> items = _items.Values
            .OrderBy(item => item.Id)
            .ToList();

        return Task.FromResult(items);
    }

    public Task<InventoryItem> CreateItemAsync(CreateInventoryItemRequest request)
    {
        var name = ValidateName(request.Name);
        ValidateQuantity(request.Quantity);

        lock (_writeLock)
        {
            if (_items.Values.Any(item => NameMatches(item.Name, name)))
            {
                throw new InvalidOperationException($"An inventory item named '{name}' already exists.");
            }

            var newItem = new InventoryItem
            {
                Id = _items.IsEmpty ? 1 : _items.Keys.Max() + 1,
                Name = name,
                Quantity = request.Quantity,
            };

            _items[newItem.Id] = newItem;
            return Task.FromResult(newItem);
        }
    }

    public Task<InventoryItem> UpdateItemAsync(int itemId, UpdateInventoryItemRequest request)
    {
        var name = ValidateName(request.Name);
        ValidateQuantity(request.Quantity);

        lock (_writeLock)
        {
            if (!_items.TryGetValue(itemId, out var existingItem))
            {
                throw new KeyNotFoundException($"Inventory item {itemId} was not found.");
            }

            if (_items.Values.Any(item => item.Id != itemId && NameMatches(item.Name, name)))
            {
                throw new InvalidOperationException($"An inventory item named '{name}' already exists.");
            }

            existingItem.Name = name;
            existingItem.Quantity = request.Quantity;
            return Task.FromResult(existingItem);
        }
    }

    public Task<bool> DeleteItemAsync(int itemId)
    {
        lock (_writeLock)
        {
            return Task.FromResult(_items.TryRemove(itemId, out _));
        }
    }

    private static bool NameMatches(string left, string right) =>
        string.Equals(left, right, StringComparison.OrdinalIgnoreCase);

    private static string ValidateName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException("Name is required.", nameof(name));
        }

        return name.Trim();
    }

    private static void ValidateQuantity(int quantity)
    {
        if (quantity < 0)
        {
            throw new ArgumentException("Quantity must be zero or greater.", nameof(quantity));
        }
    }

    public Task<InventoryResponse> AdjustStockAsync(InventoryRequest request)
    {
        if (!_items.TryGetValue(request.ItemId, out var existingItem))
        {
            throw new KeyNotFoundException($"Inventory item {request.ItemId} was not found.");
        }

        var updatedItem = _items.AddOrUpdate(
            request.ItemId,
            existingItem,
            (_, current) =>
            {
                var newQuantity = current.Quantity + request.QuantityDelta;
                if (newQuantity < 0)
                {
                    throw new InvalidOperationException(
                        $"Adjustment would result in a negative quantity for item {request.ItemId}.");
                }

                current.Quantity = newQuantity;
                return current;
            });

        return Task.FromResult(new InventoryResponse
        {
            ItemId = updatedItem.Id,
            Name = updatedItem.Name,
            Quantity = updatedItem.Quantity,
        });
    }
}
