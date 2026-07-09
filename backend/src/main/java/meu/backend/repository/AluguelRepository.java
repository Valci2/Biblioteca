package meu.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import meu.backend.model.Aluguel;
import meu.backend.model.Livro;
import meu.backend.model.User;

@Repository
public interface AluguelRepository extends JpaRepository<Aluguel, Long> {
    List<Aluguel> findByUsuarioAndStatus(User usuario, String status);

    long countByLivroAndStatus(Livro livro, String string);
}
