//Local Storage
const data = JSON.parse(localStorage.getItem('savedWords'));

//QuerySelectors
const listContainer = document.querySelector('.list-container');
const studyBtn = document.querySelector('.study');
const deleteBtn = document.querySelector('.delete-btn');
const items = document.querySelectorAll('.item');

//flip, Next, Previous Buttons within the 'study' subsection
//switch this to target addeventlistener, add it to .list-container ********
const flipBtn = document.querySelector('.flip');
const nextBtn = document.querySelector('.next-flash-card');
const prevBtn = document.querySelector('.previous-flash-card')
const studyListBtnContainer = document.querySelector('.flash-card-btn-container');
//addEventlisteners 
listContainer.addEventListener('click', studyFunctionality);
// studyListBtnContainer.addEventListener('click', studyFunctionality);

studyBtn.addEventListener('click', studyCards);
// flipBtn.addEventListener('click', flipCard);
// nextBtn.addEventListener('click', nextCard);
//Global Variables
let currentWordIndex = 0;

// localStorage.clear();
function createListFromWordsArray(){
    if(data === null ) return
    data.forEach((word)=>{
        //create item
        // word.index
        const newItem = document.createElement('div');
        newItem.setAttribute('class', `item ${word.index}`);
        //create location to insert word & button
        const newDeleteBtn = document.createElement('button')
        newDeleteBtn.innerText = 'delete';
        newDeleteBtn.setAttribute('class', 'delete-btn');

        const newWordLocation = document.createElement('div');
        newWordLocation.setAttribute('class', 'item-content');

        //insert item from wordsArray
        newWordLocation.innerText = word.word;
        newItem.append(newWordLocation);
        newItem.append(newDeleteBtn);
        listContainer.append(newItem);
    })
}
createListFromWordsArray();

function studyFunctionality(e){
    console.log(e.target.classList[0]);
    // if(e.target.classList[0] !== 'delete-btn') return 
    if(e.target.classList[0] === 'delete-btn'){
        console.log(e.target.parentElement);
        //each item has an ID and this will be used with splice() to locate the item within the array
        reorganizedItemIds();
        let itemSelected = e.target.parentElement;
        //index of item added 
        let indexOfSelected = itemSelected.classList[1];
        console.log(indexOfSelected, 'index of selected');
        data.splice(indexOfSelected, 1);
        
        localStorage.setItem('savedWords', JSON.stringify(data));
        itemSelected.remove();
    }else if(e.target.classList[0] === 'flip'){
        flipCard();
    }else if(e.target.classList[0] === 'previous-flash-card'){
        previousCard()
    }else if(e.target.classList[0] === 'next-flash-card'){
        nextCard();
    }
}

//reorganizing id's allows us to keep track of index location of item. 
function reorganizedItemIds(){
    const items = document.querySelectorAll('.item');
    items.forEach((word, index)=>{
        console.log(index);
        word.setAttribute('class', `item ${index}`);
    });
}

function studyCards(){
    //localstorage is empty return
    if(data.length === 0) return 
    //delete items
    const items = document.querySelectorAll('.item');
    items.forEach((item, index)=>{
        item.remove();
    });
    //create a study location with CSS 
    const newflipBtn = document.createElement('button');
    const newNextBtn = document.createElement('button');
    const newPreviousBtn = document.createElement('button');
    //the physical study card
    const newStudyCard = document.createElement('div');
    //this where the word is appended
    const newWordLocation = document.createElement('h3');
    //this holds both the flip & previous/next containers
    const newFlashBtnContainer = document.createElement('div');
    //this holds the flip button 
    const newFlipBtnContainer = document.createElement('div');
    //this holds previous & next buttons
    const newFlashCardInnerContainer = document.createElement('div');
    //flash card get added to list-container 
    newStudyCard.setAttribute('class', 'flash-card');
    listContainer.append(newStudyCard);
    //add word location to study card
    newWordLocation.setAttribute('class', 'flash-word word');
    newStudyCard.append(newWordLocation);
    newWordLocation.innerText = data[0].word;
    
    newFlashBtnContainer.setAttribute('class', 'flash-card-btn-container');
    listContainer.append(newFlashBtnContainer);
    newFlipBtnContainer.setAttribute('class', 'flip-btn-inner-container');
    newFlashBtnContainer.append(newFlipBtnContainer);

    newflipBtn.setAttribute('class', 'flip');
    newflipBtn.innerText = 'FLIP';
    newFlipBtnContainer.append(newflipBtn);

    newFlashCardInnerContainer.setAttribute('class', 'flash-card-btn-inner-container');
    listContainer.append(newFlashBtnContainer);
    newFlashCardInnerContainer.append(newPreviousBtn);
    newFlashCardInnerContainer.append(newNextBtn);

    listContainer.append(newFlashCardInnerContainer);

    newNextBtn.setAttribute('class', 'next-flash-card');
    newNextBtn.innerText = 'NEXT'
    newPreviousBtn.setAttribute('class', 'previous-flash-card');
    newPreviousBtn.innerText = 'PREVIOUS'

    //hide the study button and reveal the study button after 

    studyBtn.setAttribute('style', 'opacity: 0');
}

// localStorage.clear(); 



function flipCard(){
    const wordLocation = document.querySelector('.flash-word');

    if(data.length === 0) return

    data.forEach((word)=>{
        console.log(word);
    });
    //find current location index 
    wordLocation.innerText = data[currentWordIndex].word;
    console.log(wordLocation.classList[1]);
    
    
    if(wordLocation.classList[1] === 'word'){
        wordLocation.classList.remove('word');
        wordLocation.classList.add('definition');
        wordLocation.innerText = data[currentWordIndex].definition;
        //if word flip to definition
    }else if(wordLocation.classList[1] === 'definition'){
        wordLocation.classList.remove('definition');
        wordLocation.classList.add('word');
        //if definition flip to word 
        wordLocation.innerText = data[currentWordIndex].word;
    }
    
}

function nextCard(){
    //set currentWordIndex limit depending on the size of the array
    
    console.log(data.length);
    console.log(currentWordIndex);
    if(currentWordIndex < data.length-1){
        const wordLocation = document.querySelector('.flash-word');
        currentWordIndex++;
        wordLocation.innerText = data[currentWordIndex].word;
    }else return
    
}

function previousCard(){

}