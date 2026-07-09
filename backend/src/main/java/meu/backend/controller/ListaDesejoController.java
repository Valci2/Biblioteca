package meu.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private ListaDesejoService service;
    @Autowired
    private UserRepository userRepository;

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
