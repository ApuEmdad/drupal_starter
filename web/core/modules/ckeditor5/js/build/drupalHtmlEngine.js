!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
      ? define([], t)
      : 'object' == typeof exports
        ? (exports.CKEditor5 = t())
        : ((e.CKEditor5 = e.CKEditor5 || {}),
          (e.CKEditor5.drupalHtmlEngine = t()));
})(globalThis, () =>
  (() => {
    var e = {
        'ckeditor5/src/core.js': (e, t, n) => {
          e.exports = n('dll-reference CKEditor5.dll')('./src/core.js');
        },
        'dll-reference CKEditor5.dll': (e) => {
          'use strict';
          e.exports = CKEditor5.dll;
        },
      },
      t = {};
    function n(p) {
      var r = t[p];
      if (void 0 !== r) return r.exports;
      var s = (t[p] = { exports: {} });
      return e[p](s, s.exports, n), s.exports;
    }
    (n.d = (e, t) => {
      for (var p in t)
        n.o(t, p) &&
          !n.o(e, p) &&
          Object.defineProperty(e, p, { enumerable: !0, get: t[p] });
    }),
      (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t));
    var p = {};
    return (
      (() => {
        'use strict';
        n.d(p, { default: () => o });
        var e = n('ckeditor5/src/core.js');
        class t {
          constructor() {
            (this.chunks = []),
              (this.selfClosingTags = [
                'area',
                'base',
                'br',
                'col',
                'embed',
                'hr',
                'img',
                'input',
                'link',
                'meta',
                'param',
                'source',
                'track',
                'wbr',
              ]);
          }
          build() {
            return this.chunks.join('');
          }
          appendNode(e) {
            e.nodeType === Node.TEXT_NODE
              ? this._appendText(e)
              : e.nodeType === Node.ELEMENT_NODE
                ? this._appendElement(e)
                : e.nodeType === Node.DOCUMENT_FRAGMENT_NODE
                  ? this._appendChildren(e)
                  : e.nodeType === Node.COMMENT_NODE && this._appendComment(e);
          }
          _appendElement(e) {
            const t = e.nodeName.toLowerCase();
            this._append('<'),
              this._append(t),
              this._appendAttributes(e),
              this._append('>'),
              this.selfClosingTags.includes(t) ||
                (this._appendChildren(e),
                this._append('</'),
                this._append(t),
                this._append('>'));
          }
          _appendChildren(e) {
            Object.keys(e.childNodes).forEach((t) => {
              this.appendNode(e.childNodes[t]);
            });
          }
          _appendAttributes(e) {
            Object.keys(e.attributes).forEach((t) => {
              this._append(' '),
                this._append(e.attributes[t].name),
                this._append('="'),
                this._append(
                  this.constructor._escapeAttribute(e.attributes[t].value),
                ),
                this._append('"');
            });
          }
          _appendText(e) {
            const t = document.implementation
              .createHTMLDocument('')
              .createElement('p');
            (t.textContent = e.textContent), this._append(t.innerHTML);
          }
          _appendComment(e) {
            this._append('\x3c!--'),
              this._append(e.textContent),
              this._append('--\x3e');
          }
          _append(e) {
            this.chunks.push(e);
          }
          static _escapeAttribute(e) {
            return e
              .replace(/&/g, '&amp;')
              .replace(/'/g, '&apos;')
              .replace(/"/g, '&quot;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/\r\n/g, '&#13;')
              .replace(/[\r\n]/g, '&#13;');
          }
        }
        class r {
          getHtml(e) {
            const n = new t();
            return n.appendNode(e), n.build();
          }
        }
        class s extends e.Plugin {
          init() {
            this.editor.data.processor.htmlWriter = new r();
          }
          static get pluginName() {
            return 'DrupalHtmlEngine';
          }
        }
        const o = { DrupalHtmlEngine: s };
      })(),
      (p = p.default)
    );
  })(),
);
