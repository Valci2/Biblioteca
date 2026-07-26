import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home'
import Perfil from '../pages/Perfil'
import LivroDetalhes from '../pages/Livro';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/livro/:id" element={<LivroDetalhes />} />
    </Routes>
  );
};

export default AppRoutes;