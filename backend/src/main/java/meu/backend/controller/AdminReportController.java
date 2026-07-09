package meu.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import meu.backend.model.Aluguel;
import meu.backend.repository.AluguelRepository;

@RestController
@RequestMapping("/api/admin/reports")
public class AdminReportController {

    @Autowired
    private AluguelRepository aluguelRepository;

    // Retornar o histórico completo
    @GetMapping("/rentals")
    public List<Aluguel> gerarRelatorioRentals() {
        // Usar um DTO aqui no futuro pra não expor todos os dados dos usuários
        return aluguelRepository.findAll();
    }
}
