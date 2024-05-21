!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
      ? define([], t)
      : 'object' == typeof exports
        ? (exports.CKEditor5 = t())
        : ((e.CKEditor5 = e.CKEditor5 || {}), (e.CKEditor5.drupalImage = t()));
})(globalThis, () =>
  (() => {
    var e = {
        'ckeditor5/src/core.js': (e, t, i) => {
          e.exports = i('dll-reference CKEditor5.dll')('./src/core.js');
        },
        'ckeditor5/src/engine.js': (e, t, i) => {
          e.exports = i('dll-reference CKEditor5.dll')('./src/engine.js');
        },
        'ckeditor5/src/ui.js': (e, t, i) => {
          e.exports = i('dll-reference CKEditor5.dll')('./src/ui.js');
        },
        'ckeditor5/src/upload.js': (e, t, i) => {
          e.exports = i('dll-reference CKEditor5.dll')('./src/upload.js');
        },
        'ckeditor5/src/utils.js': (e, t, i) => {
          e.exports = i('dll-reference CKEditor5.dll')('./src/utils.js');
        },
        'dll-reference CKEditor5.dll': (e) => {
          'use strict';
          e.exports = CKEditor5.dll;
        },
      },
      t = {};
    function i(r) {
      var s = t[r];
      if (void 0 !== s) return s.exports;
      var n = (t[r] = { exports: {} });
      return e[r](n, n.exports, i), n.exports;
    }
    (i.d = (e, t) => {
      for (var r in t)
        i.o(t, r) &&
          !i.o(e, r) &&
          Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
    }),
      (i.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t));
    var r = {};
    return (
      (() => {
        'use strict';
        i.d(r, { default: () => B });
        var e = i('ckeditor5/src/core.js');
        function t(e, t, i) {
          if (t.attributes)
            for (const [r, s] of Object.entries(t.attributes))
              e.setAttribute(r, s, i);
          t.styles && e.setStyle(t.styles, i),
            t.classes && e.addClass(t.classes, i);
        }
        var s = i('ckeditor5/src/engine.js');
        class n extends s.Observer {
          observe(e) {
            this.listenTo(
              e,
              'load',
              (e, t) => {
                const i = t.target;
                this.checkShouldIgnoreEventFromTarget(i) ||
                  ('IMG' == i.tagName && this._fireEvents(t));
              },
              { useCapture: !0 },
            );
          }
          stopObserving(e) {
            this.stopListening(e);
          }
          _fireEvents(e) {
            this.isEnabled &&
              (this.document.fire('layoutChanged'),
              this.document.fire('imageLoaded', e));
          }
        }
        function o(e) {
          return e.createEmptyElement('img');
        }
        function a(e) {
          const t = parseFloat(e);
          return !Number.isNaN(t) && e === String(t);
        }
        function l(e) {
          return 'string' == typeof e && e.endsWith('%')
            ? e
            : `${parseInt(e, 10)}`;
        }
        const u = [
          { modelValue: 'alignCenter', dataValue: 'center' },
          { modelValue: 'alignRight', dataValue: 'right' },
          { modelValue: 'alignLeft', dataValue: 'left' },
        ];
        class d extends e.Plugin {
          static get requires() {
            return ['ImageUtils'];
          }
          static get pluginName() {
            return 'DrupalImageEditing';
          }
          init() {
            const { editor: e } = this,
              { conversion: i } = e,
              { schema: r } = e.model;
            if (
              (r.isRegistered('imageInline') &&
                r.extend('imageInline', {
                  allowAttributes: [
                    'dataEntityUuid',
                    'dataEntityType',
                    'isDecorative',
                  ],
                }),
              r.isRegistered('imageBlock') &&
                r.extend('imageBlock', {
                  allowAttributes: [
                    'dataEntityUuid',
                    'dataEntityType',
                    'isDecorative',
                  ],
                }),
              i
                .for('upcast')
                .add(
                  (function (e) {
                    function t(t, i, r) {
                      const { viewItem: s } = i,
                        {
                          writer: n,
                          consumable: o,
                          safeInsert: a,
                          updateConversionResult: l,
                          schema: d,
                        } = r,
                        c = [];
                      let m;
                      if (!o.test(s, { name: !0, attributes: 'src' })) return;
                      const g = o.test(s, {
                        name: !0,
                        attributes: 'data-caption',
                      });
                      if (
                        ((m =
                          d.checkChild(i.modelCursor, 'imageInline') && !g
                            ? n.createElement('imageInline', {
                                src: s.getAttribute('src'),
                              })
                            : n.createElement('imageBlock', {
                                src: s.getAttribute('src'),
                              })),
                        e.plugins.has('ImageStyleEditing') &&
                          o.test(s, { name: !0, attributes: 'data-align' }))
                      ) {
                        const e = s.getAttribute('data-align'),
                          t = u.find((t) => t.dataValue === e);
                        t &&
                          (n.setAttribute('imageStyle', t.modelValue, m),
                          c.push('data-align'));
                      }
                      if (g) {
                        const t = n.createElement('caption'),
                          i = e.data.processor.toView(
                            s.getAttribute('data-caption'),
                          );
                        r.consumable.constructor.createFrom(i, r.consumable),
                          r.convertChildren(i, t),
                          n.append(t, m),
                          c.push('data-caption');
                      }
                      o.test(s, { name: !0, attributes: 'data-entity-uuid' }) &&
                        (n.setAttribute(
                          'dataEntityUuid',
                          s.getAttribute('data-entity-uuid'),
                          m,
                        ),
                        c.push('data-entity-uuid')),
                        o.test(s, {
                          name: !0,
                          attributes: 'data-entity-type',
                        }) &&
                          (n.setAttribute(
                            'dataEntityType',
                            s.getAttribute('data-entity-type'),
                            m,
                          ),
                          c.push('data-entity-type')),
                        a(m, i.modelCursor) &&
                          (o.consume(s, { name: !0, attributes: c }), l(m, i));
                    }
                    return (e) => {
                      e.on('element:img', t, { priority: 'high' });
                    };
                  })(e),
                )
                .attributeToAttribute({
                  view: { name: 'img', key: 'width' },
                  model: {
                    key: 'resizedWidth',
                    value: (e) =>
                      a(e.getAttribute('width'))
                        ? `${parseInt(e.getAttribute('width'), 10)}px`
                        : e.getAttribute('width').trim(),
                  },
                })
                .attributeToAttribute({
                  view: { name: 'img', key: 'height' },
                  model: {
                    key: 'resizedHeight',
                    value: (e) =>
                      a(e.getAttribute('height'))
                        ? `${parseInt(e.getAttribute('height'), 10)}px`
                        : e.getAttribute('height').trim(),
                  },
                }),
              e.plugins.has('DataFilter'))
            ) {
              const t = e.plugins.get('DataFilter');
              i.for('upcast').add(
                (function (e) {
                  function t(t, i, r) {
                    if (!i.modelRange) return;
                    const s = i.viewItem.parent;
                    if (!s.is('element', 'a')) return;
                    if (
                      !i.modelRange
                        .getContainedElement()
                        .is('element', 'imageBlock')
                    )
                      return;
                    const n = e.processViewAttributes(s, r);
                    n &&
                      r.writer.setAttribute(
                        'htmlLinkAttributes',
                        n,
                        i.modelRange,
                      );
                  }
                  return (e) => {
                    e.on('element:img', t, { priority: 'high' });
                  };
                })(t),
              );
            }
            i
              .for('downcast')
              .add(
                (function () {
                  function e(e, t, i) {
                    const { item: r } = t,
                      { consumable: s, writer: n } = i;
                    if (!s.consume(r, e.name)) return;
                    const o = i.mapper.toViewElement(r),
                      a = Array.from(o.getChildren()).find(
                        (e) => 'img' === e.name,
                      );
                    n.setAttribute(
                      'data-entity-uuid',
                      t.attributeNewValue,
                      a || o,
                    );
                  }
                  return (t) => {
                    t.on('attribute:dataEntityUuid', e);
                  };
                })(),
              )
              .add(
                (function () {
                  function e(e, t, i) {
                    const { item: r } = t,
                      { consumable: s, writer: n } = i;
                    if (!s.consume(r, e.name)) return;
                    const o = i.mapper.toViewElement(r),
                      a = Array.from(o.getChildren()).find(
                        (e) => 'img' === e.name,
                      );
                    n.setAttribute(
                      'data-entity-type',
                      t.attributeNewValue,
                      a || o,
                    );
                  }
                  return (t) => {
                    t.on('attribute:dataEntityType', e);
                  };
                })(),
              ),
              i
                .for('dataDowncast')
                .add(
                  (function (e) {
                    return (t) => {
                      t.on(
                        'insert:caption',
                        (t, i, r) => {
                          const { consumable: s, writer: n, mapper: o } = r;
                          if (
                            !e.plugins
                              .get('ImageUtils')
                              .isImage(i.item.parent) ||
                            !s.consume(i.item, 'insert')
                          )
                            return;
                          const a = e.model.createRangeIn(i.item),
                            l = n.createDocumentFragment();
                          o.bindElements(i.item, l);
                          for (const { item: t } of Array.from(a)) {
                            const i = {
                                item: t,
                                range: e.model.createRangeOn(t),
                              },
                              s = `insert:${t.name || '$text'}`;
                            e.data.downcastDispatcher.fire(s, i, r);
                            for (const s of t.getAttributeKeys())
                              Object.assign(i, {
                                attributeKey: s,
                                attributeOldValue: null,
                                attributeNewValue: i.item.getAttribute(s),
                              }),
                                e.data.downcastDispatcher.fire(
                                  `attribute:${s}`,
                                  i,
                                  r,
                                );
                          }
                          for (const e of n.createRangeIn(l).getItems())
                            o.unbindViewElement(e);
                          o.unbindViewElement(l);
                          const u = e.data.processor.toData(l);
                          if (u) {
                            const e = o.toViewElement(i.item.parent);
                            n.setAttribute('data-caption', u, e);
                          }
                        },
                        { priority: 'high' },
                      );
                    };
                  })(e),
                )
                .elementToElement({
                  model: 'imageBlock',
                  view: (e, { writer: t }) => o(t),
                  converterPriority: 'high',
                })
                .elementToElement({
                  model: 'imageInline',
                  view: (e, { writer: t }) => o(t),
                  converterPriority: 'high',
                })
                .add(
                  (function () {
                    function e(e, t, i) {
                      const { item: r } = t,
                        { consumable: s, writer: n } = i,
                        o = u.find((e) => e.modelValue === t.attributeNewValue);
                      if (!o || !s.consume(r, e.name)) return;
                      const a = i.mapper.toViewElement(r),
                        l = Array.from(a.getChildren()).find(
                          (e) => 'img' === e.name,
                        );
                      n.setAttribute('data-align', o.dataValue, l || a);
                    }
                    return (t) => {
                      t.on('attribute:imageStyle', e, { priority: 'high' });
                    };
                  })(),
                )
                .add(
                  (function () {
                    function e(e, i, r) {
                      if (!r.consumable.consume(i.item, e.name)) return;
                      const s = r.mapper.toViewElement(i.item),
                        n = r.writer,
                        o = n.createContainerElement('a', {
                          href: i.attributeNewValue,
                        });
                      n.insert(n.createPositionBefore(s), o),
                        n.move(n.createRangeOn(s), n.createPositionAt(o, 0)),
                        r.consumable.consume(
                          i.item,
                          'attribute:htmlLinkAttributes:imageBlock',
                        ) &&
                          t(
                            r.writer,
                            i.item.getAttribute('htmlLinkAttributes'),
                            o,
                          );
                    }
                    return (t) => {
                      t.on('attribute:linkHref:imageBlock', e, {
                        priority: 'high',
                      });
                    };
                  })(),
                )
                .attributeToAttribute({
                  model: { name: 'imageBlock', key: 'resizedWidth' },
                  view: (e) => ({ key: 'width', value: l(e) }),
                  converterPriority: 'high',
                })
                .attributeToAttribute({
                  model: { name: 'imageInline', key: 'resizedWidth' },
                  view: (e) => ({ key: 'width', value: l(e) }),
                  converterPriority: 'high',
                })
                .attributeToAttribute({
                  model: { name: 'imageBlock', key: 'resizedHeight' },
                  view: (e) => ({ key: 'height', value: l(e) }),
                  converterPriority: 'high',
                })
                .attributeToAttribute({
                  model: { name: 'imageInline', key: 'resizedHeight' },
                  view: (e) => ({ key: 'height', value: l(e) }),
                  converterPriority: 'high',
                })
                .attributeToAttribute({
                  model: { name: 'imageBlock', key: 'width' },
                  view: (e, { consumable: t }, i) =>
                    i.item.hasAttribute('resizedWidth')
                      ? (t.consume(i.item, 'attribute:width'), null)
                      : { key: 'width', value: e },
                  converterPriority: 'high',
                })
                .attributeToAttribute({
                  model: { name: 'imageInline', key: 'width' },
                  view: (e, { consumable: t }, i) =>
                    i.item.hasAttribute('resizedWidth')
                      ? (t.consume(i.item, 'attribute:width'), null)
                      : { key: 'width', value: e },
                  converterPriority: 'high',
                })
                .attributeToAttribute({
                  model: { name: 'imageBlock', key: 'height' },
                  view: (e, t, i) => {
                    if (i.item.hasAttribute('resizedWidth')) {
                      if (i.item.getAttribute('resizedWidth').endsWith('%'))
                        return {
                          key: 'height',
                          value: i.item.getAttribute('resizedWidth'),
                        };
                      const t = parseInt(
                          i.item.getAttribute('resizedWidth'),
                          10,
                        ),
                        r =
                          parseInt(i.item.getAttribute('width'), 10) /
                          parseInt(e, 10);
                      return { key: 'height', value: `${Math.round(t / r)}` };
                    }
                    return { key: 'height', value: e };
                  },
                  converterPriority: 'high',
                })
                .attributeToAttribute({
                  model: { name: 'imageInline', key: 'height' },
                  view: (e, t, i) => {
                    if (i.item.hasAttribute('resizedWidth')) {
                      if (i.item.getAttribute('resizedWidth').endsWith('%'))
                        return {
                          key: 'height',
                          value: i.item.getAttribute('resizedWidth'),
                        };
                      const t = parseInt(
                          i.item.getAttribute('resizedWidth'),
                          10,
                        ),
                        r =
                          parseInt(i.item.getAttribute('width'), 10) /
                          parseInt(e, 10);
                      return { key: 'height', value: `${Math.round(t / r)}` };
                    }
                    return { key: 'height', value: e };
                  },
                  converterPriority: 'high',
                }),
              e.editing.view.addObserver(n);
            const s = e.plugins.get('ImageUtils');
            e.editing.view.document.on('imageLoaded', (t, i) => {
              const r = e.editing.view.domConverter.mapDomToView(i.target);
              if (!r) return;
              const n = s.getImageWidgetFromImageView(r);
              if (!n) return;
              const o = e.editing.mapper.toModelElement(n);
              o &&
                e.model.enqueueChange({ isUndoable: !1 }, () => {
                  s.setImageNaturalSizeAttributes(o);
                });
            });
          }
        }
        class c extends e.Command {
          refresh() {
            const e = this.editor.plugins
              .get('ImageUtils')
              .getClosestSelectedImageElement(
                this.editor.model.document.selection,
              );
            (this.isEnabled = !!e),
              this.isEnabled && e.hasAttribute('alt')
                ? (this.value = e.getAttribute('alt'))
                : (this.value = !1);
          }
          execute(e) {
            const t = this.editor,
              i = t.plugins.get('ImageUtils'),
              r = t.model,
              s = i.getClosestSelectedImageElement(r.document.selection);
            r.change((t) => {
              t.setAttribute('alt', e.newValue, s);
            });
          }
        }
        class m extends e.Plugin {
          static get requires() {
            return ['ImageUtils'];
          }
          static get pluginName() {
            return 'DrupalImageAlternativeTextEditing';
          }
          constructor(e) {
            super(e), (this._missingAltTextViewReferences = new Set());
          }
          init() {
            const e = this.editor;
            e.conversion
              .for('editingDowncast')
              .add(this._imageEditingDowncastConverter('attribute:alt', e))
              .add(this._imageEditingDowncastConverter('attribute:src', e)),
              e.commands.add('imageTextAlternative', new c(this.editor)),
              e.editing.view.on('render', () => {
                for (const e of this._missingAltTextViewReferences)
                  e.button.element.isConnected ||
                    (e.destroy(), this._missingAltTextViewReferences.delete(e));
              });
          }
          _imageEditingDowncastConverter(e) {
            const t = (e, t, i) => {
              const r = this.editor;
              if (!r.plugins.get('ImageUtils').isImage(t.item)) return;
              const s = i.mapper.toViewElement(t.item),
                n = Array.from(s.getChildren()).find((e) =>
                  e.getCustomProperty('drupalImageMissingAltWarning'),
                );
              if (t.item.hasAttribute('alt'))
                return void (n && i.writer.remove(n));
              if (n) return;
              const o = r.ui.componentFactory.create(
                'drupalImageAlternativeTextMissing',
              );
              o.listenTo(r.ui, 'update', () => {
                const e = r.model.document.selection.getFirstRange(),
                  i = r.model.createRangeOn(t.item);
                o.set({
                  isSelected: e.containsRange(i) || e.isIntersecting(i),
                });
              }),
                o.render(),
                this._missingAltTextViewReferences.add(o);
              const a = i.writer.createUIElement(
                'span',
                { class: 'image-alternative-text-missing-wrapper' },
                function (e) {
                  const t = this.toDomElement(e);
                  return t.appendChild(o.element), t;
                },
              );
              i.writer.setCustomProperty('drupalImageMissingAltWarning', !0, a),
                i.writer.insert(i.writer.createPositionAt(s, 'end'), a);
            };
            return (i) => {
              i.on(e, t, { priority: 'low' });
            };
          }
        }
        var g = i('ckeditor5/src/ui.js');
        function h(e) {
          const t = e.plugins.get('ContextualBalloon');
          if (
            e.plugins
              .get('ImageUtils')
              .getClosestSelectedImageWidget(e.editing.view.document.selection)
          ) {
            const i = p(e);
            t.updatePosition(i);
          }
        }
        function p(e) {
          const t = e.editing.view,
            i = g.BalloonPanelView.defaultPositions,
            r = e.plugins.get('ImageUtils');
          return {
            target: t.domConverter.mapViewToDom(
              r.getClosestSelectedImageWidget(t.document.selection),
            ),
            positions: [
              i.northArrowSouth,
              i.northArrowSouthWest,
              i.northArrowSouthEast,
              i.southArrowNorth,
              i.southArrowNorthWest,
              i.southArrowNorthEast,
              i.viewportStickyNorth,
            ],
          };
        }
        var b = i('ckeditor5/src/utils.js');
        class f extends g.View {
          constructor(t) {
            super(t),
              (this.focusTracker = new b.FocusTracker()),
              (this.keystrokes = new b.KeystrokeHandler()),
              (this.decorativeToggle = this._decorativeToggleView()),
              (this.labeledInput = this._createLabeledInputView()),
              (this.saveButtonView = this._createButton(
                Drupal.t('Save'),
                e.icons.check,
                'ck-button-save',
              )),
              (this.saveButtonView.type = 'submit'),
              this.saveButtonView
                .bind('isEnabled')
                .to(
                  this.decorativeToggle,
                  'isOn',
                  this.labeledInput,
                  'isEmpty',
                  (e, t) => e || !t,
                ),
              (this.cancelButtonView = this._createButton(
                Drupal.t('Cancel'),
                e.icons.cancel,
                'ck-button-cancel',
                'cancel',
              )),
              (this._focusables = new g.ViewCollection()),
              (this._focusCycler = new g.FocusCycler({
                focusables: this._focusables,
                focusTracker: this.focusTracker,
                keystrokeHandler: this.keystrokes,
                actions: { focusPrevious: 'shift + tab', focusNext: 'tab' },
              })),
              this.setTemplate({
                tag: 'form',
                attributes: {
                  class: [
                    'ck',
                    'ck-text-alternative-form',
                    'ck-text-alternative-form--with-decorative-toggle',
                    'ck-responsive-form',
                  ],
                  tabindex: '-1',
                },
                children: [
                  {
                    tag: 'div',
                    attributes: {
                      class: [
                        'ck',
                        'ck-text-alternative-form__decorative-toggle',
                      ],
                    },
                    children: [this.decorativeToggle],
                  },
                  this.labeledInput,
                  this.saveButtonView,
                  this.cancelButtonView,
                ],
              }),
              (0, g.injectCssTransitionDisabler)(this);
          }
          render() {
            super.render(),
              this.keystrokes.listenTo(this.element),
              (0, g.submitHandler)({ view: this }),
              [
                this.decorativeToggle,
                this.labeledInput,
                this.saveButtonView,
                this.cancelButtonView,
              ].forEach((e) => {
                this._focusables.add(e), this.focusTracker.add(e.element);
              });
          }
          destroy() {
            super.destroy(),
              this.focusTracker.destroy(),
              this.keystrokes.destroy();
          }
          _createButton(e, t, i, r) {
            const s = new g.ButtonView(this.locale);
            return (
              s.set({ label: e, icon: t, tooltip: !0 }),
              s.extendTemplate({ attributes: { class: i } }),
              r && s.delegate('execute').to(this, r),
              s
            );
          }
          _createLabeledInputView() {
            const e = new g.LabeledFieldView(
              this.locale,
              g.createLabeledInputText,
            );
            return (
              e
                .bind('class')
                .to(this.decorativeToggle, 'isOn', (e) =>
                  e ? 'ck-hidden' : '',
                ),
              (e.label = Drupal.t('Alternative text')),
              e
            );
          }
          _decorativeToggleView() {
            const e = new g.SwitchButtonView(this.locale);
            return (
              e.set({ withText: !0, label: Drupal.t('Decorative image') }),
              e.on('execute', () => {
                e.set('isOn', !e.isOn);
              }),
              e
            );
          }
        }
        class w extends g.View {
          constructor(e) {
            super(e);
            const t = this.bindTemplate;
            this.set('isVisible'), this.set('isSelected');
            const i = Drupal.t('Add missing alternative text');
            (this.button = new g.ButtonView(e)),
              this.button.set({ label: i, tooltip: !1, withText: !0 }),
              this.setTemplate({
                tag: 'span',
                attributes: {
                  class: [
                    'image-alternative-text-missing',
                    t.to('isVisible', (e) => (e ? '' : 'ck-hidden')),
                  ],
                  title: i,
                },
                children: [this.button],
              });
          }
        }
        class v extends e.Plugin {
          static get requires() {
            return [g.ContextualBalloon];
          }
          static get pluginName() {
            return 'DrupalImageTextAlternativeUI';
          }
          init() {
            this._createButton(),
              this._createForm(),
              this._createMissingAltTextComponent();
            const e = () => {
              this.editor.plugins
                .get('ImageUtils')
                .getClosestSelectedImageWidget(
                  this.editor.editing.view.document.selection,
                ) && this._showForm();
            };
            if (this.editor.commands.get('insertImage')) {
              this.editor.commands.get('insertImage').on('execute', e);
            }
            if (this.editor.plugins.has('ImageUploadEditing')) {
              this.editor.plugins
                .get('ImageUploadEditing')
                .on('uploadComplete', e);
            }
          }
          _createMissingAltTextComponent() {
            this.editor.ui.componentFactory.add(
              'drupalImageAlternativeTextMissing',
              (e) => {
                const t = new w(e);
                return (
                  t.listenTo(t.button, 'execute', () => {
                    this._isInBalloon && this._balloon.remove(this._form),
                      this._showForm();
                  }),
                  t.listenTo(this.editor.ui, 'update', () => {
                    t.set({ isVisible: !this._isVisible || !t.isSelected });
                  }),
                  t
                );
              },
            );
          }
          destroy() {
            super.destroy(), this._form.destroy();
          }
          _createButton() {
            const t = this.editor;
            t.ui.componentFactory.add('drupalImageAlternativeText', (i) => {
              const r = t.commands.get('imageTextAlternative'),
                s = new g.ButtonView(i);
              return (
                s.set({
                  label: Drupal.t('Change image alternative text'),
                  icon: e.icons.lowVision,
                  tooltip: !0,
                }),
                s.bind('isEnabled').to(r, 'isEnabled'),
                this.listenTo(s, 'execute', () => {
                  this._showForm();
                }),
                s
              );
            });
          }
          _createForm() {
            const e = this.editor,
              t = e.editing.view.document,
              i = e.plugins.get('ImageUtils');
            (this._balloon = this.editor.plugins.get('ContextualBalloon')),
              (this._form = new f(e.locale)),
              this._form.render(),
              this.listenTo(this._form, 'submit', () => {
                e.execute('imageTextAlternative', {
                  newValue: this._form.decorativeToggle.isOn
                    ? ''
                    : this._form.labeledInput.fieldView.element.value,
                }),
                  this._hideForm(!0);
              }),
              this.listenTo(this._form, 'cancel', () => {
                this._hideForm(!0);
              }),
              this.listenTo(this._form.decorativeToggle, 'execute', () => {
                h(e);
              }),
              this._form.keystrokes.set('Esc', (e, t) => {
                this._hideForm(!0), t();
              }),
              this.listenTo(e.ui, 'update', () => {
                i.getClosestSelectedImageWidget(t.selection)
                  ? this._isVisible && h(e)
                  : this._hideForm(!0);
              }),
              (0, g.clickOutsideHandler)({
                emitter: this._form,
                activator: () => this._isVisible,
                contextElements: [this._balloon.view.element],
                callback: () => this._hideForm(),
              });
          }
          _showForm() {
            if (this._isVisible) return;
            const e = this.editor,
              t = e.commands.get('imageTextAlternative'),
              i = this._form.decorativeToggle,
              r = this._form.labeledInput;
            this._form.disableCssTransitions(),
              this._isInBalloon ||
                this._balloon.add({ view: this._form, position: p(e) }),
              (i.isOn = '' === t.value),
              (r.fieldView.element.value = t.value || ''),
              (r.fieldView.value = r.fieldView.element.value),
              i.isOn ? i.focus() : r.fieldView.select(),
              this._form.enableCssTransitions();
          }
          _hideForm(e) {
            this._isInBalloon &&
              (this._form.focusTracker.isFocused &&
                this._form.saveButtonView.focus(),
              this._balloon.remove(this._form),
              e && this.editor.editing.view.focus());
          }
          get _isVisible() {
            return this._balloon.visibleView === this._form;
          }
          get _isInBalloon() {
            return this._balloon.hasView(this._form);
          }
        }
        class y extends e.Plugin {
          static get requires() {
            return [m, v];
          }
          static get pluginName() {
            return 'DrupalImageAlternativeText';
          }
        }
        class A extends e.Plugin {
          static get requires() {
            return [d, y];
          }
          static get pluginName() {
            return 'DrupalImage';
          }
        }
        const I = A;
        class k extends e.Plugin {
          init() {
            const { editor: e } = this;
            e.plugins
              .get('ImageUploadEditing')
              .on('uploadComplete', (t, { data: i, imageElement: r }) => {
                e.model.change((e) => {
                  e.setAttribute('dataEntityUuid', i.response.uuid, r),
                    e.setAttribute('dataEntityType', i.response.entity_type, r);
                });
              });
          }
          static get pluginName() {
            return 'DrupalImageUploadEditing';
          }
        }
        var x = i('ckeditor5/src/upload.js');
        class _ {
          constructor(e, t) {
            (this.loader = e), (this.options = t);
          }
          upload() {
            return this.loader.file.then(
              (e) =>
                new Promise((t, i) => {
                  this._initRequest(),
                    this._initListeners(t, i, e),
                    this._sendRequest(e);
                }),
            );
          }
          abort() {
            this.xhr && this.xhr.abort();
          }
          _initRequest() {
            (this.xhr = new XMLHttpRequest()),
              this.xhr.open('POST', this.options.uploadUrl, !0),
              (this.xhr.responseType = 'json');
          }
          _initListeners(e, t, i) {
            const r = this.xhr,
              s = this.loader,
              n = `Couldn't upload file: ${i.name}.`;
            r.addEventListener('error', () => t(n)),
              r.addEventListener('abort', () => t()),
              r.addEventListener('load', () => {
                const i = r.response;
                if (!i || i.error)
                  return t(
                    i && i.error && i.error.message ? i.error.message : n,
                  );
                e({ response: i, urls: { default: i.url } });
              }),
              r.upload &&
                r.upload.addEventListener('progress', (e) => {
                  e.lengthComputable &&
                    ((s.uploadTotal = e.total), (s.uploaded = e.loaded));
                });
          }
          _sendRequest(e) {
            const t = this.options.headers || {},
              i = this.options.withCredentials || !1;
            Object.keys(t).forEach((e) => {
              this.xhr.setRequestHeader(e, t[e]);
            }),
              (this.xhr.withCredentials = i);
            const r = new FormData();
            r.append('upload', e), this.xhr.send(r);
          }
        }
        class T extends e.Plugin {
          static get requires() {
            return [x.FileRepository];
          }
          static get pluginName() {
            return 'DrupalFileRepository';
          }
          init() {
            const e = this.editor.config.get('drupalImageUpload');
            e &&
              (e.uploadUrl
                ? (this.editor.plugins.get(
                    x.FileRepository,
                  ).createUploadAdapter = (t) => new _(t, e))
                : (0, b.logWarning)('simple-upload-adapter-missing-uploadurl'));
          }
        }
        class E extends e.Plugin {
          static get requires() {
            return [T, k];
          }
          static get pluginName() {
            return 'DrupalImageUpload';
          }
        }
        const V = E;
        class C extends e.Plugin {
          init() {
            const { editor: e } = this;
            e.ui.componentFactory.add('drupalInsertImage', () =>
              e.ui.componentFactory.create('insertImage'),
            );
          }
          static get pluginName() {
            return 'DrupalInsertImage';
          }
        }
        const B = {
          DrupalImage: I,
          DrupalImageUpload: V,
          DrupalInsertImage: C,
        };
      })(),
      (r = r.default)
    );
  })(),
);
