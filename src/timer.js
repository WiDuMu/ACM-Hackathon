const css = `
  .card {
   min-height: 3rem;
   min-width: 3rem;
   border: 1px rgba(66, 76, 85,. 85) solid;
   background: var(--background);
   border-radius: 1em;
   margin: 1em;
   padding: 1em;
   display: grid;
   grid-template-columns: 1fr;
   align-items: center;
   color: var(--text);
   justify-items: center;
  }
  
  .card:hover {
     cursor: pointer;
     background-blend-mode: darken;
  }

  .card > input[name="activity-name"] {
     color: var(--text);
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

<!-- implement a pause/play button which defaults to a square for a stop icon and: -->

<!-- when you hover over it fades in a message: "pause timer?" and fades out when you hover off it -->

<!-- then if you click it, the timer pauses, and the icon switches to a triangle for play  -->

<!-- then when you hover on that button it fades in a message: "play timer?" and fades out when you hover off it -->

<!-- then if you click it, the timer plays again and so on so forth -->

<style>${css}</style>
<div class="card">
<label for="activity-name">Name:</label>
<input name="activity-name" type="text">
<h1>00:00</h1>
<div class="timer-bar">
   <label for="time">2:20</label>
   <progress name="time" class="timer-progress" value="50" max="100"></progress>
   <label for="time">2:20</label>
</div>
`;

export default class Timer extends HTMLElement {
   static running = 0;
   static firstStartTime = 0;
   startTime;
   endTime;
   active;
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
      this.startTime = Date.now();
      this.accumulatedTime = 0;
   }

   connectedCallback() {
      this.shadow.innerHTML = html;
      this.button = this.shadow.querySelector(".card > button");
      this.timeElement = this.shadow.querySelector(".card > h1");
      this.progress = this.shadow.querySelector(".card > progress");
      this.timeInput = this.shadow.querySelector("time-input");
      this.card = this.shadow.querySelector(".card")
      this.card.addEventListener("click", (event => {
         if (event.originalTarget == this.card) {
            this.toggleTimer();
         }
      }).bind(this));
   }

   updateTime() {
      this.timeElement.textContent = Timer.formatTime(this.accumulatedTime + Date.now() - this.startTime);
   }

   toggleTimer() {
      const now = Date.now();
      if (this.active) {
         Timer.running -= 1;
         this.active = false;
         // this.endTime = Date.now();
         this.accumulatedTime += now - this.startTime;
         clearInterval(this.interval);
      } else {
         if (Timer.running === 0) {
            Timer.firstStartTime = now;
         }
         Timer.running += 1;
         this.startTime = now;
         this.active = true;
         this.interval = setInterval(this.updateTime.bind(this), 500);
      }
   }

   turnOff() {
      const now = Date.now();
      if (this.active) {
         Timer.running -= 1;
         this.active = false;
         this.accumulatedTime += now - this.startTime;
         clearInterval(this.interval);
      }
   }

   static formatTime(time) {
      time = time / 1000;
      const seconds = Math.round(time % 60);
      const minutes = Math.round((time / 60) % 60);
      const hours = Math.round((time / 3600));
      const days = Math.round((time / 86400));
      let formatted = `${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;
      if (hours > 0) {
         formatted = hours.toString().padStart(2, "0") + ":" + formatted;
      }
      if (days > 0) {
         formatted = days.toString().padStart(2, "0") + ":" + formatted;
      }
      return formatted;
   }

}
customElements.define("custom-timer", Timer);
