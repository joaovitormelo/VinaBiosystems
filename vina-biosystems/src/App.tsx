import logo from './logo.svg';
import './App.css';
import { Injector } from './core/Injector';

function App() {
  const injector = Injector.getInstance();
  const authenticationUsecases = injector.getAuthenticationUsecases();
  const user = authenticationUsecases.doLogin();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          User: {user.getName()} / Login: {user.getLogin()}
        </a>
      </header>
    </div>
  );
}

export default App;
