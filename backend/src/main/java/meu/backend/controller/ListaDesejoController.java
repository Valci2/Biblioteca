package meu.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import meu.backend.model.User;
import meu.backend.repository.UserRepository;
import meu.backend.service.ListaDesejoService;

import java.security.Principal;

@RestController
@RequestMapping("/api/wishlist")
public class ListaDesejoController {

    private final ListaDesejoService service;
    private final UserRepository userRepository;

    // Para detectar automaticamente que este é o construtor a ser usado
    ListaDesejoController(ListaDesejoService service, UserRepository userRepository) {
        this.service = service;
        this.userRepository = userRepository;
    }

    @PostMapping("/{bookId}")
    public ResponseEntity<?> adicionarLivro(@PathVariable Long bookId, Principal principal) {
        try {
            User user = userRepository.findByEmail(principal.getName())
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            service.adicionarLivro(user, bookId);
            return ResponseEntity.ok("Livro adicionado à lista de desejos.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{bookId}")
    public ResponseEntity<?> removerLivro(@PathVariable Long bookId, Principal principal) {
        try {
            User user = userRepository.findByEmail(principal.getName())
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            service.removerLivro(user, bookId);
            return ResponseEntity.ok("Livro removido da lista de desejos.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
