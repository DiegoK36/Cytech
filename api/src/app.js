import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';

// Inicializa la aplicación Express
const app = express();

// Aplica middleware
app.use(cors()); // Habilita CORS
app.use(json()); // Permite a la aplicación entender JSON

// Importa las rutas
import projectRoutes from './routes/projectRoutes';
import userRoutes from './routes/userRoutes';

// Usa las rutas
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);

// Exporta la aplicación configurada
export default app;
