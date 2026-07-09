package meu.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import meu.backend.model.User;
import meu.backend.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    
    // Precisa de um Bean do BCryptPasswordEncoder configurado no projeto
    @Autowired
    private PasswordEncoder passwordEncoder; 

    public void registrar(User user) {
        user.setSenha(passwordEncoder.encode(user.getSenha()));
        userRepository.save(user);
    }
}
