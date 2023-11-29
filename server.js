import express from 'express';

const app = express();
const port = 3000; // Escolha a porta que desejar

// Define o diretório de recursos estáticos
app.use(express.static('./'));

// Rota para a página principal
app.get('/', (req, res) => {
  res.sendFile('./index.html');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
