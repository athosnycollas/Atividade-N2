const test = require('node:test');
const assert = require('node:assert');
const app = require('../src/app');

test('GET /health retorna status 200 e json com status ok', async (t) => {
  const server = app.listen(0);
  const port = server.address().port;

  try {
    const res = await fetch(`http://localhost:${port}/health`);
    const data = await res.json();

    assert.strictEqual(res.status, 200);
    assert.strictEqual(data.status, 'ok');
    assert.strictEqual(data.servico, 'Doe Alimentos API');
    assert.ok(data.timestamp);
  } finally {
    server.close();
  }
});

test('GET /api/alimentos lista todas as doações de alimentos cadastradas', async (t) => {
  const server = app.listen(0);
  const port = server.address().port;

  try {
    const res = await fetch(`http://localhost:${port}/api/alimentos`);
    const data = await res.json();

    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(data));
    assert.ok(data.length >= 4);
  } finally {
    server.close();
  }
});

test('GET /api/alimentos com filtro por status e categoria', async (t) => {
  const server = app.listen(0);
  const port = server.address().port;

  try {
    const resDisponiveis = await fetch(`http://localhost:${port}/api/alimentos?status=disponivel`);
    const dataDisponiveis = await resDisponiveis.json();
    assert.strictEqual(resDisponiveis.status, 200);
    assert.ok(dataDisponiveis.every(a => a.status === 'disponivel'));

    const resGraos = await fetch(`http://localhost:${port}/api/alimentos?categoria=graos`);
    const dataGraos = await resGraos.json();
    assert.strictEqual(resGraos.status, 200);
    assert.ok(dataGraos.every(a => a.categoria === 'graos'));
  } finally {
    server.close();
  }
});

test('GET /api/alimentos/:id retorna o alimento correto ou 404', async (t) => {
  const server = app.listen(0);
  const port = server.address().port;

  try {
    const resOk = await fetch(`http://localhost:${port}/api/alimentos/1`);
    const dataOk = await resOk.json();
    assert.strictEqual(resOk.status, 200);
    assert.strictEqual(dataOk.id, 1);
    assert.strictEqual(dataOk.item, 'Arroz Agulhinha Tipo 1');

    const resNotFound = await fetch(`http://localhost:${port}/api/alimentos/9999`);
    assert.strictEqual(resNotFound.status, 404);
  } finally {
    server.close();
  }
});

test('POST /api/alimentos valida campos obrigatórios e cadastra nova doação', async (t) => {
  const server = app.listen(0);
  const port = server.address().port;

  try {
    // Validação de erro: falta de campos
    const resInvalido = await fetch(`http://localhost:${port}/api/alimentos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item: '' })
    });
    assert.strictEqual(resInvalido.status, 400);

    // Cadastro válido
    const resValido = await fetch(`http://localhost:${port}/api/alimentos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        item: 'Macarrão Espaguete',
        quantidade: 50,
        unidade: 'kg',
        categoria: 'massas'
      })
    });
    assert.strictEqual(resValido.status, 201);
    const dataValida = await resValido.json();
    assert.strictEqual(dataValida.item, 'Macarrão Espaguete');
    assert.strictEqual(dataValida.status, 'disponivel');
  } finally {
    server.close();
  }
});

test('PATCH /api/alimentos/:id/distribuir atualiza status para distribuido', async (t) => {
  const server = app.listen(0);
  const port = server.address().port;

  try {
    const res = await fetch(`http://localhost:${port}/api/alimentos/2/distribuir`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ beneficiario: 'Abrigo São Francisco' })
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'distribuido');
    assert.strictEqual(data.beneficiario, 'Abrigo São Francisco');
    assert.ok(data.dataDistribuicao);
  } finally {
    server.close();
  }
});

test('GET /api/estatisticas retorna resumo consolidado', async (t) => {
  const server = app.listen(0);
  const port = server.address().port;

  try {
    const res = await fetch(`http://localhost:${port}/api/estatisticas`);
    const data = await res.json();

    assert.strictEqual(res.status, 200);
    assert.ok(data.totalCadastrados > 0);
    assert.ok(data.taxaDistribuicaoPercentual >= 0);
  } finally {
    server.close();
  }
});
