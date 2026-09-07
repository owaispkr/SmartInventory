namespace SmartInventoryAPI.Models;

/// <summary>
/// Response returned after an inventory stock adjustment.
/// REQ-INV-001: Adjust inventory item stock quantity.
/// </summary>
public class InventoryResponse
{
    public int ItemId { get; set; }

    public string Name { get; set; } = string.Empty;

    public int Quantity { get; set; }

    public int LowStockThreshold { get; set; }

    public bool IsLowStock => Quantity < LowStockThreshold;
}
