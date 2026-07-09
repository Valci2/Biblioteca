package meu.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
    
    @Autowired
    private AluguelService aluguelService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private LivroRepository livroRepository;

    @PostMapping
    public Aluguel criarAluguel(@RequestParam Long userId, @RequestParam Long livroId) {
        User user = userRepository.findById(userId).orElseThrow();
        Livro livro = livroRepository.findById(livroId).orElseThrow();
        return aluguelService.realizarAluguel(user, livro);
    }
}
