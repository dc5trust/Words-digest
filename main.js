// import {double, generateRandomWords} from './utils.js';


const content = document.querySelector('.content-box');
const newWord = document.querySelector('.word');
// const pronunciation = document.querySelector('.pronunciation')
const definition = document.querySelector('.definition');

//buttons
const saveBtn = document.querySelector('#save-btn');
const nextBtn = document.querySelector('#next-btn');
//list 


//addEventListeners
nextBtn.addEventListener('click', nextWord);
saveBtn.addEventListener('click', saveWord);

//global Variables


let id = 0;

async function generateRandomWords (){
    const result = await fetch('https://random-words-api.vercel.app/word');
    const data = await result.json();
    newWord.innerText = data[0].word;
    definition.innerText = data[0].definition;
    return;
}

// generateRandomWords();

//hit the next button
function nextWord(){
    generateRandomWords();
    saveBtn.style.pointerEvents = 'auto';
    saveBtn.classList.remove('button-disabled');
}

function saveWord(){
   let wordsArray;
   if(localStorage.getItem('savedWords')=== null){
       wordsArray = [];
   }else{
       wordsArray = JSON.parse(localStorage.getItem('savedWords'));
   }
    //check if word already exist, if so, return 'do nothing' 
   let isWordTheSame = false;
   let WordStorage = {word: newWord.innerText , definition: definition.innerText, index: id };
   if(wordsArray.length !== 0){
        wordsArray.forEach((word)=>{
            //check if word already exists 
            if(word.word === WordStorage.word){
                isWordTheSame = true;
                return; 
            }
        });
        
        if(isWordTheSame === false){
             id++;
             wordsArray.push(WordStorage);
             console.log(wordsArray.length);
             localStorage.setItem('savedWords', JSON.stringify(wordsArray));
        }
               
   }else{
    id++;
    wordsArray.push(WordStorage);
    localStorage.setItem('savedWords', JSON.stringify(wordsArray));
   }
   saveBtn.classList.add('button-disabled');
}

function checkLocalStorage(){
    if(localStorage.getItem('savedWords') === null){
        return [];
    }else {
        return wordsArray = JSON.parse(localStorage.getItem('savedWords'))
    }
}