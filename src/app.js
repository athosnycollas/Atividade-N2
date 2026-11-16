const express = require('express');

const app = express();
app.use(express.json());

// In-memory mock database para a API de Doe Alimentos
const alimentos = [
  {
    id: 1,
    item: 'Arroz Agulhinha Tipo 1',
    quantidade: 120,
    unidade: 'kg',
    categoria: 'graos',
    status: 'disponivel',
    dataValidade: '2027-06-30',
    dataEntrada: '2026-11-10T10:00:00.000Z'
  },
  {
    id: 2,
    item: 'Feijão Carioca',
    quantidade: 85,
    unidade: 'kg',
    categoria: 'graos',
    status: 'disponivel',
    dataValidade: '2027-04-15',
    dataEntrada: '2026-11-10T10:30:00.000Z'
  },
  {
    id: 3,
    item: 'Leite Integral UHT',
    quantidade: 60,
    unidade: 'litros',
    categoria: 'laticinios',
    status: 'distribuido',
    dataValidade: '2027-01-20',
    dataEntrada: '2026-11-08T09:00:00.000Z',
    beneficiario: 'Comunidade Esperança'
  },
  {
    id: 4,
    item: 'Cesta Básica Completa',
    quantidade: 30,
    unidade: 'cestas',
    categoria: 'cesta_basica',
    status: 'disponivel',
    dataValidade: '2027-05-01',
    dataEntrada: '2026-11-12T14:00:00.000Z'
  }
];

// Health check para monitoramento e observabilidade contínua (CI/CD)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    servico: 'Doe Alimentos API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Listagem de alimentos cadastrados com suporte a filtros
app.get('/api/alimentos', (req, res) => {
  const { status, categoria } = req.query;
  let resultado = [...alimentos];

  if (status) {
    resultado = resultado.filter(a => a.status.toLowerCase() === status.toLowerCase());
  }
  if (categoria) {
    resultado = resultado.filter(a => a.categoria.toLowerCase() === categoria.toLowerCase());
  }

  res.status(200).json(resultado);
});

// Consulta de alimento por ID
app.get('/api/alimentos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const alimento = alimentos.find(a => a.id === id);

  if (!alimento) {
    return res.status(404).json({ error: 'Item de alimento não encontrado' });
  }

  res.status(200).json(alimento);
});

// Cadastro de nova doação de alimentos
app.post('/api/alimentos', (req, res) => {
  const { item, quantidade, unidade, categoria, dataValidade } = req.body;

  if (!item || typeof item !== 'string' || item.trim() === '') {
    return res.status(400).json({ error: 'O nome do item é obrigatório' });
  }
  if (quantidade === undefined || typeof quantidade !== 'number' || quantidade <= 0) {
    return res.status(400).json({ error: 'A quantidade deve ser um número maior que zero' });
  }
  if (!unidade || typeof unidade !== 'string') {
    return res.status(400).json({ error: 'A unidade de medida (ex.: kg, litros, cestas) é obrigatória' });
  }
  if (!categoria || typeof categoria !== 'string') {
    return res.status(400).json({ error: 'A categoria (ex.: graos, laticinios, cesta_basica) é obrigatória' });
  }

  const novoAlimento = {
    id: alimentos.length + 1,
    item: item.trim(),
    quantidade,
    unidade: unidade.trim().toLowerCase(),
    categoria: categoria.trim().toLowerCase(),
    status: 'disponivel',
    dataValidade: dataValidade || null,
    dataEntrada: new Date().toISOString()
  };

  alimentos.push(novoAlimento);
  res.status(201).json(novoAlimento);
});

// Distribuição de alimento para beneficiário
app.patch('/api/alimentos/:id/distribuir', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const alimento = alimentos.find(a => a.id === id);

  if (!alimento) {
    return res.status(404).json({ error: 'Item de alimento não encontrado' });
  }

  const { beneficiario } = req.body;
  alimento.status = 'distribuido';
  alimento.beneficiario = beneficiario || 'Família Beneficiária Geral';
  alimento.dataDistribuicao = new Date().toISOString();

  res.status(200).json(alimento);
});

// Resumo e estatísticas para painel de controle
app.get('/api/estatisticas', (req, res) => {
  const totalItens = alimentos.length;
  const disponiveis = alimentos.filter(a => a.status === 'disponivel').length;
  const distribuidos = alimentos.filter(a => a.status === 'distribuido').length;

  res.status(200).json({
    totalCadastrados: totalItens,
    itensDisponiveis: disponiveis,
    itensDistribuidos: distribuidos,
    taxaDistribuicaoPercentual: totalItens > 0 ? Math.round((distribuidos / totalItens) * 100) : 0
  });
});

module.exports = app;
