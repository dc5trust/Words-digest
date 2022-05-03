const newWord = document.querySelector('.word');
const definition = document.querySelector('.definition');


export async function generateRandomWords (){
    const result = await fetch('https://random-words-api.vercel.app/word');
    const data = await result.json();
    newWord.innerText = data[0].word;
    definition.innerText = data[0].definition;
    console.log('hello')
    return console.log(data[0]);
}

export function double (n){
    return 2 * n;
}