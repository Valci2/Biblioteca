package meu.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import meu.backend.model.ListaDesejo;
import meu.backend.model.User;

public interface ListaDesejoRepository extends JpaRepository<ListaDesejo, Long> {
    Optional<ListaDesejo> findByUsuario(User usuario);
}
