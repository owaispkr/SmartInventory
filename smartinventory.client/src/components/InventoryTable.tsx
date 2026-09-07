import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import type { InventoryItem } from '../api/inventoryTypes';

interface InventoryTableProps {
  items: InventoryItem[];
  onEdit: (item: InventoryItem) => void;
  onAdjust: (item: InventoryItem) => void;
  onDelete: (item: InventoryItem) => void;
}

/** Presents inventory items and row level actions. REQ-INV-002. */
export function InventoryTable({ items, onEdit, onAdjust, onDelete }: InventoryTableProps) {
  if (items.length === 0) {
    return <Typography role="status">No inventory items yet. Add your first item.</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="Inventory items">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Low stock threshold</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id} hover>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">{item.lowStockThreshold}</TableCell>
              <TableCell align="right">
                <Tooltip title={`Adjust stock for ${item.name}`}>
                  <IconButton
                    aria-label={`Adjust stock for ${item.name}`}
                    onClick={() => onAdjust(item)}
                  >
                    <SwapVertIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={`Edit ${item.name}`}>
                  <IconButton aria-label={`Edit ${item.name}`} onClick={() => onEdit(item)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={`Delete ${item.name}`}>
                  <IconButton aria-label={`Delete ${item.name}`} onClick={() => onDelete(item)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
