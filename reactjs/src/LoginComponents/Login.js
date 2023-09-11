import React from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Appbar from "../commom/Appbar";
import {atom, useRecoilState} from "recoil";
import {sessionState} from '../commom/SessionState';

export default function Login(){
  const { register, handleSubmit, formState: { isSubmitting }} = useForm();

  const navigate = useNavigate();

  const [session, setSession] = useRecoilState(sessionState);
  const onSubmit = (data) => {
    axios.post("http://localhost:8080/users/login",{
      staffNo: data.staffNo,
      password: data.password
    })
        .then((res)=>{
          //session에 id값으로 담기
          sessionStorage.setItem("Id", res.data.staffNo);

          setSession(true);

          navigate('/board');
        })
        .catch((e)=>{
          alert(e.response.data.message);
        });
  };

  const focus = ()=>{
    console.log("focus")
  }

  return(
      <div>
        <form
            onSubmit={handleSubmit(async (data) => {
                  onSubmit(data)
                  await new Promise((r) => setTimeout(r, 1000))
        })}>
          <label>아이디</label>
          <input type='text' {...register("staffNo")}/>
          <label>비밀번호</label>
          <input type='password' {...register("password")}/>
          <button type='submit' disabled={isSubmitting}>로그인하기</button>
          <button type={"button"} onClick={()=>{
            navigate("/signup");
          }}>회원가입</button>
        </form>
      </div>
  )
}