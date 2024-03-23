//import {LitElement, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js'
const css = `
.timer {
   display: flex;
   justify-content: center;
   align-items: center;
   text-transform: bold;
  }
  .card {
   border: 1px rgba(66, 76, 85,.66) solid;
   background: rgba(66, 76, 85,.66);
   border-radius: 1em;
   margin: 1em;
   padding: 1em;
   display: grid;
   grid-template-columns: 1fr;
   align-items: center;
   justify-items: center;
  }
  
  .card > button {
   border: none;
   aspect-ratio: 1;
   border-radius: 100%;
   height: 3rem;
   background: rgb(61, 44, 46);
   font-size: 1.5rem;
   color: white;
   font-weight: bold;
  }
  
  .card > button:hover {
     cursor: pointer;
  }

  .card > .time-input {
   appearance: none;
   border: none;
   font-size: 1em;

  } 
`;
const html = `
<style>${css}</style>
<div class="timer">
<div class="card">
<h1>loading...</h1>
<input class="time-input" type="time">
<button type="button">></button>
<progress value="50" max="100">
</progress>
</d>
</div>`;

export default class Timer extends HTMLElement {
   startTime;
   endTime;
   accumulatedTime;
   duration;
   shadow;
   progress;
   button;
   internal_time;
   timeElement;
   interval;
   timeInput;

   constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
   }

   connectedCallback() {
      this.shadow.innerHTML = html;
      this.button = this.shadow.querySelector(".card > button");
      this.timeElement = this.shadow.querySelector(".card > h1");
      this.progress = this.shadow.querySelector(".card > progress");
      this.timeInput = this.shadow.querySelector(".card > .time-input");
      this.timeInput.value = "00:00"
      this.interval = setInterval((() => { this.time = new Date() }).bind(this), 1000);
   }

   set time(current) {
      this.internal_time = current;
      this.timeElement.textContent = current.toLocaleTimeString();
   }
}
customElements.define("custom-timer", Timer);

//export {Timer};