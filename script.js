 const perguntas = [
  {
    pergunta: "Qual tecnologia ajuda a identificar estresse hídrico na lavoura de forma remota?",
    opcoes: ["Drones e Satélites", "Enxada Manual", "Arado Tracionado"],
    correta: 0
  },
  {
    pergunta: "Qual é o principal benefício do uso de tratores autônomos?",
    opcoes: ["Maior consumo de combustível", "Redução de desperdícios e alta precisão", "Aumento no uso de pesticidas"],
    correta: 1
  }
];

let indiceAtual = 0;

function carregarPergunta() {
  const q = perguntas[indiceAtual];
  document.getElementById("pergunta").innerText = q.pergunta;
  
  const containerOpcoes = document.getElementById("opcoes");
  containerOpcoes.innerHTML = "";
  document.getElementById("resultado").innerText = "";

  q.opcoes.forEach((opcao, index) => {
    const btn = document.createElement("button");
    btn.className = "btn-opcao";
    btn.innerText = opcao;
    btn.onclick = () => verificarResposta(index);
    containerOpcoes.appendChild(btn);
  });
}

function verificarResposta(index) {
  const res = document.getElementById("resultado");
  if (index === perguntas[indiceAtual].correta) {
    res.style.color = "#2e7d32";
    res.innerText = "✨ Resposta Correta!";
  } else {
    res.style.color = "#c62828";
    res.innerText = "❌ Resposta Incorreta. Tente novamente!";
  }
}

// Inicializa o jogo ao carregar a página
document.addEventListener("DOMContentLoaded", carregarPergunta);
