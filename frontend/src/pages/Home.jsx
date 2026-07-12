import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Dados mockados para exemplo
  const featuredBooks = [
    { id: 1, title: 'O Senhor dos Anéis', author: 'J.R.R. Tolkien', price: 89.90, category: 'Fantasia', image: '📚' },
    { id: 2, title: '1984', author: 'George Orwell', price: 45.90, category: 'Ficção Científica', image: '📖' },
    { id: 3, title: 'Dom Quixote', author: 'Miguel de Cervantes', price: 59.90, category: 'Clássico', image: '📕' },
    { id: 4, title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry', price: 29.90, category: 'Infantil', image: '🌟' },
  ];

  const categories = [
    { name: 'Todos', icon: '📚', count: 150 },
    { name: 'Ficção', icon: '📖', count: 45 },
    { name: 'Não-Ficção', icon: '📕', count: 30 },
    { name: 'Infantil', icon: '🧒', count: 25 },
    { name: 'Técnico', icon: '💻', count: 20 },
    { name: 'Autoajuda', icon: '🧠', count: 15 },
    { name: 'HQs & Mangás', icon: '🎨', count: 10 },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Buscando:', searchTerm);
    // Implementar lógica de busca
  };

  return (
    <div className="home-container">
      {/* Banner Principal */}
      <section className="hero-banner">
        <div className="hero-content">
          <h1>📚 Bem-vindo à Livraria Online</h1>
          <p>Compre, venda e doe livros com a gente!</p>
          <div className="hero-stats">
            <span>📖 +1500 Livros</span>
            <span>👥 +500 Leitores</span>
            <span>❤️ +200 Doações</span>
          </div>
        </div>
      </section>

      {/* Busca */}
      <section className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="🔍 Busque por título, autor ou categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Buscar
          </button>
        </form>
      </section>

      {/* Categorias */}
      <section className="categories-section">
        <h2>Categorias</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <Link to={`/categoria/${category.name}`} key={index} className="category-card">
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
              <span className="category-count">{category.count} livros</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Livros em Destaque */}
      <section className="featured-section">
        <div className="section-header">
          <h2>📖 Livros em Destaque</h2>
          <Link to="/livros" className="view-all">Ver todos →</Link>
        </div>
        <div className="books-grid">
          {featuredBooks.map((book) => (
            <div key={book.id} className="book-card">
              <div className="book-image">{book.image}</div>
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">{book.author}</p>
              <span className="book-category">{book.category}</span>
              <div className="book-footer">
                <span className="book-price">R$ {book.price.toFixed(2)}</span>
                <button className="btn-buy">Comprar</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ações Rápidas */}
      <section className="actions-section">
        <h2>O que você quer fazer hoje?</h2>
        <div className="actions-grid">
          <Link to="/comprar" className="action-card buy">
            <span className="action-icon">🛒</span>
            <h3>Comprar</h3>
            <p>Encontre o livro perfeito</p>
          </Link>
          <Link to="/vender" className="action-card sell">
            <span className="action-icon">💰</span>
            <h3>Vender</h3>
            <p>Anuncie seu livro</p>
          </Link>
          <Link to="/doar" className="action-card donate">
            <span className="action-icon">❤️</span>
            <h3>Doar</h3>
            <p>Ajude mais pessoas a lerem</p>
          </Link>
          <Link to="/trocar" className="action-card exchange">
            <span className="action-icon">🔄</span>
            <h3>Trocar</h3>
            <p>Troque livros com outros leitores</p>
          </Link>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="testimonials-section">
        <h2>💬 O que nossos leitores dizem</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"Encontrei livros raros aqui! O sistema de doação é incrível."</p>
            <span className="testimonial-author">- Ana Silva</span>
          </div>
          <div className="testimonial-card">
            <p>"Vendi meus livros antigos de forma fácil e rápida."</p>
            <span className="testimonial-author">- Carlos Santos</span>
          </div>
          <div className="testimonial-card">
            <p>"A melhor livraria online para comprar e trocar livros."</p>
            <span className="testimonial-author">- Mariana Oliveira</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;