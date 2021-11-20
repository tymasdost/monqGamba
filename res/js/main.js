const madmonq = document.getElementsByClassName("madmonq");
const pogBall = document.getElementById("pogBall");
const startGame = document.getElementById("start");
const tablets = document.getElementById("correct");
const popup = document.getElementById("popup");

let backgroundClap;
let tabletky = 0;
let correct;
let spamPrevent = 1;
let gifClap = [
  "https://media.giphy.com/media/P0RWkdsRpK7ss/giphy.gif",
  "https://media.giphy.com/media/v7vQ4NdANC07K/giphy.gif",
  "https://media.giphy.com/media/mGK1g88HZRa2FlKGbz/giphy.gif",
  "https://media.giphy.com/media/kBZBlLVlfECvOQAVno/giphy.gif",
  "https://media.giphy.com/media/YnBntKOgnUSBkV7bQH/giphy.gif",
];
const gameReset = () => {
  pogBall.style.display = 'none';
  madmonq[0].classList.add('mixLeft');
  madmonq[1].classList.add('mixMiddle');
  madmonq[2].classList.add('mixRight');
  setTimeout(()=>{
    [...madmonq].forEach((mad) => mad.classList.remove("moveUp","mixLeft", "mixRight", "mixMiddle"));
    pogBall.style.display = 'block';
    pogBall.classList.remove("left", "right", "center");
    switch (Math.floor(Math.random() * 3)) {
      case 0:
        pogBall.classList.add("left");
        correct = 0;
        break;
      case 1:
        pogBall.classList.add("center");
        correct = 1;
        break;
      case 2:
        pogBall.classList.add("right");
        correct = 2;
        break;
    }
    backgroundClap = `url(${gifClap[Math.floor(Math.random() * 5)]})`;
    spamPrevent = 0;
  }, 6000);
};

window.onload = () => gameReset();

const revealBall = () => {
  madmonq[correct].classList.add("moveUp");
  console.log("prohra");
  setTimeout(() => {
    gameReset();
  }, 2000);
};

const whatsInside = () => {
  spamPrevent = 1;
  let boi = event.target;
  boi.classList.add("moveUp");
  setTimeout(() => {
    if (madmonq[correct].classList.contains("moveUp")) {
      popup.style.backgroundImage = backgroundClap;
      popup.style.display = "flex";
      tabletky++;
      tablets.innerText = `tAbletek:${tabletky}`;
      console.log("vyhra");
      spamPrevent = 0;
    } else {
      revealBall();
    }
  }, 2000);
};

[...madmonq].forEach((monq) => {
  monq.onclick = async () => {
    if (spamPrevent === 0) return whatsInside();
  };
});

popup.onclick = () => {
  setTimeout(() => (popup.style.display = "none"), 200);
  gameReset();
};
