# Todos &middot; ![Node.js CI](https://github.com/7h1b0/todos/workflows/Node.js%20CI/badge.svg)

Dead simple kanban board built with Svelte and IndexedDB

## Browsers support

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| >= 115                                                                                                                                                                                                            | >= 110                                                                                                                                                                                                        | >= 16                                                                                                                                                                                                         |

---

## Requirements

- [Node.js 18.x](https://nodejs.org/)

---

## Development

To start an ephemeral development server run:

```
git clone https://github.com/7h1b0/todos.git
cd todos
npm install
npm start
```

Then browse to http://localhost:3000

---

## Commands

| Command                | Description                      |
| ---------------------- | -------------------------------- |
| `npm run format:check` | Formats the code using prettier. |
| `npm run lint:check`   | Lints the JavaScript code.       |
| `npm test`             | Runs tests.                      |
| `npm test:e2e`         | Runs e2e tests using Cypress.    |
| `npm start`            | Runs the website in development. |
| `npm run build`        | Builds the production assets.    |
