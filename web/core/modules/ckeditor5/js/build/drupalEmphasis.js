!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
      ? define([], t)
      : 'object' == typeof exports
        ? (exports.CKEditor5 = t())
        : ((e.CKEditor5 = e.CKEditor5 || {}),
          (e.CKEditor5.drupalEmphasis = t()));
})(globalThis, () =>
  (() => {
    var e = {
        'ckeditor5/src/core.js': (e, t, r) => {
          e.exports = r('dll-reference CKEditor5.dll')('./src/core.js');
        },
        'dll-reference CKEditor5.dll': (e) => {
          'use strict';
          e.exports = CKEditor5.dll;
        },
      },
      t = {};
    function r(o) {
      var i = t[o];
      if (void 0 !== i) return i.exports;
      var s = (t[o] = { exports: {} });
      return e[o](s, s.exports, r), s.exports;
    }
    (r.d = (e, t) => {
      for (var o in t)
        r.o(t, o) &&
          !r.o(e, o) &&
          Object.defineProperty(e, o, { enumerable: !0, get: t[o] });
    }),
      (r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t));
    var o = {};
    return (
      (() => {
        'use strict';
        r.d(o, { default: () => n });
        var e = r('ckeditor5/src/core.js');
        class t extends e.Plugin {
          static get pluginName() {
            return 'DrupalEmphasisEditing';
          }
          init() {
            this.editor.conversion.for('downcast').attributeToElement({
              model: 'italic',
              view: 'em',
              converterPriority: 'high',
            });
          }
        }
        const i = t;
        class s extends e.Plugin {
          static get requires() {
            return [i];
          }
          static get pluginName() {
            return 'DrupalEmphasis';
          }
        }
        const n = { DrupalEmphasis: s };
      })(),
      (o = o.default)
    );
  })(),
);
