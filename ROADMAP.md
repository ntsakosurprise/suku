# 🧭 SUKU Roadmap Features

## 📡 Native `fetch()` Wrapper
Introduce a modern `fetch()`-powered HTTP module to complement or replace the existing XHR-based AJAX utilities.  
Features will include:
- `sukuFetch.get()`, `sukuFetch.post()`, `sukuFetch.put()`, etc.
- Automatic JSON parsing
- Timeout controller support
- Error normalization for consistent handling
- Optional retry logic
- Query parameter builder

---

## 📦 ES Module Build (`suku.esm.js`)
Provide a native ES module export for modern bundlers and browsers.

Planned structure:
```js
import { getby_id, add_class, ajax_get } from "suku";
