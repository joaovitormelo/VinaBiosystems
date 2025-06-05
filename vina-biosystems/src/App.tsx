import logo from './logo.svg';
import './App.css';
import { Injector } from './core/Injector';
import { DoLoginUsecase } from './features/domain/usecases/authentication/doLoginUsecase';
import { EditUserUsecase } from './features/domain/usecases/authentication/editUserUsecase';
import { UserModel } from './features/domain/models/userModel';
import { ExcludeUserUsecase } from './features/domain/usecases/authentication/excludeUserUsercase';

let doLoginUsecase: DoLoginUsecase;
let editUserUsecase: EditUserUsecase;
let excludeUserUsecase: ExcludeUserUsecase;

async function onClick() {
  //testLoginUsecase();
  //testEditUserUsecase();
  //testExcludeUserUsecase();
}

async function testLoginUsecase() {
  try {
    await doLoginUsecase.doLogin("joao", "123");
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

function App() {
  const injector = Injector.getInstance();
  doLoginUsecase = injector.getDoLoginUsecase();
  editUserUsecase = injector.getEditUserUsecase();
  excludeUserUsecase = injector.getExcludeUserUsecase();
  testLoginUsecase();
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
