import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { HTMLElement, parseHTML } from "https://esm.sh/linkedom@0.14.21";

const { customElements, document } = parseHTML(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>HTML 5 Boilerplate</title>
    </head>
    <body>
      <h1>LinkeDOM - Oak - Deno</h1>
    </body>
    </html>
`);

class CustomComponent extends HTMLElement {
  constructor() {
    super();
    this.shadowRoot;
    this.innerHTML = this._render();
  }

  connectedCallback() {
    console.log('connectedCallback')
  }

  disconnectedCallback() {}

  _render = () => {
    const style = `
      <style>

      </style>
    `;

    const template = `
      <div>
        <p>---> Write your HTML template here <---</p>
      </div>
    `;

    return style + template;
  }
}

customElements.define('jsis-cool', CustomComponent as any);

document.body.appendChild(document.createElement('jsis-cool'));


const router = new Router();
router.get("/", (ctx) => {
  ctx.response.type = "text/html; charset=utf-8";
  ctx.response.body = document.toString();
});

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8080, hostname: 'localhost' });