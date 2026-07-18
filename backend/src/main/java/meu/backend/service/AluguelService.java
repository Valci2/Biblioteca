package meu.backend.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import meu.backend.model.Aluguel;
import meu.backend.model.Livro;
import meu.backend.model.User;
import meu.backend.repository.AluguelRepository;
import meu.backend.repository.LivroRepository;

@Service
public class AluguelService {

    private final AluguelRepository aluguelRepository;
    private final LivroRepository livroRepository;

    // Para detectar automaticamente que este é o construtor a ser usado
    AluguelService(AluguelRepository aluguelRepository, LivroRepository livroRepository) {
        this.aluguelRepository = aluguelRepository;
        this.livroRepository = livroRepository;
    }

    @Transactional
    public Aluguel realizarAluguel(User user, Livro livro) {
        // Verificar se já possui o livro alugado
        if (aluguelRepository.existsByUsuarioAndLivroAndStatus(user, livro, "ATIVO")) {
            throw new RuntimeException("Você já possui um aluguel ativo deste livro!");
        }

        // Verificar disponibilidade
        if (livro.getDisponiveis() <= 0) {
            throw new RuntimeException("Livro sem estoque disponível!");
        }

        // Limite de 5 livros alugados
        List<Aluguel> alugueisAtuais = aluguelRepository.findByUsuarioAndStatus(user, "ATIVO");
        if (alugueisAtuais.size() >= 5) {
            throw new RuntimeException("Limite de 5 livros alugados atingido!");
        }

        // Processar aluguel
        Aluguel aluguel = new Aluguel();
        aluguel.setUsuario(user);
        aluguel.setLivro(livro);
        aluguel.setDataEmprestimo(LocalDate.now());
        aluguel.setDataDevolucao(LocalDate.now().plusDays(14));
        aluguel.setStatus("ATIVO");

        // Atualizar estoque
        livro.setDisponiveis(livro.getDisponiveis() - 1);
        livroRepository.save(livro);

        return aluguelRepository.save(aluguel);
    }

    public void finalizarAluguel(Long aluguelId) {
        Aluguel aluguel = aluguelRepository.findById(aluguelId)
            .orElseThrow(() -> new RuntimeException("Aluguel não encontrado"));

        if ("DEVOLVIDO".equals(aluguel.getStatus())) {
            throw new RuntimeException("Este aluguel já foi finalizado.");
        }

        // Atualizar status
        aluguel.setStatus("DEVOLVIDO");
        aluguel.setDataDevolucao(LocalDate.now());

        // Devolver a cópia ao estoque
        Livro livro = aluguel.getLivro();
        livro.setDisponiveis(livro.getDisponiveis() + 1);
        
        // Salvar as alterações
        livroRepository.save(livro);
        aluguelRepository.save(aluguel);
    }
}
