console.log('hello World');
const content = document.querySelector('.content-box');
const newWord = document.querySelector('.word');
const pronunciation = document.querySelector('.pronunciation')
const definition = document.querySelector('.definition');

async function generateRandomWords (){
    const result = await fetch('https://random-words-api.vercel.app/word');
    const data = await result.json();

    content.innerText = data[0].pronunciation;
    //data[0].word
    //data[0].defintiion
    //data[0].pronunciation
    return console.log(data[0]);
}

// generateRandomWords();