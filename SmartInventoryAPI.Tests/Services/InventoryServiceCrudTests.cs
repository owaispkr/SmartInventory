using SmartInventoryAPI.Models;
using SmartInventoryAPI.Services;
using Xunit;

namespace SmartInventoryAPI.Tests.Services;

/// <summary>
/// CRUD tests for <see cref="InventoryService"/>.
/// REQ-INV-002: List inventory items.
/// REQ-INV-003: Create inventory item.
/// REQ-INV-004: Update inventory item.
/// REQ-INV-005: Delete inventory item.
/// TC-INV-011: List returns seeded items ordered by id.
/// TC-INV-012: Create assigns a new id and stores the item.
/// TC-INV-013: Create allows a boundary quantity of zero.
/// TC-INV-014: Create rejects a blank name.
/// TC-INV-015: Create rejects a negative quantity.
/// TC-INV-016: Create rejects a duplicate name.
/// TC-INV-017: Update changes name and quantity.
/// TC-INV-018: Update rejects an unknown item.
/// TC-INV-019: Update rejects a name used by another item.
/// TC-INV-020: Update rejects a negative quantity.
/// TC-INV-021: Delete removes an existing item.
/// TC-INV-022: Delete returns false for an unknown item.
/// </summary>
public class InventoryServiceCrudTests
{
    [Fact]
    public async Task GetItemsAsync_ReturnsSeededItems_OrderedById()
    {
        var service = new InventoryService();

        var items = await service.GetItemsAsync();

        Assert.Equal(3, items.Count);
        Assert.Equal([1, 2, 3], items.Select(item => item.Id));
        Assert.Equal([20, 10, 5], items.Select(item => item.LowStockThreshold));
        Assert.Equal([false, false, true], items.Select(item => item.IsLowStock));
    }

    [Fact]
    public async Task CreateItemAsync_AssignsNewId_AndStoresItem()
    {
        var service = new InventoryService();

        var created = await service.CreateItemAsync(new CreateInventoryItemRequest
        {
            Name = "Sprocket",
            Quantity = 7,
            LowStockThreshold = 3,
        });

        Assert.Equal(4, created.Id);
        Assert.Equal("Sprocket", created.Name);
        Assert.Equal(7, created.Quantity);
        Assert.Equal(3, created.LowStockThreshold);
        Assert.NotNull(await service.GetItemAsync(created.Id));
    }

    [Fact]
    public async Task CreateItemAsync_TrimsName_AndAllowsZeroQuantity()
    {
        var service = new InventoryService();

        var created = await service.CreateItemAsync(new CreateInventoryItemRequest
        {
            Name = "  Sprocket  ",
            Quantity = 0,
            LowStockThreshold = 1,
        });

        Assert.Equal("Sprocket", created.Name);
        Assert.Equal(0, created.Quantity);
        Assert.True(created.IsLowStock);
    }

    [Theory]
    [InlineData("")]
    [InlineData("   ")]
    public async Task CreateItemAsync_Throws_WhenNameIsBlank(string name)
    {
        var service = new InventoryService();

        await Assert.ThrowsAsync<ArgumentException>(
            () => service.CreateItemAsync(new CreateInventoryItemRequest { Name = name, Quantity = 1, LowStockThreshold = 0 }));
    }

    [Fact]
    public async Task CreateItemAsync_Throws_WhenQuantityIsNegative()
    {
        var service = new InventoryService();

        await Assert.ThrowsAsync<ArgumentException>(
            () => service.CreateItemAsync(new CreateInventoryItemRequest { Name = "Sprocket", Quantity = -1, LowStockThreshold = 0 }));
    }

    [Fact]
    public async Task CreateItemAsync_Throws_WhenLowStockThresholdIsNegative()
    {
        var service = new InventoryService();

        await Assert.ThrowsAsync<ArgumentException>(
            () => service.CreateItemAsync(new CreateInventoryItemRequest { Name = "Sprocket", Quantity = 1, LowStockThreshold = -1 }));
    }

    [Fact]
    public async Task CreateItemAsync_Throws_WhenNameAlreadyExists()
    {
        var service = new InventoryService();

        await Assert.ThrowsAsync<InvalidOperationException>(
            () => service.CreateItemAsync(new CreateInventoryItemRequest { Name = "widget", Quantity = 1, LowStockThreshold = 0 }));
    }

    [Fact]
    public async Task UpdateItemAsync_UpdatesNameAndQuantity()
    {
        var service = new InventoryService();

        var updated = await service.UpdateItemAsync(1, new UpdateInventoryItemRequest
        {
            Name = "Widget Pro",
            Quantity = 42,
            LowStockThreshold = 50,
        });

        Assert.Equal(1, updated.Id);
        Assert.Equal("Widget Pro", updated.Name);
        Assert.Equal(42, updated.Quantity);
        Assert.True(updated.IsLowStock);
    }

    [Fact]
    public async Task UpdateItemAsync_AllowsKeepingItsOwnName()
    {
        var service = new InventoryService();

        var updated = await service.UpdateItemAsync(1, new UpdateInventoryItemRequest { Name = "Widget", Quantity = 5, LowStockThreshold = 5 });

        Assert.Equal(5, updated.Quantity);
    }

    [Fact]
    public async Task UpdateItemAsync_Throws_WhenItemDoesNotExist()
    {
        var service = new InventoryService();

        await Assert.ThrowsAsync<KeyNotFoundException>(
            () => service.UpdateItemAsync(999, new UpdateInventoryItemRequest { Name = "Sprocket", Quantity = 1, LowStockThreshold = 0 }));
    }

    [Fact]
    public async Task UpdateItemAsync_Throws_WhenNameBelongsToAnotherItem()
    {
        var service = new InventoryService();

        await Assert.ThrowsAsync<InvalidOperationException>(
            () => service.UpdateItemAsync(1, new UpdateInventoryItemRequest { Name = "Gadget", Quantity = 1, LowStockThreshold = 0 }));
    }

    [Fact]
    public async Task UpdateItemAsync_Throws_WhenQuantityIsNegative()
    {
        var service = new InventoryService();

        await Assert.ThrowsAsync<ArgumentException>(
            () => service.UpdateItemAsync(1, new UpdateInventoryItemRequest { Name = "Widget", Quantity = -1, LowStockThreshold = 0 }));
    }

    [Fact]
    public async Task UpdateItemAsync_Throws_WhenLowStockThresholdIsNegative()
    {
        var service = new InventoryService();

        await Assert.ThrowsAsync<ArgumentException>(
            () => service.UpdateItemAsync(1, new UpdateInventoryItemRequest { Name = "Widget", Quantity = 1, LowStockThreshold = -1 }));
    }

    [Fact]
    public async Task DeleteItemAsync_RemovesItem_WhenItExists()
    {
        var service = new InventoryService();

        var deleted = await service.DeleteItemAsync(1);

        Assert.True(deleted);
        Assert.Null(await service.GetItemAsync(1));
    }

    [Fact]
    public async Task DeleteItemAsync_ReturnsFalse_WhenItemDoesNotExist()
    {
        var service = new InventoryService();

        Assert.False(await service.DeleteItemAsync(999));
    }
}
