const supabase = require('../utils/db');

const obtenerTodos = async () => {
  const { data, error } = await supabase
    .from('equipos')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw { status: 500, message: error.message };
  return data;
};

const obtenerPorId = async (id) => {
  const { data, error } = await supabase
    .from('equipos')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw { status: 404, message: 'Equipo no encontrado.' };
  return data;
};

const crear = async ({ nombre, descripcion }) => {
  const { data, error } = await supabase
    .from('equipos')
    .insert([{ nombre, descripcion, disponible: true, estado: 'activo' }])
    .select()
    .single();

  if (error) throw { status: 400, message: error.message };
  return data;
};

const actualizar = async (id, campos) => {
  const { data, error } = await supabase
    .from('equipos')
    .update(campos)
    .eq('id', id)
    .select()
    .single();

  if (error) throw { status: 400, message: error.message };
  return data;
};

const eliminar = async (id) => {
  const { error } = await supabase
    .from('equipos')
    .delete()
    .eq('id', id);

  if (error) throw { status: 400, message: error.message };
  return { mensaje: 'Equipo eliminado correctamente.' };
};

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };