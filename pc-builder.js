class MrTechBuilder extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return;
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        :host { display: block; color: var(--text, #182334); }
        * { box-sizing: border-box; }
        .wrap { width: min(1120px, calc(100% - 32px)); margin: auto; padding: 56px 0; }
        .eyebrow { color: var(--blue, #1c5db6); font-size: .8rem; font-weight: 800; text-transform: uppercase; margin: 0 0 10px; }
        h2 { color: var(--navy, #0c2545); font-size: 2rem; line-height: 1.15; margin: 0 0 12px; }
        h3 { margin: 0 0 12px; font-size: 1.2rem; }
        p { margin: 0 0 18px; color: var(--muted, #5e6d80); line-height: 1.55; }
        .layout { display: grid; gap: 24px; margin-top: 24px; }
        form { display: grid; gap: 16px; }
        .fields { display: grid; gap: 16px; }
        label { display: grid; gap: 6px; font-weight: 700; font-size: .95rem; }
        select, input, textarea { width: 100%; min-width: 0; padding: 12px; border: 1px solid var(--line, #dbe4ee); border-radius: 6px; color: var(--text, #182334); background: var(--surface, white); font: inherit; }
        textarea { min-height: 76px; resize: vertical; }
        .result { padding: 22px; border: 1px solid var(--line, #dbe4ee); border-top: 4px solid var(--blue, #1c5db6); border-radius: 8px; background: var(--surface, white); min-width: 0; }
        dl { margin: 18px 0; }
        dl div { display: grid; grid-template-columns: 105px minmax(0, 1fr); gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--line, #dbe4ee); }
        dt { font-weight: 800; } dd { margin: 0; color: var(--muted, #5e6d80); overflow-wrap: anywhere; }
        .actions { display: flex; flex-wrap: wrap; gap: 10px; margin: 18px 0; }
        button, .button { display: inline-flex; align-items: center; justify-content: center; min-height: 48px; padding: 12px 16px; font: inherit; font-weight: 800; border: 1px solid var(--line, #dbe4ee); border-radius: 6px; background: var(--surface, white); color: var(--text, #182334); text-decoration: none; cursor: pointer; }
        .primary { background: #e98a2e; color: #3b210a; border-color: #e98a2e; }
        a.link { color: var(--blue, #1c5db6); font-weight: 700; }
        :focus-visible { outline: 3px solid #e98a2e; outline-offset: 3px; }
        .note, .status { font-size: .88rem; margin: 12px 0 0; }
        .status { min-height: 24px; }
        .warning { border-left: 3px solid #e98a2e; padding-left: 12px; }
        .copy-fallback { margin-top: 12px; }
        [hidden] { display: none; }
        @media (min-width: 700px) { .layout { grid-template-columns: 1fr 1fr; } .fields { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 519px) { .actions > * { width: 100%; } h2 { font-size: 1.8rem; } }
      </style>
      <div class="wrap">
        <p class="eyebrow">Ricky's build desk</p>
        <h2>Build with Ricky.</h2>
        <p>Pick your priorities. Get a starting checklist. Text it to Ricky to turn the plan into the right parts for your custom gaming desktop.</p>
        <div class="layout">
          <form aria-label="Gaming PC build preferences">
            <div class="fields">
              <label>Total budget<select name="budget"><option value="800">Around $800</option><option value="1200" selected>Around $1,200</option><option value="1800">Around $1,800</option><option value="2500">$2,500 or more</option></select></label>
              <label>Monitor resolution<select name="resolution"><option>1080p</option><option selected>1440p</option><option>4K</option><option>Not sure yet</option></select></label>
              <label>Main priority<select name="priority"><option value="balanced">Balanced gaming</option><option value="competitive">Competitive / high refresh rate</option><option value="visuals">Detailed graphics / story games</option><option value="streaming">Gaming and streaming</option></select></label>
              <label>Processor preference<select name="cpu"><option>No brand preference</option><option>AMD</option><option>Intel</option></select></label>
              <label>Graphics preference<select name="gpu"><option>No brand preference</option><option>NVIDIA</option><option>AMD</option><option>Intel</option></select></label>
              <label>Memory<select name="ram"><option>16 GB</option><option selected>32 GB</option><option>64 GB</option></select></label>
              <label>SSD storage<select name="storage"><option>1 TB</option><option selected>2 TB</option><option>4 TB</option></select></label>
              <label>Case size<select name="size"><option>Standard desktop</option><option>Compact desktop</option><option>No preference</option></select></label>
              <label>Style<select name="style"><option>Simple / no RGB</option><option>RGB lighting</option><option>No preference</option></select></label>
              <label>Wi-Fi needed?<select name="wifi"><option>Yes</option><option>No, wired Ethernet</option><option>Not sure</option></select></label>
            </div>
            <label>Games you play<input name="games" maxlength="180" placeholder="Example: Fortnite, Minecraft, Baldur's Gate 3"></label>
            <label>Parts to reuse or anything else<textarea name="notes" maxlength="400" placeholder="Existing monitor, graphics card, preferred case, or questions"></textarea></label>
            <button type="reset">Reset choices</button>
          </form>
          <div class="result">
            <h3>Your build brief</h3>
            <p id="summary"></p>
            <dl id="checklist"></dl>
            <p class="warning" id="guidance"></p>
            <div class="actions"><a class="button primary" id="text" href="sms:+19782109535">Text this build to Ricky</a><button type="button" id="copy">Copy build brief</button></div>
            <a class="link" href="https://www.microcenter.com/" target="_blank" rel="noopener">Browse Micro Center</a>
            <p class="note">A planning checklist, not a priced cart or a verified compatible parts list. Your budget is the total you want to spend; Ricky will clarify parts, installation, and any extras before you buy. Store prices and stock are not live here.</p>
            <p class="note">The text button opens a draft. Tap Send in your messaging app. On desktop, copy the brief and text it from your phone to 978-210-9535. Attach photos of any parts or computer you want to reuse.</p>
            <p class="status" role="status" id="status"></p>
            <label class="copy-fallback" id="fallback-label" hidden>Build brief to copy<textarea id="fallback" readonly></textarea></label>
          </div>
        </div>
      </div>`;
    const form = shadow.querySelector('form');
    const checklist = shadow.querySelector('#checklist');
    const update = () => {
      const data = Object.fromEntries(new FormData(form));
      const priorities = { balanced: 'Balanced gaming', competitive: 'Competitive / high refresh rate', visuals: 'Detailed graphics / story games', streaming: 'Gaming and streaming' };
      const cpu = data.priority === 'competitive' ? 'Prioritize strong gaming CPU performance alongside the GPU' : data.priority === 'streaming' ? 'CPU and encoding setup suitable for gaming plus streaming' : 'Balanced modern processor; choose the model with Ricky';
      const rows = [
        ['Processor', cpu + ' (' + data.cpu + ')'],
        ['Graphics', data.resolution + ' target; ' + data.gpu + '. Select a GPU for your actual games and display.'],
        ['Memory', data.ram + '; type and kit must match the motherboard'],
        ['Storage', data.storage + ' SSD; confirm motherboard support'],
        ['Motherboard', 'Match CPU socket, chipset, memory, and connectivity; Wi-Fi: ' + data.wifi],
        ['Case', data.size + '; ' + data.style + '; confirm component clearances'],
        ['Power & cooling', 'Size after CPU and GPU selection; check connectors, airflow, and cooler fit']
      ];
      shadow.querySelector('#summary').textContent = '$' + Number(data.budget).toLocaleString() + (data.budget === '2500' ? '+' : '') + ' total budget · ' + data.resolution + ' · ' + priorities[data.priority];
      checklist.replaceChildren(...rows.map(([name, value]) => {
        const row = document.createElement('div');
        const term = document.createElement('dt'); term.textContent = name;
        const description = document.createElement('dd'); description.textContent = value;
        row.append(term, description); return row;
      }));
      const tight = Number(data.budget) <= 1200 && (data.resolution === '4K' || data.ram === '64 GB' || data.storage === '4 TB');
      shadow.querySelector('#guidance').textContent = tight ? 'These priorities may compete with your budget. Ask Ricky where to compromise or consider suitable reused parts before shopping.' : 'Ricky will review compatibility, parts worth reusing, and the best place to spend your budget before sending purchase links.';
      this.brief = 'Mr. Tech gaming build request\nTotal budget: $' + data.budget + (data.budget === '2500' ? '+' : '') + '\nResolution: ' + data.resolution + '\nPriority: ' + priorities[data.priority] + '\nGames: ' + (data.games.trim() || 'To discuss') + '\n' + rows.map(([name, value]) => name + ': ' + value).join('\n') + '\nReuse / notes: ' + (data.notes.trim() || 'None specified') + '\nPlease help finalize parts and installation costs before I order.';
      // Apple devices use an ampersand before the SMS body; other clients use a question mark.
      const apple = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      shadow.querySelector('#text').href = 'sms:+19782109535' + (apple ? '&' : '?') + 'body=' + encodeURIComponent(this.brief);
      shadow.querySelector('#status').textContent = '';
      shadow.querySelector('#fallback-label').hidden = true;
    };
    form.addEventListener('input', update);
    form.addEventListener('change', update);
    form.addEventListener('submit', event => event.preventDefault());
    form.addEventListener('reset', () => setTimeout(update, 0));
    shadow.querySelector('#copy').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(this.brief);
        shadow.querySelector('#status').textContent = 'Build brief copied. Text it to 978-210-9535.';
      } catch {
        shadow.querySelector('#fallback-label').hidden = false;
        const field = shadow.querySelector('#fallback');
        field.value = this.brief; field.focus(); field.select();
        shadow.querySelector('#status').textContent = 'Select and copy the brief below, then text it to Ricky.';
      }
    });
    update();
  }
}
customElements.define('mr-tech-builder', MrTechBuilder);
