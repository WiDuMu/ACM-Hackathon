// import {LitElement, html} from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

// export class CookieDialog extends LitElement {
//     static properties = {
//    //   name: {},
//    };
//    // Define scoped styles right with your component, in plain CSS
//    static styles = css`
     
//    `;
 
//    constructor() {
//      super();
//      // Declare reactive properties
//    }
 
//    // Render the UI as a function of component state
//    render() {
//      return html`
//      <dialog>
//       <form method="dialog">
//          <button>Ok</button>
//       </form>
//      </dialog>
//      `;
//    }
//  }
const css = `

`
const html = `
<style>${css}</style>
<dialog open>
   <p>Greetings, one and all!</p>
   <form method="dialog">
      <button>OK</button>
   </form>
</dialog>
`;
class CookieDialog extends HTMLElement {
   shadow;
   constructor() {
      super();
      this.shadow = this.attachShadow( { mode: "open" } );
   }

   connectedCallback() {
      this.shadow.innerHTML = html;
   }
}

customElements.define('cookie-dialog', CookieDialog);