import logo from './logo.svg';
import './App.css';
import { Injector } from './core/Injector';
import { DoLoginUsecase } from './features/domain/usecases/authentication/doLoginUsecase';
import { EditUserUsecase } from './features/domain/usecases/authentication/editUserUsecase';
import { UserModel } from './features/domain/models/userModel';
import { ExcludeUserUsecase } from './features/domain/usecases/authentication/excludeUserUsercase';
import { RegisterNewUserUsecase } from './features/domain/usecases/authentication/registerNewUserUsecase';

let doLoginUsecase: DoLoginUsecase;
let editUserUsecase: EditUserUsecase;
let excludeUserUsecase: ExcludeUserUsecase;
let registerNewUserUsecase: RegisterNewUserUsecase;

async function onClick() {
  //testLoginUsecase();
  //testEditUserUsecase();
  //testExcludeUserUsecase();
  //testRegisterNewUserUsecase();
  //testViewInventoryUsecase();
}

async function testLoginUsecase(login: string, password: string) {
  try {
    await doLoginUsecase.doLogin(login, password);
    console.log("Login bem sucedido!");
  } catch(error) {
    throw error;
  }
}

async function testEditUserUsecase() {
  try {
    const editedUser = UserModel.getMock();
    await editUserUsecase.editUser(editedUser);
    console.log("Usuário editado!");
  } catch(error) {
    throw error;
  }
}

async function testExcludeUserUsecase() {
  try {
    const userToExclude = UserModel.getMock();
    userToExclude.setId(null);
    await excludeUserUsecase.excludeUser(userToExclude);
    console.log("Usuário excluído!");
  } catch(error) {
    throw error;
  }
}

async function testRegisterNewUserUsecase() {
  try {
    const newUser = UserModel.getMock();
    newUser.setLogin("novoUsuario");
    newUser.setPassword("senhaSegura");
    await registerNewUserUsecase.registerNewUser(newUser);
    console.log("Usuário registrado com sucesso!");
    testLoginUsecase(newUser.getLogin(), newUser.getPassword() || "");
  } catch(error) {
    throw error;
  }
}

async function testViewInventoryUsecase() {
  try {
    const viewRawMaterialInventoryUsecase = Injector.getInstance().getViewRawMaterialInventoryUsecase();
    const inventory = await viewRawMaterialInventoryUsecase.viewRawMaterialInventory();
    console.log("Inventário de Matérias-Primas:", inventory);
  } catch(error) {
    console.error("Erro ao visualizar o inventário:", error);
  }
}

function App() {
  const injector = Injector.getInstance();
  doLoginUsecase = injector.getDoLoginUsecase();
  editUserUsecase = injector.getEditUserUsecase();
  excludeUserUsecase = injector.getExcludeUserUsecase();
  registerNewUserUsecase = injector.getRegisterNewUserUsecase();
  testLoginUsecase("joao", "123");
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button
          className="App-link"
          onClick={onClick}
        >
          Testar!
        </button>
      </header>
    </div>
  );
}

export default App;
