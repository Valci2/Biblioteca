// src/pages/Perfil.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Perfil.css';

const Perfil = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  // Estado separado para edição
  const [editData, setEditData] = useState({
    nome: user?.nome || 'Usuário',
    email: user?.email || 'usuario@email.com',
  });
  
  // Estado para o avatar
  const [avatar, setAvatar] = useState(user?.avatar || null);
  const [avatarFile, setAvatarFile] = useState(null);

  // Estatísticas (mock)
  const stats = {
    livrosComprados: 42,
    livrosDoados: 15,
    livrosVendidos: 28
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleEdit = () => {
    // Carrega os dados atuais para edição
    setEditData({
      nome: user?.nome || 'Usuário',
      email: user?.email || 'usuario@email.com',
    });
    setAvatar(user?.avatar || null);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // Se tiver um arquivo de avatar, faz upload (simulação)
      if (avatarFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Avatar = reader.result;
          setAvatar(base64Avatar);
          updateUser({
            nome: editData.nome,
            email: editData.email,
            avatar: base64Avatar
          });
        };
        reader.readAsDataURL(avatarFile);
      } else {
        // Apenas atualiza nome e email
        updateUser({
          nome: editData.nome,
          email: editData.email,
          avatar: avatar
        });
      }
      
      setIsEditing(false);
      setAvatarFile(null);
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Mostra preview imediato
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Salva o arquivo para upload posterior
      setAvatarFile(file);
    }
  };

  // Função para obter iniciais do nome
  const getInitials = (nome) => {
    if (!nome) return 'U';
    const names = nome.trim().split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  };

  // Verifica se o avatar é uma imagem base64 ou URL
  const isImageAvatar = avatar && (avatar.startsWith('data:image') || avatar.startsWith('http'));

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        {/* Avatar e Nome */}
        <div className="perfil-top">
          <div className="avatar-wrapper">
            {isImageAvatar ? (
              <img 
                src={avatar} 
                alt={editData.nome} 
                className="perfil-avatar"
              />
            ) : (
              <div className="perfil-avatar-fallback">
                {getInitials(editData.nome)}
              </div>
            )}
            
            {isEditing && (
              <label className="avatar-upload">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
                <span className="upload-icon">📷</span>
              </label>
            )}
          </div>
          
          {!isEditing ? (
            <div className="perfil-info">
              <h1 className="perfil-nome">{user?.nome || 'Usuário'}</h1>
              <p className="perfil-email">{user?.email || 'usuario@email.com'}</p>
            </div>
          ) : (
            <div className="perfil-edit-form">
              <input
                type="text"
                name="nome"
                value={editData.nome}
                onChange={handleChange}
                placeholder="Nome completo"
                className="edit-input"
              />
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleChange}
                placeholder="Email"
                className="edit-input"
                disabled
              />
            </div>
          )}
        </div>

        {/* Estatísticas de Livros */}
        <div className="livros-stats">
          <div className="stat-card comprados">
            <div className="stat-content">
              <span className="stat-value">{stats.livrosComprados}</span>
              <span className="stat-label">Comprados</span>
            </div>
          </div>
          
          <div className="stat-card doados">
            <div className="stat-content">
              <span className="stat-value">{stats.livrosDoados}</span>
              <span className="stat-label">Doados</span>
            </div>
          </div>
          
          <div className="stat-card vendidos">
            <div className="stat-content">
              <span className="stat-value">{stats.livrosVendidos}</span>
              <span className="stat-label">Vendidos</span>
            </div>
          </div>
        </div>

        {/* Ações do Perfil */}
        <div className="perfil-actions">
          {!isEditing ? (
            <>
              <button onClick={handleEdit} className="btn-edit">
                Editar Perfil
              </button>
              <button onClick={handleLogout} className="btn-logout">
                Sair
              </button>
            </>
          ) : (
            <>
              <button onClick={handleSave} className="btn-save">
                Salvar
              </button>
              <button 
                onClick={() => setIsEditing(false)} 
                className="btn-cancel"
              >
                Cancelar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Perfil;