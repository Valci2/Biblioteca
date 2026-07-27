package meu.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import meu.backend.model.Livro;
import meu.backend.repository.LivroRepository;
import meu.backend.service.LivroService;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class LivroController {

    private final LivroRepository livroRepository;
    private final LivroService livroService;

    // Para detectar automaticamente que este é o construtor a ser usado
    LivroController(LivroRepository livroRepository, LivroService livroService) {
        this.livroRepository = livroRepository;
        this.livroService = livroService;
    }

    // ROTAS PÚBLICAS

    // Retornar todos os livros
    @GetMapping
    public ResponseEntity<List<Livro>> listarTodos() {
        List<Livro> livros = livroRepository.findAll();
        return ResponseEntity.ok(livros);
    }

    // Retornar livro por id
    @GetMapping("/{id}")
    public ResponseEntity<Livro> retornarLivro(@PathVariable Long id) {
        return livroRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ROTAS PROTEGIDAS

    // Registrar livro
    @PostMapping
    public ResponseEntity<Livro> registrarLivro(@RequestBody Livro livro) {
        Livro salvo = livroRepository.save(livro);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
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
