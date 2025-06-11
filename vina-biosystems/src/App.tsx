import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './features/presentation/pages/HomePage/HomePage';
import LoginPage from './features/presentation/pages/LoginPage/LoginPage';
import ResetPasswordPage from './features/presentation/pages/ResetPasswordPage/ResetPasswordPage';
import UsersPage from './features/presentation/pages/UsersPage/UsersPage';
import AllotmentPage from './features/presentation/pages/AllotmentPage';
import FinishAllotmentPage from './features/presentation/pages/FinishAllotmentPage';
import NewAllotmentPage from './features/presentation/pages/NewAllotmentPage';
import NewUserPage from './features/presentation/pages/NewUserPage';
import StockPage from './features/presentation/pages/StockPage';
import ProfilePage from './features/presentation/pages/ProfilePage';
import NewSupplyPage from './features/presentation/pages/NewSupplyPage';
import AllotmentInfoPage from './features/presentation/pages/AllotmentInfoPage';

// componente wrapper para passar as props do estado da navegacao
function AllotmentInfoPageWrapper() {
  const location = useLocation();
  const { rotulo, situacao } = location.state || { rotulo: '', situacao: '' };
  return <AllotmentInfoPage rotulo={rotulo} situacao={situacao} />;
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/usuarios" element={<UsersPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/lotes" element={<AllotmentPage />} />
          <Route path="/finalizar-lote" element={<FinishAllotmentPage />} />
          <Route path="/novo-lote" element={<NewAllotmentPage />} />
          <Route path="/novo-usuario" element={<NewUserPage />} />
          <Route path="/estoque" element={<StockPage />} />
          <Route path="/novo-insumo" element={<NewSupplyPage />} />
          <Route path="/info-lote" element={<AllotmentInfoPageWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
