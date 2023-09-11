package com.example.model.demo.users.controller;

import com.example.model.demo.users.model.Users;
import com.example.model.demo.users.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UsersController {

  @Autowired
  private UsersService usersService;

  @PostMapping("/login")
  public Users login(@RequestBody final Users users){
    return usersService.getLogin(users);
  }

  @PostMapping("/signup")
  public String signUp(@RequestBody Users user) throws Exception{
    usersService.saveUser(user);
    return "Sign Up Success";
  }

  @GetMapping("/getId/{id}")
  public Boolean getId(@PathVariable String id){
    Boolean checkId = usersService.getId(id);
    return checkId;
  }
}
