const button = document.getElementById("play");
const running = document.getElementById("running");
const guess = document.getElementById("guess");

const highs = document.getElementsByClassName('high');
const lows = document.getElementsByClassName('low');
const rigth = document.getElementsByClassName('rigth');
const result = document.getElementById('result');

const player = document.getElementById('name');
const rank = document.getElementById('rank');

let answer = 0;
let tries = 0;

let ranking = JSON.parse(localStorage.getItem('ranking')) ?? [];

function startRank(){
    if(ranking[0])
        rank.innerHTML = `<h2>1. ${ranking[0].player}: ${ranking[0].tries}</2>`;
    if(ranking[1])
        rank.innerHTML += `<h2>2. ${ranking[1].player}: ${ranking[1].tries}</2>`;
    if(ranking[2])
        rank.innerHTML += `<h2>3. ${ranking[2].player}: ${ranking[2].tries}</2>`;
}
startRank();

function reset(){
    highs[0].style.display = 'none';
    highs[1].style.display = 'none';
    lows[0].style.display = 'none';
    lows[1].style.display = 'none';
    rigth[0].style.display = 'none';
    rigth[1].style.display = 'none';
    player.style.display = 'none';
    result.innerText = '';
    player.value = '';
    guess.value = '';
}

function start(){
    button.classList.add('retry');
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="#f1f1f1" height="1em" viewBox="0 0 512 512"><path d="M386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H464c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z"/></svg>'

    running.style.display = 'flex';
    
    answer = parseInt(Math.random() * 1001);
    console.log(answer);
    tries = 0;
    reset();
}

button.addEventListener('click', start);

guess.addEventListener('change', () => {

    if(/^\d+$/.test(guess.value)){
        tries += 1;

        let value = Number(guess.value);
        reset();

        if (value < answer) {
            highs[0].style.display = 'block';
            highs[1].style.display = 'block';
            result.innerText = `Try a number greater than ${value}`;
            return;
        }
        if (value > answer){
            lows[0].style.display = 'block';
            lows[1].style.display = 'block';
            result.innerText = `Try a number less than ${value}`;
            return;
        }
        rigth[0].style.display = 'block';
        rigth[1].style.display = 'block';
        result.innerText = `You guess ${value} in ${tries} tries!!`;

        if(ranking.length < 3 || ranking[2].tries > tries)
            player.style.display = 'block';
    }
});

player.addEventListener('change', () => {

    const infos = {
        'player': player.value,
        'tries': tries 
    };

    switch (ranking.length) {
        case 0:
            ranking.push(infos);
            break;

        case 1:
            if(ranking[0].tries > tries){
                ranking.splice(0,0,infos);
                break;
            }
            ranking.push(infos);
            break;

        case 2:
            if(ranking[0].tries > tries){
                ranking.splice(0,0,infos);
                break;
            }
            if(ranking[1].tries > tries){
                ranking.splice(1,0,infos);
                break;
            }
            ranking.push(infos);
            break;

        case 3:
            if(ranking[0].tries > tries){
                ranking.splice(0,0,infos);
                ranking.pop();
                break;
            }
            if(ranking[1].tries > tries){
                ranking.splice(1,0,infos);
                ranking.pop();
                break;
            }
            ranking.splice(2,1,infos);
            break;
    }

    localStorage.setItem('ranking', JSON.stringify(ranking));
    startRank();
    start();
});