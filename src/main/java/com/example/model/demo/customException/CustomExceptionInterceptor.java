package com.example.model.demo.customException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class CustomExceptionInterceptor extends ResponseEntityExceptionHandler {

  @ExceptionHandler(CustomException.class)
  public final ResponseEntity<Object> handleCustomException(CustomException ex) {
    CustomExceptionModel exceptionResponse = new CustomExceptionModel(ex.getMessage());
    return new ResponseEntity(exceptionResponse, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
