package meu.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import meu.backend.model.Aluguel;
import meu.backend.model.Livro;
import meu.backend.model.User;
import meu.backend.repository.LivroRepository;
import meu.backend.repository.UserRepository;
import meu.backend.service.AluguelService;

import java.security.Principal;

@RestController
@RequestMapping("/api/rentals")
public class AluguelController {
    
    private final AluguelService aluguelService;
    private final UserRepository userRepository;
    private final LivroRepository livroRepository;

    // Para detectar automaticamente que este é o construtor a ser usado
    AluguelController(AluguelService aluguelService, UserRepository userRepository, LivroRepository livroRepository) {
        this.aluguelService = aluguelService;
        this.userRepository = userRepository;
        this.livroRepository = livroRepository;
    }

    @PostMapping("/{bookId}")
    public ResponseEntity<?> criarAluguel(Principal principal, @PathVariable Long bookId) {
        try {
            User user = userRepository.findByEmail(principal.getName())
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));
            Livro livro = livroRepository.findById(bookId)
                    .orElseThrow(() -> new RuntimeException("Livro não encontrado."));
            Aluguel aluguel = aluguelService.realizarAluguel(user, livro);
            return ResponseEntity.ok(aluguel);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
