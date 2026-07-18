package meu.backend.repository;

import java.util.List;

import meu.backend.model.Livro;
import org.springframework.data.jpa.repository.JpaRepository;

import meu.backend.model.Compra;
import meu.backend.model.User;

public interface CompraRepository extends JpaRepository<Compra, Long> {
    List<Compra> findByUsuario(User usuario);
    boolean existsByUsuarioAndLivro(User usuario, Livro livro);
}
