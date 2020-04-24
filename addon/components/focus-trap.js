import Component from '@glimmer/component';
import {
  bindKeyboardShortcuts,
  unbindKeyboardShortcuts,
} from 'ember-keyboard-shortcuts';
import { whenRouteIdle } from 'ember-app-scheduler';
import elementIsVisibile from 'ember-focus-trap/utils/element-is-visible';
import { action } from '@ember/object';
import FOCUSABLE_ELEMENTS from 'ember-focus-trap/utils/focusable-elements';

export default class FocusTrap extends Component {
  keyboardShortcuts = {
    down: this.next,
    up: this.previous,
    tab: this.next,
    'shift+tab': this.previous,
    'alt+tab': this.previous,
  };

  focusTrapContainerElement = null;

  @action
  async handleDidInsert(focusTrapContainerElement) {
    await whenRouteIdle();

    this.focusTrapContainerElement = focusTrapContainerElement;

    bindKeyboardShortcuts(this);
  }

  willDestroy() {
    unbindKeyboardShortcuts(this);
  }

  getAllFocusableChildren() {
    let focusables = [...this.focusTrapContainerElement.querySelectorAll(FOCUSABLE_ELEMENTS)]; // NodeList to Array
    return focusables.filter((focusable) => elementIsVisibile(focusable));
  }

  getCurrentlyFocusedItem() {
    let currentlyFocused = document.activeElement;

    if (currentlyFocused && !this.focusTrapContainerElement.contains(currentlyFocused)) {
      return null;
    }

    return currentlyFocused;
  }

  next(e) {
    e.stopPropagation();
    e.preventDefault();

    let focusables = this.getAllFocusableChildren();
    let currentlyFocusedItem = this.getCurrentlyFocusedItem();

    // if focus is not within the focuables, focus the first one.
    if (!currentlyFocusedItem) {
      focusables[0] && focusables[0].focus();
      return;
    }

    let currentlyFocusedIndex = focusables.indexOf(currentlyFocusedItem);

    // If we have focus on the last one, give focus on the first.
    if ((focusables.length - 1) === currentlyFocusedIndex) {
      focusables[0] && focusables[0].focus();
      return;
    }

    // Focus the next one.
    focusables[currentlyFocusedIndex + 1] && focusables[currentlyFocusedIndex + 1].focus();
  }

  previous(e) {
    e.stopPropagation();
    e.preventDefault();

    let focusables = this.getAllFocusableChildren();
    let currentlyFocusedItem = this.getCurrentlyFocusedItem();

    // If focus is not within the focusables, focus the last one
    if (!currentlyFocusedItem) {
      focusables[focusables.length - 1].focus();
      return;
    }

    let currentlyFocusedIndex = focusables.indexOf(currentlyFocusedItem);

    // If we have focus on the first one, wrap to the end one.
    if (currentlyFocusedIndex === 0) {
      focusables[focusables.length - 1] && focusables[focusables.length - 1].focus();
      return;
    }

    // Focus the previous one.
    focusables[currentlyFocusedIndex - 1] && focusables[currentlyFocusedIndex - 1].focus();
  }
}
