using SmartInventoryAPI.Models;
using SmartInventoryAPI.Services;
using Xunit;

namespace SmartInventoryAPI.Tests.Services;

/// <summary>
/// Tests for <see cref="InventoryService"/>.
/// REQ-INV-001: Adjust inventory item stock quantity.
/// TC-INV-001: Successful stock increase.
/// TC-INV-002: Successful stock decrease.
/// TC-INV-003: Adjustment for a non-existent item.
/// TC-INV-004: Adjustment resulting in negative quantity.
/// TC-INV-005: Boundary adjustment resulting in exactly zero quantity.
/// </summary>
public class InventoryServiceTests
{
    [Fact]
    public async Task AdjustStockAsync_IncreasesQuantity_WhenDeltaIsPositive()
    {
        var service = new InventoryService();

        var response = await service.AdjustStockAsync(new InventoryRequest { ItemId = 1, QuantityDelta = 10 });

        Assert.Equal(110, response.Quantity);
        Assert.Equal(1, response.ItemId);
        Assert.Equal("Widget", response.Name);
    }

    [Fact]
    public async Task AdjustStockAsync_DecreasesQuantity_WhenDeltaIsNegative()
    {
        var service = new InventoryService();

        var response = await service.AdjustStockAsync(new InventoryRequest { ItemId = 2, QuantityDelta = -20 });

        Assert.Equal(30, response.Quantity);
    }

    [Fact]
    public async Task AdjustStockAsync_Throws_WhenItemDoesNotExist()
    {
        var service = new InventoryService();

        await Assert.ThrowsAsync<KeyNotFoundException>(
            () => service.AdjustStockAsync(new InventoryRequest { ItemId = 999, QuantityDelta = 5 }));
    }

    [Fact]
    public async Task AdjustStockAsync_Throws_WhenResultWouldBeNegative()
    {
        var service = new InventoryService();

        await Assert.ThrowsAsync<InvalidOperationException>(
            () => service.AdjustStockAsync(new InventoryRequest { ItemId = 3, QuantityDelta = -1 }));
    }

    [Fact]
    public async Task AdjustStockAsync_AllowsQuantity_ToReachExactlyZero()
    {
        var service = new InventoryService();

        var response = await service.AdjustStockAsync(new InventoryRequest { ItemId = 1, QuantityDelta = -100 });

        Assert.Equal(0, response.Quantity);
    }

    [Fact]
    public async Task GetItemAsync_ReturnsNull_WhenItemDoesNotExist()
    {
        var service = new InventoryService();

        var item = await service.GetItemAsync(999);

        Assert.Null(item);
    }
}
