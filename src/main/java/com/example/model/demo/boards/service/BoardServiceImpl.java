package com.example.model.demo.boards.service;

import com.example.model.demo.boards.model.Board;
import com.example.model.demo.boards.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardServiceImpl implements BoardService {

  @Autowired
  private BoardRepository boardRepository;

  @Override
  public Board saveBoard(Board board) {
    return boardRepository.save(board);
  }

  @Override
  public List<Board> getAllBoards() {
    return boardRepository.findAll();
  }

  @Override
  public Board getBoard(String no) { return boardRepository.findById(no).get(); }

  @Override
  public void deleteBoard(String no) { boardRepository.deleteById(no);}
}
