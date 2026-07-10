package meu.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import meu.backend.model.Aluguel;
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
    public List<Aluguel> gerarRelatorioRentals() {
        // Usar um DTO aqui no futuro pra não expor todos os dados dos usuários
        return aluguelRepository.findAll();
    }
}
