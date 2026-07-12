package meu.backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import meu.backend.model.Aluguel;
import meu.backend.model.Livro;
import meu.backend.model.User;
import meu.backend.repository.LivroRepository;
import meu.backend.repository.UserRepository;
import meu.backend.service.AluguelService;

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

    @PostMapping
    public Aluguel criarAluguel(@RequestParam Long userId, @RequestParam Long livroId) {
        User user = userRepository.findById(userId).orElseThrow();
        Livro livro = livroRepository.findById(livroId).orElseThrow();
        return aluguelService.realizarAluguel(user, livro);
    }
}
