const content = document.querySelector('.content-box');
const newWord = document.querySelector('.word');
const definition = document.querySelector('.definition');

//buttons
const saveBtn = document.querySelector('#save-btn');
const nextBtn = document.querySelector('#next-btn');

//addEventListeners
nextBtn.addEventListener('click', nextWord);
saveBtn.addEventListener('click', saveWord);

//global Variables
let id = 0;

async function generateRandomWords (){
    try {
        const result = await fetch('https://random-words-api.vercel.app/word');
        const data = await result.json();
        newWord.innerText = data[0].word;
        definition.innerText = data[0].definition;
        return;
    } catch (error) {
        return error
    }
}


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
    //check if word already exist, if so, return 
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
        //if word doesn't exist, push into wordsArray and add wordsarray into localStorage
        if(isWordTheSame === false){
             id++;
             wordsArray.push(WordStorage);
             localStorage.setItem('savedWords', JSON.stringify(wordsArray));
        }
    //this was added for the when the Array addes its first element            
   }else{
    id++;
    wordsArray.push(WordStorage);
    localStorage.setItem('savedWords', JSON.stringify(wordsArray));
   }
   saveBtn.classList.add('button-disabled');
}
