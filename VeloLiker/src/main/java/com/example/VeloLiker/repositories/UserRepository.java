package com.example.VeloLiker.repositories;

import com.example.VeloLiker.model.User;
import org.springframework.lang.Nullable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    @Nullable
    User findByEmailIgnoreCase(String email);
}
