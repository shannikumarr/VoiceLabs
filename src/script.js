const synth = window.speechSynthesis;
let profile = document.querySelector(".profile");
const pitch = document.querySelector("#pitch");
const rate = document.querySelector("#speed");
let PITCH = parseInt(pitch.value)
let RATE = parseInt(rate.value)
console.log(PITCH,RATE);
pitch.addEventListener("change", () => {
  PITCH = pitch.value
  console.log(PITCH);

})
rate.addEventListener("change", () => {
  RATE = rate.value
  console.log(RATE);

})

let voices = [];

// Load voices
function loadVoices() {
  voices = synth.getVoices();
  profile.innerHTML = ""; // clear duplicates

  voices.forEach((voice, index) => {
    let div = document.createElement("div");
    div.classList.add("pic");

    let p1 = document.createElement("p");
    let p2 = document.createElement("p");
    let p3 = document.createElement("p");
    let span = document.createElement("span");
    span.classList.add("dot");

    p1.textContent = `Name: ${voice.name}`;
    p2.textContent = `Language: ${voice.lang}`;
    p3.textContent = `Default: ${voice.default}`;

    // click to select voice
    div.onclick = () => {
      document.querySelectorAll(".pic").forEach((el) => {
        el.classList.remove("active");
        el.children[3].innerText = "";
      });
      selectedVoice = voice;
      div.classList.add("active");
      div.children[3].innerText = "✓";
    };

    div.append(p1, p2, p3, span);
    profile.appendChild(div);
  });
}

if (typeof speechSynthesis !== "undefined") {
  speechSynthesis.onvoiceschanged = loadVoices;
}

loadVoices();

let selectedVoice = null;

function convert() {
  const textInput = document.getElementById("text").value.trim();

  if (!textInput) {
    alert("Enter some text first");
    return;
  }

  const utterThis = new SpeechSynthesisUtterance(textInput);


  if (selectedVoice) {


    utterThis.voice = selectedVoice;
  }
  utterThis.pitch = parseInt(PITCH)
  utterThis.rate = parseInt(RATE)

  synth.speak(utterThis);
}

synth.addEventListener("voiceschanged", () => {
  console.log('i run');
  loadVoices()
});