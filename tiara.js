// hitung hari sejak 14 Agustus 2026
const start = new Date(2026, 7, 14);
const now = new Date();
const diff = Math.max(0, Math.floor((now - start) / 86400000));
const el = document.getElementById('dayCount');
let n = 0;
const step = Math.max(1, Math.floor(diff / 60));
const t = setInterval(()=>{
  n += step;
  if(n >= diff){ n = diff; clearInterval(t); }
  el.textContent = n;
}, 20);

// bunga interaktif: 3 tahap — kuncup -> mekar -> mekar besar + hujan bunga
const stage = document.getElementById('bloomStage');
const bloomMsg = document.getElementById('bloomMsg');
const shower = document.getElementById('shower');
const messages = [
  'mekar seperti perasaan yang tumbuh tiap hari 🌸',
  'tap sekali lagi, biar makin mekar...',
  'kayak bunga ini, cinta juga perlu dirawat',
  'makasih udah jadi alasan buat mekar bareng',
  'tap lagi, masih banyak alasan lainnya ✿'
];
let tapState = 0; // 0 closed, 1 bloomed, 2 bloomed-big + shower
let msgIndex = 0;
stage.classList.add('closed');

function fireShower(){
  const symbols = ['🌸','💗','❤️','✿','🌷'];
  const count = 55;
  for(let i=0;i<count;i++){
    const p = document.createElement('div');
    p.className = 'burst-petal';
    p.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    p.style.left = Math.random()*100 + 'vw';
    p.style.fontSize = (14 + Math.random()*16) + 'px';
    const dur = 2.6 + Math.random()*2.2;
    p.style.animationDuration = dur + 's';
    p.style.animationDelay = (Math.random()*1.2) + 's';
    p.style.setProperty('--drift', (Math.random()*80 - 40) + 'px');
    shower.appendChild(p);
    setTimeout(()=>p.remove(), (dur + 1.5) * 1000);
  }
}

stage.addEventListener('click', () => {
  tapState = (tapState + 1) % 3;
  stage.classList.remove('closed','bloomed','bloomed-big');

  if(tapState === 0){
    stage.classList.add('closed');
    bloomMsg.textContent = 'tap bunganya untuk mekar 🌸';
    return;
  }
  if(tapState === 1){
    stage.classList.add('bloomed');
  }
  if(tapState === 2){
    stage.classList.add('bloomed-big');
    fireShower();
  }
  bloomMsg.style.opacity = 0;
  setTimeout(()=>{
    bloomMsg.textContent = messages[msgIndex % messages.length];
    msgIndex++;
    bloomMsg.style.opacity = 1;
  }, 250);
});

// petal daun/bunga jatuh pelan
const petalsWrap = document.getElementById('petals');
const petalSymbols = ['❀','✿','❁'];
for(let i=0;i<14;i++){
  const p = document.createElement('div');
  p.className = 'petal';
  p.textContent = petalSymbols[i % petalSymbols.length];
  p.style.left = Math.random()*100 + 'vw';
  p.style.fontSize = (10 + Math.random()*10) + 'px';
  p.style.color = i % 2 === 0 ? '#d9a3ab' : '#c9a24a';
  p.style.animationDuration = (14 + Math.random()*10) + 's';
  p.style.animationDelay = (Math.random()*10) + 's';
  petalsWrap.appendChild(p);
}