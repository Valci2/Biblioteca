package meu.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import meu.backend.model.Compra;
import meu.backend.model.Livro;
import meu.backend.model.User;
import meu.backend.repository.LivroRepository;
import meu.backend.repository.UserRepository;
import meu.backend.service.CompraService;

import java.security.Principal;

@RestController
@RequestMapping("/api/purchases")
public class CompraController {

    private final CompraService compraService;
    private final UserRepository userRepository;
    private final LivroRepository livroRepository;

    // Para detectar automaticamente que este é o construtor a ser usado
    CompraController(CompraService compraService, UserRepository userRepository, LivroRepository livroRepository) {
        this.compraService = compraService;
        this.userRepository = userRepository;
        this.livroRepository = livroRepository;
    }

    @PostMapping("/{bookId}")
    public ResponseEntity<?> realizarCompra(Principal principal, @PathVariable Long bookId) {
        try {
            User user = userRepository.findByEmail(principal.getName())
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado."));
            Livro livro = livroRepository.findById(bookId)
                    .orElseThrow(() -> new RuntimeException("Livro não encontrado."));
            Compra compra = compraService.processarCompra(user, livro);
            return ResponseEntity.ok(compra);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
