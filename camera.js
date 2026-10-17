/* Atelier 07 — Thuê máy ảnh
   Router: no param -> list · ?kit=<id> -> detail with swipe gallery. */

const app = document.getElementById('camApp');

const CAMERAS = {
  x100vi: {
    name: 'Fujifilm X100VI',
    tag: 'Compact cao cấp',
    price: '500.000đ / 1 ngày',
    headline: 'Chiếc máy hay được hỏi nhất.',
    blurb: 'Nhỏ, gọn, một ống kính cố định. Máy dành cho người muốn đi nhẹ mà ảnh vẫn ra chất riêng — phố, chân dung, du lịch.',
    specs: [
      ['Cảm biến', 'APS-C X-Trans 5 HR · 40MP'],
      ['Ống kính', '23mm f/2 (tương đương 35mm)'],
      ['Giả lập phim', 'Classic Chrome · Astia · Reala Ace'],
      ['Video', '6.2K 30p'],
      ['Pin', 'NP-W126S · sạc kèm']
    ],
    images: ['assets/cam/x100vi-1.jpg', 'assets/cam/x100vi-2.jpg', 'assets/cam/x100vi-3.jpg', 'assets/cam/x100vi-4.jpg'],
    booked: [4, 5, 6, 13, 14]
  },
  xt5: {
    name: 'Fujifilm X-T5',
    tag: 'Mirrorless APS-C',
    price: '400.000đ / 1 ngày',
    headline: 'Chất phim, đổi được ống kính.',
    blurb: 'Thân máy đầm tay, thao tác bằng vòng xoay cơ học. Kèm một ống kính khẩu lớn để tách chủ thể khỏi nền.',
    specs: [
      ['Cảm biến', 'APS-C X-Trans 5 · 40MP'],
      ['Ống kính', 'XF 33mm f/1.4'],
      ['Chống rung', 'IBIS 7 stops'],
      ['Màn hình', 'Lật 3 hướng'],
      ['Pin', 'NP-W235']
    ],
    images: ['assets/cam/xt5-1.jpg', 'assets/cam/xt5-2.jpg', 'assets/cam/xt5-3.jpg', 'assets/cam/xt5-4.jpg', 'assets/cam/xt5-5.jpg'],
    booked: [2, 3, 10, 11, 20]
  },
  r50: {
    name: 'Canon EOS R50',
    tag: 'Nhập môn · nhẹ',
    price: '250.000đ / 1 ngày',
    headline: 'Bắt đầu mà không phải nghĩ nhiều.',
    blurb: 'Nhẹ, tự động tốt, dễ dùng cho người mới. Lấy nét bám mắt, màu da lên đẹp ngay từ file gốc.',
    specs: [
      ['Cảm biến', 'APS-C · 24MP'],
      ['Ống kính', 'RF 50mm f/1.8'],
      ['Lấy nét', 'Dual Pixel AF · bám mắt'],
      ['Video', '4K 30p'],
      ['Pin', 'LP-E17']
    ],
    images: ['assets/cam/r50-1.jpg', 'assets/cam/r50-2.jpg', 'assets/cam/r50-3.jpg', 'assets/cam/r50-4.jpg', 'assets/cam/r50-5.jpg'],
    booked: [6, 7, 8, 9, 17]
  },
  r6m2: {
    name: 'Canon EOS R6 Mark II',
    tag: 'Full-frame · pro',
    price: '600.000đ / 1 ngày',
    headline: 'Cho buổi chụp không được phép sai.',
    blurb: 'Full-frame chụp đêm tốt, chống rung mạnh, lấy nét nhanh. Kèm ống kính chân dung tiêu cự 85mm.',
    specs: [
      ['Cảm biến', 'Full-frame · 24MP'],
      ['Ống kính', 'RF 85mm f/2 Macro'],
      ['Chống rung', 'IBIS 8 stops'],
      ['Chụp liên tục', '40 fps (electronic)'],
      ['Video', '4K 60p']
    ],
    images: ['assets/cam/r6m2-1.jpg', 'assets/cam/r6m2-2.jpg', 'assets/cam/r6m2-3.jpg', 'assets/cam/r6m2-4.jpg', 'assets/cam/r6m2-5.jpg'],
    booked: [5, 6, 12, 18, 19]
  }
};

const ORDER = ['x100vi', 'xt5', 'r50', 'r6m2'];
const pad = (n) => String(n).padStart(2, '0');
const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fmtShort = (d) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`;
const todayMidnight = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ---------- reveal ---------- */
function observeReveals() {
  const els = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
  els.forEach((e) => io.observe(e));
}

/* ---------- list view ---------- */
function renderList() {
  const items = ORDER.map((id) => {
    const c = CAMERAS[id];
    return `
      <a class="cam-item rv" href="thue-may-anh.html?kit=${id}">
        <span class="cam-item-media"><img src="${c.images[0]}" alt="${esc(c.name)}" loading="lazy">
          <span class="cam-item-cap">
            <span class="cam-item-name">${esc(c.name)}</span>
          </span>
          <span class="cam-item-tag">${esc(c.tag)}</span>
        </span>
      </a>`;
  }).join('');

  app.innerHTML = `
    <section class="wrap cam-intro">
      <p class="eyebrow rv">Cho thuê theo ngày</p>
      <h1 class="rv">Máy ảnh,<br>cho mọi buổi chụp.</h1>
      <p class="cam-lede rv">Kỷ yếu, chụp ở cà phê hay một chuyến du lịch. Fujifilm và Canon — đã kiểm tra, sẵn sàng giao.</p>
    </section>
    <section class="wrap">
      <div class="cam-list">${items}</div>
    </section>`;
  observeReveals();
}

/* ---------- detail view ---------- */
function renderDetail(id) {
  const c = CAMERAS[id];
  if (!c) { location.replace('thue-may-anh.html'); return; }

  const frames = c.images.map((src, i) =>
    `<img src="${src}" alt="${esc(c.name)} — ảnh ${i + 1}" ${i === 0 ? '' : 'loading="lazy"'} ${i === 0 ? 'class="on"' : ''}>`).join('');
  const thumbs = c.images.map((src, i) =>
    `<button type="button" class="cam-thumb${i === 0 ? ' on' : ''}" data-i="${i}" aria-label="Ảnh ${i + 1}"><img src="${src}" alt="" loading="lazy"></button>`).join('');
  const specs = c.specs.map(([k, v]) =>
    `<div class="cam-spec"><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');

  app.innerHTML = `
    <section class="wrap" style="padding-top:26px">
      <a class="cam-back" href="thue-may-anh.html">← Tất cả máy</a>
    </section>

    <section class="cam-detail">
      <div class="cam-stage">
        <div class="cam-frame" id="camFrame">${frames}</div>
        <button class="cam-arrow prev" id="camPrev" aria-label="Ảnh trước">‹</button>
        <button class="cam-arrow next" id="camNext" aria-label="Ảnh sau">›</button>
        <span class="cam-count" id="camCount">01 / ${pad(c.images.length)}</span>
      </div>
      <div class="wrap">
        <div class="cam-thumbs" id="camThumbs">${thumbs}</div>
      </div>

      <div class="wrap cam-info">
        <div class="cam-info-left">
          <p class="eyebrow rv">${esc(c.tag)}</p>
          <h1 class="rv">${esc(c.name)}</h1>
          <p class="cam-price rv">${esc(c.price)}<small>Cọc bằng giấy tờ tuỳ thân · không thanh toán online</small></p>
          <p class="cam-blurb rv">${esc(c.blurb)}</p>
          <dl class="cam-specs rv">${specs}</dl>
        </div>

        <div class="cam-info-right" id="thue">
          <div class="cam-book">
            <h2>Đặt ngày thuê</h2>
            <div class="cal">
              <div class="cal-head">
                <button id="calPrev" type="button" aria-label="Tháng trước">←</button>
                <span id="calMonth"></span>
                <button id="calNext" type="button" aria-label="Tháng sau">→</button>
              </div>
              <div class="cal-grid" id="calGrid"></div>
              <p class="cal-hint">Chọn ngày nhận, rồi chọn ngày trả. Ngày gạch ngang đã có khách.</p>
            </div>

            <form class="cam-form" id="camForm">
              <div class="cam-range" id="camRange">Chưa chọn ngày</div>
              <div class="cam-fields">
                <label class="cam-field"><span>Tên</span><input type="text" name="name" placeholder="Tên của bạn" required></label>
                <label class="cam-field"><span>Số điện thoại</span><input type="tel" name="phone" placeholder="09xx xxx xxx" required></label>
              </div>
              <label class="cam-field"><span>Ghi chú</span><textarea name="note" rows="2" placeholder="Bạn muốn chụp gì, đi đâu?"></textarea></label>
              <div class="cam-actions">
                <button type="submit" class="cam-submit">Gửi yêu cầu thuê</button>
                <a class="cam-direct" href="tel:0909123456">Không muốn điền form? Nhắn trực tiếp 0909 123 456 →</a>
              </div>
              <p class="cam-form-note">Không thanh toán online. Atelier gọi xác nhận trong 2 giờ.</p>
            </form>

            <div class="cam-success" id="camSuccess" hidden>
              <h3>Đã nhận yêu cầu.</h3>
              <p id="camSuccessText"></p>
              <a class="cam-back" href="thue-may-anh.html">← Về danh sách máy</a>
            </div>
          </div>
        </div>
      </div>
    </section>`;

  document.title = `${c.name} — Thuê máy ảnh · Atelier 07`;
  setupGallery(c);
  setupCalendar(c);
  observeReveals();
}

/* ---------- gallery ---------- */
function setupGallery(c) {
  const frame = document.getElementById('camFrame');
  const imgs = Array.from(frame.querySelectorAll('img'));
  const thumbs = Array.from(document.querySelectorAll('.cam-thumb'));
  const countEl = document.getElementById('camCount');
  let idx = 0;

  function show(n) {
    idx = (n + imgs.length) % imgs.length;
    imgs.forEach((im, i) => im.classList.toggle('on', i === idx));
    thumbs.forEach((t, i) => t.classList.toggle('on', i === idx));
    countEl.textContent = `${pad(idx + 1)} / ${pad(imgs.length)}`;
    const active = thumbs[idx];
    if (active && active.scrollIntoView) {
      active.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
    }
  }

  document.getElementById('camPrev').addEventListener('click', () => show(idx - 1));
  document.getElementById('camNext').addEventListener('click', () => show(idx + 1));
  thumbs.forEach((t) => t.addEventListener('click', () => show(Number(t.dataset.i))));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(idx - 1);
    else if (e.key === 'ArrowRight') show(idx + 1);
  });

  let x0 = null;
  frame.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  frame.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) show(idx + (dx < 0 ? 1 : -1));
    x0 = null;
  }, { passive: true });
}

/* ---------- calendar + form ---------- */
function setupCalendar(c) {
  const calMonth = document.getElementById('calMonth');
  const calGrid = document.getElementById('calGrid');
  const calPrev = document.getElementById('calPrev');
  const calNext = document.getElementById('calNext');
  const rangeDisplay = document.getElementById('camRange');
  const form = document.getElementById('camForm');
  const success = document.getElementById('camSuccess');
  const successText = document.getElementById('camSuccessText');

  const state = { view: null, start: null, end: null, booked: new Set() };
  const today = todayMidnight();
  state.booked = new Set(c.booked.map((off) => { const d = new Date(today); d.setDate(d.getDate() + off); return iso(d); }));

  function renderCalendar() {
    const { view, start, end, booked } = state;
    const lbl = view.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' });
    calMonth.textContent = lbl.charAt(0).toUpperCase() + lbl.slice(1);

    const now = new Date();
    const atCurrent = view.getFullYear() === now.getFullYear() && view.getMonth() === now.getMonth();
    calPrev.disabled = atCurrent;
    calPrev.style.opacity = atCurrent ? '.25' : '1';

    calGrid.innerHTML = '';
    ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].forEach((d) => {
      const s = document.createElement('span');
      s.className = 'cal-dow';
      s.textContent = d;
      calGrid.appendChild(s);
    });

    const lead = (new Date(view.getFullYear(), view.getMonth(), 1).getDay() + 6) % 7;
    for (let i = 0; i < lead; i += 1) {
      const s = document.createElement('span');
      s.className = 'cal-day empty';
      calGrid.appendChild(s);
    }

    const days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const today0 = todayMidnight();
    for (let day = 1; day <= days; day += 1) {
      const date = new Date(view.getFullYear(), view.getMonth(), day);
      const key = iso(date);
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'cal-day';
      b.textContent = day;

      if (date < today0) { b.classList.add('past'); b.disabled = true; }
      if (booked.has(key)) { b.classList.add('booked'); b.disabled = true; }
      if (start && key === iso(start)) b.classList.add('sel');
      if (end && key === iso(end)) b.classList.add('sel');
      if (start && end && date > start && date < end) { b.classList.add('inrange'); b.disabled = true; }
      if (!b.disabled) b.addEventListener('click', () => selectDay(date));
      calGrid.appendChild(b);
    }
  }

  function rangeHasBooked(start, end) {
    const cur = new Date(start);
    cur.setDate(cur.getDate() + 1);
    while (cur < end) { if (state.booked.has(iso(cur))) return true; cur.setDate(cur.getDate() + 1); }
    return false;
  }

  function updateRange() {
    const { start, end } = state;
    if (!start) { rangeDisplay.textContent = 'Chưa chọn ngày'; return; }
    if (!end) { rangeDisplay.textContent = `Nhận ${fmtShort(start)} · chọn ngày trả`; return; }
    const n = Math.round((end - start) / 86400000);
    rangeDisplay.textContent = `${fmtShort(start)} → ${fmtShort(end)} · ${n} ngày`;
  }

  function selectDay(date) {
    const { start, end } = state;
    if (!start || end || date <= start) {
      state.start = date; state.end = null;
    } else if (rangeHasBooked(start, date)) {
      state.start = date; state.end = null;
      rangeDisplay.textContent = 'Khoảng ngày này có lịch đã đặt. Chọn lại ngày nhận.';
      renderCalendar(); return;
    } else {
      state.end = date;
    }
    updateRange(); renderCalendar();
  }

  calPrev.addEventListener('click', () => { state.view.setMonth(state.view.getMonth() - 1); renderCalendar(); });
  calNext.addEventListener('click', () => { state.view.setMonth(state.view.getMonth() + 1); renderCalendar(); });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const { start, end } = state;
    if (!start || !end) { rangeDisplay.textContent = 'Chọn ngày nhận và ngày trả trước khi gửi.'; return; }
    const data = new FormData(form);
    successText.textContent = `${c.name} · ${fmtShort(start)} → ${fmtShort(end)}. Atelier sẽ gọi ${data.get('phone')} trong 2 giờ để xác nhận.`;
    form.hidden = true;
    success.hidden = false;
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  state.view = new Date(today.getFullYear(), today.getMonth(), 1);
  renderCalendar();
  updateRange();
}

/* ---------- route ---------- */
const params = new URLSearchParams(location.search);
const kit = params.get('kit');
if (kit) renderDetail(kit);
else renderList();
