package meu.backend.dto;

import java.time.LocalDate;

public record AluguelRelatorioDTO(
        Long id,
        String nomeUsuario,
        String emailUsuario,
        String tituloLivro,
        LocalDate dataEmprestimo,
        LocalDate dataDevolucao,
        String status
) {
}
