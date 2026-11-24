/* @ds-bundle: {"format":4,"namespace":"Airefrin","components":[{"name":"Icon"},{"name":"Button"},{"name":"Chip"},{"name":"Badge"},{"name":"Eyebrow"},{"name":"PillarItem"},{"name":"StatItem"},{"name":"SectorCard"},{"name":"EquipmentCard"},{"name":"Field"},{"name":"FaqItem"},{"name":"ProcessStep"}]} */
(function () {
  var R = window.React, h = R.createElement;
  var P = {
    wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3 17.7 6.3 21l6.3-6.3a4 4 0 0 0 5.1-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
    snow: '<path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7M9 4l3 2 3-2M9 20l3-2 3 2"/>',
    gear: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1"/>',
    therm: '<path d="M10 14.5V5a2 2 0 0 1 4 0v9.5a4 4 0 1 1-4 0z"/><path d="M12 9v7"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4M8 14h2M12 14h2M16 14h2M8 17h2M12 17h2"/>',
    shield: '<path d="M12 2l8 3v6c0 5-3.4 9-8 11-4.6-2-8-6-8-11V5z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
    hand: '<path d="M3 11l4-4 4 2 4-2 6 5-4 4-3 1-3 2-4-3-4-3z"/>',
    build: '<rect x="4" y="3" width="10" height="18" rx="1"/><path d="M14 9h6v12h-6M7 7h4M7 11h4M7 15h4M17 13h1M17 17h1"/>',
    home: '<path d="M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6"/>',
    shop: '<path d="M3 9l2-5h14l2 5M4 9v11h16V9M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M10 20v-6h4v6"/>',
    fact: '<path d="M3 21V10l6 4v-4l6 4v-4l6 4v7zM7 21v-3M12 21v-3M17 21v-3"/>',
    clip: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4h6v3H9zM8.5 12h7M8.5 16h5"/>',
    tool: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3 17.7 6.3 21l6.3-6.3a4 4 0 0 0 5.1-5.4"/><path d="M15 3l6 6M18 3l3 3"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    whatsapp: '<path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.4A8.4 8.4 0 1 1 21 11.5z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
    pin: '<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>'
  };
  function Icon(p) {
    var s = p.size || 24;
    return h('svg', { width: s, height: s, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: p.stroke || 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, style: p.style, dangerouslySetInnerHTML: { __html: P[p.name] || '' } });
  }
  function Button(p) {
    var cls = 'afr-btn afr-btn--' + (p.variant || 'primary') + (p.size === 'sm' ? ' afr-btn--sm' : '');
    var kids = [p.children];
    if (p.arrow) kids.push(h(Icon, { name: 'arrow', size: 18, stroke: 2.4, key: 'a' }));
    if (p.icon) kids.unshift(h(Icon, { name: p.icon, size: 22, key: 'i' }));
    return h(p.href ? 'a' : 'button', { className: cls, href: p.href, type: p.href ? undefined : 'button', onClick: p.onClick }, kids);
  }
  function Chip(p) { return h('button', { type: 'button', className: 'afr-chip', 'aria-pressed': !!p.pressed, onClick: p.onClick }, p.children); }
  function Badge(p) { return h('span', { className: 'afr-badge' + (p.tone === 'ok' ? ' afr-badge--ok' : '') }, p.children); }
  function Eyebrow(p) { return h('p', { className: 'afr-eyebrow' + (p.onDark ? ' afr-eyebrow--dark' : '') }, p.children); }
  function PillarItem(p) {
    return h('div', { className: 'afr-pillar' },
      h('div', { className: 'afr-pillar__icon' }, h(Icon, { name: p.icon, size: 48, stroke: 1.6 })),
      h('div', null, h('div', { className: 'afr-pillar__t' }, p.title), h('div', { className: 'afr-pillar__d' }, p.description)));
  }
  function StatItem(p) {
    return h('div', { className: 'afr-stat' }, h(Icon, { name: p.icon, size: 52, stroke: 1.5 }),
      h('div', null, h('div', { className: 'afr-stat__n' }, p.value), h('div', { className: 'afr-stat__t' }, p.label)));
  }
  function SectorCard(p) {
    return h('a', { className: 'afr-sector', href: p.href || '#', style: { background: 'linear-gradient(180deg,' + (p.from || '#5e8fd6') + ' 0%,' + (p.to || '#16396f') + ' 100%)' } },
      h('span', { className: 'afr-sector__ghost' }, h(Icon, { name: p.icon, size: 120, stroke: 0.8 })),
      h('div', { className: 'afr-sector__label' }, h(Icon, { name: p.icon, size: 30 }), h('div', null, p.label)));
  }
  function EquipmentCard(p) {
    return h('div', { className: 'afr-eq' },
      h('div', { className: 'afr-eq__img' }, p.image ? h('img', { src: p.image, alt: '', style: { maxHeight: 100 } }) : h(Icon, { name: 'snow', size: 54, stroke: 1.4 })),
      h('div', { className: 'afr-eq__brand' }, p.brand), h('div', { className: 'afr-eq__name' }, p.name),
      h('div', { className: 'afr-eq__spec' }, p.btu + ' BTU · Ref. ' + p.model),
      h(Button, { variant: 'outline', size: 'sm', href: p.href || '#' }, p.cta || 'Cotizar este equipo'));
  }
  function Field(p) {
    var common = { id: p.id, className: 'afr-field' + (p.onLight ? ' afr-field--light' : ''), onChange: p.onChange, onInput: p.onChange, placeholder: p.placeholder };
    var control = p.options
      ? h('select', common, [h('option', { key: '', value: '' }, p.placeholder)].concat(p.options.map(function (o) { return h('option', { key: o, value: o }, o); })))
      : h('input', Object.assign({ type: p.type || 'text' }, common));
    return h('div', null, h('label', { htmlFor: p.id, style: { position: 'absolute', left: -9999 } }, p.label || p.placeholder), control);
  }
  function FaqItem(p) {
    return h('div', { className: 'afr-faq' },
      h('button', { type: 'button', className: 'afr-faq__q', 'aria-expanded': !!p.open, onClick: p.onToggle }, p.question, h('span', { className: 'afr-faq__sign', 'aria-hidden': true }, p.open ? '−' : '+')),
      p.open ? h('div', { className: 'afr-faq__a' }, p.children) : null);
  }
  function ProcessStep(p) {
    return h('div', { className: 'afr-step' }, h('div', { className: 'afr-step__c' }, h(Icon, { name: p.icon, size: 30, stroke: 2 })), h('div', { className: 'afr-step__t' }, p.label));
  }
  window.Airefrin = { Icon: Icon, Button: Button, Chip: Chip, Badge: Badge, Eyebrow: Eyebrow, PillarItem: PillarItem, StatItem: StatItem, SectorCard: SectorCard, EquipmentCard: EquipmentCard, Field: Field, FaqItem: FaqItem, ProcessStep: ProcessStep };
})();
