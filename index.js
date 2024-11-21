const form = document.querySelector('form');
const preco = document.getElementById('preco');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = {
    regiao: formData.get('regiao'),
    tipo_empreendimento: formData.get('tipo'),
    agente: formData.get('agente'),
    construtor: formData.get('construtor'),
    dist: formData.get('municipio'),
    incorporado: formData.get('incorporado'),
    ano_lancamento: new Date().toISOString().split('T')[0],
    quartos: parseInt(formData.get('quartos')),
    banheiros: parseInt(formData.get('banheiros')),
    garagens: parseInt(formData.get('garagens')),
    area_util: parseFloat(formData.get('areaUtilPorUnidade')),
    area_total: parseFloat(formData.get('areaTotalPorUnidade')),
    andares: parseInt(formData.get('andares')),
    banheirosQuartos: parseInt(formData.get('suites')),
    construtor: formData.get('construtor'),
  };
  const price = callApiToGetPredictions(data);

  price.then((result) => {
    preco.textContent = `Preço estimado: R$ ${result.precoPrevisto}`;
    preco.style.display = 'block';
  });
});

const callApiToGetPredictions = async (data) => {
  console.log(data)
  const response = await fetch('https://apipredicaopreco-production.up.railway.app/imovel/previsao-preco/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  console.log(result);
  return result;
}