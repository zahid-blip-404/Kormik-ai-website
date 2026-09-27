// Site-wide behaviour: mobile menu, language switch, early-access forms.

/** Normalise a Bangladeshi mobile number to its 10 digits after +880, or null if invalid. */
export function normalisePhone(raw: string): string | null {
  let d = raw.replace(/\D/g, '');
  if (d.startsWith('880')) d = d.slice(3);
  if (d.startsWith('0')) d = d.slice(1);
  return /^1[3-9]\d{8}$/.test(d) ? d : null;
}

export async function postJSON(url: string, body: unknown): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// Mobile menu
document.querySelectorAll<HTMLButtonElement>('[data-menu]').forEach((btn) => {
  const header = btn.closest<HTMLElement>('[data-nav]');
  if (!header) return;
  const set = (open: boolean) => {
    header.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    const label = btn.querySelector('.k-nav__menu-label');
    if (label) label.textContent = (open ? btn.dataset.openLabel : btn.dataset.closedLabel) ?? '';
    document.documentElement.classList.toggle('k-menu-open', open);
  };
  btn.addEventListener('click', () => set(!header.classList.contains('is-open')));
  header.querySelectorAll('.k-nav__link').forEach((a) => a.addEventListener('click', () => set(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
  matchMedia('(min-width: 901px)').addEventListener('change', (e) => { if (e.matches) set(false); });
});

// Language switch: go to the same page (and section) in the other language
document.querySelectorAll<HTMLButtonElement>('[data-lang-href]').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('is-active')) return;
    try { localStorage.setItem('kormik-lang', btn.lang); } catch { /* storage unavailable */ }
    window.location.href = (btn.dataset.langHref ?? '/') + window.location.hash;
  });
});

// Early-access forms (Home, For clients)
document.querySelectorAll<HTMLFormElement>('form[data-early-access]').forEach((form) => {
  const chips = Array.from(form.querySelectorAll<HTMLButtonElement>('.k-chip'));
  const input = form.querySelector<HTMLInputElement>('input[name="phone"]')!;
  const error = form.querySelector<HTMLElement>('.k-form__error')!;
  const honeypot = form.querySelector<HTMLInputElement>('input[name="company"]');
  let role = chips.find((c) => c.classList.contains('is-active'))?.dataset.role ?? 'work';

  const pick = (chip: HTMLButtonElement) => {
    chips.forEach((c) => {
      const on = c === chip;
      c.classList.toggle('is-active', on);
      c.setAttribute('aria-checked', String(on));
      c.tabIndex = on ? 0 : -1;
    });
    role = chip.dataset.role ?? role;
  };
  chips.forEach((chip, i) => {
    chip.tabIndex = chip.classList.contains('is-active') ? 0 : -1;
    chip.addEventListener('click', () => pick(chip));
    chip.addEventListener('keydown', (e) => {
      const step = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
      if (!step) return;
      e.preventDefault();
      const next = chips[(i + step + chips.length) % chips.length];
      pick(next); next.focus();
    });
  });

  const showError = (msg: string) => { error.textContent = msg; error.hidden = !msg; input.setAttribute('aria-invalid', msg ? 'true' : 'false'); };
  input.addEventListener('input', () => { input.value = input.value.replace(/[^0-9 +]/g, ''); showError(''); });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const phone = normalisePhone(input.value);
    if (!phone) { showError(form.dataset.errorPhone ?? ''); input.focus(); return; }
    form.classList.add('k-busy');
    const ok = await postJSON('/api/early-access', {
      role, phone, lang: form.dataset.lang, source: form.dataset.source, company: honeypot?.value ?? '',
    });
    form.classList.remove('k-busy');
    if (!ok) { showError(form.dataset.errorServer ?? ''); return; }
    const done = document.createElement('p');
    done.className = 'k-form k-form--done';
    done.setAttribute('role', 'status');
    done.textContent = form.dataset.done ?? '';
    form.replaceWith(done);
  });
});
