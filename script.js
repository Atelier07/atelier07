const header = document.getElementById('siteHead');
const menu = document.getElementById('menu');
const menuBtn = document.getElementById('menuBtn');

function onScroll() {
  header.classList.toggle('scrolled', window.scrollY > 50);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

function closeMenu() {
  menu.classList.remove('open');
  menuBtn.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('menu-open');
  document.body.classList.remove('locked');
}

menuBtn.addEventListener('click', () => {
  const open = !menu.classList.contains('open');
  menu.classList.toggle('open', open);
  menuBtn.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-hidden', String(!open));
  document.body.classList.toggle('locked', open);
  document.body.classList.toggle('menu-open', open);
});

menu.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', closeMenu);
});

document.querySelectorAll('.reveal').forEach((el) => {
  el.style.willChange = 'opacity, transform';
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

['.piano-grid', '.kit-grid', '.doors'].forEach((sel) => {
  document.querySelectorAll(`${sel} .reveal`).forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
  });
});

function pianoNote(freq, delay, velocity, duration) {
  const t = audioCtx.currentTime + delay;
  const gain = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();

  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.linearRampToValueAtTime(velocity, t + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(4600, t);
  filter.frequency.exponentialRampToValueAtTime(900, t + duration);
  filter.Q.value = 0.4;

  gain.connect(filter);
  filter.connect(audioCtx.destination);

  const partials = [1, 2.002, 3.01, 4.02, 5.4];
  const levels = [1, 0.34, 0.15, 0.07, 0.035];

  partials.forEach((mult, i) => {
    const osc = audioCtx.createOscillator();
    const og = audioCtx.createGain();
    osc.type = i === 0 ? 'triangle' : 'sine';
    osc.frequency.value = freq * mult;
    og.gain.value = levels[i];
    osc.connect(og);
    og.connect(gain);
    osc.start(t);
    osc.stop(t + duration + 0.05);
  });
}

let audioCtx = null;

function playChord(freqs, button) {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  if (!audioCtx) audioCtx = new AC();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  freqs.forEach((f, i) => pianoNote(f, i * 0.09, 0.15, 2.9));
  pianoNote(freqs[0] / 2, 0.02, 0.09, 3.2);

  button.classList.add('playing');
  const label = button.querySelector('.sound-label');
  const old = label.textContent;
  label.textContent = 'Đang phát';
  window.setTimeout(() => {
    button.classList.remove('playing');
    label.textContent = old;
  }, 1900);
}

document.querySelectorAll('.sound-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const freqs = button.dataset.chord.split(',').map(Number);
    playChord(freqs, button);
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
});
