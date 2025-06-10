import logo from './logo.svg';
import './App.css';
import { Injector } from './core/Injector';
import { DoLoginUsecase } from './features/domain/usecases/authentication/doLoginUsecase';
import { EditUserUsecase } from './features/domain/usecases/authentication/editUserUsecase';
import { UserModel } from './features/domain/models/userModel';
import { ExcludeUserUsecase } from './features/domain/usecases/authentication/excludeUserUsercase';
import { RegisterNewUserUsecase } from './features/domain/usecases/authentication/registerNewUserUsecase';
import { RawMaterialModel } from './features/domain/models/rawMaterialModel';
import { BatchModel } from './features/domain/models/batchModel';
import moment from 'moment';
import { RawMaterialInBatch } from './features/domain/types/rawMaterialInBatch';
import { ViewSamplingResultsUsecase } from './features/domain/usecases/production/viewSamplingResultsUsecase';
import { SamplingResultModel } from './features/domain/models/samplingResultModel';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import { AxiosAdapter } from './features/data/utils/axiosAdapter';
import { BackendContract } from './features/data/utils/backendContract';
import { UserData } from './features/data/authentication/userData';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
