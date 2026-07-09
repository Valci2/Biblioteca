package meu.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Preferencias {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long usuarioId;
    private String tags;
}
