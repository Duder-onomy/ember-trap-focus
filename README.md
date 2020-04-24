# ember-focus-trap

[![Build Status](https://travis-ci.com/Duder-onomy/ember-focus-trap.svg?token=eDXJYpjJqBbzPSDX9AD6&branch=master)](https://travis-ci.com/Duder-onomy/ember-focus-trap)

Traps focus within itself. You can navigate child focusable elements with up, down, tab, shift + tab, alt + tab. I have attempted to match the accesibility best practices listed [here](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).

This could be useful if you wanted to trap focus within something like a modal. When you gotta... focus-trap and focus-wrap.

* Does not auto focus the first item.
  * Scope this [auto-focus modifier](https://github.com/qonto/ember-autofocus-modifier) out if you need that.
* When pressing down/tab:
  * When the known focusables are not focused, gives focus to the first item.
  * If focus is on the last known focusable, it gives focus to the first item.
  * Gives focus to the next item.
* When pressing up/shift+tab/alt+tab:
  * When the known focusables are not focused, gives focus to the last item.
  * If focus is on the first known focuable, it gives focus to the last item.
  * Gives focus to the previous item.
* Attempts to skip hidden items and items with display none of tabindex="-1".
* Accepts splattributes.

Checkout the [DEMO](https://duder-onomy.github.io/ember-focus-trap/)

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.12 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-focus-trap
```

Usage
------------------------------------------------------------------------------

```handlebars
<FocusTrap
  {{!-- accepts splattributes --}}
>
  <input>
  <button>
  ...etc
</FocusTrap>
```

To check out the selectors we use to determine what is focusable scope the util: [focusable-elements](addon/utils/focusable-elements.js)

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
