const synth = window.speechSynthesis;
let profile = document.querySelector(".profile");
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

  synth.speak(utterThis);
}
