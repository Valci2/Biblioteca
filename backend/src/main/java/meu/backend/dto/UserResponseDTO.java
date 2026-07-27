package meu.backend.dto;

public record UserResponseDTO(
        Long id,
        String nome,
        String email,
        int livrosComprados,
        int livrosLendoAtualmente) {
}
