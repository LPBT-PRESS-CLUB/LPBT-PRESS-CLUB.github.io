/* ============================================================================
   LPBT Press Club — rendering + filters
   Depends on assets/js/data.js (WIRE, DESKS, STAFF, EVENTS)
   ========================================================================== */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var deskById = {};
  DESKS.forEach(function (d) { deskById[d.id] = d; });

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ── Masthead date / year ─────────────────────────────────────────────── */
  function stampDate() {
    var now = new Date();
    var fmt = now.toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });
    $('#issue-date').textContent = fmt;
    $('#year').textContent = String(now.getFullYear());
  }

  /* ── Ticker ───────────────────────────────────────────────────────────── */
  function renderWire() {
    var track = $('#wire-track');
    var run = WIRE.map(function (h) {
      return '<span class="wire__item">' + esc(h) + '</span>';
    }).join('<span class="wire__sep" aria-hidden="true">&bull;</span>');
    // Duplicated once so the marquee loop is seamless; the copy is hidden from AT.
    track.innerHTML =
      '<div class="wire__run">' + run + '</div>' +
      '<div class="wire__run" aria-hidden="true">' + run + '</div>';
  }

  /* ── Desk tags ────────────────────────────────────────────────────────── */
  function tagHTML(deskId) {
    var d = deskById[deskId];
    if (!d) return '';
    return '<span class="tag" style="--tag:' + d.color + ';--tag-ink:' + d.ink + '">' +
      esc(d.name) + '</span>';
  }

  /* ── Staff cards ──────────────────────────────────────────────────────── */
  function renderStaff() {
    $('#staff-grid').innerHTML = STAFF.map(function (p, i) {
      var primary = deskById[p.desks[0]] || { color: '#141210' };
      return '' +
        '<article class="card" data-desks="' + esc(p.desks.join(' ')) + '" style="--accent:' + primary.color + '">' +
          '<div class="card__figure">' +
            '<img src="' + esc(p.img) + '" alt="' + esc(p.alt) + '" loading="lazy" decoding="async" width="400" height="400" />' +
            '<span class="card__no">' + ('0' + (i + 1)).slice(-2) + '</span>' +
          '</div>' +
          '<div class="card__body">' +
            '<p class="card__role">' + esc(p.role) + '</p>' +
            '<h3 class="card__name">' + esc(p.name) + '</h3>' +
            '<p class="card__handle mono">' + esc(p.handle) + '</p>' +
            '<p class="card__beat"><span class="card__k">Beat</span> ' + esc(p.beat) + '</p>' +
            '<p class="card__bio">' + esc(p.bio) + '</p>' +
            '<div class="card__tags">' + p.desks.map(tagHTML).join('') +
              '<span class="card__since mono">since ' + esc(p.since) + '</span>' +
            '</div>' +
          '</div>' +
        '</article>';
    }).join('');
  }

  /* ── Desk swatches ────────────────────────────────────────────────────── */
  function renderDesks() {
    $('#desk-grid').innerHTML = DESKS.map(function (d) {
      var members = STAFF.filter(function (p) { return p.desks.indexOf(d.id) !== -1; }).length;
      var stories = EVENTS.filter(function (e) { return e.desk === d.id; }).length;
      return '' +
        '<article class="desk" style="--accent:' + d.color + '">' +
          '<button class="desk__swatch" type="button" data-copy="' + esc(d.color) + '" ' +
                  'aria-label="Copy colour code ' + esc(d.color) + ' for ' + esc(d.name) + '">' +
            '<span class="desk__hex mono" style="color:' + d.ink + '">' + esc(d.color) + '</span>' +
            '<span class="desk__copyhint mono" style="color:' + d.ink + '">copy</span>' +
          '</button>' +
          '<div class="desk__body">' +
            '<h3 class="desk__name">' + esc(d.name) + '</h3>' +
            '<p class="desk__tagline">' + esc(d.tagline) + '</p>' +
            '<p class="desk__blurb">' + esc(d.blurb) + '</p>' +
            '<dl class="desk__meta">' +
              '<div><dt>Staff</dt><dd class="mono">' + members + '</dd></div>' +
              '<div><dt>Events</dt><dd class="mono">' + stories + '</dd></div>' +
              '<div><dt>Code</dt><dd class="mono">' + esc(d.id) + '</dd></div>' +
            '</dl>' +
          '</div>' +
        '</article>';
    }).join('');
  }

  /* ── Archive / events ─────────────────────────────────────────────────── */
  function dateline(iso) {
    var parts = iso.split('-');
    var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      .toUpperCase();
  }

  function renderEvents() {
    var sorted = EVENTS.slice().sort(function (a, b) { return a.date < b.date ? 1 : -1; });
    $('#event-list').innerHTML = sorted.map(function (e) {
      var d = deskById[e.desk] || { color: '#141210', name: 'Unfiled' };
      return '' +
        '<article class="story" data-desks="' + esc(e.desk) + '" style="--accent:' + d.color + '">' +
          '<div class="story__meta">' +
            '<time class="story__date mono" datetime="' + esc(e.date) + '">' + dateline(e.date) + '</time>' +
            '<span class="story__edition mono">' + esc(e.edition) + '</span>' +
            tagHTML(e.desk) +
          '</div>' +
          '<div class="story__main">' +
            '<h3 class="story__hed">' + esc(e.title) + '</h3>' +
            '<p class="story__dek">' + esc(e.dek) + '</p>' +
            '<p class="story__body">' + esc(e.body) + '</p>' +
            '<p class="story__loc mono">Filed from ' + esc(e.location) + '</p>' +
          '</div>' +
        '</article>';
    }).join('');
  }

  /* ── Dispatches (blog) ────────────────────────────────────────────────── */
  // blogs/posts.json is generated by scripts/build.mjs from blogs/*.mdx at deploy time.
  function renderPosts(posts) {
    $('#post-list').innerHTML = posts.map(function (p) {
      var d = deskById[p.desk] || { color: '#141210' };
      return '' +
        '<article class="dispatch" data-desks="' + esc(p.desk || '') + '" style="--accent:' + d.color + '">' +
          '<div class="dispatch__meta">' +
            '<time class="story__date mono" datetime="' + esc(p.date) + '">' + dateline(p.date) + '</time>' +
            (p.desk ? tagHTML(p.desk) : '') +
          '</div>' +
          '<h3 class="dispatch__hed"><a href="' + esc(p.url) + '">' + esc(p.title) + '</a></h3>' +
          (p.dek ? '<p class="dispatch__dek">' + esc(p.dek) + '</p>' : '') +
          '<p class="dispatch__by mono">By ' + esc(p.author) + ' &middot; ' + esc(p.minutes) + ' min read</p>' +
          '<a class="dispatch__more" href="' + esc(p.url) + '" aria-label="Read ' + esc(p.title) + '">Read the dispatch &rarr;</a>' +
        '</article>';
    }).join('');

    buildFilter({
      chips: '#post-filters', items: '#post-list .dispatch',
      count: '#post-count', empty: '#post-empty',
      noun: 'dispatches', nounSingular: 'dispatch',
    });
  }

  function loadPosts() {
    fetch('blogs/posts.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(renderPosts)
      .catch(function () {
        // Opened without a build (e.g. serving the repo root directly): posts.json doesn't exist yet.
        $('#post-count').textContent = '';
        var empty = $('#post-empty');
        empty.textContent = 'Dispatches appear here once the site is built — run npm run build and preview _site/.';
        empty.hidden = false;
      });
  }

  /* ── Rail stats ───────────────────────────────────────────────────────── */
  function renderStats() {
    $('#rail-stats').innerHTML =
      '<div class="stat"><span class="stat__n mono">' + STAFF.length + '</span><span class="stat__l">on staff</span></div>' +
      '<div class="stat"><span class="stat__n mono">' + DESKS.length + '</span><span class="stat__l">desks</span></div>' +
      '<div class="stat"><span class="stat__n mono">' + EVENTS.length + '</span><span class="stat__l">events run</span></div>';
  }

  /* ── Filters ──────────────────────────────────────────────────────────── */
  function buildFilter(opts) {
    var wrap = $(opts.chips);
    var items = Array.prototype.slice.call(document.querySelectorAll(opts.items));
    var countEl = $(opts.count);
    var emptyEl = $(opts.empty);
    var active = null; // null = all desks

    var html = '<button class="chip is-on" type="button" data-desk="" aria-pressed="true">All desks</button>';
    html += DESKS.map(function (d) {
      return '<button class="chip" type="button" data-desk="' + esc(d.id) + '" aria-pressed="false" ' +
        'style="--accent:' + d.color + '"><span class="chip__dot"></span>' + esc(d.name) + '</button>';
    }).join('');
    wrap.innerHTML = html;

    function apply() {
      var shown = 0;
      items.forEach(function (el) {
        var match = !active || el.dataset.desks.split(' ').indexOf(active) !== -1;
        el.hidden = !match;
        if (match) shown++;
      });
      countEl.textContent = 'Showing ' + shown + ' of ' + items.length + ' ' +
        (items.length === 1 ? opts.nounSingular : opts.noun);
      emptyEl.hidden = shown !== 0;
    }

    wrap.addEventListener('click', function (ev) {
      var btn = ev.target.closest('.chip');
      if (!btn) return;
      active = btn.dataset.desk || null;
      Array.prototype.forEach.call(wrap.querySelectorAll('.chip'), function (c) {
        var on = c === btn;
        c.classList.toggle('is-on', on);
        c.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      apply();
    });

    apply();
  }

  /* ── Copy-to-clipboard for colour codes ───────────────────────────────── */
  var toastTimer;
  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg;
    t.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('is-on'); }, 1800);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      var ok = document.execCommand && document.execCommand('copy');
      document.body.removeChild(ta);
      ok ? resolve() : reject();
    });
  }

  function wireCopy() {
    document.addEventListener('click', function (ev) {
      var btn = ev.target.closest('[data-copy]');
      if (!btn) return;
      var val = btn.dataset.copy;
      copyText(val).then(
        function () { toast(val + ' copied to clipboard'); },
        function () { toast('Copy failed — the code is ' + val); }
      );
    });
  }

  /* ── Sticky nav shadow + active section ───────────────────────────────── */
  function wireNav() {
    var nav = $('#nav');
    var links = Array.prototype.slice.call(nav.querySelectorAll('.nav__list a'));
    var sections = links.map(function (a) { return document.querySelector(a.hash); });

    var onScroll = function () {
      nav.classList.toggle('is-stuck', window.scrollY > 40);
      // A section counts as current once its top passes the upper third of the viewport,
      // which also covers anchor jumps (they land at scroll-padding-top, below the nav).
      var y = window.scrollY + window.innerHeight / 3;
      var current = -1;
      sections.forEach(function (s, i) { if (s && s.offsetTop <= y) current = i; });
      links.forEach(function (a, i) { a.classList.toggle('is-current', i === current); });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Boot ─────────────────────────────────────────────────────────────── */
  stampDate();
  renderWire();
  renderStats();
  renderStaff();
  renderDesks();
  renderEvents();

  buildFilter({
    chips: '#staff-filters', items: '#staff-grid .card',
    count: '#staff-count', empty: '#staff-empty',
    noun: 'members', nounSingular: 'member',
  });
  buildFilter({
    chips: '#event-filters', items: '#event-list .story',
    count: '#event-count', empty: '#event-empty',
    noun: 'events', nounSingular: 'event',
  });

  loadPosts();
  wireCopy();
  wireNav();
})();
