import HomePage from "./screen/home-screen";
import Paginated from "./screen/paginated-screen";
import Checkout from "./screen/checkout-screen";

import { 
  BrowserRouter as Router,
  Route, 
  Routes as Switch 
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route element={<HomePage/>}  path='/' />
        <Route element={<Checkout/>}  path='/checkout' />
        <Route element={<Paginated/>} path='/photo/:page' />
      </Switch>
    </Router>
  );
}

export default App;
