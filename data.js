//Local Storage
const data = JSON.parse(localStorage.getItem('savedWords'));

//QuerySelectors
const listContainer = document.querySelector('.list-container');
const studyBtn = document.querySelector('.study');
const deleteBtn = document.querySelector('.delete-btn');
const items = document.querySelectorAll('.item');
const wordListTitle = document.querySelector('.title-list');

//flip, Next, Previous Buttons within the 'study' subsection
const flipBtn = document.querySelector('.flip');
const nextBtn = document.querySelector('.next-flash-card');
const prevBtn = document.querySelector('.previous-flash-card')
const studyListBtnContainer = document.querySelector('.flash-card-btn-container');

//AddEventlisteners 
listContainer.addEventListener('click', studyFunctionality);
studyBtn.addEventListener('click', studyCards);

//Global Variables
let currentWordIndex = 0;

// localStorage.clear();
function createListFromWordsArray(){
    if(data === null ) return
    data.forEach((word)=>{
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
    // if(e.target.classList[0] !== 'delete-btn') return 
    if(e.target.classList[0] === 'delete-btn'){
        deleteWord(e);
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
        word.setAttribute('class', `item ${index}`);
    });
}

function studyCards(){
    //if localstorage is empty return
    if(data.length === 0) return 
    
    //delete all items in the container to prep for the study card
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
    newflipBtn.innerText = 'FLIP TO DEFINITION';
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
    studyBtn.style.opacity = 0;
    studyBtn.style.pointerEvents = 'none';
    //hide the word List title 
    wordListTitle.style.opacity = 0;
}

function flipCard(){
    const wordLocation = document.querySelector('.flash-word');
    //if data array is empty return
    if(data.length === 0) return

    //find current location index 
    wordLocation.innerText = data[currentWordIndex].word;
    //if a word is displayed switch to definition
    if(wordLocation.classList[1] === 'word'){
        wordLocation.classList.remove('word');
        wordLocation.classList.add('definition');
        wordLocation.innerText = data[currentWordIndex].definition;
        document.querySelector('.flip').innerText = 'FLIP TO WORD';
    
        //if a definition is displayed switch to word
    }else if(wordLocation.classList[1] === 'definition'){
        wordLocation.classList.remove('definition');
        wordLocation.classList.add('word');
        wordLocation.innerText = data[currentWordIndex].word;
        document.querySelector('.flip').innerText = 'FLIP TO DEFINITION';
    }
}

function nextCard(){
    //check if end of array has been reached, if so disable the next button 
    if(currentWordIndex === data.length-1){
        document.querySelector('.next-flash-card').classList.add('button-disabled');
    }
    //re-enable the previous button that might of been disabled 
    const prevBtn = document.querySelector('.previous-flash-card');
    prevBtn.classList.remove('button-disabled');
    if(currentWordIndex < data.length-1){
        const wordLocation = document.querySelector('.flash-word');
        currentWordIndex++;
        wordLocation.innerText = data[currentWordIndex].word;
        if(wordLocation.classList[1] === 'word') return 
        wordLocation.classList.remove('definition');
        wordLocation.classList.add('word');
        document.querySelector('.flip').innerText = 'FLIP TO DEFINITION';
    }else return
    
}

function previousCard(){
    if(currentWordIndex === 0){
        document.querySelector('.previous-flash-card').classList.add('button-disabled');
    }
    const nextBtn = document.querySelector('.next-flash-card');
    nextBtn.classList.remove('button-disabled');
    if(currentWordIndex > 0){
        const wordLocation = document.querySelector('.flash-word');
        currentWordIndex--;
        wordLocation.innerText = data[currentWordIndex].word;
        if(wordLocation.classList[1] === 'word') return 
        wordLocation.classList.remove('definition');
        wordLocation.classList.add('word');
        document.querySelector('.flip').innerText = 'FLIP TO DEFINITION';
    }else return 
}

function deleteWord(e){
    //each item has an ID and this will be used with splice() to locate the item within the array
    reorganizedItemIds();
    let itemSelected = e.target.parentElement;
    //index of item added (taken from the ID that was added as a class)
    let indexOfSelected = itemSelected.classList[1];
    //delete the specific index location using the ID that was added
    data.splice(indexOfSelected, 1);
    //re-add altered array back into local storage
    localStorage.setItem('savedWords', JSON.stringify(data));
    itemSelected.remove();
}
