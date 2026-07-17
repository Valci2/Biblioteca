package meu.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import meu.backend.model.Livro;
import meu.backend.repository.LivroRepository;
import meu.backend.service.LivroService;

@RestController
@RequestMapping("/api/admin/books")
public class AdminLivroController {

    private final LivroRepository livroRepository;
    private final LivroService livroService;

    // Para detectar automaticamente que este é o construtor a ser usado
    AdminLivroController(LivroRepository livroRepository, LivroService livroService) {
        this.livroRepository = livroRepository;
        this.livroService = livroService;
    }

    // Registrar livro
    @PostMapping
    public Livro registrarLivro(@RequestBody Livro livro) {
        return livroRepository.save(livro);
    }

    // Retornar livro por id
    @GetMapping("/{id}")
    public ResponseEntity<Livro> retornarLivro(@PathVariable Long id) {
        return livroRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
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
