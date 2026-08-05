// Estado Inicial do Jogo
let gameState = {
    day: 1,
    health: 100,
    moisture: 60,
    budget: 1000
};

// Mapeamento dos Elementos HTML
const dayEl = document.getElementById('game-day');
const healthEl = document.getElementById('game-health');
const moistureEl = document.getElementById('game-moisture');
const budgetEl = document.getElementById('game-budget');
const eventTextEl = document.getElementById('game-event-text');
const actionButtonsEl = document.getElementById('action-buttons');
const resultScreenEl = document.getElementById('game-result-screen');
const resultTitleEl = document.getElementById('result-title');
const resultDescEl = document.getElementById('result-desc');

// Função de Atualização da Tela
function updateUI() {
    dayEl.innerText = `${gameState.day} / 5`;
    healthEl.innerText = `${gameState.health}%`;
    moistureEl.innerText = `${gameState.moisture}%`;
    budgetEl.innerText = `R$ ${gameState.budget}`;
}

// Lógica Principal das Rodadas
function playTurn(action) {
    if (gameState.day > 5 || gameState.health <= 0) return;

    let eventLog = "";

    // Processar Ação do Jogador
    if (action === 'irrigar') {
        if (gameState.budget < 100) {
            alert("⚠️ Orçamento insuficiente para irrigação!");
            return;
        }
        gameState.budget -= 100;
        gameState.moisture = Math.min(100, gameState.moisture + 35);
        eventLog = "Você ativou os pivôs de irrigação! O solo recuperou a umidade ideal.";
    } else if (action === 'insumos') {
        if (gameState.budget < 150) {
            alert("⚠️ Orçamento insuficiente para aplicação biológica!");
            return;
        }
        gameState.budget -= 150;
        gameState.health = Math.min(100, gameState.health + 15);
        eventLog = "Aplicação biológica realizada com sucesso! A lavoura está fortalecida.";
    } else if (action === 'esperar') {
        gameState.moisture -= 20;
        eventLog = "Dia sem intervenções. O sol evapo-transpirou a umidade do solo.";
    }

    // Eventos Climáticos Aleatórios
    const randomEvent = Math.random();
    if (randomEvent < 0.35) {
        gameState.moisture -= 15;
        eventLog += " ☀️ Uma onda de calor atípica atingiu a região!";
    } else if (randomEvent < 0.6) {
        gameState.health -= 12;
        eventLog += " 🐛 Alerta! Foco de pragas identificado nas bordas da propriedade!";
    } else if (randomEvent > 0.85) {
        gameState.moisture = Math.min(100, gameState.moisture + 20);
        eventLog += " 🌧️ Chuva leve e benéfica caiu sobre a plantação!";
    }

    // Regras de Punição
    if (gameState.moisture < 25) {
        gameState.health -= 20;
        eventLog += " ⚠️ Solo muito seco! A planta está sofrendo estresse hídrico!";
    } else if (gameState.moisture > 90) {
        gameState.health -= 10;
        eventLog += " 🌊 Solo encharcado! Risco de asfixia radicular.";
    }

    if (gameState.health < 0) gameState.health = 0;

    gameState.day++;
    updateUI();

    if (gameState.day > 5 || gameState.health <= 0) {
        finishGame();
    } else {
        eventTextEl.innerText = eventLog;
    }
}

// Tela Final de Pontuação
function finishGame() {
    actionButtonsEl.classList.add('hidden');
    resultScreenEl.classList.remove('hidden');

    if (gameState.health >= 75) {
        resultTitleEl.innerText = "🏆 Colheita Recorde!";
        resultDescEl.innerText = `Parabéns! Sua gestão sustentável resultou em uma saúde final de ${gameState.health}% e um caixa residual de R$ ${gameState.budget}.`;
    } else if (gameState.health > 30) {
        resultTitleEl.innerText = "🌾 Colheita Moderada";
        resultDescEl.innerText = `Sua safra foi concluída com ${gameState.health}% de saúde. Com um monitoramento mais preciso, você pode alcançar resultados ainda melhores!`;
    } else {
        resultTitleEl.innerText = "❌ Perda de Safra";
        resultDescEl.innerText = `A lavoura sofreu devido ao estresse e falhas de manejo. Tente equilibrar melhor o custo e a irrigação na próxima!`;
    }
}

// Reiniciar a Partida
function resetGame() {
    gameState = {
        day: 1,
        health: 100,
        moisture: 60,
        budget: 1000
    };
    actionButtonsEl.classList.remove('hidden');
    resultScreenEl.classList.add('hidden');
    eventTextEl.innerText = "☀️ O dia começou ensolarado na sua propriedade. As plantas precisam de cuidados. Qual é o seu plano de ação?";
    updateUI();
}

document.addEventListener('DOMContentLoaded', updateUI);
