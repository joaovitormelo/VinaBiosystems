import logo from './logo.svg';
import './App.css';
import { Injector } from './core/Injector';
import { DoLoginUsecase } from './features/authentication/domain/usecases/authentication/doLoginUsecase';

let doLoginUsecase: DoLoginUsecase;

function onClick() {
  try {
    doLoginUsecase.doLogin("joao", "123");
    console.log("Login bem sucedido!");
  } catch(error) {
    throw error;
  }
}

function App() {
  const injector = Injector.getInstance();
  doLoginUsecase = injector.getDoLoginUsecase();
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
          User
        </a>
      </header>
    </div>
  );
}

export default App;
