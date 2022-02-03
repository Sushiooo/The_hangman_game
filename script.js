var words = [
    'abricot','airelle','amande','ananas','avocat',
    'banane','cassis','cerise','chataigne','citron',
    'clementine','coing','datte','figue','fraise',
    'fraise des bois','framboise','fruitdelapassion','grenade','groseille',
    'kiwi','litchi','mandarine','marron','melon',
    'myrtille','mure','nectarine','noisette','noix',
    'orange','pamplemousse','papaye','pasteque','peche',
    'poire','pomme','prune','quetsche','raisin',
    'tomate','tomate charnue','tomate peretti','ail','artichaut',
    'asperge','aubergine','avocat','bette','betterave',
    'blette','brocoli','carotte','catalonia','celeri',
    'champignon','chou-fleur','choux','citrouille','concombre',
    'courge','courgette','cresson','crosne','dachine',
    'feve','flageolet','giromon','haricot','igname',
    'daikon','echalote','endive','epinard','fenouil',
    'mais','manioc','navet','oignon','olive',
    'kancon','kombu','laitue','lentille','mache',
    'harmonica','harpe','hochet','jeu de timbre','kacapi',
    'oseille','panais','patate','patisson','petit pois',
    'poireau','poivron','pomme de terre','potimarron','potiron',
    'radis','rhubarbe','roquette','rutabaga','salade',
    'salsifi','salsifis','tetragone','tomate','topinambour',
    'udo','vitelotte','wakame','wasabi','yacon',
    'yin tsoi','agneau','biche','boeuf','caille',
    'canard','cheval','chevreuil','dinde','lapin',
    'mouton','pintade','porc','poulet','sanglier',
    'veau','accordeon','appeau','banjo','batterie',
    'bawu','biwa','bouteille','carillon','castagnettes',
    'clarinette','clavecin','cloche','contrebasse','cornemuse',
    'cuillers','cymbale','diapason','eoliphone','euphonium',
    'flute','fouet','grosse caisse','guitare','guitare electrique',
    'kazoo','klaxon','luth','lyre','orgue',
    'piano','piano a queue','pipeau','planche a laver','saxophone',
    'scie musicale','synthetiseur','tambour','tam-tam',
    'trombone','triangle','trompette','ukulele','violon',
    'xylophone','afrotrap','beatbox','black metal','blues',
    'c-pop','cloud rap','dance-punk','deathcore','disco',
    'drill','eurobeat','eurodisco','folk','freestyle',
    'glitch','gospel','hard rock','hardbass','hip-hop',
    'indie pop','jazz','metal','rap','rnb',
    'rock','zumba','zouk','techno','samba',
    'minecraft','grand thef auto','tetris','wii sports','playerunknowns battlegrounds',
    'mario kart','red dead redemption','animal crossing','pokemon','call of duty black ops',
    'super mario bros','diablo iii','the elder scroll','terraria','duck hunt',
    'the legend of zelda breath of the wild','super smash bros','fifa', 'nintendogs', 'borderlands 2',
    'god of war',
    'avatar','avengers endgame','titanic','star wars vii','avengers infinity war',
    'spiderman','jurrasic world','le roi lion','avengers','fast and furious',
    'la reine des neiges ii','black panther','harry potter','la belle et la bete','les indestructibles',
    'iron man','les minions','aquaman','captain marvel','skyfall',
    'transformers','joker','the dark knight rises','toy story','aladdin',
    'le monde de dory','zootopie','le hobbit','alice au pays des merveilles'
];

var hangman = [
{from: [70, 38], to: [72, 46]},
{from: [70, 38], to: [68, 46]},
{from: [70, 45], to: [72, 55]},
{from: [70, 45], to: [68, 55]},
{from: [70, 35], to: [70, 45]},
{circle: [70, 30], radius: 2},
{from: [70, 5], to: [70, 25]},
{from: [30, 5], to: [70, 5]},
{from: [30, 95], to: [30, 5]},
{from: [1, 95], to: [99, 95]}
];

var word, currentWord, guessesLeft, guessed;
generateWord();
function generateWord() {
currentWord = [], guessesLeft = 10, guessed = [];
document.querySelector('.guessesLeft').querySelector('span').innerHTML = guessesLeft;
document.querySelector('.guessed').querySelector('span').innerHTML = '';
document.querySelector('input').style.display = null;
document.querySelector('button').style.display = 'none';
document.querySelector('.hangman').innerHTML = '';
word = words[Math.floor(Math.random() * words.length)];
console.log(word);
let html = '';
for (let i = 0; i < word.length; i++) {
if (word[i] == ' ') {
currentWord[i] = word[i];
html += '<span class="hidden" style="border:none;"></span>';
} else html += '<span class="hidden"></span>';
}
document.querySelector('.word').innerHTML = html;
}


document.querySelector('input').addEventListener('change', function() {
if (this.value !== "" && this.value !== " ") {
if (this.value.length > 1) {
if (this.value.length !== word.length) alert('Ta reponse ne possede pas la meme longueur que le mot donne.');
else if (this.value == word) {
for (let i = 0; i < word.length; i++) {
document.querySelector('.word').querySelectorAll('span')[i].innerHTML = word[i];
}
finish();
}
else {
drawHangman();
drawHangman();
fadeColor('');
}
} else if (this.value.match(/^[A-Za-z]+$/)) {
let alreadyGuessed = false;
for (let i = 0; i < guessed.length; i++) {
if (guessed[i] === this.value.toLowerCase()) {
alreadyGuessed = true;
break;
}
}
if (!alreadyGuessed) {
guessed.push(this.value.toLowerCase());
let wordHasLetter = false;
for (let i = 0; i < word.length; i++) {
if (word[i] === this.value.toLowerCase()) {
wordHasLetter = true;
document.querySelector('.word').querySelectorAll('span')[i].innerHTML = word[i];
currentWord[i] = word[i];
}
}
if (!wordHasLetter) {
drawHangman();
let guessedElem = document.querySelector('.guessed').querySelector('span');
if (guessedElem.innerHTML == '') guessedElem.innerHTML = this.value.toUpperCase();
else guessedElem.innerHTML += ', ' + this.value.toUpperCase();
} else fadeColor('#35c435');
} else alert('Tu as deja donné cette lettre!');
if (currentWord.join('') === word) finish();
} else alert('Veuillez ne mettre que des lettres');
this.value = '';
if (guessesLeft <= 0) {
guessesLeft = 0;
for (let i = 0; i < word.length; i++) {
if (document.querySelector('.word').querySelectorAll('span')[i].innerHTML == '') {
document.querySelector('.word').querySelectorAll('span')[i].style.color = 'red';
document.querySelector('.word').querySelectorAll('span')[i].innerHTML = word[i];
}
}
fadeColor('#ff2929');
alert('Tu as perdu :<');
document.querySelector('input').style.display = 'none';
document.querySelector('button').style.display = null;
stats.streak = 0;
stats.scores.push(0);
setScore();
}
document.querySelector('.guessesLeft').querySelector('span').innerHTML = guessesLeft;
}
});


function finish() {
var wrongGuesses = (10 - guessesLeft);
var rightGuesses = guessed.length - wrongGuesses;
var rightGuesses = word.length;
let score = Math.floor((rightGuesses / (wrongGuesses + rightGuesses)) * 100) || 100;
alert('Congratulations! Score: ' + score + '%');
stats.streak++;
stats.scores.push(score);
setScore();

fadeColor('lightblue');
document.querySelector('input').style.display = 'none';
document.querySelector('button').style.display = null;
}

document.querySelector('button').addEventListener('click', generateWord);
function setScore() {
let score = '-';
for (let i = 0; i < stats.scores.length; i++) {
if (score == '-') score = 0;
score += stats.scores[i];
}
if (score !== '-') score = Math.floor(score / stats.scores.length) + '%';
document.querySelector('.streak').innerHTML = stats.streak;
document.querySelector('.score').innerHTML = score;
localStorage.hangman = JSON.stringify(stats);
}
function drawHangman() {
guessesLeft--;
let part = hangman[guessesLeft];

let hangmanLines = document.querySelector('.hangman').querySelectorAll('svg');
for (let i = 0; i < hangmanLines.length; i++) {
hangmanLines[i].children[0].classList.remove('draw');
}

let svg;
if (part.circle == undefined) {
svg = '<svg><line class="draw" x1="' + part.from[0] + '%" y1="' + part.from[1] + '%" x2="' + part.to[0] + '%" y2="' + part.to[1] + '%"/></svg>';
} else {
svg = '<svg><circle class="draw" cx="' + part.circle[0] + '%" cy="' + part.circle[1] + '%" r="' + part.radius + '%"/></svg>';
}

document.querySelector('.hangman').innerHTML += svg;
}