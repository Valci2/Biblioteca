package meu.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nome;
    @Column(unique = true)
    private String email;
    private String senha;
    private String tipo; // Ex: ADMIN, CLIENTE
    
    @OneToOne(cascade = CascadeType.ALL)
    private Preferencias preferencias;
}
