package meu.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import meu.backend.model.ListaDesejo;
import meu.backend.model.User;

@Repository
public interface ListaDesejoRepository extends JpaRepository<ListaDesejo, Long> {
    Optional<ListaDesejo> findByUsuario(User usuario);
}
