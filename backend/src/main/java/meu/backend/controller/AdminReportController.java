package meu.backend.controller;

import java.util.List;

import meu.backend.dto.AluguelRelatorioDTO;
import meu.backend.model.Aluguel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import meu.backend.repository.AluguelRepository;

@RestController
@RequestMapping("/api/admin/reports")
public class AdminReportController {

    private final AluguelRepository aluguelRepository;

    // Para detectar automaticamente que este é o construtor a ser usado
    AdminReportController(AluguelRepository aluguelRepository) {
        this.aluguelRepository = aluguelRepository;
    }

    // Retornar o histórico completo
    @GetMapping("/rentals")
    public List<AluguelRelatorioDTO> gerarRelatorioRentals() {
        return aluguelRepository.findAll().stream()
                .map(this::converterParaDto)
                .toList();
    }

    // Retornar o histórico de um livro específico
    @GetMapping("/rentals/{bookId}")
    public List<AluguelRelatorioDTO> retornarAlugueisPorLivro(@PathVariable Long bookId) {
        return aluguelRepository.findByLivroId(bookId).stream()
                .map(this::converterParaDto)
                .toList();
    }

    // Para evitar duplicação de código
    private AluguelRelatorioDTO converterParaDto(Aluguel aluguel) {
        return new AluguelRelatorioDTO(
                aluguel.getId(),
                aluguel.getUsuario().getNome(),
                aluguel.getUsuario().getEmail(),
                aluguel.getLivro().getTitulo(),
                aluguel.getDataEmprestimo(),
                aluguel.getDataDevolucao(),
                aluguel.getStatus()
        );
    }
}
