namespace SmartInventoryAPI.Models;

/// <summary>
/// Request to create a new inventory item.
/// REQ-INV-003: Create inventory item.
/// </summary>
public class CreateInventoryItemRequest
{
    /// <summary>
    /// The display name of the inventory item.
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// The initial stock quantity. Must be zero or greater.
    /// </summary>
    public int Quantity { get; set; }

    /// <summary>
    /// The low stock threshold. Must be zero or greater.
    /// </summary>
    public int LowStockThreshold { get; set; }
}
