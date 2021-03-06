import { html } from 'lit-html'
import { unsafeHTML } from 'lit-html/lib/unsafe-html'

const $template = Symbol()

/**
 * Applies the stylesheet to the given element. Used in the `renderCallback`
 *
 * @example
 * import style from 'x-global-header/src/util/style.js';
 * import css from './style.css';
 *
 * export class Foo extends Component {
 *   ...
 *
 *   renderCallback() {
 *     return (
 *       <div>
 *         { style(this, css) }
 *         <p>
 *           Hello, world!
 *         </p>
 *       </div>
 *     );
 *   }
 * }
 *
 * @param {HTMLElement} elem the element to apply the styles to
 * @param {string} css the stylesheet to add to the element
 * @returns {HTMLElement|undefined} might return a `style` tag, or nothing at all
 */
export default function style(elem, css) {
  let style = `<style>${css}</style>`
  if (ShadyCSS.nativeShadow) {
    return html`${unsafeHTML(style)}`
  }

  const template = elem[$template] || (elem[$template] = document.createElement('template'))
  template.innerHTML = style
  ShadyCSS.prepareTemplate(template, elem.localName)
}
