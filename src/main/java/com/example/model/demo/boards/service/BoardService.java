package com.example.model.demo.boards.service;

import com.example.model.demo.boards.model.Board;

import java.util.List;

public interface BoardService {
  public Board saveBoard(Board board);

  public List<Board> getAllBoards();

  public Board getBoard(String no);

  public void deleteBoard(String no);


}
