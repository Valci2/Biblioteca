package meu.backend.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import meu.backend.model.ListaDesejo;
import meu.backend.model.Livro;
import meu.backend.model.User;
import meu.backend.repository.ListaDesejoRepository;
import meu.backend.repository.LivroRepository;

@Service
public class ListaDesejoService {
    
    @Autowired
    private ListaDesejoRepository repository;
    @Autowired
    private LivroRepository livroRepository;

    @Transactional
    public void adicionarLivro(User usuario, Long livroId) {
        Livro livro = livroRepository.findById(livroId)
                .orElseThrow(() -> new RuntimeException("Livro não encontrado"));

        // Buscar ou criar uma lista de desejo
        ListaDesejo lista = repository.findByUsuario(usuario)
                .orElse(new ListaDesejo());
        
        if (lista.getUsuario() == null) {
            lista.setUsuario(usuario);
            lista.setLivros(new ArrayList<>());
        }

        // Evitar adicionar o mesmo livro duas vezes
        if (!lista.getLivros().contains(livro)) {
            lista.getLivros().add(livro);
            repository.save(lista);
        }
    }

    @Transactional
    public void removerLivro(User usuario, Long livroId) {
        Livro livro = livroRepository.findById(livroId)
                .orElseThrow(() -> new RuntimeException("Livro não encontrado"));

        ListaDesejo lista = repository.findByUsuario(usuario)
                .orElseThrow(() -> new RuntimeException("Lista não encontrada"));
        
        //Remover o livro da lista
        boolean removido = lista.getLivros().remove(livro);

        if (!removido) {
            throw new RuntimeException("Este livro não está na sua lista de desejos.");
        }

        //Salvar a lista atualizada
        repository.save(lista);
    }
}
