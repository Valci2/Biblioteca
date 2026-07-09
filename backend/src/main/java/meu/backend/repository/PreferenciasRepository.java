package meu.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import meu.backend.model.Preferencias;

@Repository
public interface PreferenciasRepository extends JpaRepository<Preferencias, Long> {

}
