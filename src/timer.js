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
  .timer-bar {
      display: inline-flex;
      flex-direction: row;
      gap: 1em;
      -webkit-appearance: none;
      
      
  }
  .timer-bar > progress {
      
      /* */box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset; /* */
      /**/ background: linear-gradient(#e66465, #9198e5); /**/ 
      background: linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
            linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
            linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);
  }
  .timer-bar > .pill {
      position: relative;
      background-color: green;
      width: 1em;
      min-height: 100%;
      border-radius: 50%;
      left: 50px;
  }
  .delete-button {
   
      position: absolute;
      top: -40%;
      left: 50%;
  }
`;
const html = `

<style>${css}</style>
<div class="timer">
<div class="card">
<h1>loading...</h1>
<input class="time-input" type="time">
<button type="button">></button>

<div class="timer-bar">
   <label for="time">2:20</label>
   <div class="pill"></div>
   <progress name="time" class="timer-progress" value="50" max="100"></progress>
   <label for="time">2:20</label>
</div>

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