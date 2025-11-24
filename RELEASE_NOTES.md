# 📝 SUKU — Release Notes

## v1.0.0 — Initial Stable Release  
_Released: 2025-11-24_

SUKU launches as a lightweight DOM utility framework designed to give developers low-level, predictable control over the DOM—without the overhead of larger frameworks. Inspired by the simplicity of early JavaScript libraries, SUKU offers a complete suite of DOM, HTML5, event, text, AJAX, and utility functionalities in a compact and dependency-free package.

---

## 🚀 Highlights

### Complete DOM Manipulation Suite
- DOM Level 1, 2, and 3 APIs wrapped in simple helper functions.
- Direct element targeting:
  - `getby_id`
  - `getby_tag`
  - `getby_name`
  - `getby_class`
  - `getChildby_id`
  - `getChildby_class`
  - `getBy_attribute`
  - `getAllBy_attribute`
- Node-level control:
  - Append, insert, replace, and delete child nodes  
  - Traverse parents, siblings, and children  
  - Deep and shallow cloning  

---

### HTML5 Utility Enhancements
- ClassList helpers:  
  `add_class`, `remove_class`, `toggle_class`, `has_class`
- Dataset access helpers:  
  `get_custom_attribute_data`, `set_custom_attribute_data`
- Focus helpers:  
  `get_focused_element`, `is_element_focused`
- Document metadata utilities:
  - encoding  
  - readyState  
  - title  
  - domain  
  - URL  
  - referrer

---

### Advanced Text Manipulation
Includes granular control of text nodes:
- `create_text`
- `add_text`
- `insert_text`
- `delete_text`
- `replace_text`
- `split_text`
- `normalize_text`
- `get_text_length`
- `get_full_text`
- `get_partial_text`

Ideal for editors, parsers, dynamic content generators, and UI engines.

---

### Table API
A structured set of helpers for building and modifying tables:
- Create:
  - `make_table()`
  - `make_table_body()`
  - `make_table_row()`
  - `make_table_cell()`
- Query:
  - `get_table_rows`
  - `get_table_head`
  - `get_row`
  - `get_cell`
- Modify:
  - `delete_row`
  - `delete_cell`
  - `add_contentto_cell`
  - `add_contentto_cells`

---

### AJAX Abstraction Layer
A safer and cleaner wrapper around `XMLHttpRequest`:
- `ajax_get`
- `ajax_post`
- Automatic validation and error reporting
- Internal handlers for:
  - 200/304 success  
  - 400/404/504 failures  
  - network errors  
  - abort events  
- Optional content-type specification

---

### Utility Helpers
- JSON converters:
  - `js_to_json`
  - `json_to_js`
- Casting:
  - `object_to_array`
  - `array_to_object`
- Form serialization:
  - `serialize`
- Event helpers:
  - `ev_addHandler`
  - `ev_removeHandler`
  - `getEvent`
  - `getTarget`
  - `preventDefault`
  - `stopPropagation`

---

## 🛠 Under-the-Hood Improvements
- Unified naming across the entire API.
- Strict validation and descriptive error messages via `throwErrors()`.
- No external dependencies.
- Compatible with modern and legacy browsers.
- Clean internal architecture for future expansion.

---

## 🧪 Testing & Stability
Tested across:
- Chrome
- Firefox
- Safari
- Edge

Stress tested with:
- deeply nested DOM structures  
- large dynamic table creation  
- simulated network and server failures  

---

## 📦 Package & Distribution

### npm
```bash
npm install suku
