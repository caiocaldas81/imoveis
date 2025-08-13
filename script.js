async function buscarImoveisReais() {
  try {
    // Busca em múltiplas fontes simultaneamente
    const [olx, zap] = await Promise.all([
      fetch('http://localhost:3000/api/olx').then(res => res.json()),
      fetch('http://localhost:3000/api/zap').then(res => res.json())
    ]);

    const todosImoveis = [...olx, ...zap];
    exibirResultados(todosImoveis);
    
    // Armazena para comparação futura
    localStorage.setItem('ultimaBusca', JSON.stringify({
      data: new Date().toISOString(),
      imoveis: todosImoveis.map(i => i.link)
    }));
    
  } catch (error) {
    console.error("Erro na busca:", error);
    exibirResultados([]);
  }
}

// Sistema de alertas
function configurarAlertas() {
  const alertas = JSON.parse(localStorage.getItem('alertas')) || [];
  
  document.getElementById('criar-alerta').addEventListener('click', () => {
    const novoAlerta = {
      tipo: document.getElementById('alerta-tipo').value,
      precoMax: parseFloat(document.getElementById('alerta-preco-max').value),
      bairro: document.getElementById('alerta-bairro').value.toLowerCase(),
      email: document.getElementById('alerta-email').value,
      dataCriacao: new Date().toISOString()
    };
    
    alertas.push(novoAlerta);
    localStorage.setItem('alertas', JSON.stringify(alertas));
    alert('Alerta criado com sucesso!');
  });
}

// Verificar novos imóveis periodicamente
function verificarNovosImoveis() {
  setInterval(async () => {
    const ultimaBusca = JSON.parse(localStorage.getItem('ultimaBusca'));
    if (!ultimaBusca) return;

    const response = await fetch('http://localhost:3000/api/olx');
    const novosImoveis = await response.json();
    
    const imoveisNovos = novosImoveis.filter(imovel => 
      !ultimaBusca.imoveis.includes(imovel.link)
    );

    if (imoveisNovos.length > 0) {
      // Aqui você pode implementar o envio de email
      console.log('Novos imóveis encontrados:', imoveisNovos);
      alert(`${imoveisNovos.length} novos imóveis encontrados!`);
    }
  }, 3600000); // Verifica a cada 1 hora
}

// Inicialização
window.onload = () => {
  buscarImoveisReais();
  configurarAlertas();
  verificarNovosImoveis();
};
