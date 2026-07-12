package meu.backend.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import meu.backend.model.User;
import meu.backend.repository.UserRepository;
import meu.backend.service.ListaDesejoService;

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
    public void adicionarLivro(@PathVariable Long bookId, @RequestParam Long userId) {
        User usuario = userRepository.findById(userId).orElseThrow();
        service.adicionarLivro(usuario, bookId);
    }

    @DeleteMapping("/{bookId}")
    public void removerLivro(@PathVariable Long bookId, @RequestParam Long userId) {
        User usuario = userRepository.findById(userId).orElseThrow();
        service.removerLivro(usuario, bookId);
    }
}
