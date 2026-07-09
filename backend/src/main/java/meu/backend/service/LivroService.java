package meu.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import meu.backend.model.Livro;
import meu.backend.repository.AluguelRepository;
import meu.backend.repository.LivroRepository;

@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;
    @Autowired
    private AluguelRepository aluguelRepository;

    @Transactional
    public void adicionarEstoque(Long livroId, Integer quantidadeParaAdicionar) {
        Livro livro = livroRepository.findById(livroId)
                .orElseThrow(() -> new RuntimeException("Livro não encontrado"));

        livro.setTotalLicencas(livro.getTotalLicencas() + quantidadeParaAdicionar);
        livro.setDisponiveis(livro.getDisponiveis() + quantidadeParaAdicionar);
        
        livroRepository.save(livro);
    }

    @Transactional
    public void reduzirEstoque(Long livroId, Integer quantidadeParaRemover) {
        Livro livro = livroRepository.findById(livroId)
                .orElseThrow(() -> new RuntimeException("Livro não encontrado"));

        Integer novaQuantidade = livro.getDisponiveis() - quantidadeParaRemover;
        long alugados = aluguelRepository.countByLivroAndStatus(livro, "ATIVO");

        if (novaQuantidade < 0) {
            throw new RuntimeException("Erro: Tentativa de reduzir estoque abaixo do limite de cópias disponíveis.");
        }

        if (novaQuantidade < alugados) {
            throw new RuntimeException("Erro: Não é possível reduzir para " + novaQuantidade 
                + " licenças. Existem " + alugados + " cópias alugadas atualmente.");
        }

        livro.setTotalLicencas(livro.getTotalLicencas() - quantidadeParaRemover);
        livro.setDisponiveis(novaQuantidade);

        livroRepository.save(livro);
    }
}
