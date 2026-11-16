const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Doe Alimentos API em execução na porta ${PORT}`);
});
