import monstersPic from "../img/monsters.png";

export function hello() {
  const el = document.createElement("div");
  el.innerText = "hello~~~";
  return el;
}

export function monsters() {
  const el = document.createElement("img");
  el.src = monstersPic;
  return el;
}
