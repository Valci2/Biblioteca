package meu.backend.controller;

import meu.backend.dto.UserResponseDTO;
import meu.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    // Para detectar automaticamente que este é o construtor a ser usado
    UserController(UserService userService) {
        this.userService = userService;
    }

    // Retornar perfil específico
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> obterPerfil(@PathVariable Long id) {
        UserResponseDTO perfil = userService.obterPerfilPorId(id);
        return ResponseEntity.ok(perfil);
    }

    // Retornar o usuário logado atual
    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> obterPerfilLogado(Principal principal) {
        String email = principal.getName();
        UserResponseDTO perfil = userService.obterPerfilPorEmail(email);
        return ResponseEntity.ok(perfil);
    }
}
