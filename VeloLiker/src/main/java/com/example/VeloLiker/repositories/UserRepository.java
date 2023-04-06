package com.example.VeloLiker.repositories;

import com.example.VeloLiker.model.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
  User findByEmail(String email)
      throws UsernameNotFoundException;
}
