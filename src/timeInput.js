const css = `
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
`;
const html = `
<style>${css}</style>
<input type="number"><span>:</span><span><input type="number">
`;
export default class timeInput extends HTMLElement {
   shadow;
   hours;
   seconds;
   constructor() {
      super();
      this.shadow = this.attachShadow( { mode: "open" } );
      const elements = this.shadow.childNodes;
      this.hours = elements[0];
      this.minutes = elements[2]
   }

   connectedCallback() {
      this.shadow.innerHTML = html;
   }

   get value() {
      
   }
   
   set value(number) {

   }
}
customElements.define("time-input", timeInput);