namespace SmartInventoryAPI.Models;

/// <summary>
/// Represents an item tracked in inventory.
/// </summary>
public class InventoryItem
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public int Quantity { get; set; }

    public int LowStockThreshold { get; set; }
}
