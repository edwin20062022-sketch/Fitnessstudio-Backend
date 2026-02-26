const validarMiembro = ({ nombre, membresia, meses, precio }) => {
  const errores = [];

  if (!nombre || nombre.trim() === '') {
    errores.push('El nombre es obligatorio.');
  }

  if (!membresia || !['Basica', 'Premium'].includes(membresia)) {
    errores.push('La membresía debe ser Basica o Premium.');
  }

  if (!meses || isNaN(meses) || meses < 1) {
    errores.push('Los meses deben ser un número mayor a 0.');
  }

  if (precio === undefined || isNaN(precio) || precio < 0) {
    errores.push('El precio debe ser un número válido.');
  }

  return {
    valido: errores.length === 0,
    errores
  };
};

const calcularPrecio = (membresia, meses) => {
  const precios = {
    Basica: 99,
    Premium: 199
  };

  if (!precios[membresia]) return 0;
  return precios[membresia] * meses;
};

const estaVigente = (fecha_vencimiento) => {
  if (!fecha_vencimiento) return false;
  return new Date(fecha_vencimiento) > new Date();
};

module.exports = { validarMiembro, calcularPrecio, estaVigente };