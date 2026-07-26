// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// Dados mockados
const MOCK_LIVROS = [
  {
    id: 1,
    titulo: 'O Senhor dos Anéis: A Sociedade do Anel',
    autor: 'J.R.R. Tolkien',
    categoria: 'Fantasia',
    preco: 49.90,
    estoque: 15,
    capaUrl: 'https://m.media-amazon.com/images/I/91VokfC0C3L._AC_UF1000,1000_QL80_.jpg',
    descricao: 'A primeira parte da épica trilogia de fantasia que se passa na Terra Média.',
    isbn: '978-85-325-1234-5',
    editora: 'HarperCollins',
    anoPublicacao: 1954
  },
  {
    id: 2,
    titulo: '1984',
    autor: 'George Orwell',
    categoria: 'Ficção Científica',
    preco: 34.90,
    estoque: 8,
    capaUrl: 'https://m.media-amazon.com/images/I/71rpa1-kyvL._AC_UF1000,1000_QL80_.jpg',
    descricao: 'Um clássico da literatura distópica que retrata um mundo sob vigilância totalitária.',
    isbn: '978-85-325-5678-9',
    editora: 'Companhia das Letras',
    anoPublicacao: 1949
  },
  {
    id: 3,
    titulo: 'O Pequeno Príncipe',
    autor: 'Antoine de Saint-Exupéry',
    categoria: 'Infantil',
    preco: 29.90,
    estoque: 20,
    capaUrl: 'https://m.media-amazon.com/images/I/71O2XIytdqL._AC_UF1000,1000_QL80_.jpg',
    descricao: 'Uma obra-prima da literatura francesa que encanta crianças e adultos.',
    isbn: '978-85-325-9012-3',
    editora: 'Agir',
    anoPublicacao: 1943
  },
  {
    id: 4,
    titulo: 'A Arte da Guerra',
    autor: 'Sun Tzu',
    categoria: 'Filosofia',
    preco: 24.90,
    estoque: 5,
    capaUrl: 'https://m.media-amazon.com/images/I/71vnKx0NrrL._AC_UF1000,1000_QL80_.jpg',
    descricao: 'Um antigo tratado militar chinês que se tornou referência em estratégia e liderança.',
    isbn: '978-85-325-3456-7',
    editora: 'Martins Fontes',
    anoPublicacao: 500
  },
  {
    id: 5,
    titulo: 'Dom Quixote',
    autor: 'Miguel de Cervantes',
    categoria: 'Clássico',
    preco: 59.90,
    estoque: 3,
    capaUrl: 'https://m.media-amazon.com/images/I/71Qy6j6tKjL._AC_UF1000,1000_QL80_.jpg',
    descricao: 'A obra-prima da literatura espanhola que narra as aventuras de um cavaleiro louco.',
    isbn: '978-85-325-7890-1',
    editora: 'Penguin Classics',
    anoPublicacao: 1605
  },
  {
    id: 6,
    titulo: 'Cem Anos de Solidão',
    autor: 'Gabriel García Márquez',
    categoria: 'Realismo Mágico',
    preco: 54.90,
    estoque: 10,
    capaUrl: 'https://m.media-amazon.com/images/I/81vH2WOLdYL._AC_UF1000,1000_QL80_.jpg',
    descricao: 'Um dos maiores romances do século XX, conta a história da família Buendía.',
    isbn: '978-85-325-2345-6',
    editora: 'Record',
    anoPublicacao: 1967
  },
  {
    id: 7,
    titulo: 'A Revolução dos Bichos',
    autor: 'George Orwell',
    categoria: 'Fábula',
    preco: 29.90,
    estoque: 12,
    capaUrl: 'https://m.media-amazon.com/images/I/71XKk2JjvWL._AC_UF1000,1000_QL80_.jpg',
    descricao: 'Uma sátira política que utiliza animais de uma fazenda para criticar regimes totalitários.',
    isbn: '978-85-325-6789-0',
    editora: 'Companhia das Letras',
    anoPublicacao: 1945
  },
  {
    id: 8,
    titulo: 'O Hobbit',
    autor: 'J.R.R. Tolkien',
    categoria: 'Fantasia',
    preco: 39.90,
    estoque: 7,
    capaUrl: 'https://m.media-amazon.com/images/I/91b0C2YNSrL._AC_UF1000,1000_QL80_.jpg',
    descricao: 'A aventura de Bilbo Bolseiro que precede a trilogia O Senhor dos Anéis.',
    isbn: '978-85-325-4567-8',
    editora: 'HarperCollins',
    anoPublicacao: 1937
  },
  {
    id: 9,
    titulo: 'Sapiens: Uma Breve História da Humanidade',
    autor: 'Yuval Noah Harari',
    categoria: 'História',
    preco: 44.90,
    estoque: 6,
    capaUrl: 'https://m.media-amazon.com/images/I/71N1hA3t2bL._AC_UF1000,1000_QL80_.jpg',
    descricao: 'Uma narrativa envolvente sobre a história da espécie humana, desde os primórdios até os dias atuais.',
    isbn: '978-85-325-8901-2',
    editora: 'L&PM',
    anoPublicacao: 2011
  },
  {
    id: 10,
    titulo: 'O Alquimista',
    autor: 'Paulo Coelho',
    categoria: 'Ficção',
    preco: 32.90,
    estoque: 0,
    capaUrl: 'https://m.media-amazon.com/images/I/71aFt1G8f2L._AC_UF1000,1000_QL80_.jpg',
    descricao: 'A jornada de um jovem pastor em busca de seu sonho, que se torna uma metáfora para a vida.',
    isbn: '978-85-325-1234-5',
    editora: 'Paralela',
    anoPublicacao: 1988
  },
  {
    id: 11,
    titulo: 'Duna',
    autor: 'Frank Herbert',
    categoria: 'Ficção Científica',
    preco: 49.90,
    estoque: 4,
    capaUrl: 'https://m.media-amazon.com/images/I/81ym3MkNiTL._AC_UF1000,1000_QL80_.jpg',
    descricao: 'Uma épica de ficção científica que se passa em um planeta desértico.',
    isbn: '978-85-325-3456-7',
    editora: 'Aleph',
    anoPublicacao: 1965
  },
  {
    id: 12,
    titulo: 'O Nome do Vento',
    autor: 'Patrick Rothfuss',
    categoria: 'Fantasia',
    preco: 44.90,
    estoque: 9,
    capaUrl: 'https://m.media-amazon.com/images/I/81zK2rVZmLL._AC_UF1000,1000_QL80_.jpg',
    descricao: 'A história de Kvothe, um lendário herói que se tornou um simples proprietário de uma taberna.',
    isbn: '978-85-325-5678-9',
    editora: 'Arqueiro',
    anoPublicacao: 2007
  }
];

const Home = () => {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [filteredLivros, setFilteredLivros] = useState([]);

  // Simula carregamento da API com mock
  useEffect(() => {
    const loadMockData = () => {
      setLoading(true);
      // Simula delay de rede
      setTimeout(() => {
        setLivros(MOCK_LIVROS);
        setFilteredLivros(MOCK_LIVROS);
        setLoading(false);
      }, 800);
    };

    loadMockData();
  }, []);

  // Extrai categorias únicas para os filtros
  const categorias = ['Todos', ...new Set(MOCK_LIVROS.map(livro => livro.categoria))];

  // Filtrar livros por termo de busca e categoria
  useEffect(() => {
    let filtered = livros;

    // Filtro por categoria
    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter(livro => livro.categoria === selectedCategory);
    }

    // Filtro por termo de busca
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(livro =>
        livro.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        livro.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        livro.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
        livro.descricao?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredLivros(filtered);
  }, [searchTerm, selectedCategory, livros]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryFilter = (categoria) => {
    setSelectedCategory(categoria);
  };

  const handleLivroClick = (id) => {
    console.log('Livro selecionado ID:', id);
    // Navegar para página de detalhes
    // navigate(`/livro/${id}`);
  };

  // Função para obter iniciais do título para fallback da capa
  const getInitials = (titulo) => {
    if (!titulo) return '📚';
    return titulo.charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading-container">
          <div className="loader-spinner"></div>
          <p>Carregando livros...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Header com busca */}
      <header className="home-header">
        <div className="header-content">
          <h1>Biblioteca Digital</h1>
          <p className="header-subtitle">Descubra novos mundos através da leitura</p>
        </div>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar livros por título, autor ou categoria..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <button className="search-btn">
            <span role="img" aria-label="buscar">🔍</span>
          </button>
        </div>
        
        <div className="header-stats">
          <span>{filteredLivros.length} livros encontrados</span>
          {searchTerm && (
            <button 
              className="clear-search"
              onClick={() => setSearchTerm('')}
            >
              Limpar busca ✕
            </button>
          )}
        </div>
      </header>

      {/* Filtros rápidos */}
      <div className="filters-container">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            className={`filter-btn ${selectedCategory === categoria ? 'active' : ''}`}
            onClick={() => handleCategoryFilter(categoria)}
          >
            {categoria}
          </button>
        ))}
      </div>

      {/* Grid de Livros */}
      <div className="livros-grid">
        {filteredLivros.length > 0 ? (
          filteredLivros.map((livro) => (
            <div 
              key={livro.id} 
              className="livro-card"
              onClick={() => handleLivroClick(livro.id)}
            >
              {/* Capa do Livro */}
              <div className="livro-capa">
                {livro.capaUrl ? (
                  <img 
                    src={livro.capaUrl} 
                    alt={`Capa do livro ${livro.titulo}`}
                    className="livro-imagem"
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="livro-sem-capa">
                          <span>${getInitials(livro.titulo)}</span>
                          <p>Sem capa</p>
                        </div>
                      `;
                    }}
                  />
                ) : (
                  <div className="livro-sem-capa">
                    <span>{getInitials(livro.titulo)}</span>
                    <p>Sem capa</p>
                  </div>
                )}
                
                {livro.estoque === 0 && (
                  <div className="livro-indisponivel-badge">Indisponível</div>
                )}
              </div>

              {/* Informações do Livro */}
              <div className="livro-info">
                <h3 className="livro-titulo">{livro.titulo}</h3>
                <p className="livro-autor">por {livro.autor}</p>
                
                <div className="livro-meta">
                  <span className="livro-categoria">
                    📂 {livro.categoria}
                  </span>
                  <span className="livro-status">
                    {livro.estoque > 0 ? (
                      <span className="status-disponivel">✅ Disponível</span>
                    ) : (
                      <span className="status-indisponivel">❌ Esgotado</span>
                    )}
                  </span>
                </div>

                {livro.estoque > 0 && (
                  <div className="livro-estoque">
                    <span>📦 {livro.estoque} unidades</span>
                  </div>
                )}

                <div className="livro-preco">
                  R$ {livro.preco.toFixed(2)}
                </div>

                <Link 
                  to={`/livro/${livro.id}`} 
                  className="btn-detalhes"
                  onClick={(e) => e.stopPropagation()}
                >
                  Ver detalhes →
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="sem-resultados">
            <div className="empty-state">
              <span className="empty-icon">🔍</span>
              <h3>Nenhum livro encontrado</h3>
              <p>
                {searchTerm 
                  ? `Nenhum livro corresponde à busca "${searchTerm}"`
                  : 'Não há livros disponíveis nesta categoria'}
              </p>
              {searchTerm && (
                <button 
                  className="btn-empty-action"
                  onClick={() => setSearchTerm('')}
                >
                  Limpar busca
                </button>
              )}
              {selectedCategory !== 'Todos' && (
                <button 
                  className="btn-empty-action"
                  onClick={() => setSelectedCategory('Todos')}
                >
                  Ver todas as categorias
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Paginação (opcional) */}
      {filteredLivros.length > 0 && (
        <div className="pagination">
          <button className="page-btn" disabled>Anterior</button>
          <span className="page-info">
            Página 1 de {Math.ceil(filteredLivros.length / 12)}
          </span>
          <button className="page-btn" disabled>Próxima</button>
        </div>
      )}
    </div>
  );
};

export default Home;