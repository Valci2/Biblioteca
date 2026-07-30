package meu.backend.dto;

import java.util.List;

public record UserResponseDTO(
        Long id,
        String nome,
        String email,
        int livrosComprados,
        int livrosLendoAtualmente,
        List<CompraResponseDTO> compras,
        List<AluguelResponseDTO> alugueisAtivos
) {}
