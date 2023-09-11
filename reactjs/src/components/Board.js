import React, {useEffect, useRef, useState} from 'react';
import {Container, Paper} from "@material-ui/core";
import axios from "axios";
import BoardPagination from "./BoardPagination";

export default function Board() {
  const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}

  const [boards, setBoards] = useState([]);
  //검색 기능 구현
  const [searchValue, setSearchValue] = useState('');

  const getSearchVal = (e)=>{
    setSearchValue(e.target.value.toLowerCase());
  };

  //arrow function이라고 {}쓰지말아야한다.....개고생ㅎㅎㅎㅎ
  const filterBoards = boards.filter((item)=>
      item.content.toLowerCase().includes(searchValue));

  //페이징 처리
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  //서버통신 소스
  useEffect(() => {
    axios.get("http://localhost:8080/board/")
        .then((res )=>{
          setBoards(res.data);
        })
  }, []);

  return (
      <Container>
        <h1>Board</h1>
        <label>검색어</label>
        <input onChange={getSearchVal}/><br/>
        <footer>
          <label>
            페이지 당 표시할 게시물 수:&nbsp;
            <select
                type="number"
                value={limit}
                onChange={({ target: { value } }) => setLimit(Number(value))}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </label><br/>
          <BoardPagination
              total={boards.length}
              limit={limit}
              page={page}
              setPage={setPage}
          />
        </footer>      </Container>
  );
}

