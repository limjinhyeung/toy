import React, {useEffect, useState} from 'react';
import {Paper} from "@material-ui/core";
import axios from 'axios'
import {Link, useNavigate} from "react-router-dom";
import BoardPagination from "./BoardPagination";

export default function BoardList() {
  const paperStyle = {padding: '50px 20px', width: 600, margin: '20px auto'}
  const [boards, setBoards] = useState([]);

  //페이징 처리
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  //페이지 이동
  const navigate = useNavigate();

  //검색 기능 구현
  const [searchValue, setSearchValue] = useState('');

  const getSearchVal = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  //arrow function이라고 {}쓰지말아야한다.....개고생ㅎㅎㅎㅎ
  const filterBoards = boards.filter((item) =>
      item.content.toLowerCase().includes(searchValue)
  );

  //서버통신 소스
  useEffect(() => {
    axios.get("http://localhost:8080/board/")
        .then((res) => {
          setBoards(res.data)
        })
  }, []);

  return (
      <div>
        <Paper elevation={3} style={paperStyle}>
          <h2>Board List</h2>
          <label>검색어</label>
          <input type="text" onChange={getSearchVal}/><br/>
          <button type="button" onClick={() => {
            navigate("/board/new")
          }}>글쓰기
          </button>
          <table border="1px" width="600px">
            <thead>
            <tr>
              <td><input type="checkbox"/></td>
              <td width="10%">번호</td>
              <td width="20%">제목</td>
              <td width="80%">내용</td>
            </tr>
            </thead>
            <tbody>
            {filterBoards.slice(offset, offset + limit).map(board => (
                <tr>
                  <td><input type="checkbox"/></td>
                  <td>{board.no}</td>
                  <td>{board.title}</td>
                  <td><Link to={`/board/${board.no}`}>{board.content}</Link></td>
                </tr>
            ))}
            </tbody>
          </table>
          {/*footer paging 처리*/}
          <footer>
            <label>
              페이지 당 표시할 게시물 수:&nbsp;
              <select
                  type="number"
                  value={limit}
                  onChange={({target: {value}}) => setLimit(Number(value))}
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
          </footer>
        </Paper>
      </div>
  )
}