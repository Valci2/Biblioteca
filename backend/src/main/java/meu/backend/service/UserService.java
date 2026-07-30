package meu.backend.service;

import meu.backend.dto.AluguelResponseDTO;
import meu.backend.dto.CompraResponseDTO;
import meu.backend.dto.UserResponseDTO;
import meu.backend.model.User;
import meu.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public UserResponseDTO obterPerfilPorEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        List<CompraResponseDTO> comprasDto = user.getCompras().stream()
                .map(c -> new CompraResponseDTO(
                        c.getId(),
                        c.getLivro().getTitulo(),
                        c.getDataCompra(),
                        c.getValor()
                ))
                .toList();

        List<AluguelResponseDTO> alugueisDto = user.getAlugueis().stream()
                .filter(a -> "ATIVO".equalsIgnoreCase(a.getStatus()))
                .map(a -> new AluguelResponseDTO(
                        a.getId(),
                        a.getLivro().getTitulo(),
                        a.getDataEmprestimo(),
                        a.getDataDevolucao(),
                        a.getStatus()
                ))
                .toList();

        return new UserResponseDTO(
                user.getId(),
                user.getNome(),
                user.getEmail(),
                user.getTotalLivrosComprados(),
                user.getLivrosLendoAtualmente(),
                comprasDto,
                alugueisDto
        );
    }

    @Transactional(readOnly = true)
    public UserResponseDTO obterPerfilPorId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        List<CompraResponseDTO> comprasDto = user.getCompras().stream()
                .map(c -> new CompraResponseDTO(
                        c.getId(),
                        c.getLivro().getTitulo(),
                        c.getDataCompra(),
                        c.getValor()
                ))
                .toList();

        List<AluguelResponseDTO> alugueisDto = user.getAlugueis().stream()
                .filter(a -> "ATIVO".equalsIgnoreCase(a.getStatus()))
                .map(a -> new AluguelResponseDTO(
                        a.getId(),
                        a.getLivro().getTitulo(),
                        a.getDataEmprestimo(),
                        a.getDataDevolucao(),
                        a.getStatus()
                ))
                .toList();

        return new UserResponseDTO(
                user.getId(),
                user.getNome(),
                user.getEmail(),
                user.getTotalLivrosComprados(),
                user.getLivrosLendoAtualmente(),
                comprasDto,
                alugueisDto
        );
    }
}
