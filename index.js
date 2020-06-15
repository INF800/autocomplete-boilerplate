const input = document.getElementById("input")

input.addEventListener('input', e => {
    console.log("hii")
    const inputVal = document.getElementById("input").innerHTML
    const suggest =  inputVal + " This was suggested"
    document.getElementById("suggestion").innerHTML = suggest
});