const axios = require('axios');

const convertir = async (req, res, next) => {
  try {
    const { monto, de = 'MXN', a = 'USD' } = req.query;

    if (!monto || isNaN(monto) || monto <= 0) {
      return res.status(400).json({ error: true, mensaje: 'El monto debe ser un número válido mayor a 0.' });
    }

    const url = `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/pair/${de}/${a}/${monto}`;
    const { data } = await axios.get(url);

    if (data.result !== 'success') {
      throw { status: 400, message: 'Error al consultar la API de conversión.' };
    }

    res.json({
      mensaje: 'Conversión realizada correctamente.',
      datos: {
        monto_original: parseFloat(monto),
        moneda_origen: de,
        moneda_destino: a,
        monto_convertido: data.conversion_result,
        tasa: data.conversion_rate,
        fecha: data.time_last_update_utc
      }
    });
  } catch (err) {
    next(err);
  }
};

const obtenerTasas = async (req, res, next) => {
  try {
    const { base = 'MXN' } = req.query;
    const url = `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/latest/${base}`;
    const { data } = await axios.get(url);

    if (data.result !== 'success') {
      throw { status: 400, message: 'Error al obtener las tasas de cambio.' };
    }

    const monedasInteres = ['USD', 'EUR', 'MXN', 'GBP', 'CAD'];
    const tasasFiltradas = {};
    monedasInteres.forEach(moneda => {
      if (data.conversion_rates[moneda]) {
        tasasFiltradas[moneda] = data.conversion_rates[moneda];
      }
    });

    res.json({
      mensaje: 'Tasas obtenidas correctamente.',
      datos: {
        base,
        tasas: tasasFiltradas,
        fecha: data.time_last_update_utc
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { convertir, obtenerTasas };