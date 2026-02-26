const { validarMiembro, calcularPrecio, estaVigente } = require('./miembros.rules');

// PRUEBAS: validarMiembro

describe('validarMiembro', () => {

  test('debe retornar valido true con datos correctos', () => {
    const resultado = validarMiembro({
      nombre: 'Juan Pérez',
      membresia: 'Premium',
      meses: 6,
      precio: 1194
    });
    expect(resultado.valido).toBe(true);
    expect(resultado.errores).toHaveLength(0);
  });

  test('debe fallar si el nombre está vacío', () => {
    const resultado = validarMiembro({
      nombre: '',
      membresia: 'Premium',
      meses: 6,
      precio: 1194
    });
    expect(resultado.valido).toBe(false);
    expect(resultado.errores).toContain('El nombre es obligatorio.');
  });

  test('debe fallar si la membresía es inválida', () => {
    const resultado = validarMiembro({
      nombre: 'Juan',
      membresia: 'Gold',
      meses: 3,
      precio: 299
    });
    expect(resultado.valido).toBe(false);
    expect(resultado.errores).toContain('La membresía debe ser Basica o Premium.');
  });

  test('debe fallar si los meses son 0 o negativos', () => {
    const resultado = validarMiembro({
      nombre: 'Juan',
      membresia: 'Basica',
      meses: 0,
      precio: 99
    });
    expect(resultado.valido).toBe(false);
    expect(resultado.errores).toContain('Los meses deben ser un número mayor a 0.');
  });

  test('debe fallar si el precio es negativo', () => {
    const resultado = validarMiembro({
      nombre: 'Juan',
      membresia: 'Basica',
      meses: 1,
      precio: -50
    });
    expect(resultado.valido).toBe(false);
    expect(resultado.errores).toContain('El precio debe ser un número válido.');
  });

  test('debe acumular múltiples errores', () => {
    const resultado = validarMiembro({
      nombre: '',
      membresia: 'Invalida',
      meses: -1,
      precio: -10
    });
    expect(resultado.valido).toBe(false);
    expect(resultado.errores).toHaveLength(4);
  });

});

// PRUEBAS: calcularPrecio

describe('calcularPrecio', () => {

  test('debe calcular correctamente para membresía Basica', () => {
    expect(calcularPrecio('Basica', 3)).toBe(297);
  });

  test('debe calcular correctamente para membresía Premium', () => {
    expect(calcularPrecio('Premium', 6)).toBe(1194);
  });

  test('debe retornar 0 para membresía desconocida', () => {
    expect(calcularPrecio('Gold', 3)).toBe(0);
  });

  test('debe calcular correctamente para 1 mes Basica', () => {
    expect(calcularPrecio('Basica', 1)).toBe(99);
  });

  test('debe calcular correctamente para 12 meses Premium', () => {
    expect(calcularPrecio('Premium', 12)).toBe(2388);
  });

});

// PRUEBAS: estaVigente

describe('estaVigente', () => {

  test('debe retornar true si la fecha es futura', () => {
    const fechaFutura = new Date();
    fechaFutura.setFullYear(fechaFutura.getFullYear() + 1);
    expect(estaVigente(fechaFutura.toISOString())).toBe(true);
  });

  test('debe retornar false si la fecha es pasada', () => {
    const fechaPasada = new Date();
    fechaPasada.setFullYear(fechaPasada.getFullYear() - 1);
    expect(estaVigente(fechaPasada.toISOString())).toBe(false);
  });

  test('debe retornar false si no hay fecha', () => {
    expect(estaVigente(null)).toBe(false);
  });

});