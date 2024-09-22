const nextEl = document.getElementById("next");
const prevEl = document.getElementById("prev");
const stepsEl = document.querySelectorAll(".step");
const progressEl = document.querySelector(".prgress-bar-front");

let currentChecked = localStorage.getItem('currentChecked') ? parseInt(localStorage.getItem('currentChecked')) : 1;

updateStepProgress();

nextEl.addEventListener("click", ()=> {
    currentChecked++;
    if (currentChecked > stepsEl.length) {
        currentChecked = stepsEl.length;
    }
    localStorage.setItem('currentChecked', currentChecked);
    updateStepProgress();
    
})

prev.addEventListener("click", ()=> {
    currentChecked--;
    if (currentChecked < 1) {
        currentChecked = 1;
    }
    localStorage.setItem('currentChecked', currentChecked);
    updateStepProgress();
    
})

function updateStepProgress(){
    stepsEl.forEach((stepEl, idx) => {
        if (idx < currentChecked) {
            stepEl.classList.add("checked");
            stepEl.innerHTML = `
            <i class="fa-solid fa-check"></i>
            <small>${idx === 0 ? "Start" : idx === stepsEl.length-1 ? "Final" : "Step" + idx}</small>
            `;
        }else{
            stepEl.classList.remove("checked");
            stepEl.innerHTML = `
            <i class="fa-solid fa-square-xmark"></i>
            `
        }
    });

    const checkedNumber = document.querySelectorAll(".checked");

    progressEl.style.width = ((checkedNumber.length - 1) / (stepsEl.length - 1)) * 100 + "%";

    if (currentChecked === 1) {
        prevEl.disabled = true;
    }else if (currentChecked === stepsEl.length) {
        nextEl.disabled = true;
    }else{
        prevEl.disabled = false;
        nextEl.disabled = false;
    }

}