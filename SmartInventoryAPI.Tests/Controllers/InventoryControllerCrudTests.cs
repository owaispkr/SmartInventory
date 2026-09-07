using Microsoft.AspNetCore.Mvc;
using SmartInventoryAPI.Controllers;
using SmartInventoryAPI.Models;
using SmartInventoryAPI.Services;
using Xunit;

namespace SmartInventoryAPI.Tests.Controllers;

/// <summary>
/// CRUD endpoint tests for <see cref="InventoryController"/>.
/// REQ-INV-002: List inventory items.
/// REQ-INV-003: Create inventory item.
/// REQ-INV-004: Update inventory item.
/// REQ-INV-005: Delete inventory item.
/// TC-INV-023: List returns 200 with all items.
/// TC-INV-024: Create returns 201 with the created item.
/// TC-INV-025: Create returns 400 for invalid input.
/// TC-INV-026: Create returns 409 for a duplicate name.
/// TC-INV-027: Update returns 200 on success.
/// TC-INV-028: Update returns 404 for an unknown item.
/// TC-INV-029: Update returns 409 for a duplicate name.
/// TC-INV-030: Update returns 400 for invalid input.
/// TC-INV-031: Delete returns 204 on success.
/// TC-INV-032: Delete returns 404 for an unknown item.
/// </summary>
public class InventoryControllerCrudTests
{
    private static InventoryController CreateController() => new(new InventoryService());

    [Fact]
    public async Task GetItems_ReturnsOk_WithAllItems()
    {
        var controller = CreateController();

        var result = await controller.GetItems();

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var items = Assert.IsAssignableFrom<IReadOnlyList<InventoryItem>>(okResult.Value);
        Assert.Equal(3, items.Count);
        Assert.Equal(20, items[0].LowStockThreshold);
        Assert.True(items[2].IsLowStock);
    }

    [Fact]
    public async Task CreateItem_ReturnsCreated_WhenRequestIsValid()
    {
        var controller = CreateController();

        var result = await controller.CreateItem(new CreateInventoryItemRequest
        {
            Name = "Sprocket",
            Quantity = 5,
            LowStockThreshold = 6,
        });

        var created = Assert.IsType<CreatedAtActionResult>(result.Result);
        var item = Assert.IsType<InventoryItem>(created.Value);
        Assert.Equal("Sprocket", item.Name);
        Assert.True(item.IsLowStock);
    }

    [Fact]
    public async Task CreateItem_ReturnsBadRequest_WhenNameIsMissing()
    {
        var controller = CreateController();

        var result = await controller.CreateItem(new CreateInventoryItemRequest { Name = "", Quantity = 5, LowStockThreshold = 0 });

        Assert.IsType<BadRequestObjectResult>(result.Result);
    }

    [Fact]
    public async Task CreateItem_ReturnsConflict_WhenNameAlreadyExists()
    {
        var controller = CreateController();

        var result = await controller.CreateItem(new CreateInventoryItemRequest { Name = "Widget", Quantity = 5, LowStockThreshold = 0 });

        Assert.IsType<ConflictObjectResult>(result.Result);
    }

    [Fact]
    public async Task UpdateItem_ReturnsOk_WhenRequestIsValid()
    {
        var controller = CreateController();

        var result = await controller.UpdateItem(1, new UpdateInventoryItemRequest
        {
            Name = "Widget Pro",
            Quantity = 12,
            LowStockThreshold = 20,
        });

        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var item = Assert.IsType<InventoryItem>(okResult.Value);
        Assert.Equal(12, item.Quantity);
    }

    [Fact]
    public async Task UpdateItem_ReturnsNotFound_WhenItemDoesNotExist()
    {
        var controller = CreateController();

        var result = await controller.UpdateItem(999, new UpdateInventoryItemRequest { Name = "Sprocket", Quantity = 1, LowStockThreshold = 0 });

        Assert.IsType<NotFoundObjectResult>(result.Result);
    }

    [Fact]
    public async Task UpdateItem_ReturnsConflict_WhenNameBelongsToAnotherItem()
    {
        var controller = CreateController();

        var result = await controller.UpdateItem(1, new UpdateInventoryItemRequest { Name = "Gadget", Quantity = 1, LowStockThreshold = 0 });

        Assert.IsType<ConflictObjectResult>(result.Result);
    }

    [Fact]
    public async Task UpdateItem_ReturnsBadRequest_WhenQuantityIsNegative()
    {
        var controller = CreateController();

        var result = await controller.UpdateItem(1, new UpdateInventoryItemRequest { Name = "Widget", Quantity = -1, LowStockThreshold = 0 });

        Assert.IsType<BadRequestObjectResult>(result.Result);
    }

    [Fact]
    public async Task DeleteItem_ReturnsNoContent_WhenItemExists()
    {
        var controller = CreateController();

        var result = await controller.DeleteItem(1);

        Assert.IsType<NoContentResult>(result);
    }

    [Fact]
    public async Task DeleteItem_ReturnsNotFound_WhenItemDoesNotExist()
    {
        var controller = CreateController();

        var result = await controller.DeleteItem(999);

        Assert.IsType<NotFoundResult>(result);
    }
}
