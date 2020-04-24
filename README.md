# ember-focus-trap

==============================================================================

Traps focus within itselft.
You can navigate child focusable elements with up, down, tab, shift + tab, alt + tab
https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html

This could be useful if you wanted to trap focus within something like a modal.

* does not auto focus the first item
* when pressing down/tab:
  * when the known focusables are not focused, gives focus to the first item
  * if focus is on the last known focusable, it gives focus to the first item
  * gives focus to the next item
* when pressing up/shift+tab/alt+tab:
  * when the known focusables are not focused, gives focus to the last item
  * if focus is on the first known focuable, it gives focus to the last item
  * gives focus to the previous item
* attempts to skip hidden items, items with display none of tabindex="-1"
* accepts splattributes

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
