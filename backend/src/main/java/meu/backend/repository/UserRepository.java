package meu.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import meu.backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
