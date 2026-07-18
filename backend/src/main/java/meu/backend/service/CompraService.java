package meu.backend.service;

import java.time.LocalDate;
import java.util.UUID;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import meu.backend.model.Compra;
import meu.backend.model.Livro;
import meu.backend.model.User;
import meu.backend.repository.CompraRepository;

@Service
public class CompraService {
    
    private final CompraRepository compraRepository;

    // Para detectar automaticamente que este é o construtor a ser usado
    CompraService(CompraRepository compraRepository) {
        this.compraRepository = compraRepository;
    }

    @Transactional
    public Compra processarCompra(User user, Livro livro) {
        //Validar se o usuário já possui este livro
        if (compraRepository.existsByUsuarioAndLivro(user, livro)) {
            throw new RuntimeException("Você já possui uma licença deste livro!");
        }

        // Verificar disponibilidade
        if (livro.getDisponiveis() <= 0) {
            throw new RuntimeException("Livro sem estoque disponível!");
        }

        // Aqui entraria a integração com um gateway real
        // Por enquanto, é apenas se o livro pode ser comprado
        
        // Criar registro da compra
        Compra compra = new Compra();
        compra.setUsuario(user);
        compra.setLivro(livro);
        compra.setDataCompra(LocalDate.now());
        compra.setValor(livro.getPrecoVenda());
        
        // Simular emissão de comprovante
        String comprovante = "COMPRA-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        compra.setComprovanteRetirada(comprovante);

        // Decrementar o estoque após a compra
        livro.setDisponiveis(livro.getDisponiveis() - 1);

        return compraRepository.save(compra);
    }
}
