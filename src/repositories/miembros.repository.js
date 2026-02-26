const supabase = require('../utils/db');

const obtenerTodos = async ({ page = 1, limit = 5, membresia } = {}) => {
  const desde = (page - 1) * limit;
  const hasta = desde + limit - 1;

  let query = supabase
    .from('miembros')
    .select('*', { count: 'exact' })
    .eq('activo', true)
    .order('created_at', { ascending: false })
    .range(desde, hasta);

  if (membresia) {
    query = query.eq('membresia', membresia);
  }

  const { data, error, count } = await query;

  if (error) throw { status: 500, message: error.message };

  return {
    datos: data,
    total: count,
    pagina: parseInt(page),
    limite: parseInt(limit),
    totalPaginas: Math.ceil(count / limit)
  };
};

const obtenerPorId = async (id) => {
  const { data, error } = await supabase
    .from('miembros')
    .select('*')
    .eq('id', id)
    .eq('activo', true)
    .single();

  if (error) throw { status: 404, message: 'Miembro no encontrado.' };
  return data;
};

const crear = async ({ nombre, email, telefono, membresia, meses, precio }) => {
  const { data, error } = await supabase
    .from('miembros')
    .insert([{ nombre, email, telefono, membresia, meses, precio }])
    .select()
    .single();

  if (error) throw { status: 400, message: error.message };
  return data;
};

const actualizar = async (id, campos) => {
  const { data, error } = await supabase
    .from('miembros')
    .update(campos)
    .eq('id', id)
    .select()
    .single();

  if (error) throw { status: 400, message: error.message };
  return data;
};

const eliminar = async (id) => {
  const { error } = await supabase
    .from('miembros')
    .update({ activo: false })
    .eq('id', id);

  if (error) throw { status: 400, message: error.message };
  return { mensaje: 'Miembro eliminado correctamente.' };
};

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };