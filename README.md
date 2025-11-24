

# SUKU.JS is a lightweight DOM manipulation library

# 🌐 SUKU — Lightweight DOM + AJAX Utility Framework

**SUKU** is a lightweight JavaScript utility framework that simplifies DOM manipulation, HTML5 APIs, event handling, AJAX calls, JSON processing, table creation, form serialization, and more — all with **zero dependencies**.

SUKU is inspired by the simplicity that made jQuery popular but redesigned for the modern JavaScript ecosystem.  
It provides clean, focused helper methods while staying small, fast, and dependency-free.

---

## 🧭 Why SUKU Exists

Modern browser APIs are powerful but often verbose, repetitive, and inconsistent across DOM operations.  
Many projects load entire frontend frameworks just to make simple tasks easier, adding unnecessary weight and complexity.

**SUKU exists to bridge this gap:**

- Minimal footprint  
- Modern DOM operations without wrappers  
- Clear, direct method calls instead of chained abstractions  
- Zero dependencies  
- No build step or configuration  
- Works instantly in any browser environment  

If you want convenience without bloat, SUKU provides a clean, modern alternative.

---

## 🔍 SUKU vs. jQuery

SUKU borrows jQuery’s philosophy of making common tasks easier but takes a lightweight, modern approach.

| Feature | jQuery | SUKU |
|--------|--------|------|
| Size | Larger | Much smaller |
| Dependencies | Requires jQuery core | None |
| Syntax | `$()` wrappers, chainable | Direct methods: `SUKU.method(el, ...)` |
| DOM Usage | Wrapped jQuery objects | Native DOM nodes |
| Features | DOM, events, AJAX, animations, plugins | DOM, HTML5 APIs, tables, JSON, dimensions, AJAX |
| Philosophy | Abstraction-heavy | Simple utilities |

If you enjoy jQuery’s convenience but want a zero-dependency utility library built for 2025+, SUKU is designed for you.

---

## 📦 Installation

### CDN
```html
<script src="suku.min.js"></script>
```

### Local file

```html
<script src="./suku.js"></script>

```

## Quick Start

```js
<h1 id="title">Hello</h1>

<script>
SUKU.domLoaded(() => {
    const title = SUKU.getby_id("title");
    SUKU.add_class(title.classList, "highlight");

    SUKU.ajax_get("/api/user", null, (data) => {
        console.log("User:", data);
    });
});
</script>
```

## Example 

```js
<div id="app"></div>

<script>
SUKU.domLoaded(() => {
    const app = SUKU.getby_id("app");

    // Create header
    const header = SUKU.create_element("h2");
    SUKU.insert_content_inner(header, "Welcome to SUKU");
    SUKU.append_child(app, header);

    // Load data via AJAX
    SUKU.ajax_get("/api/info", null, (data) => {
        const info = SUKU.create_element("p");
        SUKU.insert_content_inner(info, "Server says: " + data.message);
        SUKU.append_child(app, info);
    });
});
</script>

```




# Documentation

Docs coming soon!

we are currently working on our documentation with the help from our first ever collaborater @ntsakosuprise

# Questions & Support

For questions and support please use sukujs's Suppport page on [Github repo](https://github.com/iiprodakts/suku/development/SUPPORT.md).

# Issues

Please make sure to read the [Issue](https://github.com/iiprodakts/suku/development/ISSUES.md) Reporting Checklist before opening an issue. Issues not conforming to the guidelines may be closed immediately.

# Changelog

Detailed changes for each release are documented in our [Changelog](https://github.com/iiprodakts/suku/development/CHANGELOG.md).

# Release Notes

A summary of release changes can be found in our [Release Notes](https://github.com/iiprodakts/suku/development/RELEASE_NOTES.md).

# Stay In Touch

[Twitter @sukujs](https://twitter.com/sukujs).

# Contribution

Please make sure to read the [Contributing Guide](https://github.com/iiprodakts/suku/development/CONTRIBUTING.md) before making a pull request. If you have an suku plugin, add it with a pull request.

# Licence

[MIT](https://.github.com/) - see the [LICENSE](https://github.com/iiprodakts/suku/development/LICENSE.md) file for details.

copyright (c) 2019-present, iiprodatks. Ntsako (Surprise) Mashele

A Special thanks to Nicholas C. Zakas for the box presentation that help inspire Akii which has inspired suku.
