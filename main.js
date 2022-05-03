// import {double, generateRandomWords} from './utils.js';


const content = document.querySelector('.content-box');
const newWord = document.querySelector('.word');
// const pronunciation = document.querySelector('.pronunciation')
const definition = document.querySelector('.definition');

//buttons
const saveBtn = document.querySelector('#save-btn');
const nextBtn = document.querySelector('#next-btn');
//list 
const listContainer = document.querySelector('.list-container');

//addEventListeners
nextBtn.addEventListener('click', nextWord);
saveBtn.addEventListener('click', saveWord);

//word Array 
const wordsArray = [];

async function generateRandomWords (){
    const result = await fetch('https://random-words-api.vercel.app/word');
    const data = await result.json();
    newWord.innerText = data[0].word;
    definition.innerText = data[0].definition;
    return console.log(data[0]);
}

generateRandomWords();

//hit the next button
function nextWord(){
    generateRandomWords();
}

function saveWord(){
   let WordStorage = {word: newWord.innerText , definition: definition.innerText};
   wordsArray.push(WordStorage);
}
//pull a new word, disgard the old word 

//'hit the save button' 

//'create the list of saved

function createListFromWordsArray(){
    wordsArray.forEach((word)=>{
        //create item
        const newItem = document.createElement('div');
        newItem.setAttribute('class', 'item');
        //create location to insert word & button
        const newDeleteBtn = document.createElement('button')
        newDeleteBtn.setAttribute('class', 'delete-btn');

        const newWordLocation = document.createElement('div');
        newWordLocation.setAttribute('class', 'item-content');
        //insert item from wordsArray

    })
}