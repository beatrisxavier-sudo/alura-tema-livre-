// Dados do Mini-Jogo
const perguntas = [
    {
        pergunta: "Uma praga foi detectada em apenas uma pequena parte da sua lavoura. Qual a melhor decisão usando a Agricultura de Precisão?",
        opcoes: [
            "Pulverizar veneno em toda a propriedade imediatamente.",
            "Usar um drone para aplicação localizada apenas na área afetada.",
            "Ignorar a área afetada e focar na colheita do restante."
        ],
        correta: 1,
        explicacao: "Correto! A aplicação localizada economiza insumos e preserva o meio ambiente."
    },
    {
        pergunta: "Para monitorar a umidade do solo em tempo real sem ir até o local, qual tecnologia deve ser utilizada?",
        opcoes: [
            "Sensores IoT instalados no campo.",
            "Fotos manuais tiradas com smartphone.",
            "Lupas de aumento para inspecionar a terra."
        ],
        correta: 0,
        explicacao: "Correto! Sensores conectados à internet transmitem dados de umidade do solo em tempo real."
    },
    {
        pergunta: "Qual é o principal benefício do uso de tratores autônomos guiados por GPS?",
        opcoes: [
            "Deixar o trator mais rápido na rodovia.",
            "Evitar sobreposição de passadas e otimizar o uso do combustível.",
            "Reduzir o tamanho da máquina agrícola."
        ],
        correta: 1,
        explicacao: "Correto! O sistema de GPS garante precisão nas rotas, economizando combustível e tempo."
    }
];

let indicePerguntaAtual = 0;
let pontuacao = 0;

function carregarPergunta() {
    const q = perguntas[indicePerguntaAtual];
    document.getElementById("quiz-question").innerText = q.pergunta;
    
    const containerOpcoes = document.getElementById("quiz-options");
    containerOpcoes.innerHTML = "";
    document.getElementById("quiz-feedback").innerText = "";
    document.getElementById("next-btn").style.display = "none";

    q.opcoes.forEach((opcao, idx) => {
        const btn = document.createElement("button");
        btn.classList.add("btn-option");
        btn.innerText = opcao;
        btn.onclick = () => verificarResposta(idx);
        containerOpcoes.appendChild(btn);
    });
}

function verificarResposta(indiceSelecionado) {
    const q = perguntas[indicePerguntaAtual];
    const feedback = document.getElementById("quiz-feedback");
    const botoes = document.querySelectorAll(".btn-option");

    // Desativa botões para evitar múltiplos cliques
    botoes.forEach(btn => btn.disabled = true);

    if (indiceSelecionado === q.correta) {
        pontuacao += 10;
        feedback.innerText = "✨ " + q.explicacao;
        feedback.style.color = "green";
    } else {
        feedback.innerText = "❌ Resposta incorreta. Tente prestar atenção nas boas práticas do agro!";
        feedback.style.color = "red";
    }

    document.getElementById("score").innerText = `Pontuação: ${pontuacao}`;
    document.getElementById("next-btn").style.display = "inline-block";
}

function proximaPergunta() {
    indicePerguntaAtual++;
    if (indicePerguntaAtual < perguntas.length) {
        carregarPergunta();
    } else {
        finalizarJogo();
    }
}

function finalizarJogo() {
    document.getElementById("quiz-question").innerText = "🎉 Parabéns! Você concluiu o Desafio AgroTech!";
    document.getElementById("quiz-options").innerHTML = "";
    document.getElementById("quiz-feedback").innerText = `Sua pontuação final foi de ${pontuacao} pontos.`;
    document.getElementById("next-btn").style.display = "none";
}

// Inicializa o jogo ao carregar a página
window.onload = carregarPergunta;
