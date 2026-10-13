async function loadFreeItems() {
  const container = document.querySelector('#inventory');
  try {
    const response = await fetch('free-items.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error('Inventory unavailable');
    const items = await response.json();
    if (!Array.isArray(items)) throw new Error('Invalid inventory');
    const listed = items.filter(item => item && typeof item.title === 'string' && ['available', 'pending', 'claimed'].includes(item.status));
    if (!listed.length) return;
    container.replaceChildren();
    for (const item of listed) {
      const card = document.createElement('article');
      if (typeof item.image === 'string' && /^images\/[\w./-]+\.(png|jpe?g|webp)$/i.test(item.image) && !item.image.includes('..')) {
        const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.title;
        image.loading = 'lazy';
        card.append(image);
      }
      const title = document.createElement('h3');
      title.textContent = item.title;
      const status = document.createElement('p');
      status.textContent = 'Free · ' + ({ available: 'Available', pending: 'Pickup pending', claimed: 'Claimed' })[item.status];
      const description = document.createElement('p');
      description.textContent = typeof item.description === 'string' ? item.description : '';
      card.append(title, status, description);
      if (item.status === 'available') {
        const call = document.createElement('a');
        call.href = 'tel:+19782109535';
        call.className = 'service-link';
        call.textContent = 'Call to arrange pickup';
        card.append(call);
      }
      container.append(card);
    }
  } catch {
    container.textContent = 'The item list could not load. Call 978-210-9535 to check what is available.';
  }
}
loadFreeItems();
