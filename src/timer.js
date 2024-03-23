const css = `
  .card {
   min-height: 3rem;
   min-width: 3rem;
   border: 1px rgba(66, 76, 85,. 85) solid;
   background: white;
   border-radius: 1em;
   margin: 1em;
   padding: 1em;
   display: grid;
   grid-template-columns: 1fr;
   align-items: center;
   color: black;
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
   font-weight: 200;
  }
  
  .card > button:hover {
     cursor: pointer;
  }

  .card > input[name="activity-name"] {
     appearance: none;
     background: rgba(127,127,127,.25);
     border-radius: .25em;
     padding: .5em;
     border: 1px transparent solid;
  }

  .card > input[name="activity-name"]:focus {
     outline: none;
     border: 1px rgba(127,127,127,.75) solid;
  }

  .timer-bar {
      display: inline-flex;
      flex-direction: row;
      gap: 1em;
      -webkit-appearance: none;
  }

  .card > * {
      margin-bottom: .5em;
  }
  .timer-bar > progress {
      
      /* */box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset; /* */
      /**/ background: linear-gradient(#e66465, #9198e5); /**/ 
      background: linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),
            linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),
            linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%);
  }
`;
const html = `

<style>${css}</style>
<div class="card">
<label for="activity-name">Name:</label>
<input name="activity-name" type="text">
<h1>loading...</h1>
<button type="button">></button>
<div class="timer-bar">
   <label for="time">2:20</label>
   <progress name="time" class="timer-progress" value="50" max="100"></progress>
   <label for="time">2:20</label>
</div>
`;

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
      this.timeInput = this.shadow.querySelector("time-input");
      this.interval = setInterval((() => { this.time = new Date() }).bind(this), 1000);
   }

   set time(current) {
      this.internal_time = current;
      this.timeElement.textContent = current.toLocaleTimeString();
   }
}
customElements.define("custom-timer", Timer);

//export {Timer};