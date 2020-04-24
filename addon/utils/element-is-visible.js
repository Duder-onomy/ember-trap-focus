export default function elementIsVisible(element) {
  let computedStyle = document.defaultView.getComputedStyle(element, null);

  return computedStyle.getPropertyValue('display') !== 'none' && computedStyle.getPropertyValue('visibility') !== 'hidden';
}
