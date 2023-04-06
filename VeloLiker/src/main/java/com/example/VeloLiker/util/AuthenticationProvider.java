package com.example.VeloLiker.util;

import com.example.VeloLiker.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class AuthenticationProvider implements org.springframework.security.authentication.AuthenticationProvider {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public AuthenticationProvider(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    var user = userRepository.findByEmailIgnoreCase(authentication.getName());
    if(user == null) {
      log.error("No user found for email: "+authentication.getName());
      return authentication;
    }
    if(!passwordEncoder.matches(authentication.getCredentials().toString(), user.getPassword())) {
      log.error("Password invalid for login attempt with email: "+authentication.getName());
      return authentication;
    }
    //authentication.setAuthenticated(true);
    return new UsernamePasswordAuthenticationToken(user, authentication.getName());
  }

  @Override
  public boolean supports(Class<?> authentication) {
    return authentication.equals(UsernamePasswordAuthenticationToken.class);
  }
}
