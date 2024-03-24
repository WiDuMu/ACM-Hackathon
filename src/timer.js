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
  
  .card > h1 {
   font-family: "Kode Mono", "Roboto", sans-serif;
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
  button {
   background: var(--accent);
   border: none;
   appearance: none;
   border-radius: 50%;
   min-width: fit-content;
   min-height: fit-content;
   cursor: pointer;
   padding: 0.5rem;
  }
  button:hover {
   background-color: var(--accent-hover);
  }
  .trash {
   background-image: url('./static/trash-solid.svg');
   background-position: center;
   background-repeat: no-repeat;
   background-size: 1.5em;
   min-width: 3em;
   min-height: 3em;
}
  .play {
   background-image: url('./static/play-solid.svg');
   background-position: center;
   background-repeat: no-repeat;
   background-size: 1.5em;
   min-width: 3em;
   min-height: 3em;
}
.buttons {
   width: 100%;
   display: flex;
   flex-direction: row;
   justify-content: space-evenly;
   align-items: center;
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
<span class="start-end-time">
00:00
</span>
<div class="buttons">
<button type="button" class="play"></button>
<button type="button" class="trash"></button>
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
   timeElement;
   interval;
   name;
   nameInput;
   startEndTimeSpan;

   constructor(name, accumulatedTime) {
      super();
      if (name != null && name != undefined) {
         this.name = name;
      } else {
         this.name = "";
      }
      if ( typeof accumulatedTime == "number" && !isNaN(accumulatedTime) && accumulatedTime >= 0) {
         this.accumulatedTime = accumulatedTime;
      } else {
         this.accumulatedTime = 0;
      }
      this.shadow = this.attachShadow({ mode: "open" });
      this.startTime = Date.now();
   }

   static fromObject(o) {
      let neu = new Timer( o.name, o.accumulatedTime);
      neu.startTime = o.startTime;
      neu.endTime = o.endTime;
      return neu;
   }

   connectedCallback() {
      this.shadow.innerHTML = html;
      this.timeElement = this.shadow.querySelector(".card > h1");
      this.timeElement.textContent = Timer.formatTime(this.accumulatedTime);
      this.startButton = this.shadow.querySelector(".play");
      this.nameInput = this.shadow.querySelector(`.card > input[name="activity-name"]`);
      this.startEndTimeSpan = this.shadow.querySelector('.start-end-time');
      this.trashButton = this.shadow.querySelector('.trash');
      this.nameInput.value = this.name;
      this.startButton.addEventListener("click", (event => {
         console.log(event);
         console.log(event.target, this.startButton, event.target == this.startButton);
         if (event.target == this.startButton || event.target == this) {
            console.log("Starting timer");
            this.toggleTimer();
         } else {
            console.log("hmmm", this);
         }
      }).bind(this));
      this.nameInput.addEventListener("input", () => {
         this.name = this.nameInput.value;
      });
      this.trashButton.addEventListener('click', (() => {
         this.parentElement.removeChild(this);
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
         this.endTime = now;
         this.startEndTimeSpan.textContent = Timer.localeFormatTime(this.endTime);
         this.accumulatedTime += now - this.startTime;
         clearInterval(this.interval);
      } else {
         if (Timer.running === 0) {
            Timer.firstStartTime = now;
         }
         Timer.running += 1;
         this.startTime = now;
         this.endTime = null;
         this.startEndTimeSpan.textContent = Timer.localeFormatTime(this.startTime);
         this.active = true;
         this.interval = setInterval(this.updateTime.bind(this), 500);
      }
   }

   turnOff() {
      const now = Date.now();
      if (this.active) {
         Timer.running -= 1;
         this.active = false;
         this.endTime = now;
         this.startEndTimeSpan.textContent = Timer.localeFormatTime(this.endTime);
         this.accumulatedTime += now - this.startTime;
         clearInterval(this.interval);
      }
   }

   static localeFormatTime(time) {
      const dateTime = new Date(time);
      return dateTime.toLocaleTimeString('en-US');
   }

   /** This returns an obect that can be used in a JSON interchange*/
   toObject() {
      let accumulatedTimePromo = this.accumulatedTime;
      if (this.endTime === null) {
         accumulatedTimePromo = this.accumulatedTime + Date.now() - this.startTime;
      }
      
      return {
         name: this.name,
         accumulatedTime: accumulatedTimePromo,
         startTime: this.startTime,
         endTime: this.endTime,
      };
   }

   static formatTime(time) {
      time = time / 1000;
      const seconds = Math.floor(time % 60);
      const minutes = Math.floor((time / 60) % 60);
      const hours = Math.floor((time / 3600));
      const days = Math.floor((time / 86400));
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
