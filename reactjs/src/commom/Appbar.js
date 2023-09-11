import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {useRecoilState, useRecoilValue} from "recoil";
import {sessionState} from "./SessionState";

export default function Appbar() {

  const isLogin = useRecoilValue(sessionState);

  const [session, setSession] = useRecoilState(sessionState);

  if(sessionStorage.getItem("Id")){
    setSession(true);
  }

  const navigate = useNavigate();
  const logout = (e) => {
    //Link사용시  navigate 실행안됨.
    //폼을 한번 막고 다음 코드 진행
    e.preventDefault();

    sessionStorage.removeItem('Id');

    setSession(false);

    navigate("/");
  }
  return (
      <div>
        <h2>Menu bar updating...</h2>
        <Link to="/">Home</Link>
        /
        <Link to="/board">Board</Link>
        /
        {isLogin ? ( <Link onClick={logout}>Logout</Link>
          )
          : (<Link to="/login">Login</Link>)}
      </div>
  );
}