const supabase = require('../utils/db');

const obtenerTodas = async () => {
  const { data, error } = await supabase
    .from('vista_areas_ocupacion')
    .select('*')
    .order('id', { ascending: true });

  if (error) throw { status: 500, message: error.message };
  return data;
};

const obtenerPorId = async (id) => {
  const { data, error } = await supabase
    .from('areas')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw { status: 404, message: 'Área no encontrada.' };
  return data;
};

const crear = async ({ nombre, descripcion, capacidad }) => {
  const { data, error } = await supabase
    .from('areas')
    .insert([{ nombre, descripcion, capacidad }])
    .select()
    .single();

  if (error) throw { status: 400, message: error.message };
  return data;
};

const eliminar = async (id) => {
  const { error } = await supabase
    .from('areas')
    .update({ activa: false })
    .eq('id', id);

  if (error) throw { status: 400, message: error.message };
  return { mensaje: 'Área eliminada correctamente.' };
};

const asignarMiembro = async (area_id, miembro_id) => {
  // Verificar capacidad
  const { data: area } = await supabase
    .from('vista_areas_ocupacion')
    .select('*')
    .eq('id', area_id)
    .single();

  if (!area) throw { status: 404, message: 'Área no encontrada.' };
  if (area.ocupacion_actual >= area.capacidad) {
    throw { status: 400, message: 'El área ha alcanzado su capacidad máxima.' };
  }

  const { data, error } = await supabase
    .from('asignaciones')
    .insert([{ area_id, miembro_id, activa: true }])
    .select()
    .single();

  if (error) throw { status: 400, message: 'El miembro ya está asignado a esta área.' };
  return data;
};

const quitarMiembro = async (area_id, miembro_id) => {
  const { error } = await supabase
    .from('asignaciones')
    .update({ activa: false })
    .eq('area_id', area_id)
    .eq('miembro_id', miembro_id);

  if (error) throw { status: 400, message: error.message };
  return { mensaje: 'Miembro removido del área correctamente.' };
};

module.exports = { obtenerTodas, obtenerPorId, crear, eliminar, asignarMiembro, quitarMiembro };