using Microsoft.AspNetCore.Mvc;
using SmartInventoryAPI.Controllers;
using SmartInventoryAPI.Models;
using SmartInventoryAPI.Services;
using Xunit;

namespace SmartInventoryAPI.Tests.Controllers;

/// <summary>
/// Tests for <see cref="InventoryController"/>.
/// REQ-INV-001: Adjust inventory item stock quantity.
/// TC-INV-006: Adjust stock returns 200 on success.
/// TC-INV-007: Adjust stock returns 400 for zero delta.
/// TC-INV-008: Adjust stock returns 404 for unknown item.
/// TC-INV-009: Adjust stock returns 409 for negative resulting quantity.
/// TC-INV-010: Get item returns 404 when not found.
/// </summary>
public class InventoryControllerTests
{
    [Fact]
    public async Task AdjustStock_ReturnsOk_WhenAdjustmentSucceeds()
    {
        var controller = new InventoryController(new InventoryService());

        var result = await controller.AdjustStock(new InventoryRequest { ItemId = 1, QuantityDelta = 5 });

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var response = Assert.IsType<InventoryResponse>(okResult.Value);
        Assert.Equal(105, response.Quantity);
        Assert.False(response.IsLowStock);
    }

    [Fact]
    public async Task AdjustStock_ReturnsBadRequest_WhenDeltaIsZero()
    {
        var controller = new InventoryController(new InventoryService());

        var result = await controller.AdjustStock(new InventoryRequest { ItemId = 1, QuantityDelta = 0 });

        Assert.IsType<BadRequestObjectResult>(result.Result);
    }

    [Fact]
    public async Task AdjustStock_ReturnsNotFound_WhenItemDoesNotExist()
    {
        var controller = new InventoryController(new InventoryService());

        var result = await controller.AdjustStock(new InventoryRequest { ItemId = 999, QuantityDelta = 5 });

        Assert.IsType<NotFoundObjectResult>(result.Result);
    }

    [Fact]
    public async Task AdjustStock_ReturnsConflict_WhenResultWouldBeNegative()
    {
        var controller = new InventoryController(new InventoryService());

        var result = await controller.AdjustStock(new InventoryRequest { ItemId = 3, QuantityDelta = -1 });

        Assert.IsType<ConflictObjectResult>(result.Result);
    }

    [Fact]
    public async Task GetItem_ReturnsNotFound_WhenItemDoesNotExist()
    {
        var controller = new InventoryController(new InventoryService());

        var result = await controller.GetItem(999);

        Assert.IsType<NotFoundResult>(result.Result);
    }
}
