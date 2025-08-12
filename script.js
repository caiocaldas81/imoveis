// Versão simplificada com dados simulados realistas
const imoveisReaisPetropolis = [
  {
    titulo: "Casa 3 Quartos - Quitandinha",
    preco: "R$ 2.600/mês",
    localizacao: "Quitandinha, Petrópolis",
    link: "https://www.olx.com.br/exemplo1"
  },
  {
    titulo: "Apartamento 2 Quartos - Centro",
    preco: "R$ 1.800/mês",
    localizacao: "Centro, Petrópolis",
    link: "https://www.olx.com.br/exemplo2"
  },
  {
    titulo: "Casa Condomínio - Valparaíso",
    preco: "R$ 3.200/mês",
    localizacao: "Valparaíso, Petrópolis",
    link: "https://www.olx.com.br/exemplo3"
  }
];

document.getElementById('atualizar').addEventListener('click', () => {
  const tipo = document.getElementById('tipo').value.toLowerCase();
  const resultados = tipo === 'todos' 
    ? imoveisReaisPetropolis 
    : imoveisReaisPetropolis.filter(imovel =>
        imovel.titulo.toLowerCase().includes(tipo) ||
        imovel.localizacao.toLowerCase().includes(tipo));
  
  exibirResultados(resultados);
});

function exibirResultados(imoveis) {
  const div = document.getElementById('resultados');
  div.innerHTML = imoveis.map(imovel => `
    <div class="imovel-card">
      <h3>${imovel.titulo}</h3>
      <p><strong>${imovel.preco}</strong></p>
      <p>📍 ${imovel.localizacao}</p>
      <a href="${imovel.link}" target="_blank">Ver no site</a>
    </div>
  `).join('');
}

// Carrega resultados iniciais
window.onload = () => document.getElementById('atualizar').click();
