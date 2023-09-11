package com.example.model.demo.boards.contorller;

import com.example.model.demo.boards.model.Board;
import com.example.model.demo.boards.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/board")
@CrossOrigin
public class BoardController {

  @Autowired
  private BoardService boardService;

  @PostMapping("/")
  public String add(@RequestBody Board board){
    boardService.saveBoard(board);
    return "Insert success";
  }

  @GetMapping("/")
  public List<Board> getAllBoards(){
    return boardService.getAllBoards();
  }

  @GetMapping("/{no}")
  public Board getBoard(@PathVariable String no){
    Board boardData = boardService.getBoard(no);
    return boardData;
  }

  @DeleteMapping ("/{no}")
  public String boardDelete(@PathVariable String no){
    boardService.deleteBoard(no);
    return "Delete success";
  }

  @PostMapping("/{no}")
  public String boardUpdate(@PathVariable String no, @RequestBody Board board){
    Board boardData = boardService.getBoard(no);
    boardData.setTitle(board.getTitle());
    boardData.setContent(board.getContent());

    boardService.saveBoard(boardData);

    return "Update success";
  }
}
