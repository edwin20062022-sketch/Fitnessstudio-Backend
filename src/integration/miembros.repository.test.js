const { validarMiembro, calcularPrecio } = require('../domain/miembros.rules');

// PRUEBAS DE INTEGRACIÓN: lógica de negocio aplicada

describe('Integración: creación de miembro con reglas de negocio', () => {

  test('precio calculado debe coincidir con precio esperado para Basica 3 meses', () => {
    const membresia = 'Basica';
    const meses = 3;
    const precioCalculado = calcularPrecio(membresia, meses);
    const { valido } = validarMiembro({
      nombre: 'María García',
      membresia,
      meses,
      precio: precioCalculado
    });
    expect(valido).toBe(true);
    expect(precioCalculado).toBe(297);
  });

  test('precio calculado debe coincidir con precio esperado para Premium 12 meses', () => {
    const membresia = 'Premium';
    const meses = 12;
    const precioCalculado = calcularPrecio(membresia, meses);
    const { valido } = validarMiembro({
      nombre: 'Carlos López',
      membresia,
      meses,
      precio: precioCalculado
    });
    expect(valido).toBe(true);
    expect(precioCalculado).toBe(2388);
  });

  test('debe rechazar miembro con datos incompletos', () => {
    const { valido, errores } = validarMiembro({
      nombre: '',
      membresia: 'Premium',
      meses: 3,
      precio: 597
    });
    expect(valido).toBe(false);
    expect(errores.length).toBeGreaterThan(0);
  });

  test('flujo completo: validar y calcular precio para nuevo miembro', () => {
    const datosMiembro = {
      nombre: 'Roberto Silva',
      membresia: 'Premium',
      meses: 6
    };
    const precio = calcularPrecio(datosMiembro.membresia, datosMiembro.meses);
    const { valido } = validarMiembro({ ...datosMiembro, precio });

    expect(precio).toBe(1194);
    expect(valido).toBe(true);
  });

});