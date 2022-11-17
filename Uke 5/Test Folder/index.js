let inputTxt = '';

updateView()
function updateView() {
    let html = '';
    html = `
        <div>
            <input type="text" placeholder="skriv her" onchange="setInput(this.value)"> 
            <br>
            ${inputTxt}
        </div>
        `;
        document.getElementById('app').innerHTML = html;
}

function setInput(input) {
    inputTxt = input
    updateView()
}