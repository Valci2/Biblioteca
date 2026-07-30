package meu.backend.dto;

import java.time.LocalDate;

public record CompraResponseDTO(
        Long id,
        String tituloLivro,
        LocalDate dataCompra,
        Double valor
) {}
