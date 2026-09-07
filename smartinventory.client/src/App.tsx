import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import { InventoryPage } from './pages/InventoryPage';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <InventoryPage />
    </ThemeProvider>
  );
}

export default App;
