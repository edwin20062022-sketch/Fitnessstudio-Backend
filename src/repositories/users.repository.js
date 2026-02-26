const supabase = require('../utils/db');
const bcrypt = require('bcryptjs');

const crearUsuario = async ({ nombre, email, password, rol = 'usuario' }) => {
  const password_hash = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('usuarios')
    .insert([{ nombre, email, password_hash, rol }])
    .select()
    .single();

  if (error) throw { status: 400, message: error.message };
  return data;
};

const buscarPorEmail = async (email) => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('email', email)
    .single();

  if (error) return null;
  return data;
};

const verificarPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = { crearUsuario, buscarPorEmail, verificarPassword };