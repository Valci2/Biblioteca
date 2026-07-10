package meu.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import meu.backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
