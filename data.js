//Local Storage
const data = JSON.parse(localStorage.getItem('savedWords'));

//QuerySelectors
const listContainer = document.querySelector('.list-container');
const studyBtn = document.querySelector('.study');
const deleteBtn = document.querySelector('.delete-btn');
const items = document.querySelectorAll('.item');

//addEventlisteners 
listContainer.addEventListener('click', deleteWordFromList);
studyBtn.addEventListener('click', studyCards);

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

function deleteWordFromList(e){
    if(e.target.classList[0] !== 'delete-btn') return 
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
    //delete items
    const items = document.querySelectorAll('.item');
    items.forEach((item, index)=>{
        item.remove();
    });
    //create 
}
