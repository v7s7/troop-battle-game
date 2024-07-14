function startBattle() {
    const attackers = parseInt(document.getElementById('attackers').value);
    const defenders = parseInt(document.getElementById('defenders').value);
    let stopAt = parseInt(document.getElementById('stopAt').value);

    if (isNaN(attackers) || isNaN(defenders) || attackers < 2 || defenders < 1) {
        alert('Please enter valid numbers. Attackers must be at least 2 and defenders must be at least 1.');
        return;
    }

    if (isNaN(stopAt) || stopAt < 1) {
        stopAt = 1;
        document.getElementById('stopAt').value = stopAt;
    }

    let attackerTroops = attackers;
    let defenderTroops = defenders;
    let summaryText = '';
    let detailsText = '';
    let round = 1;

    while (attackerTroops > stopAt && attackerTroops > 1 && defenderTroops > 0) {
        detailsText += `<div class="round"><strong>Round ${round}</strong></div>`;
        detailsText += `<div>Attackers: ${attackerTroops}, Defenders: ${defenderTroops}</div>`;

        const attackRolls = rollDice(Math.min(3, attackerTroops - 1));
        const defendRolls = rollDice(Math.min(2, defenderTroops));

        detailsText += `<div class="dice-rolls">Attack Rolls: ${displayRolls(attackRolls)}</div>`;
        detailsText += `<div class="dice-rolls">Defend Rolls: ${displayRolls(defendRolls)}</div>`;

        const battles = Math.min(attackRolls.length, defendRolls.length);

        for (let i = 0; i < battles; i++) {
            if (attackRolls[i] > defendRolls[i]) {
                defenderTroops--;
            } else {
                attackerTroops--;
            }
        }

        round++;
    }

    if (attackerTroops > 1 && attackerTroops > stopAt) {
        summaryText += `<div class="round"><strong>Attackers win!</strong></div>`;
    } else {
        summaryText += `<div class="round"><strong>Defenders win!</strong></div>`;
    }
    
    summaryText += `<div>Attacking troops left: ${attackerTroops}</div>`;
    summaryText += `<div>Defending troops left: ${defenderTroops}</div>`;
    summaryText += `<div>Battle finished in ${round - 1} rounds.</div>`;

    document.getElementById('summary').innerHTML = summaryText;
    document.getElementById('details').innerHTML = detailsText;
    document.getElementById('detailsToggle').style.display = 'block';
}

function rollDice(count) {
    const rolls = [];
    for (let i = 0; i < count; i++) {
        rolls.push(Math.floor(Math.random() * 6) + 1);
    }
    return rolls.sort((a, b) => b - a);
}

function displayRolls(rolls) {
    return rolls.map(roll => `<div class="dice">${roll}</div>`).join('');
}

function toggleDetails() {
    const details = document.getElementById('details');
    const button = document.getElementById('detailsToggle');
    if (details.style.display === 'none') {
        details.style.display = 'block';
        button.textContent = 'Hide Details';
    } else {
        details.style.display = 'none';
        button.textContent = 'Show Details';
    }
}
