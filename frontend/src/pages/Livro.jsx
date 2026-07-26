// src/pages/LivroDetalhes.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './Livro.css';

// Mock dos livros (mesmo da Home)
const MOCK_LIVROS = [
  {
    id: 1,
    titulo: 'O Senhor dos Anéis: A Sociedade do Anel',
    autor: 'J.R.R. Tolkien',
    categoria: 'Fantasia',
    preco: 49.90,
    estoque: 15,
    capaUrl: 'https://m.media-amazon.com/images/I/91VokfC0C3L._AC_UF1000,1000_QL80_.jpg',
    descricao: 'A primeira parte da épica trilogia de fantasia que se passa na Terra Média. Frodo Bolseiro, um hobbit, recebe a tarefa de destruir o Anel do Poder e impedir que o Senhor Sauron escravize a Terra Média.',
    isbn: '978-85-325-1234-5',
    editora: 'HarperCollins',
    anoPublicacao: 1954,
    paginas: 576,
    idioma: 'Português',
    avaliacao: 4.8
  },
  {
    id: 2,
    titulo: '1984',
    autor: 'George Orwell',
    categoria: 'Ficção Científica',
    preco: 34.90,
    estoque: 8,
    capaUrl: 'https://m.media-amazon.com/images/I/71rpa1-kyvL._AC_UF1000,1000_QL80_.jpg',
    descricao: 'Um clássico da literatura distópica que retrata um mundo sob vigilância totalitária. Winston Smith, um funcionário do Ministério da Verdade, começa a questionar o sistema e se apaixona por Julia.',
    isbn: '978-85-325-5678-9',
    editora: 'Companhia das Letras',
    anoPublicacao: 1949,
    paginas: 416,
    idioma: 'Português',
    avaliacao: 4.7
  },
  {
    id: 3,
    titulo: 'O Pequeno Príncipe',
    autor: 'Antoine de Saint-Exupéry',
    categoria: 'Infantil',
    preco: 29.90,
    estoque: 20,
    capaUrl: 'https://m.media-amazon.com/images/I/71O2XIytdqL._AC_UF1000,1000_QL80_.jpg',
    descricao: 'Uma obra-prima da literatura francesa que encanta crianças e adultos. A história de um piloto que cai no deserto e conhece um pequeno príncipe vindo de outro planeta.',
    isbn: '978-85-325-9012-3',
    editora: 'Agir',
    anoPublicacao: 1943,
    paginas: 96,
    idioma: 'Português',
    avaliacao: 4.9
  },
];

const LivroDetalhes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [livro, setLivro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantidade, setQuantidade] = useState(1);

  useEffect(() => {
    const fetchLivro = async () => {
      try {
        setLoading(true);
        // Simula busca na API
        setTimeout(() => {
          const livroEncontrado = MOCK_LIVROS.find(l => l.id === parseInt(id));
          if (livroEncontrado) {
            setLivro(livroEncontrado);
            setError(null);
          } else {
            setError('Livro não encontrado');
          }
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Erro ao carregar livro');
        setLoading(false);
      }
    };

    fetchLivro();
  }, [id]);

  // Função corrigida para permitir edição completa
  const handleQuantidadeChange = (e) => {
    const value = e.target.value;
    
    // Se o campo estiver vazio, permite
    if (value === '') {
      setQuantidade('');
      return;
    }
    
    const numValue = parseInt(value);
    // Se for um número válido e dentro dos limites
    if (!isNaN(numValue) && numValue >= 0 && numValue <= (livro?.estoque || 0)) {
      setQuantidade(numValue);
    }
  };

  // Função para quando o input perder o foco
  const handleQuantidadeBlur = () => {
    // Se estiver vazio ou 0, volta para 1
    if (quantidade === '' || quantidade === 0) {
      setQuantidade(1);
    }
  };

  // Função para incrementar
  const incrementQuantidade = () => {
    if (livro && quantidade < livro.estoque) {
      setQuantidade(prev => typeof prev === 'number' ? prev + 1 : 2);
    }
  };

  // Função para decrementar
  const decrementQuantidade = () => {
    if (typeof quantidade === 'number' && quantidade > 1) {
      setQuantidade(prev => prev - 1);
    }
  };

  const handleAdicionarAoCarrinho = () => {
    // TODO: Implementar lógica do carrinho
    const qtd = typeof quantidade === 'number' ? quantidade : 1;
    console.log(`Adicionando ${qtd} x ${livro.titulo} ao carrinho`);
    alert(`📚 ${qtd} x "${livro.titulo}" adicionado ao carrinho!`);
  };

  const handleComprarAgora = () => {
    // TODO: Implementar lógica de compra
    const qtd = typeof quantidade === 'number' ? quantidade : 1;
    console.log(`Comprando ${qtd} x ${livro.titulo}`);
    alert(`🎉 Compra de "${livro.titulo}" iniciada!`);
  };

  const getInitials = (titulo) => {
    if (!titulo) return '📚';
    return titulo.charAt(0).toUpperCase();
  };

  // Função para renderizar estrelas de avaliação
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);
    
    return (
      <span className="stars">
        {'⭐'.repeat(fullStars)}
        {hasHalfStar && '✨'}
        {'☆'.repeat(emptyStars)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="livro-detalhes-container">
        <div className="loading-container">
          <div className="loader-spinner"></div>
          <p>Carregando detalhes do livro...</p>
        </div>
      </div>
    );
  }

  if (error || !livro) {
    return (
      <div className="livro-detalhes-container">
        <div className="error-container">
          <span className="error-icon">😕</span>
          <h2>{error || 'Livro não encontrado'}</h2>
          <p>O livro que você está procurando não está disponível.</p>
          <Link to="/" className="btn-voltar">
            ← Voltar para a Home
          </Link>
        </div>
      </div>
    );
  }

  // Valor atual da quantidade (garantindo que seja número)
  const currentQuantidade = typeof quantidade === 'number' ? quantidade : 1;

  return (
    <div className="livro-detalhes-container">
      <div className="livro-detalhes-card">
        {/* Botão Voltar */}
        <button onClick={() => navigate('/')} className="btn-voltar-top">
          ← Voltar
        </button>

        <div className="livro-detalhes-content">
          {/* Coluna da Capa */}
          <div className="livro-detalhes-capa">
            {livro.capaUrl ? (
              <img 
                src={livro.capaUrl} 
                alt={`Capa do livro ${livro.titulo}`}
                className="livro-detalhes-imagem"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <div class="livro-capa-fallback">
                      <span>${getInitials(livro.titulo)}</span>
                      <p>${livro.titulo}</p>
                    </div>
                  `;
                }}
              />
            ) : (
              <div className="livro-capa-fallback">
                <span>{getInitials(livro.titulo)}</span>
                <p>{livro.titulo}</p>
              </div>
            )}
            
            {livro.estoque === 0 && (
              <div className="livro-esgotado-badge">ESGOTADO</div>
            )}
          </div>

          {/* Coluna das Informações */}
          <div className="livro-detalhes-info">
            <div className="livro-detalhes-header">
              <h1 className="livro-detalhes-titulo">{livro.titulo}</h1>
              <p className="livro-detalhes-autor">por {livro.autor}</p>
              
              <div className="livro-detalhes-avaliacao">
                {renderStars(livro.avaliacao)}
                <span className="avaliacao-numero">{livro.avaliacao}/5</span>
              </div>
            </div>

            <div className="livro-detalhes-meta">
              <span className="meta-item">
                <strong>Categoria:</strong> {livro.categoria}
              </span>
              <span className="meta-item">
                <strong>Editora:</strong> {livro.editora}
              </span>
              <span className="meta-item">
                <strong>Ano:</strong> {livro.anoPublicacao}
              </span>
              <span className="meta-item">
                <strong>Páginas:</strong> {livro.paginas}
              </span>
              <span className="meta-item">
                <strong>Idioma:</strong> {livro.idioma}
              </span>
              <span className="meta-item">
                <strong>ISBN:</strong> {livro.isbn}
              </span>
            </div>

            <div className="livro-detalhes-descricao">
              <h3>Sinopse</h3>
              <p>{livro.descricao}</p>
            </div>

            <div className="livro-detalhes-status">
              <div className="status-info">
                <span className="status-label">Disponibilidade:</span>
                {livro.estoque > 0 ? (
                  <span className="status-disponivel">
                    ✅ Em estoque ({livro.estoque} unidades)
                  </span>
                ) : (
                  <span className="status-indisponivel">
                    ❌ Esgotado
                  </span>
                )}
              </div>
            </div>

            <div className="livro-detalhes-preco">
              <span className="preco-valor">R$ {livro.preco.toFixed(2)}</span>
              {livro.estoque > 0 && (
                <span className="preco-parcelas">
                  em até 3x de R$ {(livro.preco / 3).toFixed(2)} sem juros
                </span>
              )}
            </div>

            {livro.estoque > 0 && (
              <div className="livro-detalhes-actions">
                <div className="quantidade-container">
                  <label htmlFor="quantidade">Quantidade:</label>
                  
                  {/* Input de Quantidade */}
                  <input
                    type="number"
                    id="quantidade"
                    min="1"
                    max={livro.estoque}
                    value={quantidade}
                    onChange={handleQuantidadeChange}
                    onBlur={handleQuantidadeBlur}
                    className="quantidade-input"
                  />
                  
                  <span className="estoque-disponivel">
                    {livro.estoque} disponíveis
                  </span>
                </div>

                <div className="action-buttons">
                  <button 
                    className="btn-adicionar-carrinho"
                    onClick={handleAdicionarAoCarrinho}
                  >
                    🛒 Adicionar ao Carrinho
                  </button>
                  <button 
                    className="btn-comprar-agora"
                    onClick={handleComprarAgora}
                  >
                    ⚡ Comprar Agora
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Seção de Livros Relacionados */}
        <div className="livros-relacionados">
          <h3>📚 Livros que você pode gostar</h3>
          <div className="relacionados-grid">
            {MOCK_LIVROS
              .filter(l => l.id !== livro.id && l.categoria === livro.categoria)
              .slice(0, 4)
              .map(l => (
                <Link 
                  to={`/livro/${l.id}`} 
                  key={l.id}
                  className="relacionado-card"
                >
                  <img 
                    src={l.capaUrl} 
                    alt={l.titulo}
                    className="relacionado-imagem"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200x300?text=Sem+Capa';
                    }}
                  />
                  <p className="relacionado-titulo">{l.titulo}</p>
                  <span className="relacionado-preco">R$ {l.preco.toFixed(2)}</span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivroDetalhes;