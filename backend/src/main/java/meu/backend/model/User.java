package meu.backend.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.jspecify.annotations.NonNull;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "usuarios")
@Data
public class User implements UserDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nome;
    @Column(unique = true)
    private String email;
    private String senha;
    private String tipo; // Ex: ADMIN, CLIENTE

    @OneToMany(mappedBy = "usuario")
    private List<Compra> compras = new ArrayList<>();

    @OneToMany(mappedBy = "usuario")
    private List<Aluguel> alugueis = new ArrayList<>();

    // Metodo dinâmico do número de compras
    public int getTotalLivrosComprados() {
        return this.compras.size();
    }

    // Metodo dinâmico do número de aluguéis
    public int getLivrosLendoAtualmente() {
        return (int) this.alugueis.stream()
                .filter(a -> "ATIVO".equalsIgnoreCase(a.getStatus()))
                .count();
    }

    @Override
    @NonNull
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // O Spring precisa do prefixo "ROLE_"
        return List.of(new SimpleGrantedAuthority("ROLE_" + this.tipo.toUpperCase()));
    }

    @Override
    @NonNull
    public String getPassword() { return this.senha; }

    @Override
    @NonNull
    public String getUsername() { return this.email; }

}
