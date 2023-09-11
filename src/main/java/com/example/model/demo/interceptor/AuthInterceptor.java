package com.example.model.demo.interceptor;

import com.example.model.demo.customException.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

//interceptor 로직 작성하는 파일
@Component
public class AuthInterceptor implements HandlerInterceptor {

  /*
   * controller 로직 수행 이전에 실행할 로직
   */
  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
          throws Exception {
      HttpSession session = request.getSession();
      String getSession = (String)session.getAttribute("Id");
      System.out.println(getSession);

      System.out.println(request.getRequestedSessionId());

      request.isRequestedSessionIdFromURL();

    return true;
  }

  /*
   * controller 로직 수행 이후에 실행할 로직
   */
  @Override
  public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                         ModelAndView modelAndView) throws Exception {
  }

  /*
   * 모든 동작 실행 이후에 실행될 로직
   */
  @Override
  public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
          throws Exception {
  }
}
