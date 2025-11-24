## `domLoaded(code)`

Registers a callback function to be executed when the DOM and all resources have fully loaded.

### Description
The `domLoaded` method is part of the SUKU library’s DOM utilities. It allows you to run JavaScript code once the browser has fully loaded the page, including all images, scripts, stylesheets, and subresources. Internally, it uses SUKU’s `ev_addHandler` utility to attach the callback function to the `window` object's `load` event.

This method is useful for executing code that depends on the complete page structure being available, such as initializing plugins, animations, or other DOM manipulations that require fully loaded elements.

### Syntax
```js
suku.domLoaded(function() {
    // Your code to run after the page loads
});
```


## `throwErrors(errorMessage)`

Throws a JavaScript error with a custom message.

### Description
The `throwErrors` method is part of the SUKU library’s core utilities. It provides a convenient way to generate and throw errors with custom messages, allowing developers to handle exceptional situations consistently. This can be particularly useful during debugging, validation, or when building robust plugin modules.

Internally, it uses the standard JavaScript `Error` object.

### Syntax
```javascript
suku.throwErrors("Your error message here");
