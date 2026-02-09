// Get the speech synthesis instance
const synth = window.speechSynthesis;
let list = document.getElementById('list')
let text = document.getElementById('text')
// This will store the voices
let voices = [];



// Function to load voices
function loadVoices() {
    voices = synth.getVoices();




    for (const key of voices) {


        let option = document.createElement('option')
        option.value = `${key.lang}`
        option.textContent = `${key.name}`
        list.appendChild(option)








    }



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