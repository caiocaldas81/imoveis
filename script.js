// Dados mockados - depois você pode substituir por dados reais
const imoveisMock = [
    {
        titulo: "Casa 3 quartos no Centro Histórico",
        preco: "R$ 2.800/mês",
        localizacao: "Centro, Petrópolis",
        link: "#"
    },
    {
        titulo: "Apartamento 2 quartos em Valparaíso",
        preco: "R$ 1.900/mês",
        localizacao: "Valparaíso, Petrópolis",
        link: "#"
    }
];

document.getElementById('atualizar').addEventListener('click', () => {
    const tipo = document.getElementById('tipo').value;
    const resultadosDiv = document.getElementById('resultados');
    
    // Limpa resultados anteriores
    resultadosDiv.innerHTML = '';
    
    // Filtra os imóveis
    const imoveisFiltrados = tipo === 'todos' ? imoveisMock : 
        imoveisMock.filter(imovel => 
            imovel.titulo.toLowerCase().includes(tipo));
    
    // Exibe os resultados
    imoveisFiltrados.forEach(imovel => {
        const card = document.createElement('div');
        card.className = 'imovel-card';
        card.innerHTML = `
            <h3>${imovel.titulo}</h3>
            <p><strong>${imovel.preco}</strong></p>
            <p>📍 ${imovel.localizacao}</p>
            <a href="${imovel.link}" target="_blank">Ver detalhes</a>
        `;
        resultadosDiv.appendChild(card);
    });
});

// Carrega alguns resultados inicialmente
window.onload = function() {
    document.getElementById('atualizar').click();
};