package meu.backend.dto;

import java.time.LocalDate;

public record AluguelResponseDTO(
        Long id,
        String tituloLivro,
        LocalDate dataEmprestimo,
        LocalDate dataDevolucao,
        String status
) {}
