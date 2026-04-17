const dhikr = [
  { name:"Subhanallah", key:"subhanallah" },
  { name:"Alhamdulillah", key:"alhamdulillah" },
  { name:"Allahu Akbar", key:"allahuakbar" },
  { name:"La ilaha illallah", key:"lailahaillallah" },
  { name:"Astaghfirullah", key:"astaghfirullah" }
];

let current = dhikr[0].key;

/* STORAGE */
function getCount(key){
  return parseInt(localStorage.getItem(key)) || 0;
}
function setCount(v){
  localStorage.setItem(current,v);
}

/* COUNTER */
function update(){
  document.getElementById("display").innerText = getCount(current);
}
function increment(){ setCount(getCount(current)+1); update(); }
function decrement(){ let c=getCount(current); if(c>0)c--; setCount(c); update(); }
function reset(){ setCount(0); update(); }

/* SELECT */
document.querySelectorAll(".dhikr-list li").forEach((el,i)=>{
  el.onclick = ()=>{
    current = dhikr[i].key;

    document.querySelectorAll(".dhikr-list li")
      .forEach(li=>li.classList.remove("active"));

    el.classList.add("active");
    update();
  };
});

/* MENU */
function toggleMenu(){
  let m=document.getElementById("menu");
  m.style.display=m.style.display==="block"?"none":"block";
}

/* EXPORT IMAGE */
function exportImage(){
  toggleMenu();

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 600;
  canvas.height = 800;

  ctx.fillStyle = "#fdfaf6";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = "#1f7a4c";
  ctx.font = "bold 30px Cairo";
  ctx.textAlign = "center";
  ctx.fillText("Tasbih Counter", 300, 60);

  ctx.font = "24px Cairo";
  ctx.fillStyle = "#333";

  let y = 150;
  dhikr.forEach(d=>{
    ctx.fillText(d.name + " - " + getCount(d.key), 300, y);
    y += 60;
  });

  ctx.font = "18px Cairo";
  ctx.fillStyle = "#888";
  ctx.fillText("Zenox Api 2026", 300, 770);

  const img = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = img;
  a.download = "tasbih.png";
  a.click();
}

/* EXPORT PDF */
function exportPDF(){
  toggleMenu();

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  let y=20;
  dhikr.forEach(d=>{
    pdf.text(d.name+" - "+getCount(d.key),10,y);
    y+=10;
  });

  pdf.text("Zenox Api 2026", 80, 280);
  pdf.save("tasbih.pdf");
}

update();
