(() => {
  document.getElementById('year').textContent = new Date().getFullYear();
  // Deep links reveal the matching native record; no custom focus trap or scroll engine.
  function openRecord() {
    const record = document.getElementById(location.hash.slice(1));
    if (record?.matches('.v2-field-notes')) record.open = true;
  }
  document.querySelectorAll('.field-notes-link').forEach(link => {
    link.addEventListener('click', () => {
      const record = document.getElementById(link.hash.slice(1));
      if (record) record.open = true;
    });
  });
  addEventListener('hashchange', openRecord);
  openRecord();

  const form = document.getElementById('signal-form');
  const submit = form.querySelector('button[type="submit"]');
  const status = document.getElementById('signal-status');
  // The default is deliberately unconnected. No message is transmitted in preview.
  const endpoint = form.dataset.endpoint;
  if (endpoint) {
    document.getElementById('signal-form-help').textContent = 'Your details will be used to respond to your message.';
  }
  submit.disabled = false;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (!endpoint) {
      status.textContent = 'Your message has not been sent. Form delivery is not connected yet; please use the email link.';
      return;
    }
    submit.disabled = true;
    form.setAttribute('aria-busy', 'true');
    status.textContent = 'Sending your signal…';
    try {
      const response = await fetch(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
        signal: AbortSignal.timeout(15000)
      });
      if (!response.ok) throw new Error('Delivery failed');
      status.textContent = 'Your signal was sent. Thank you for getting in touch.';
      form.reset();
    } catch (_) {
      status.textContent = 'Your message could not be sent. Please try again or use the email link.';
    } finally {
      submit.disabled = false;
      form.removeAttribute('aria-busy');
    }
  });
})();
