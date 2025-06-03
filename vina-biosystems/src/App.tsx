import logo from './logo.svg';
import './App.css';
import { Injector } from './core/Injector';
import { DoLoginUsecase } from './features/authentication/domain/usecases/authentication/doLoginUsecase';
import { UserModel } from './features/authentication/domain/models/userModel';
import { ViewRegisteredUsersListUsecase } from './features/authentication/domain/usecases/authentication/viewRegisteredUsersListUsecase';

let doLoginUsecase: DoLoginUsecase;
let viewRegisteredUsersListUsecase: ViewRegisteredUsersListUsecase;

function onClick() {
  try {
    doLoginUsecase.doLogin("joao", "1234");
    console.log("Login bem sucedido!");
  } catch(error) {
    throw error;
  }
}

function App() {
  const injector = Injector.getInstance();
  doLoginUsecase = injector.getDoLoginUsecase();
  viewRegisteredUsersListUsecase = injector.getViewRegisteredUsersListUsecase();

  const userList = viewRegisteredUsersListUsecase.viewRegisteredUsersList();
  console.log(userList);

  const user: UserModel = new UserModel("joao", "123", "123");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
        >
          Nome: {user.getName()} | Login: {user.getLogin()}
        </a>
      </header>
    </div>
  );
}

export default App;
