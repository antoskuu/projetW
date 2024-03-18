import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Homepage from './components/Homepage';
import Login from './components/users/Login';
import Register from './components/users/Register';
import Account from './components/users/Account';



function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/account' element={<Account />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
