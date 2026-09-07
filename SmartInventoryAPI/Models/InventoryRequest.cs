namespace SmartInventoryAPI.Models;

/// <summary>
/// Request to adjust the stock quantity of an inventory item.
/// REQ-INV-001: Adjust inventory item stock quantity.
/// </summary>
public class InventoryRequest
{
    /// <summary>
    /// The identifier of the inventory item to adjust.
    /// </summary>
    public int ItemId { get; set; }

    /// <summary>
    /// The amount to adjust the stock by. Positive values increase stock,
    /// negative values decrease stock.
    /// </summary>
    public int QuantityDelta { get; set; }
}
