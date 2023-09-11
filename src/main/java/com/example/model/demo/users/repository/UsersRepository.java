package com.example.model.demo.users.repository;

import com.example.model.demo.users.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<Users, String> {

  Users findByStaffNoAndPassword(final String staffNo, final String password);

  Users findByStaffNo(final String staffNo);
}
