// Join page: three-step early-access sign-up and the partner enquiry form.
// Mirrors the state logic of Join.dc.html (Claude Design export), with real submission.
import { normalisePhone, postJSON } from './site';

const root = document.querySelector<HTMLElement>('[data-signup]');
if (root) {
  const lang = root.dataset.lang ?? 'en';
  const bnNum = (s: string) => (lang === 'bn' ? s.replace(/[0-9]/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]) : s);
  const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-panel]'));
  const stepEls = Array.from(root.querySelectorAll<HTMLElement>('[data-step]'));
  const roleBtns = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-role]'));
  const next = root.querySelector<HTMLButtonElement>('[data-next]')!;
  const form = root.querySelector<HTMLFormElement>('[data-phone-form]')!;
  const phoneInput = form.querySelector<HTMLInputElement>('input[name="phone"]')!;
  const phoneBox = root.querySelector<HTMLElement>('[data-phone-box]')!;
  const phoneError = root.querySelector<HTMLElement>('[data-phone-error]')!;
  const honeypot = form.querySelector<HTMLInputElement>('input[name="company"]');

  const state = { step: 1, role: null as string | null, phone: '' };
  const roleTitle = () => roleBtns.find((b) => b.dataset.role === state.role)?.dataset.title ?? '';

  function render() {
    panels.forEach((p) => { p.hidden = Number(p.dataset.panel) !== state.step; });
    stepEls.forEach((el) => {
      const n = Number(el.dataset.step), done = state.step > n, act = state.step === n;
      el.style.borderBottomColor = act ? 'var(--orange)' : 'transparent';
      if (act) el.setAttribute('aria-current', 'step'); else el.removeAttribute('aria-current');
      const dot = el.querySelector<HTMLElement>('[data-dot]')!;
      dot.textContent = done ? '✓' : bnNum(String(n));
      dot.style.background = act || done ? 'var(--indigo)' : 'var(--paper)';
      dot.style.color = act || done ? '#fff' : 'var(--ink-muted)';
      el.querySelector<HTMLElement>('[data-label]')!.style.color = act ? 'var(--indigo)' : 'var(--ink-muted)';
    });
    roleBtns.forEach((b) => {
      const on = b.dataset.role === state.role;
      b.setAttribute('aria-checked', String(on));
      b.setAttribute('aria-pressed', String(on));
      b.style.background = on ? 'var(--indigo)' : '#fff';
      b.style.color = on ? '#fff' : 'var(--indigo)';
      b.style.borderColor = on ? 'var(--indigo)' : 'var(--line)';
      b.querySelector<HTMLElement>('[data-sub]')!.style.color = on ? 'var(--lavender)' : 'var(--ink-muted)';
      b.querySelector<HTMLElement>('[data-icon]')!.style.color = on ? 'var(--orange)' : 'var(--indigo)';
      const tick = b.querySelector<HTMLElement>('[data-tick]')!;
      tick.style.borderColor = on ? 'var(--orange)' : 'var(--indigo)';
      tick.style.background = on ? 'var(--orange)' : 'transparent';
    });
    next.disabled = !state.role;
    next.style.opacity = state.role ? '1' : '0.45';
    root.querySelector<HTMLElement>('[data-role-title]')!.textContent = roleTitle();
    root.querySelector<HTMLElement>('[data-done-role]')!.textContent = roleTitle();
    root.querySelector<HTMLElement>('[data-done-phone]')!.textContent = state.phone;
  }

  const setError = (msg: string) => {
    phoneError.textContent = msg;
    phoneError.hidden = !msg;
    phoneBox.style.borderColor = msg ? '#B42318' : 'var(--indigo)';
    phoneInput.setAttribute('aria-invalid', msg ? 'true' : 'false');
  };

  function pickRole(id: string, jump: boolean) {
    state.role = id;
    state.step = jump ? 2 : state.step === 3 ? 1 : state.step;
    render();
    if (jump) {
      root!.closest('section')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      setTimeout(() => phoneInput.focus({ preventScroll: true }), 400);
    }
  }

  roleBtns.forEach((b) => b.addEventListener('click', () => pickRole(b.dataset.role!, false)));
  document.querySelectorAll<HTMLButtonElement>('[data-way-role]').forEach((b) =>
    b.addEventListener('click', () => pickRole(b.dataset.wayRole!, true)));
  next.addEventListener('click', () => {
    if (!state.role) return;
    state.step = 2; render(); phoneInput.focus();
  });
  root.querySelector('[data-back]')!.addEventListener('click', () => { state.step = 1; setError(''); render(); });
  root.querySelector('[data-reset]')!.addEventListener('click', () => {
    state.step = 1; state.role = null; state.phone = ''; phoneInput.value = ''; setError(''); render();
  });
  phoneInput.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/[^0-9 ]/g, '').slice(0, 12);
    setError('');
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const d = normalisePhone(phoneInput.value);
    if (!d) { setError(root.dataset.errPhone ?? ''); phoneInput.focus(); return; }
    form.classList.add('k-busy');
    const ok = await postJSON('/api/early-access', { role: state.role, phone: d, lang, source: 'join', company: honeypot?.value ?? '' });
    form.classList.remove('k-busy');
    if (!ok) { setError(root.dataset.errServer ?? ''); return; }
    state.phone = d.replace(/^(\d{4})(\d{6})$/, '$1 $2');
    state.step = 3;
    render();
  });

  // Deep links: /join?role=crew opens step 2 with that role chosen
  const qRole = new URLSearchParams(location.search).get('role');
  if (qRole && roleBtns.some((b) => b.dataset.role === qRole)) pickRole(qRole, false);
  render();
}

// Partner enquiry
const pForm = document.querySelector<HTMLFormElement>('[data-partner-form]');
if (pForm) {
  const done = document.querySelector<HTMLElement>('[data-partner-done]')!;
  const err = pForm.querySelector<HTMLElement>('[data-partner-error]')!;
  const typeBtns = Array.from(pForm.querySelectorAll<HTMLButtonElement>('[data-type]'));
  let type: string | null = null;
  const pick = (key: string | null) => {
    type = key;
    typeBtns.forEach((b) => {
      const on = b.dataset.type === key;
      b.setAttribute('aria-checked', String(on));
      b.setAttribute('aria-pressed', String(on));
      b.style.background = on ? 'var(--indigo)' : '#fff';
      b.style.color = on ? '#fff' : 'var(--indigo)';
    });
  };
  typeBtns.forEach((b) => b.addEventListener('click', () => pick(b.dataset.type!)));
  document.querySelectorAll<HTMLAnchorElement>('[data-partner-type]').forEach((a) =>
    a.addEventListener('click', () => pick(a.dataset.partnerType!)));
  if (location.hash === '#partner' && new URLSearchParams(location.search).get('type')) pick(new URLSearchParams(location.search).get('type'));

  pForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!pForm.reportValidity()) return;
    const fd = new FormData(pForm);
    pForm.classList.add('k-busy');
    err.hidden = true;
    const ok = await postJSON('/api/partner', {
      name: String(fd.get('name') ?? ''), org: String(fd.get('org') ?? ''), type,
      message: String(fd.get('msg') ?? ''), lang: pForm.dataset.lang, company: String(fd.get('company') ?? ''),
    });
    pForm.classList.remove('k-busy');
    if (!ok) { err.textContent = pForm.dataset.errServer ?? ''; err.hidden = false; return; }
    pForm.hidden = true;
    done.hidden = false;
  });
}
