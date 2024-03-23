const css = `
   dialog {
      margin: 1rem;
      border-radius: 1rem;
      bodder: none;
   }

   #cookie-nav {
      display: flex;
      flex-direction: row;
      justify-content: right;
      gap: 1em;
   }
`

//** HTML here */
const html = `
<style>${css}</style>
<dialog id="cookie-pop-up" open>
   <p>We use cookies to store your session. This site does not send your data to any external server. If you don't feel comfortable accepting cookies, you may reject them, but the site will function in a degraded state.</p>
   <div id="cookie-nav">
      <button id="accept" type="button">Accept</button>
      <button id="reject" type="button">Reject</button>
   </div>
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
      const dialog = this.shadow.querySelector("dialog");
      const accept = this.shadow.getElementById("accept");
      const reject = this.shadow.getElementById("reject");
      accept.addEventListener("click", (() => { dialog.close() }));
      reject.addEventListener("click", (() => { dialog.close() }));
   }
}

customElements.define('cookie-dialog', CookieDialog);