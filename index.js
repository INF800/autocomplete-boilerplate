const input = document.getElementById("input")
const suggestion = document.getElementById("suggestion")

const debounce = (func, delay) => {
    let inDebounce
    return function() {
        const context = this
        const args = arguments
        suggestion.textContent = '' // avoid appearing old suggestion
        clearTimeout(inDebounce)
        inDebounce = setTimeout(() => func.apply(context, args), delay)
    }
}

input.addEventListener('input', debounce(e=>main(e), 750))

const main = (e) => {
    const inputVal = e.target.textContent 
    const suggest = " word 1 word2 word3"
    suggestion.textContent = inputVal + suggest
}

input.addEventListener('keydown', e => {
    if(e.key === 'ArrowRight') {
        if (suggestion.textContent != '') { // avoid rclick while no suggestion
        // replace input textecontent with suggestion ghost sentence(or paragraph)
        const ghost = suggestion.textContent
        suggestion.textContent = ''; // clear ghost 
        input.textContent = ghost; // replace input with suggestion
        
        // moves cursor to the end of the input box
        setEndOfContenteditable(input);
        } 
    }
});



// ------------------------------------------------------------
// Helper function(s)
// ------------------------------------------------------------
// moves cursor to the end of the input box
function setEndOfContenteditable(contentEditableElement)
{
    //input : elem = document.getElementById('txt1')

    var range,selection;
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
    else if(document.selection)//IE 8 and lower
    { 
        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }
}