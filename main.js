//References to DOM Elements
const prevBtn = document.getElementById('myButton');
const nextBtn= document.getElementById('myButton2');
const resetBtn = document.getElementById('restbutton');
const book = document.getElementById('book');

const papers = Array.from(document.querySelectorAll('.paper'));



//Event Listeners
prevBtn.addEventListener('click', goPrevPage);
nextBtn.addEventListener('click', goNextPage);
resetBtn.addEventListener('click', goToStart);

//Business Logic
let currentLocation = 1;
let numOfPapers = papers.length; // Assuming 'papers' is defined elsewhere in your code
let maxLocation = numOfPapers + 1;

function openBook(){
    book.style.transform = "translateX(50%)";
    prevBtn.style.transform = "translateX(-180px)";
    nextBtn.style.transform = "translateX(180px)";

}

function closeBook(isATBeginning) {
    if(isATBeginning) {
         book.style.transform = "translateX(0%)";
    } else {
         book.style.transform = "translateX(100%)";
    }

    prevBtn.style.transform = "translateX(0px)";
    nextBtn.style.transform = "translateX(0px)";

}

function goNextPage() { 
    if(currentLocation < maxLocation) {
        if (currentLocation === 1) { openBook(); } 
        let paper = papers[currentLocation - 1];
        paper.classList.add("flipped");
        paper.style.zIndex = currentLocation;
        if (currentLocation === numOfPapers) { 
                closeBook(false);
        }
        currentLocation++;
     }     
            
}
    


function goPrevPage() {
    if(currentLocation > 1) {
        currentLocation--;
        let paper = papers[currentLocation - 1];
        paper.classList.remove("flipped");
        paper.style.zIndex = numOfPapers - (currentLocation - 1);
        if (currentLocation === 1) {
            closeBook(true); 
        } else if (currentLocation === numOfPapers) {
            openBook();
        }
    }
}

function goToStart() {
    book.classList.add("fast-reset");
    let autoBack = setInterval(() => {
        if (currentLocation === 1) {
            clearInterval(autoBack);
            book.classList.remove("fast-reset");
        } else {
            goPrevPage();
        }
    }, 175); // Adjust the interval time as needed
}
