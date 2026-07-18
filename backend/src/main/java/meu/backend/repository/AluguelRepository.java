package meu.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import meu.backend.model.Aluguel;
import meu.backend.model.Livro;
import meu.backend.model.User;

public interface AluguelRepository extends JpaRepository<Aluguel, Long> {
    List<Aluguel> findByUsuarioAndStatus(User usuario, String status);

    long countByLivroAndStatus(Livro livro, String string);
    boolean existsByUsuarioAndLivroAndStatus(User usuario, Livro livro, String status);
}
