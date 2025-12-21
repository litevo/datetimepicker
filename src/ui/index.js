import { render } from './renderer.js';
import { bindEvents } from './events.js';

export function initDateTimePickerUI(selector, controller) {
  const container = document.querySelector(selector);

  const rerender = () => render(container, controller);

  bindEvents(container, controller, rerender);
  rerender();
}
