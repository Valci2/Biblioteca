package meu.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private CompraService compraService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private LivroRepository livroRepository;

    @PostMapping
    public Compra realizarCompra(@RequestParam Long userId, @RequestParam Long livroId) {
        User user = userRepository.findById(userId).orElseThrow();
        Livro livro = livroRepository.findById(livroId).orElseThrow();
        return compraService.processarCompra(user, livro);
    }
}
