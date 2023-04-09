package com.example.VeloLiker.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.BDDMockito.given;

import com.example.VeloLiker.model.User;
import com.example.VeloLiker.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
public class UserServiceTests {
  @MockBean
  private UserRepository userRepository;
  @Autowired
  private UserService userService;
  @Autowired
  private PasswordEncoder passwordEncoder;
  private User testUser;


  @BeforeEach
  void prepare() {
    this.testUser = new User(1, "sander.ctin@gmail.com", passwordEncoder.encode("Test!123"));
    given(userRepository.findByEmailIgnoreCase("sander.ctin@gmail.com")).willReturn(testUser);
  }

  @Test
  void successfulLogin() {
    var response1 = userService.login("sander.ctin@gmail.com", "Test!123");
    assertTrue(response1.isPresent());

    var response2 = userService.getUserFromToken(response1.get());
    assertEquals(testUser.getId(), response2.getId());
    assertEquals(testUser.getEmail(), response2.getEmail());
    assertEquals(testUser.getUsername(), response2.getUsername());
  }

  @Test
  void wrongPassword() {
    var response = userService.login("sander.ctin@gmail.com", "WrongPassword");
    assertTrue(response.isEmpty());
  }

  @Test
  void nonExistingEmail() {
    var response = userService.login("someUser", "WrongPassword");
    assertTrue(response.isEmpty());
  }
}
