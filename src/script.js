const pitchInput = document.getElementById("pitch");
const rateInput = document.getElementById("speed");
const volumeInput = document.getElementById("volume");

const pitchlabel = document.getElementById("pitchlabel");
const ratelabel = document.getElementById("ratelabel");
const volumelabel = document.getElementById("volumelabel");

const constrols = document.getElementById("controls");
const setingsBtn = document.getElementById("setings");

const navItems = document.querySelectorAll("nav>span");


navItems.forEach(item => {
  item.addEventListener('click', function() {
    
    navItems.forEach(nav => nav.classList.remove('spannavClick'));
    
    this.classList.toggle('spannavClick');
  });
});
console.log(setingsBtn);
console.log(constrols)
setingsBtn.onclick = function(){
  constrols.classList.toggle("showSetings");
  if(!constrols.classList.contains('showSetings')){
    setingsBtn.innerHTML = `&#9778;`;
  }else{
    setingsBtn.innerHTML = `&#10006;`;
  }
}
pitchlabel.innerText = `PITCH: ${pitchInput.value}`;
ratelabel.innerText = `SPEED: ${rateInput.value}`;
volumelabel.innerText = `VOLUME: ${volumeInput.value}`;

pitchInput.addEventListener("input", () => {
  pitchlabel.innerText = `PITCH: ${pitchInput.value}`;
  
});

rateInput.addEventListener("input",()=>{
  ratelabel.innerText = `SPEED: ${rateInput.value}`;
});

volumeInput.addEventListener("input",()=>{
  volumelabel.innerText = `VOLUME: ${volumeInput.value}`
});

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

  // ✅ FIX: always ensure a voice exists
  utterThis.voice = selectedVoice || synth.getVoices()[0];

  // ✅ FIX: prevent speech queue getting stuck
  synth.cancel();
  synth.speak(utterThis);
}

let navigateNumber = 1;

function navigate(n) {
  navigateNumber = n;
  showSection(n);
}

function showSection(n) {
  const sections = document.getElementsByClassName("section");
  
  
  for (let i = 0; i < sections.length; i++) { 
    sections[i].style.display = 'none';
  }
   
  if (sections[n - 1]) {
    sections[n - 1].style.display = "flex";
  }
  console.log(sections[0]);
}

showSection(navigateNumber);

