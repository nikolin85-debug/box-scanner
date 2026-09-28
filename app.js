let boxes={};
let found=new Set();

function saveState(){
 localStorage.setItem(
  "boxes",
  JSON.stringify(boxes)
 );

 localStorage.setItem(
  "found",
  JSON.stringify([...found])
 );
}

function loadState(){

 const b=
 localStorage.getItem("boxes");

 if(b){
  boxes=JSON.parse(b);
 }

 const f=
 localStorage.getItem("found");

 if(f){
  found=
  new Set(JSON.parse(f));
 }

 updateStats();
}

function updateStats(){

 let men=0;
 let women=0;
 let kids=0;

 for(const code in boxes){

  if(found.has(code))
   continue;

  if(boxes[code]==="MEN")
   men++;

  if(boxes[code]==="WOMEN")
   women++;

  if(boxes[code]==="KIDS")
   kids++;
 }

 document.getElementById("menCount").innerText=men;
 document.getElementById("womenCount").innerText=women;
 document.getElementById("kidsCount").innerText=kids;
}

function processCode(code){

 let result=
 document.getElementById(
  "result"
 );

 if(found.has(code)){

  result.innerHTML=
  "⚠ Уже найден<br>"+code;

  return;
 }

 if(!boxes[code]){

  result.innerHTML=
  "❌ Нет в списке<br>"+code;

  return;
 }

 found.add(code);

 saveState();

 updateStats();

 result.innerHTML=
 "✅ "+boxes[code]+
 "<br>"+code;
}

window.onload=loadState;
