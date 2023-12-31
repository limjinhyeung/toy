import React from 'react';
import styled from 'styled-components'

export default function BoardPagination({total, limit, page, setPage}) {
  //total / limit  = 총게시물(10) / 보여질 갯수(5) = 2가 나오므로 보여지는 페이지수는 2가 되기때문
  const numPages = Math.ceil(total / limit);

  return (
      <div>
        <Nav>
          <Button onClick={() => setPage(1)} disabled={page === 1}>
            &lt;&lt;
          </Button>
          <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
            &lt;
          </Button>
          {Array(numPages)
              .fill()
              .map((_, i) => (
                  <Button
                      key={i + 1}
                      onClick={() => setPage(i + 1)}
                      aria-current={page === i + 1 ? "page" : null}
                  >
                    {i + 1}
                  </Button>
              ))}
          <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
            &gt;
          </Button><Button onClick={() => setPage(numPages)} disabled={page === numPages}>
          &gt;&gt;
          </Button>
        </Nav>
      </div>
  )
};

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: deeppink;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;