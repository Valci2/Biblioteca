package meu.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Livro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String titulo;
    @Column(columnDefinition = "TEXT")
    private String sinopse;
    private String capaURL;
    private Integer totalLicencas;
    private Integer disponiveis;
    private Double precoVenda;
    private Double avaliacaoMedia;
}
