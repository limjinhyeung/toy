import './App.css';
import Appbar from './commom/Appbar'

import {Route, Routes} from "react-router-dom";

import Home from './commom/Home'
import BoardInsert from "./components/BoardInsert";
import BoardDetail from "./components/BoardDetail";
import BoardUpdate from "./components/BoardUpdate";
import BoardList from "./components/BoardList";
import Login from './LoginComponents/Login';
import SignUp from './LoginComponents/SignUp';

function App() {

  return (
      <div className="App">
        <Appbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/board" element={<BoardList/>}/>
          <Route path="/board/:no" element={<BoardDetail/>}/>
          <Route path="/board/edit/:no" element={<BoardUpdate/>}/>
          <Route path="/board/new" element={<BoardInsert/>}/>

          {/*로그인*/}
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
      </div>
  );
}

export default App;