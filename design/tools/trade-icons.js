/* Kormik trade icon set. Solid, currentColor, 24px grid, rounded ends.
   Usage: <k-trade-icon name="trowel" size="24"></k-trade-icon>
   source: "agency" = redrawn from the agency icon sheet; "kormik" = original gap-fill drawn to match the set. */
(function () {
  const I = {
    trowel:     { trade: 'Masonry', bn: 'রাজমিস্ত্রি', source: 'agency', svg: '<path d="M23 1 11.6 7.4l5 5L23 1z"/><path d="M10.6 8.4 2.9 16.1a2.7 2.7 0 0 0 3.8 3.8l7.7-7.7-3.8-3.8z"/>' },
    snips:      { trade: 'Rod binding', bn: 'রড বাঁধাই', source: 'agency', svg: '<circle cx="6" cy="6.2" r="3.2"/><circle cx="6" cy="17.8" r="3.2"/><path d="M8.4 8.6 22 15.6v2.6L9.6 11.4l-1.2-1.6zM8.4 15.4 22 8.4V5.8L9.6 12.6l-1.2 1.6z"/>' },
    roller:     { trade: 'Painting', bn: 'রং করা', source: 'agency', svg: '<rect x="2" y="3" width="15" height="7" rx="2"/><path d="M17 4.5h2.5A2.5 2.5 0 0 1 22 7v3.5a2.5 2.5 0 0 1-2.5 2.5H13v1.5h-2.2V13a2 2 0 0 1 2-2h7V7H17z"/><rect x="10.6" y="14" width="2.8" height="8" rx="1.4"/>' },
    brush:      { trade: 'Finishing and touch-up', bn: 'ফিনিশিং', source: 'agency', svg: '<path d="M21.7 2.3a1.1 1.1 0 0 0-1.5 0L9.8 12.7l1.6 1.6L21.7 3.8a1.1 1.1 0 0 0 0-1.5z"/><path d="M8.9 13.6c-2 0-3.7 1.4-4 3.4C4.7 18.9 3.7 20.1 2 20.7c1.5.9 3.1 1.3 4.8 1.3 2.6 0 4.6-2 4.6-4.5 0-.4 0-.7-.1-1z"/>' },
    plunger:    { trade: 'Plumbing', bn: 'প্লাম্বিং', source: 'agency', svg: '<rect x="10.7" y="1.5" width="2.6" height="10.5" rx="1.3"/><path d="M4 15.8A8 8 0 0 1 20 15.8v.7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><rect x="2.5" y="19" width="19" height="3.2" rx="1.6"/>' },
    wrench:     { trade: 'Fitting and repairs', bn: 'মেরামত', source: 'agency', svg: '<path d="M21.6 6.4a6 6 0 0 1-7.9 7.3l-8 8a2.3 2.3 0 1 1-3.3-3.3l8-8a6 6 0 0 1 7.3-7.9l-3.6 3.6 1.4 3.5 3.5 1.4z"/>' },
    saw:        { trade: 'Carpentry', bn: 'কাঠমিস্ত্রি', source: 'agency', svg: '<path d="M2.5 5.5A2.5 2.5 0 0 1 5 3h3.5v7.5H5a2.5 2.5 0 0 1-2.5-2.5z"/><path d="M8.5 3h12.8a1 1 0 0 1 .8 1.6L20.5 6.5l1 1.8-1.7 1.4-1.1-1.8-1.6 1.6-1.1-1.8-1.6 1.6-1.1-1.8-1.6 1.6-1.1-1.8-1.6 1.6-.5-.4z"/>' },
    hammer:     { trade: 'General site work', bn: 'সাধারণ কাজ', source: 'agency', svg: '<path d="M10 3.2 13.2 2l8.8 8.8-1.2 3.2-3-.2-5.6-5.6-.2-3z"/><path d="M10.4 8.6 15.4 13.6 6.2 22.8a1.7 1.7 0 0 1-2.4 0l-2.6-2.6a1.7 1.7 0 0 1 0-2.4z"/>' },
    shovel:     { trade: 'Helpers and site labour', bn: 'সহকারী ও জোগালি', source: 'agency', svg: '<rect x="7.5" y="1.5" width="9" height="2.6" rx="1.3"/><rect x="10.7" y="2" width="2.6" height="9.5" rx="1.3"/><path d="M6 11h12v6a6 6 0 0 1-12 0z"/>' },
    pickaxe:    { trade: 'Earthworks and roads', bn: 'মাটি ও রাস্তার কাজ', source: 'agency', svg: '<path d="M20.5 3.5a1.5 1.5 0 0 1 0 2.1L5.6 20.5a1.5 1.5 0 0 1-2.1-2.1L18.4 3.5a1.5 1.5 0 0 1 2.1 0z"/><path d="M2.5 9.2C5.6 4.8 10 2.7 14.6 3.2l-1.4 3.4C10 6.9 6.6 7.9 3.7 10.4z"/><path d="M14.8 21.5c4.4-3.1 6.5-7.5 6-12.1l-3.4 1.4c.3 3.2-.7 6.6-3.2 9.5z"/>' },
    compass:    { trade: 'Surveying and layout', bn: 'জরিপ ও লেআউট', source: 'agency', svg: '<path d="M12 1.5a2.6 2.6 0 0 1 1.3 4.85L18.3 22h-2.4L12 9.3 8.1 22H5.7l5-15.65A2.6 2.6 0 0 1 12 1.5z"/><path d="M6.3 17.2a9.5 9.5 0 0 0 11.4 0l.6 2a11.7 11.7 0 0 1-12.6 0z"/>' },
    toolbox:    { trade: 'Home repairs', bn: 'ঘরের মেরামত', source: 'agency', svg: '<path d="M9 3h6a2 2 0 0 1 2 2v2h-2.2V5.2H9.2V7H7V5a2 2 0 0 1 2-2z"/><path d="M2 9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3.5h-6V11a1 1 0 0 0-2 0v1.5h-4V11a1 1 0 0 0-2 0v1.5H2z"/><path d="M2 14.5h6V16a1 1 0 0 0 2 0v-1.5h4V16a1 1 0 0 0 2 0v-1.5h6V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"/>' },
    tools:      { trade: 'Maintenance', bn: 'রক্ষণাবেক্ষণ', source: 'agency', svg: '<path d="M2.4 2.4 5.6 2l1.6 1.6-.4 2.2 12.4 12.4a1.6 1.6 0 1 1-2.3 2.3L4.5 8.1l-2.2.4L.7 6.9z"/><path d="M21.2 2.8a2.8 2.8 0 0 1 0 3.9L10.4 17.5a3 3 0 0 1-1.7 3.5L5.6 22.5 4 20.9l1.5-3.1a3 3 0 0 1 3.5-1.7L19.8 5.3a2.8 2.8 0 0 1 1.4-2.5z"/>' },
    bolt:       { trade: 'Electrical', bn: 'ইলেকট্রিক', source: 'kormik', svg: '<path d="M13.6 1.5 3.5 13.6h6.6l-1.2 8.9L20.5 10.4h-6.6z"/>' },
    tile:       { trade: 'Tiles and flooring', bn: 'টাইলস ও মেঝে', source: 'kormik', svg: '<path d="M3 4a1 1 0 0 1 1-1h7v8H3zM13 3h7a1 1 0 0 1 1 1v7h-8zM3 13h8v8H4a1 1 0 0 1-1-1zM13 13h8v7a1 1 0 0 1-1 1h-7z"/>' },
    broom:      { trade: 'Cleaning', bn: 'পরিচ্ছন্নতা', source: 'kormik', svg: '<path d="M20.4 2.4a1.3 1.3 0 0 1 1.3 1.3L13.7 12l-1.7-1.7z"/><path d="M10.4 10.9l2.8 2.8c-1.2 3.3-3.6 6.2-7.8 8.1H3c.1-4.4 2.2-8.1 7.4-10.9z"/><path d="M6.2 15.2c1 1 2.1 2.1 2.9 3.4l-1.7.9c-.7-1-1.5-2-2.4-2.8z"/>' },
    box:        { trade: 'Loading and shifting', bn: 'মালামাল বহন', source: 'kormik', svg: '<path d="M12 2.4 21 7v1.2l-9 4.4L3 8.2V7zM3 9.8l8 4v8L3 17.5zM21 9.8v7.7l-8 4.3v-8z"/>' }
  };
  window.KormikTradeIcons = I;
  class KTradeIcon extends HTMLElement {
    static get observedAttributes() { return ['name', 'size']; }
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback() { this.render(); }
    attributeChangedCallback() { this.render(); }
    render() {
      const d = I[this.getAttribute('name')] || I.toolbox;
      const s = this.getAttribute('size') || 24;
      this.shadowRoot.innerHTML = '<style>:host{display:inline-grid;place-items:center;line-height:1;flex:none}svg{display:block}</style><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="' + s + '" height="' + s + '" fill="currentColor" stroke="none" aria-hidden="true">' + d.svg + '</svg>';
    }
  }
  if (!customElements.get('k-trade-icon')) customElements.define('k-trade-icon', KTradeIcon);
})();
