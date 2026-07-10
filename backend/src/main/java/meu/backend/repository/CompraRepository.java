package meu.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import meu.backend.model.Compra;
import meu.backend.model.User;

public interface CompraRepository extends JpaRepository<Compra, Long> {
    List<Compra> findByUsuario(User usuario);
}
