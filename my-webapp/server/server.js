const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar la conexión a la base de datos PostgreSQL en Azure
const pool = new Pool({
  user: process.env.DB_USER || 'JhonatanDV',
  host: process.env.DB_HOST || 'electiva.postgres.database.azure.com',
  database: process.env.DB_NAME || 'tienda_productos',
  password: process.env.DB_PASSWORD || 'Sofilau01@',
  port: process.env.DB_PORT || 5432,
});

app.use(cors());
app.use(express.static(path.join(__dirname, '../paginaweb-main')));

// Ruta para obtener productos
app.get('/productos', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM productos');
    res.json(result.rows);
    } catch (err) {
    console.error('Error ejecutando la consulta', err.stack);
    res.status(500).json({ error: 'Error al obtener productos' });
    }
});

  // Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});