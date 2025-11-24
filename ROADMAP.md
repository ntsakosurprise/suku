# SUKU Roadmap

This document outlines the planned features and enhancements for the SUKU JavaScript library.

---

## 📡 Native `fetch()` Wrapper
- Modern `fetch()`-powered HTTP module
- Methods: `get()`, `post()`, `put()`, etc.
- Automatic JSON parsing
- Timeout and retry support
- Consistent error handling
- Query parameter builder

---

## 📦 ES Module Build (`suku.esm.js`)
- Native ES module export
- Tree-shakable imports
- Bundler compatibility (Vite, Webpack, Rollup)
- Smaller builds for modern environments

---

## 🎞 Lightweight DOM-Based Animation Helpers
- `animateStyle(element, property, from, to, duration)`
- `fadeIn(element, duration)`
- `fadeOut(element, duration)`
- `slideToggle(element, duration)`
- Easing functions: `easeInOut`, `linear`, etc.
- Zero dependencies, small footprint

---

## 🔭 Mutation Observer Utilities
- `observeChanges(element, callback, config)`
- `observeAttributes(element, callback)`
- `observeChildren(element, callback)`
- `disconnectObserver(handle)`
- Use cases: reactive components, DOM monitoring

---

## 🧪 Jest / Browser Automated Testing Suite
- Unit tests with Jest
- jsdom environment for DOM tests
- Browser-driven automated tests (Playwright/Puppeteer)
- Coverage reports
- CI integration

---

## 🔌 Plugin Architecture (Extensible Modules)
- `SUKU.use(pluginFunction)` API
- Namespaced plugin registration
- Plugin sandboxing
- Optional plugin marketplace
- Example:
```js
SUKU.use((S) => {
    S.sayHello = () => console.log("Hello from plugin!");
});
