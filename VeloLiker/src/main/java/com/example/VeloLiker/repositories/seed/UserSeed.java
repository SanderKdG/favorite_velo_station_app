package com.example.VeloLiker.repositories.seed;

import com.example.VeloLiker.model.User;
import com.example.VeloLiker.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
@Slf4j
public class UserSeed {
    private final UserRepository userRepository;

    public UserSeed(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        seed(passwordEncoder);
    }

    public void seed(PasswordEncoder passwordEncoder) {
        if(userRepository.count() != 0) return;
        log.info("Seeding Users");
        var users = new ArrayList<User>();
        users.add(new User("sander.ctin@gmail.com", passwordEncoder.encode("Test!123")));
        users.add(new User("sander@rombit.com", passwordEncoder.encode("EasyPassword444")));
        users.add(new User("sander@rombitstudio.com", passwordEncoder.encode("SomeOtherPassword")));
        userRepository.saveAll(users);
    }
}
