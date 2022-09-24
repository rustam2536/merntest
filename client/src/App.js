import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'  

import Forms from './components/Form'
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Router>

        <Routes> <Route  path='/' element={< Header />}></Route></Routes>
        <Routes> <Route  path='/product' element={< Forms />}></Route></Routes>

      </Router> 
    </div>
  );
}

export default App;