import { HashRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/colors.css';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <HashRouter>
    <App />
  </HashRouter>,
)
