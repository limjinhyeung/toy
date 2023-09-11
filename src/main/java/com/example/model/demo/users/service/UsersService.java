package com.example.model.demo.users.service;

import com.example.model.demo.users.model.Users;

public interface UsersService {
  public Users getLogin(Users user);

  public Users saveUser(Users user) throws Exception;

  public Boolean getId(String id);
}
