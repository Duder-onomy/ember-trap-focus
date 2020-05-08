import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerKeyEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

function generateTestSelector(selector, value) {
  return `[data-test-${value ? selector : 'selector'}='${value || selector}']`;
}

module('Integration | Component | focus-trap', function(hooks) {
  setupRenderingTest(hooks);

  test('does not auto focus the first input', async function(assert) {
    await render(hbs`
      <FocusTrap>
        <div data-test-selector="1" tabindex="0"></div>
        <div data-test-selector="2" tabindex="0"></div>
        <div data-test-selector="3" tabindex="0"></div>
        <div data-test-selector="4" tabindex="0"></div>
        <div data-test-selector="5" tabindex="0"></div>
      </FocusTrap>
    `);

    assert.dom(generateTestSelector('1')).isNotFocused('does not autofocus');
  });

  module('pressing down', function() {
    test('when the known focusables are not focused, gives focus to the first item', async function(assert) {
      await render(hbs`
        <FocusTrap>
          <div data-test-selector="1" tabindex="0"></div>
          <div data-test-selector="2" tabindex="0"></div>
          <div data-test-selector="3" tabindex="0"></div>
          <div data-test-selector="4" tabindex="0"></div>
          <div data-test-selector="5" tabindex="0"></div>
        </FocusTrap>
      `);

      document.querySelector(generateTestSelector('1')).blur();

      assert.dom(generateTestSelector('1')).isNotFocused();

      await triggerKeyEvent(document.body, 'keydown', 40);

      assert.dom(generateTestSelector('1')).isFocused();
    });

    test('when the end is reached, it gives focus to the first element', async function(assert) {
      await render(hbs`
        <FocusTrap>
          <div data-test-selector="1" tabindex="0"></div>
          <div data-test-selector="2" tabindex="0"></div>
          <div data-test-selector="3" tabindex="0"></div>
          <div data-test-selector="4" tabindex="0"></div>
          <div data-test-selector="5" tabindex="0"></div>
        </FocusTrap>
      `);

      document.querySelector(generateTestSelector('5')).focus();

      await triggerKeyEvent(document.body, 'keydown', 40);

      assert.dom(generateTestSelector('1')).isFocused();
    });

    test('gives focus to the next item, happy path', async function(assert) {
      await render(hbs`
        <FocusTrap>
          <div data-test-selector="1" tabindex="0"></div>
          <div data-test-selector="2" tabindex="0"></div>
          <div data-test-selector="3" tabindex="0"></div>
          <div data-test-selector="4" tabindex="0"></div>
          <div data-test-selector="5" tabindex="0"></div>
        </FocusTrap>
      `);

      assert.dom(generateTestSelector('1')).isNotFocused();

      await triggerKeyEvent(document.body, 'keydown', 40);

      assert.dom(generateTestSelector('1')).isFocused();

      await triggerKeyEvent(document.body, 'keydown', 40);

      assert.dom(generateTestSelector('2')).isFocused();

      await triggerKeyEvent(document.body, 'keydown', 40);

      assert.dom(generateTestSelector('3')).isFocused();

      await triggerKeyEvent(document.body, 'keydown', 40);

      assert.dom(generateTestSelector('4')).isFocused();

      await triggerKeyEvent(document.body, 'keydown', 40);

      assert.dom(generateTestSelector('5')).isFocused();

      await triggerKeyEvent(document.body, 'keydown', 40);

      assert.dom(generateTestSelector('1')).isFocused();
    });
  });

  module('pressing up', function() {
    test('when the known focusables are not focused, gives focus to the last item', async function(assert) {
      await render(hbs`
        <FocusTrap>
          <div data-test-selector="1" tabindex="0"></div>
          <div data-test-selector="2" tabindex="0"></div>
          <div data-test-selector="3" tabindex="0"></div>
          <div data-test-selector="4" tabindex="0"></div>
          <div data-test-selector="5" tabindex="0"></div>
        </FocusTrap>
      `);

      document.querySelector(generateTestSelector('1')).blur();

      assert.dom(generateTestSelector('1')).isNotFocused();

      await triggerKeyEvent(document.body, 'keydown', 38);

      assert.dom(generateTestSelector('5')).isFocused();
    });

    test('when the begining is reached, it gives focus to the last item', async function(assert) {
      await render(hbs`
        <FocusTrap>
          <div data-test-selector="1" tabindex="0"></div>
          <div data-test-selector="2" tabindex="0"></div>
          <div data-test-selector="3" tabindex="0"></div>
          <div data-test-selector="4" tabindex="0"></div>
          <div data-test-selector="5" tabindex="0"></div>
        </FocusTrap>
      `);

      assert.dom(generateTestSelector('1')).isNotFocused();

      await triggerKeyEvent(document.body, 'keydown', 38);

      assert.dom(generateTestSelector('5')).isFocused();
    });

    test('gives focus to the previous item, happy path', async function(assert) {
      await render(hbs`
        <FocusTrap>
          <div data-test-selector="1" tabindex="0"></div>
          <div data-test-selector="2" tabindex="0"></div>
          <div data-test-selector="3" tabindex="0"></div>
          <div data-test-selector="4" tabindex="0"></div>
          <div data-test-selector="5" tabindex="0"></div>
        </FocusTrap>
      `);

      document.querySelector(generateTestSelector('5')).focus();

      await triggerKeyEvent(document.body, 'keydown', 38);

      assert.dom(generateTestSelector('4')).isFocused();

      await triggerKeyEvent(document.body, 'keydown', 38);

      assert.dom(generateTestSelector('3')).isFocused();

      await triggerKeyEvent(document.body, 'keydown', 38);

      assert.dom(generateTestSelector('2')).isFocused();

      await triggerKeyEvent(document.body, 'keydown', 38);

      assert.dom(generateTestSelector('1')).isFocused();

      await triggerKeyEvent(document.body, 'keydown', 38);

      assert.dom(generateTestSelector('5')).isFocused();
    });
  });

  module('pressing tab', function() {
    test('when the known focusables are not focused, gives focus to the first item', async function(assert) {
      await render(hbs`
        <FocusTrap>
          <div data-test-selector="1" tabindex="0"></div>
          <div data-test-selector="2" tabindex="0"></div>
          <div data-test-selector="3" tabindex="0"></div>
          <div data-test-selector="4" tabindex="0"></div>
          <div data-test-selector="5" tabindex="0"></div>
        </FocusTrap>
      `);

      document.querySelector(generateTestSelector('1')).blur();

      assert.dom(generateTestSelector('1')).isNotFocused();

      await triggerKeyEvent(document.body, 'keydown', 9);

      assert.dom(generateTestSelector('1')).isFocused();
    });

    test('when the end is reached, it gives focus to the first element', async function(assert) {
      await render(hbs`
        <FocusTrap>
          <div data-test-selector="1" tabindex="0"></div>
          <div data-test-selector="2" tabindex="0"></div>
          <div data-test-selector="3" tabindex="0"></div>
          <div data-test-selector="4" tabindex="0"></div>
          <div data-test-selector="5" tabindex="0"></div>
        </FocusTrap>
      `);

      document.querySelector(generateTestSelector('5')).focus();

      await triggerKeyEvent(document.body, 'keydown', 9);

      assert.dom(generateTestSelector('1')).isFocused();
    });

    test('gives focus to the next item, happy path', async function(assert) {
      await render(hbs`
        <FocusTrap>
          <div data-test-selector="1" tabindex="0"></div>
          <div data-test-selector="2" tabindex="0"></div>
          <div data-test-selector="3" tabindex="0"></div>
          <div data-test-selector="4" tabindex="0"></div>
          <div data-test-selector="5" tabindex="0"></div>
        </FocusTrap>
      `);

      assert.dom(generateTestSelector('1')).isNotFocused();

      await triggerKeyEvent(document.body, 'keydown', 9);

      assert.dom(generateTestSelector('1')).isFocused();

      await triggerKeyEvent(document.body, 'keydown', 9);

      assert.dom(generateTestSelector('2')).isFocused();

      await triggerKeyEvent(document.body, 'keydown', 9);

      assert.dom(generateTestSelector('3')).isFocused();

      await triggerKeyEvent(document.body, 'keydown', 9);

      assert.dom(generateTestSelector('4')).isFocused();

      await triggerKeyEvent(document.body, 'keydown', 9);

      assert.dom(generateTestSelector('5')).isFocused();

      await triggerKeyEvent(document.body, 'keydown', 9);

      assert.dom(generateTestSelector('1')).isFocused();
    });
  });

  module('pressing shift tab', function() {
    test('when the known focusables are not focused, gives focus to the last item', async function(assert) {
      await render(hbs`
        <FocusTrap>
          <div data-test-selector="1" tabindex="0"></div>
          <div data-test-selector="2" tabindex="0"></div>
          <div data-test-selector="3" tabindex="0"></div>
          <div data-test-selector="4" tabindex="0"></div>
          <div data-test-selector="5" tabindex="0"></div>
        </FocusTrap>
      `);

      document.querySelector(generateTestSelector('1')).blur();

      assert.dom(generateTestSelector('1')).isNotFocused();

      await triggerKeyEvent(document.body, 'keydown', 9, { shiftKey: true });

      assert.dom(generateTestSelector('5')).isFocused();
    });

    test('when the begining is reached, it gives focus to the last item', async function(assert) {
      await render(hbs`
        <FocusTrap>
          <div data-test-selector="1" tabindex="0"></div>
          <div data-test-selector="2" tabindex="0"></div>
          <div data-test-selector="3" tabindex="0"></div>
          <div data-test-selector="4" tabindex="0"></div>
          <div data-test-selector="5" tabindex="0"></div>
        </FocusTrap>
      `);

      assert.dom(generateTestSelector('1')).isNotFocused();

      await triggerKeyEvent(document.body, 'keydown', 9, { shiftKey: true });

      assert.dom(generateTestSelector('5')).isFocused();
    });

    test('gives focus to the previous item, happy path', async function(assert) {
      await render(hbs`
        <FocusTrap>
          <div data-test-selector="1" tabindex="0"></div>
          <div data-test-selector="2" tabindex="0"></div>
          <div data-test-selector="3" tabindex="0"></div>
          <div data-test-selector="4" tabindex="0"></div>
          <div data-test-selector="5" tabindex="0"></div>
        </FocusTrap>
      `);

      document.querySelector(generateTestSelector('5')).focus();

      await triggerKeyEvent(document.body, 'keydown', 9, { shiftKey: true });

      assert.dom(generateTestSelector('4')).isFocused();

      await triggerKeyEvent(document.body, 'keydown', 9, { shiftKey: true });

      assert.dom(generateTestSelector('3')).isFocused();

      await triggerKeyEvent(document.body, 'keydown', 9, { shiftKey: true });

      assert.dom(generateTestSelector('2')).isFocused();

      await triggerKeyEvent(document.body, 'keydown', 9, { shiftKey: true });

      assert.dom(generateTestSelector('1')).isFocused();

      await triggerKeyEvent(document.body, 'keydown', 9, { shiftKey: true });

      assert.dom(generateTestSelector('5')).isFocused();
    });
  });

  test('will skip hidden items', async function(assert) {
    await render(hbs`
      <FocusTrap>
        <div data-test-selector="1" tabindex="0"></div>
        <div data-test-selector="2" tabindex="0" style="display: none;"></div>
        <div data-test-selector="3" tabindex="0" style="display: none;"></div>
        <div data-test-selector="4" tabindex="0"></div>
        <div data-test-selector="5" tabindex="0"></div>
      </FocusTrap>
    `);

    document.querySelector(generateTestSelector('1')).focus();

    await triggerKeyEvent(document.body, 'keydown', 9);

    assert.dom(generateTestSelector('4')).isFocused();
  });

  test('accepts splattributes', async function(assert) {
    await render(hbs`
      <FocusTrap data-test-selector="splatter">
        <div data-test-selector="1" tabindex="0"></div>
      </FocusTrap>
    `);

    assert.dom(generateTestSelector('splatter')).exists();
  });

  module('pressing home', function() {
    test('gives focus to the first item', async function(assert) {
      await render(hbs`
        <FocusTrap>
          <div data-test-selector="1" tabindex="0"></div>
          <div data-test-selector="2" tabindex="0"></div>
          <div data-test-selector="3" tabindex="0"></div>
          <div data-test-selector="4" tabindex="0"></div>
          <div data-test-selector="5" tabindex="0"></div>
        </FocusTrap>
      `);

      document.querySelector(generateTestSelector('1')).blur();

      assert.dom(generateTestSelector('1')).isNotFocused();

      await triggerKeyEvent(document.body, 'keydown', 36);

      assert.dom(generateTestSelector('1')).isFocused();
    });
  });

  module('pressing end', function() {
    test('gives focus to the last item', async function(assert) {
      await render(hbs`
        <FocusTrap>
          <div data-test-selector="1" tabindex="0"></div>
          <div data-test-selector="2" tabindex="0"></div>
          <div data-test-selector="3" tabindex="0"></div>
          <div data-test-selector="4" tabindex="0"></div>
          <div data-test-selector="5" tabindex="0"></div>
        </FocusTrap>
      `);

      document.querySelector(generateTestSelector('1')).blur();

      assert.dom(generateTestSelector('1')).isNotFocused();

      await triggerKeyEvent(document.body, 'keydown', 35);

      assert.dom(generateTestSelector('5')).isFocused();
    });
  });
});
