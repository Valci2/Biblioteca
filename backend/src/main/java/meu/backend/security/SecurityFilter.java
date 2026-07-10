package meu.backend.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import meu.backend.repository.UserRepository;
import meu.backend.service.TokenService;

@Component
public class SecurityFilter extends OncePerRequestFilter {
    private final TokenService tokenService;
    private final UserRepository userRepository;

    public SecurityFilter(TokenService tokenService, UserRepository userRepository) {
        this.tokenService = tokenService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) 
            throws ServletException, IOException {
        
        String token = request.getHeader("Authorization");

        if (token != null && token.startsWith("Bearer ")) {
            String jwt = token.substring(7);
            String email = tokenService.getSubject(jwt);

            if (email != null) {
                var user = userRepository.findByEmail(email).orElseThrow();
                
                if (user != null) {
                    // Criar a autenticação
                    var auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities()); 
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }
        }
        
        filterChain.doFilter(request, response);
    }

}
