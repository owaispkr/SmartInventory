namespace SmartInventoryAPI.Models;

/// <summary>
/// Request to update an existing inventory item.
/// REQ-INV-004: Update inventory item.
/// </summary>
public class UpdateInventoryItemRequest
{
    /// <summary>
    /// The display name of the inventory item.
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// The absolute stock quantity. Must be zero or greater.
    /// </summary>
    public int Quantity { get; set; }

    /// <summary>
    /// The low stock threshold. Must be zero or greater.
    /// </summary>
    public int LowStockThreshold { get; set; }
}
