package meu.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import meu.backend.model.Livro;
import meu.backend.repository.LivroRepository;
import meu.backend.service.LivroService;

@RestController
@RequestMapping("/api/admin/books")
public class AdminLivroController {

    @Autowired
    private LivroRepository livroRepository;
    @Autowired
    private LivroService livroService;

    // Registrar livro
    @PostMapping
    public Livro registrarLivro(@RequestBody Livro livro) {
        return livroRepository.save(livro);
    }

    // Aumentar estoque
    @PostMapping("/{id}/stock/add")
    public ResponseEntity<?> adicionar(@PathVariable Long id, @RequestParam Integer qtd) {
        livroService.adicionarEstoque(id, qtd);
        return ResponseEntity.ok("Estoque aumentado.");
    }

    // Reduzir estoque
    @PostMapping("/{id}/stock/remove")
    public ResponseEntity<?> reduzir(@PathVariable Long id, @RequestParam Integer qtd) {
        try {
            livroService.reduzirEstoque(id, qtd);
            return ResponseEntity.ok("Estoque reduzido.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
