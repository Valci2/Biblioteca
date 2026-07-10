package meu.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import meu.backend.model.Livro;

public interface LivroRepository extends JpaRepository<Livro, Long> {

}
