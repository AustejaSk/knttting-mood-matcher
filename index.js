import { patternsData } from "/data.js"

const moodsRadios = document.getElementById("moods-radios")
const findPatternBtn = document.getElementById("find-pattern-btn")
const patternModal = document.getElementById("pattern-modal")
const patternModalInner = document.getElementById("pattern-modal-inner")
const patternModalCloseBtn = document.getElementById("pattern-modal-close-btn")

moodsRadios.addEventListener("change", highlightCheckedOption)

patternModalCloseBtn.addEventListener("click", closeModal)

findPatternBtn.addEventListener("click", renderPattern)


function highlightCheckedOption(e){
    const radios = document.getElementsByClassName("radio")
    for(let radio of radios){
        radio.classList.remove("highlight")
    }
    document.getElementById(e.target.id).parentElement.classList.add("highlight")
}

function closeModal(e){
    patternModal.style.display = 'none'
}

function renderPattern(){
    const patternObject = getSinglePatternObject()
    patternModalInner.innerHTML = `
        <h1 class="pattern-title">${patternObject.name}</h1>
        <img 
            class="pattern-image" 
            src="/images/${patternObject.image}"
            alt="${patternObject.alt}"
        >
        <p>You will be directed to an external site for your personalized knitting pattern.</p>
        <a 
            class="buttons" 
            class="get-pattern-btn" 
            id="get-pattern-btn" 
            href="${patternObject.link}" 
            target="_blank">
            Get my pattern
        </a>
        `
    patternModal.style.display = "flex"
}

function getSinglePatternObject(){
    const patternsArray = getMatchingPattern()
    
    if(patternsArray.length === 1){
        return patternsArray[0]
    }
    
    else{
        const randomNumber = Math.floor(Math.random() * patternsArray.length)
        return patternsArray[randomNumber]
    }
}

function getMatchingPattern(){
    const selectedMood = document.querySelector('input[type="radio"]:checked').value
    const matchingPattern = patternsData.filter(function(pattern){
        return pattern.mood.includes(selectedMood)
    })
    return matchingPattern
}

function getMoodsArray(patterns){
    const moodsArray = []
    for(let pattern of patterns){
        if(!moodsArray.includes(pattern.mood)){
            moodsArray.push(pattern.mood)
        }
    }
    return moodsArray
}

function renderMoodsRadios(patterns){
    let radioItems = ``
    const moods = getMoodsArray(patterns)
    for(let mood of moods){
        radioItems += `
        <div class="radio">
            <label for="${mood}">${mood}</label>
            <input 
            type="radio"
            id="${mood}"
            value="${mood}"
            name="moods"
            >
        </div>`
    }
    moodsRadios.innerHTML = radioItems
}

renderMoodsRadios(patternsData)