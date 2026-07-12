package meu.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import meu.backend.model.User;
import meu.backend.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    // Para detectar automaticamente que este é o construtor a ser usado
    AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    } 

    public void registrar(User user) {
        user.setSenha(passwordEncoder.encode(user.getSenha()));
        userRepository.save(user);
    }
}
