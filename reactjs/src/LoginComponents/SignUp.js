import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {set, useForm} from "react-hook-form";

export default function SignUp() {

  const { register, handleSubmit, formState: { isSubmitting }} = useForm();

  const navigator = useNavigate();

  //SignUp check
  const [isSignUp, setIsSignUp] = useState(false);
  //check용 message
  const [idMessage, setIdMessage] = useState("");
  //id check용
  const [isStaffNo, setIsStaffNo] = useState(false);

  //password 작합성 체크
  const [isPassword, setIsPassword] = useState("");
  const [pwMessage, setPwMessage] = useState("");

  //pw check
  const [pwChkMessage, setPwChkMessage] = useState("");

  //아이디 체크
  const onStaffNoChange = (e) => {
    let idCheck = e.target.value;

    //정규식 표현
    const idRegex = /^[a-zA-Z0-9]{4,10}$/;
    if(!idRegex.test(idCheck)){
      //메세지 입력
      setIdMessage("ID형식이 맞지 않습니다. 영문자 1자리와 숫자 4자리로 이루어져야합니다.");
      //회원가입 체크
      setIsSignUp(false);
    } else {
      axios
          .get(`http://localhost:8080/users/getId/${idCheck}`)
          .then((res)=>{
            if(res.data){
              setIdMessage("이미 사용중인 아이디입니다.");
              setIsSignUp(false);
            } else {
              setIdMessage("사용가능한 아이디입니다.");
              setIsSignUp(true);
            }
          })
          .catch((e)=>{
          });
    }
  };

  //비밀번호 적합성 검사
  const onPassword = (e) =>{
    let inputPw = e.target.value;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    if(inputPw === ""){
      setPwMessage("");
      setIsSignUp(false);
    } else if(!passwordRegex.test(inputPw)){
      setPwMessage("숫자 + 영문자 + 특수문자 조합으로 8~25자리로 입력해주세요!");
      setIsSignUp(false);
    } else {
      setPwMessage("안전한 비밀번호에요!");
      setIsSignUp(true);
    }
    setIsPassword(inputPw);
  }
  //비밀번호 확인
  const onPasswordCHK = (e) => {
    let pwCHK = e.target.value;

    //pwCHK가 공백일떄는 메세지 공백처리
    if(pwCHK === ""){
      setPwChkMessage("");
      setIsSignUp(false);
    } else if(isPassword === pwCHK) {
      setPwChkMessage("비밀번호가 일치합니다.");
      setIsSignUp(true);
    } else if (isPassword != pwCHK){
      setPwChkMessage("비밀번호가 일치하지 않습니다.");
      setIsSignUp(false);
    }
  }

  const onSubmit = (data) => {
    axios.post("http://localhost:8080/users/signup",{
      staffNo: data.staffNo,
      password: data.password,
      name: data.name,
      email: data.email,
      phone: data.phone
    })
        .then((res)=>{
          navigator("/Login");
        })
        .catch((e)=>{
          alert(e.response.data.message);
        });
  };

  return (
      <div>
        <h2>SignUp</h2>
        <form
            onSubmit={handleSubmit(async (data) => {
              if(isSignUp === false){
                alert("회원가입조건이 유효하지않습니다.");
              } else {
                onSubmit(data)
                await new Promise((r) => setTimeout(r, 1000))
              }
            })}>
          <label>ID</label>
          <input type={"text"} {...register("staffNo")} onChange={onStaffNoChange}/><br/>
          <span>{idMessage}</span><br/>

          <label>PW</label>
          <input type={"password"} {...register("password")} onChange={onPassword}/>
          <span>{pwMessage}</span><br/>

          <label>PW.Chk</label>
          <input type={"password"} {...register("passwordCHK")} onChange={onPasswordCHK}/>
          <span>{pwChkMessage}</span>
          <br/>
          <label>NAME</label>
          <input type={"text"} {...register("name")}/><br/>
          <label>Email</label>
          <input type={"email"} {...register("email")}/><br/>
          <label>Phone</label>
          <input type={"text"} {...register("phone")} placeholder={"010-0000-0000"}/><br/>
          <button type={"submit"} disabled={isSubmitting}>가입하기</button>
          <button type={"button"} onClick={()=>{
            navigator("/login");
          }}>돌아가기</button>
        </form>
      </div>
  )

}
