import React, {useEffect, useState} from 'react';
import {Paper} from "@material-ui/core";
import {Link, useNavigate, useParams} from "react-router-dom";
import './board.css'
import axios from "axios";
import BoardUpdate from "./BoardUpdate";

export default function BoardDetail() {
  const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}

  const [comp, setComp] = useState(<BoardDetail/>);

  //페이지호출시 초기값이 null인경우 useState()의 초기값을 같은 타입으로 지정해주면 된다.
  const [board, setBoard] = useState({});

  //parameter value
  const detailNo = useParams().no;

  //navigation
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/board/${detailNo}`)
        .then((res )=>{
          setBoard(res.data)
        })
  }, []);

  const deleteBoard = (data) => {
    axios.delete(`http://localhost:8080/board/${detailNo}`,{
      no:data.no
    })
      .then(()=> {
        navigate("/board");
      });
  };

  const updateBoard = ()=>{
    navigate(`/board/edit/${detailNo}`,{state: board})
  }

  return (<div children={comp}>
    <Paper elevation={3} style={paperStyle}>
      <h2>Board Detail</h2>
      <table className="detail-table">
        <tbody>
        <tr>
          <th width="20%">번호</th>
          <td width="80%">{board.no}</td>
        </tr>
        <tr>
          <th width="20%">제목</th>
          <td width="80%">{board.title}</td>
        </tr>
        <tr>
          <th width="20%">내용</th>
          <td width="80%">{board.content}</td>
        </tr>
        </tbody>
      </table>
      <button className="right-button" onClick={deleteBoard}>삭제</button>
      <button className="right-button" onClick={updateBoard}>수정</button>
    </Paper>
  </div>)
}