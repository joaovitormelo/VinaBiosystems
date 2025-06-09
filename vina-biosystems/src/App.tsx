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

let doLoginUsecase: DoLoginUsecase;
let editUserUsecase: EditUserUsecase;
let excludeUserUsecase: ExcludeUserUsecase;
let registerNewUserUsecase: RegisterNewUserUsecase;
let viewSamplingResultsUsecase: ViewSamplingResultsUsecase;

async function runTests() {
  await testLoginUsecase("joao", "123");
  //testAttachSamplingResultUsecase();
  //await testFinishProductionBatchUsecase();
  //testViewSamplingResultsUsecase();
  //testLoginUsecase();
  //testEditUserUsecase();
  //testExcludeUserUsecase();
  //testRegisterNewUserUsecase();
  //testViewInventoryUsecase();
  //testRegisterRawMaterialUsecase();
  //testEditRawMaterialUsecase();
  //await testRemoveRawMaterialUsecase();
  // await testCheckOutRawMaterialUsecase();
  // await testViewInventoryUsecase();
 //testRegisterProductionBatchUsecase();
 await testCancelProductionBatchUsecase();
 testViewProductionBatchesUsecase();
 //testAttachSamplingResultUsecase();
 //testExcludeSamplingResultUsecase();
 testDoLogoutUsecase();
}

async function testDoLogoutUsecase() {
    const doLogoutUsecase = Injector.getInstance().getDoLogoutUsecase();
    try {
        await doLogoutUsecase.execute();
        console.log("Logout realizado com sucesso!");
    } catch (error) {
        console.error("Erro ao realizar logout:", error);
    }
}

async function testCancelProductionBatchUsecase() {
    const cancelProductionBatchUsecase = Injector.getInstance().getCancelProductionBatchUsecase();
    const batch = BatchModel.getMock();
    batch.setId(1); // Assuming you have a batch with ID 1
    try {
        await cancelProductionBatchUsecase.execute(batch);
        console.log("Lote de produção cancelado com sucesso!");
    } catch (error) {
        console.error("Erro ao cancelar lote de produção:", error);
    }
}

async function testFinishProductionBatchUsecase() {
    const finishProductionBatchUsecase = Injector.getInstance().getFinishProductionBatchUsecase();
    try {
        await finishProductionBatchUsecase.execute(1); // Assuming you have a batch with ID 1
        console.log("Lote de produção finalizado com sucesso!");
    } catch (error) {
        console.error("Erro ao finalizar lote de produção:", error);
    }
}

async function testExcludeSamplingResultUsecase() {
    const excludeSamplingResultUsecase = Injector.getInstance().getExcludeSamplingResultUsecase();
    try {
        await excludeSamplingResultUsecase.execute(1); // Assuming you have a sampling result with ID 1
        console.log("Resultado de coleta excluído com sucesso!");
    } catch (error) {
        console.error("Erro ao excluir resultado de coleta:", error);
    }
}

async function testAttachSamplingResultUsecase() {
    const attachSamplingResultUsecase = Injector.getInstance().getAttachSamplingResultUsecase();
    const samplingResult = SamplingResultModel.getMock();
    samplingResult.setFileName("sample_result.txt");
    samplingResult.setDate(moment());
    samplingResult.setCreationUserId(1); // Assuming you have a batch with ID 1
    try {
        const result = await attachSamplingResultUsecase.execute(samplingResult);
        console.log("Resultado de coleta anexado com sucesso:", result);
    } catch (error) {
        console.error("Erro ao anexar resultado de coleta:", error);
    }
}

async function testViewSamplingResultsUsecase() {
    const results = await viewSamplingResultsUsecase.execute(1);
    console.log(results);
    console.log("Teste de ViewSamplingResultsUsecase executado com sucesso!");
}

async function testLoginUsecase(login: string, password: string) {
  try {
    await doLoginUsecase.execute(login, password);
    console.log("Login bem sucedido!");
  } catch(error) {
    throw error;
  }
}

async function testEditUserUsecase() {
  try {
    const editedUser = UserModel.getMock();
    await editUserUsecase.execute(editedUser);
    console.log("Usuário editado!");
  } catch(error) {
    throw error;
  }
}

async function testExcludeUserUsecase() {
  try {
    const userToExclude = UserModel.getMock();
    userToExclude.setId(null);
    await excludeUserUsecase.execute(userToExclude);
    console.log("Usuário excluído!");
  } catch(error) {
    throw error;
  }
}

async function testRegisterNewUserUsecase() {
  try {
    const newUser = UserModel.getMock();
    newUser.setLogin("novoUsuario");
    newUser.setPassword("123456");
    await registerNewUserUsecase.execute(newUser);
    console.log("Usuário registrado com sucesso!");
    testLoginUsecase(newUser.getLogin(), newUser.getPassword() || "");
  } catch(error) {
    throw error;
  }
}

async function testRegisterRawMaterialUsecase() {
  try {
    const registerRawMaterialUsecase = Injector.getInstance().getRegisterRawMaterialUsecase();
    const rawMaterial = RawMaterialModel.getMock();
    rawMaterial.setId(2);
    rawMaterial.setName("Novo Insumo");
    rawMaterial.setQuantity(100);
    rawMaterial.setUnit("kg");
    await registerRawMaterialUsecase.execute(rawMaterial);
    console.log("Matéria-prima registrada com sucesso!");
  } catch(error) {
    console.error("Erro ao registrar matéria-prima:", error);
  }
}

async function testViewInventoryUsecase() {
  try {
    const viewRawMaterialInventoryUsecase = Injector.getInstance().getViewRawMaterialInventoryUsecase();
    const inventory = await viewRawMaterialInventoryUsecase.execute();
    console.log("Inventário de Matérias-Primas:", inventory);
  } catch(error) {
    console.error("Erro ao visualizar o inventário:", error);
  }
}

async function testEditRawMaterialUsecase() {
  try {
    const editRawMaterialUsecase = Injector.getInstance().getEditRawMaterialUsecase();
    const rawMaterial = RawMaterialModel.getMock();
    rawMaterial.setId(1);
    rawMaterial.setName("Cerva");
    rawMaterial.setQuantity(200);
    rawMaterial.setUnit("litros");
    await editRawMaterialUsecase.execute(rawMaterial);
    console.log("Matéria-prima editada com sucesso!");
  } catch(error) {
    console.error("Erro ao editar matéria-prima:", error);
  }
}

async function testRemoveRawMaterialUsecase() {
  try {
    const removeRawMaterialUsecase = Injector.getInstance().getRemoveRawMaterialUsecase();
    await removeRawMaterialUsecase.execute(1);
    console.log("Matéria-prima removida com sucesso!");
  } catch(error) {
    console.error("Erro ao remover matéria-prima:", error);
  }
}

async function testCheckInRawMaterialUsecase() {
  try {
    const checkInRawMaterialUsecase = Injector.getInstance().getCheckInRawMaterialUsecase();
    const rawMaterial = RawMaterialModel.getMock();
    rawMaterial.setId(1);
    const quantityToAdd = 50;
    await checkInRawMaterialUsecase.execute(rawMaterial, quantityToAdd);
    console.log(`Entrada de matéria-prima registrada com sucesso! Quantidade adicionada: ${quantityToAdd}`);
  } catch(error) {
    console.error("Erro ao registrar entrada de matéria-prima:", error);
  }
}

async function testCheckOutRawMaterialUsecase() {
  try {
    const checkOutRawMaterialUsecase = Injector.getInstance().getCheckOutRawMaterialUsecase();
    const rawMaterial = RawMaterialModel.getMock();
    rawMaterial.setId(1);
    const quantityToRemove = 200;
    await checkOutRawMaterialUsecase.execute(rawMaterial, quantityToRemove);
    console.log(`Saída de matéria-prima registrada com sucesso! Quantidade removida: ${quantityToRemove}`);
  } catch(error) {
    console.error("Erro ao registrar saída de matéria-prima:", error);
  }
}

async function testViewProductionBatchesUsecase() {
  try {
    const viewProductionBatchesUsecase = Injector.getInstance().getViewProductionBatchesUsecase();
    const batches = await viewProductionBatchesUsecase.execute();
    console.log("Lotes de Produção:", batches);
  } catch(error) {
    console.error("Erro ao visualizar lotes de produção:", error);
  }
}

async function testRegisterProductionBatchUsecase() {
  try {
    const registerProductionBatchUsecase = Injector.getInstance().getRegisterProductionBatchUsecase();
    const batch = BatchModel.getMock();
    batch.setLabel("Lote de Teste");
    batch.setStartDate(moment("2023-10-01"));
    batch.setEndDate(moment("2023-10-31"));
    batch.setRawMaterialList([
      new RawMaterialInBatch(1, 1000),
      new RawMaterialInBatch(2, 30)
    ]);
    await registerProductionBatchUsecase.execute(batch);
    console.log("Lote de produção registrado com sucesso!");
  } catch(error) {
    console.error("Erro ao registrar lote de produção:", error);
  }
}

function App() {
  const injector = Injector.getInstance();
  doLoginUsecase = injector.getDoLoginUsecase();
  editUserUsecase = injector.getEditUserUsecase();
  excludeUserUsecase = injector.getExcludeUserUsecase();
  registerNewUserUsecase = injector.getRegisterNewUserUsecase();
  viewSamplingResultsUsecase = injector.getViewSamplingResultsUsecase();
  runTests();

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
