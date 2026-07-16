package meu.backend.model;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*;
import lombok.Data;

@Entity
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
    
    @OneToOne(cascade = CascadeType.ALL)
    private Preferencias preferencias;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // O Spring precisa que do prefixo "ROLE_"
        return List.of(new SimpleGrantedAuthority("ROLE_" + this.tipo.toUpperCase()));
    }

    @Override public String getPassword() { return this.senha; }
    @Override public String getUsername() { return this.email; }
    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }
}
