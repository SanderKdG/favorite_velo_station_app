package com.example.VeloLiker.services;

import com.example.VeloLiker.model.User;
import com.example.VeloLiker.util.JwtTokenUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class UserService {
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthenticationProvider authenticationProvider;

    public UserService(JwtTokenUtil jwtTokenUtil, AuthenticationProvider authenticationProvider) {
        this.jwtTokenUtil = jwtTokenUtil;
        this.authenticationProvider = authenticationProvider;
    }

    public Optional<String> login(String username, String password) {
        try {
            Authentication authenticate = authenticationProvider
                    .authenticate(
                            new UsernamePasswordAuthenticationToken(
                                    username, password
                            )
                    );
            log.info(authenticate.getName());
            var user = (User) authenticate.getPrincipal();
            return Optional.of(jwtTokenUtil.generateToken(user));
        } catch (Exception authenticationException) {
            log.error("User failed to login, error: " + authenticationException.getMessage());
            return Optional.empty();
        }
    }
}
