# ember-trap-focus

[![Build Status](https://travis-ci.org/Duder-onomy/ember-trap-focus.svg?branch=master)](https://travis-ci.org/Duder-onomy/ember-trap-focus)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=Duder-onomy/ember-trap-focus)](https://dependabot.com)
![npm](https://img.shields.io/npm/v/ember-trap-focus)

Traps focus within itself. You can navigate child focusable elements with up, down, tab, shift + tab, alt + tab. I have attempted to match the accesibility best practices listed [here](https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html).

This could be useful if you wanted to trap focus within something like a modal. When you gotta... focus-trap and focus-wrap.

* Does not auto focus the first item.
  * Scope this [auto-focus modifier](https://github.com/qonto/ember-autofocus-modifier) out if you need that.
* When pressing `down` or `tab`:
  * When the known focusables are not focused, gives focus to the first item.
  * If focus is on the last known focusable, it gives focus to the first item.
  * Gives focus to the next item.
* When pressing `up` or `shift+tab` or `alt+tab`:
  * When the known focusables are not focused, gives focus to the last item.
  * If focus is on the first known focuable, it gives focus to the last item.
  * Gives focus to the previous item.
* When pressing `home`:
  * Gives focus to the first item.
* When pressing `end`:
  * Gives focus to the last item.
* Attempts to skip hidden items and items with display none of tabindex="-1".
* Accepts splattributes.

Checkout the [DEMO](https://duder-onomy.github.io/ember-trap-focus/)

Very similar to : https://github.com/josemarluedke/ember-focus-trap except that they depend on [focus-trap](https://github.com/davidtheclark/focus-trap) which is a deprecated and known to be janky library, and they expose a modifier.

Todo: We should also expose a modifier instead of a component.

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.13 or above (octane baby!)

Installation
------------------------------------------------------------------------------

```
ember install ember-trap-focus
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
