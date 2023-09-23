const autenticarUsuario = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  if (!token) return false;
  return true;
}

export default autenticarUsuario;
