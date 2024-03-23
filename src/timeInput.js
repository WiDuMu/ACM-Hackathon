const css = `
`;
const html = `
<style>${css}</style>
<span></span><span>:</span><span></span>
`;
export default class timeInput extends HTMLElement {
   shadow;
   constructor() {
      super();
      this.shadow = this.attachShadow( { mode: "open" } );
   }

   connectedCallback() {
      this.shadow.innerHTML = html;
   }

   get value() {

   }
   
   set value(number) {

   }
}