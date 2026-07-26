package meu.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import meu.backend.dto.LoginDTO;
import meu.backend.dto.TokenDTO;
import meu.backend.model.User;
import meu.backend.repository.UserRepository;
import meu.backend.service.AuthService;
import meu.backend.service.TokenService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;

    // Para detectar automaticamente que este é o construtor a ser usado
    AuthController(AuthService authService, UserRepository userRepository, TokenService tokenService, PasswordEncoder passwordEncoder) {
        this.authService = authService;
        this.userRepository = userRepository;
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<String> registrar(@RequestBody User user) {
        authService.registrar(user);
        return ResponseEntity.ok("Usuário cadastrado com sucesso!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDto) {
        // Buscar o usuário pelo email
        User usuario = userRepository.findByEmail(loginDto.email())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // Comparar a senha informada com a senha criptografada no banco
        if (!passwordEncoder.matches(loginDto.senha(), usuario.getSenha())) {
            return ResponseEntity.status(401).body("Senha incorreta");
        }

        // Gerar o token
        String token = tokenService.gerarToken(usuario);

        // Retornar para o front-end
        return ResponseEntity.ok(new TokenDTO(token));
    }
    
}
