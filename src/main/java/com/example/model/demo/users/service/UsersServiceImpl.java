package com.example.model.demo.users.service;

import com.example.model.demo.customException.CustomException;
import com.example.model.demo.users.model.Users;
import com.example.model.demo.users.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.regex.Pattern;

@Service
public class UsersServiceImpl implements UsersService {

  @Autowired
  private UsersRepository userRepository;
  @Override
  public Users getLogin(Users user) {

    Users getLoginInfo = userRepository.findByStaffNoAndPassword(user.getStaffNo(), user.getPassword());

    if(getLoginInfo == null){
      throw new CustomException("Id/Pw를 확인하세요");
    }
    return getLoginInfo;
  }

  @Override
  public Users saveUser(Users user) throws Exception{
    return userRepository.save(user);
  }

  @Override
  public Boolean getId(String id) {
    Boolean getIdCheck = false;

    //staffno로 조회해서 값을 받아온다.
    if(StringUtils.isEmpty(userRepository.findByStaffNo(id))){
      //값이 없으면 false
      getIdCheck = false;
    } else {
      //값이 있으면 ID가 존재한다.
      getIdCheck =true;
    }

    return getIdCheck;
  }
}
