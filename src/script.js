// Get the speech synthesis instance
const synth = window.speechSynthesis;
let profile = document.querySelector('.profile')
let pic = document.getElementsByClassName('pic')
// This will store the voices
// < div class="pic" >
//     <p id="name">name</p>
//     <p id="country">cou</p>
//     <p id="lang">lang</p>
//     <span class="dot"></span>
//   </div >
let voices = [];



// Function to load voices
function loadVoices() {
    voices = synth.getVoices();

    voices.forEach((e) => {
        let name = e.name.split(' ')[1]
        let lang = e.name.split(' ')[5]
        let country = e.name.split(' ').splice(6)


        let div = document.createElement('div')
        div.classList.add('pic')
        let p1 = document.createElement('p')
        let p2 = document.createElement('p')
        let p3 = document.createElement('p')
        let span = document.createElement('span')
        span.classList.add('dot')

        p1.textContent = `${name}`
        p3.textContent = `${country}`
        p3.textContent = `${lang}`


        div.append(p1, p2, p3, span)


        profile.appendChild(div)




    })









}

// Some browsers load voices asynchronously
if (typeof speechSynthesis !== "undefined") {
    // Event fires when voices are loaded
    speechSynthesis.onvoiceschanged = loadVoices;
}

// Call once in case voices are already loaded
loadVoices();



function convert() {

    const utterThis = new SpeechSynthesisUtterance(text.value);
    let name = list.options[list.selectedIndex].text
    for (const voice of voices) {
        if (voice.name === name) {
            utterThis.voice = voice;
            utterThis.voice = voice
        }
    }
    synth.speak(utterThis)






}