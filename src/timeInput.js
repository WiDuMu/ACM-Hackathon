/* Not used due to time constraints */
const css = `
:host {
   border: 1px rgba(127,127,127,.75) solid;
   border-radius: .25em;
}
input {
   appearance: none;
   background-color: transparent;
   border: none;
   color: inherit;
   -webkit-appearance: none;
   -moz-appearance: textfield;
}
input:focus {
   border: .25em rgba(127,127,127,.75) solid;
   outline: none;
   border-radius: .25em;
}
input[name="days"]:disabled, input[name="hours"]:disabled, input[name="days"]:disabled + label[for="days"], input[name="hours"]:disabled +  label[for="hours"] {
   display: none;
}
`;
const html = `
<style>${css}</style>
<input name="days" type="number"><label for="days">:</label><input name="hours" type="number"><label for="hours">:</label><input name="minutes" type="number"><label for="seconds">:</label><input name="seconds" type="number">
`;
export default class timeInput extends HTMLElement {
   static observedAttributes = ["data-value"]
   shadow;
   days;
   hours;
   minutes;
   seconds;

   constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.shadow.innerHTML = html;
      this.days = this.shadow.querySelector('input[name="days"]');
      this.hours = this.shadow.querySelector(`input[name="hours"]`);
      this.minutes = this.shadow.querySelector(`input[name="minutes"]`);
      this.seconds = this.shadow.querySelector(`input[name="seconds"]`);
   }

   connectedCallback() {

      this.days.value = "";
      this.hours.value = "";
      this.minutes.value = "";
      this.seconds.value = "";
      this.days.setAttribute("disabled", "true");
      this.hours.setAttribute("disabled", "true");
   }

   get value() {

   }

   attributeChangedCallback(name, oldValue, newValue) {
      if (name === "data-value") {
         this.value = newValue;
      }
   }

   set value(number) {
      console.log(number);
      this.seconds.value = number % 60;
      this.minutes.value = number / 60;
      this.hours.value = (number / 3600) % 24;
      this.days.value = (number / 3600) / 24;
      this.render();
   }

   render() {
      try {
         if (this.hours.value != "") {
            this.hours.removeAttribute(disabled)
         } else {
            this.hours.setAttribute("disabled", "true");
         }
      } catch {
      }
      try {
         if (this.days.value != "") {
            this.days.removeAttribute(disabled)
         } else {
            this.days.setAttribute("disabled", "true");
         }
      } catch { }

   }
}
customElements.define("time-input", timeInput);