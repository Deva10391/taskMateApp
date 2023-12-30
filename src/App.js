import { Provider } from 'react-redux';
import './App.css';
import LandingPage from './Components/LandingPage';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <LandingPage />
      </div>
    </Provider>
  );
}

export default App;
