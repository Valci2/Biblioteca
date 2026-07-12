package meu.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import meu.backend.model.Compra;
import meu.backend.model.Livro;
import meu.backend.model.User;
import meu.backend.repository.LivroRepository;
import meu.backend.repository.UserRepository;
import meu.backend.service.CompraService;

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

    @PostMapping
    public Compra realizarCompra(@RequestParam Long userId, @RequestParam Long livroId) {
        User user = userRepository.findById(userId).orElseThrow();
        Livro livro = livroRepository.findById(livroId).orElseThrow();
        return compraService.processarCompra(user, livro);
    }
}
