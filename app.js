// ============================================================
// APP LOGIC — click-only, pillar-modal edition
// ============================================================

(function(){

  /* ---------- tiles: standard OpenStreetMap, no key needed, darkened via CSS filter ---------- */
  const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const TILE_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  function tileLayer(){
    return L.tileLayer(TILE_URL, {
      attribution: TILE_ATTR,
      subdomains: 'abc',
      maxZoom: 19,
      minZoom: 2
    });
  }

  function pinIcon(rippled){
    return L.divIcon({
      className: 'map-pin pulse' + (rippled ? ' ripple' : ''),
      html: `<svg width="30" height="40" viewBox="0 0 24 32">
        <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20c0-6.6-5.4-12-12-12z" fill="#d3a35a" stroke="#0c1322" stroke-width="1"/>
        <circle class="pin-core" cx="12" cy="12" r="5" fill="#0c1322"/>
      </svg>`,
      iconSize: [30, 40],
      iconAnchor: [15, 38],
      popupAnchor: [0, -34]
    });
  }

  /* ============================================================
     SCENE MANAGER
  ============================================================ */
  const sceneHistory = ['scene-world'];

  function showScene(id, opts){
    opts = opts || {};
    const current = document.querySelector('.scene.active');
    if(current && current.id !== id && opts.push !== false){
      sceneHistory.push(current.id);
    }
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    setTimeout(() => {
      if(id === 'scene-world' && worldMap) worldMap.invalidateSize();
      if(id === 'scene-region-a' && mapA) mapA.invalidateSize();
      if(id === 'scene-austin' && mapB) mapB.invalidateSize();
    }, 60);
  }

  function goBack(){
    const prev = sceneHistory.pop();
    if(prev){
      document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
      document.getElementById(prev).classList.add('active');
      setTimeout(() => {
        if(prev === 'scene-world' && worldMap) worldMap.invalidateSize();
        if(prev === 'scene-region-a' && mapA) mapA.invalidateSize();
        if(prev === 'scene-austin' && mapB) mapB.invalidateSize();
      }, 60);
    }
  }

  document.querySelectorAll('[data-back]').forEach(btn => {
    btn.addEventListener('click', () => {
      if(btn.closest('#scene-region-a') && regionAView !== 'abudhabi'){
        setRegionAView('abudhabi');
      } else {
        goBack();
      }
    });
  });

  /* ============================================================
     PILLAR MODAL
  ============================================================ */
  const modalEl = document.getElementById('pillar-modal');
  const modalCard = document.getElementById('modal-card');

  function videoIconSVG(){
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><rect x="2" y="5" width="15" height="14" rx="2"/><path d="M17 9l5-3v12l-5-3"/></svg>';
  }

  function pinIconSVGSmall(){
    return '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>';
  }

  function openModal(pin, onLink){
    const bodyHTML = pin.body.map(p => `<p>${p}</p>`).join('');

    let innerHTML = '';
    let isPostcard = false;

    if(pin.linksTo){
      innerHTML = `
        <div class="modal-body-grid single-col">
          <div class="pillar-tag">— ${pin.pillar} —</div>
          <h3>${pin.title}</h3>
          <div class="modal-text">
            ${bodyHTML}
            <button class="modal-cta" id="modal-link-btn">${pin.cta || 'Continue →'}</button>
          </div>
        </div>
      `;
    } else if(pin.video && pin.video.src){
      isPostcard = true;
      const mediaHTML = pin.video.type === 'image'
        ? `<img class="vs-media" src="${pin.video.src}" alt="${pin.video.label}">`
        : `<video class="vs-media" src="${pin.video.src}" controls playsinline autoplay preload="auto"></video>`;
      innerHTML = `
        <div class="postcard-grid">
          <div class="postcard-media">
            ${mediaHTML}
            ${pin.location ? `<div class="postcard-location">${pinIconSVGSmall()}<span>${pin.location}</span></div>` : ''}
          </div>
          <div class="postcard-text">
            <div class="pillar-tag">— ${pin.pillar} —</div>
            <h3>${pin.title}</h3>
            <div class="modal-text">${bodyHTML}</div>
          </div>
        </div>
      `;
    } else if(pin.video){
      innerHTML = `
        <div class="modal-body-grid">
          <div>
            <div class="pillar-tag">— ${pin.pillar} —</div>
            <h3>${pin.title}</h3>
            <div class="modal-text">${bodyHTML}</div>
          </div>
          <div class="video-slot">
            ${videoIconSVG()}
            <div class="vs-label">${pin.video.label}</div>
          </div>
        </div>
      `;
    } else {
      innerHTML = `
        <div class="modal-body-grid single-col">
          <div class="pillar-tag">— ${pin.pillar} —</div>
          <h3>${pin.title}</h3>
          <div class="modal-text">${bodyHTML}</div>
        </div>
      `;
    }

    modalCard.classList.toggle('is-postcard', isPostcard);
    modalCard.innerHTML = `
      <button class="modal-close" id="modal-close-btn" aria-label="Close">&times;</button>
      ${innerHTML}
    `;
    modalEl.classList.add('open');

    const modalVideo = modalCard.querySelector('.vs-media[autoplay]');
    if(modalVideo){
      modalVideo.play().catch(() => {
        modalVideo.muted = true;
        modalVideo.play().catch(() => {});
      });
    }

    document.getElementById('modal-close-btn').addEventListener('click', closeModal);
    if(pin.linksTo){
      document.getElementById('modal-link-btn').addEventListener('click', () => {
        closeModal();
        if(onLink) onLink(pin.linksTo);
      });
    }
  }

  function closeModal(){
    modalEl.classList.remove('open');
    const playingVideo = modalCard.querySelector('video.vs-media');
    if(playingVideo) playingVideo.pause();
  }

  modalEl.addEventListener('click', (e) => {
    if(e.target === modalEl) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeModal();
  });

  /* ============================================================
     WORLD MAP
  ============================================================ */
  const worldMap = L.map('world-map', {
    center: STORY.world.center,
    zoom: STORY.world.zoom,
    zoomControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    touchZoom: false,
    keyboard: false,
    attributionControl: false
  });
  tileLayer().addTo(worldMap);

  const worldPin = L.marker([STORY.world.uae.lat, STORY.world.uae.lng], { icon: pinIcon(true) })
    .addTo(worldMap)
    .bindTooltip('Visit me!', { permanent: true, direction: 'bottom', offset: [0, 12], className: 'visit-tooltip' })
    .openTooltip();

  worldPin.on('click', () => {
    showScene('scene-region-a');
    if(!regionAView) setRegionAView('abudhabi');
  });

  /* ============================================================
     REGION A MAP (Abu Dhabi / Dubai / Gurgaon)
  ============================================================ */
  const mapA = L.map('map-a', {
    center: STORY.abudhabi.view.center,
    zoom: STORY.abudhabi.view.zoom,
    scrollWheelZoom: false,
    zoomControl: false
  });
  tileLayer().addTo(mapA);
  L.control.zoom({ position: 'bottomright' }).addTo(mapA);

  let mapAMarkers = [];
  let mapARoad = null;
  const mapACaption = document.getElementById('map-a-caption');
  const regionAText = document.getElementById('region-a-text');
  let regionAView = null;

  function clearMapA(){
    mapAMarkers.forEach(m => mapA.removeLayer(m));
    mapAMarkers = [];
    if(mapARoad){ mapA.removeLayer(mapARoad); mapARoad = null; }
  }

  function addPins(map, arr, markerBucket, clickHandler){
    arr.forEach(p => {
      const m = L.marker([p.lat, p.lng], { icon: pinIcon() }).addTo(map);
      m.on('click', () => clickHandler(p));
      markerBucket.push(m);
    });
  }

  function drawRoad(reverse, onDone){
    const full = STORY.road.slice();
    const seq = reverse ? full.slice().reverse() : full;
    mapARoad = L.polyline([seq[0]], { color: '#d3a35a', weight: 3, opacity: 0.85, dashArray: '1,8', lineCap: 'round' }).addTo(mapA);
    let i = 1;
    const step = () => {
      if(i >= seq.length){ if(onDone) onDone(); return; }
      mapARoad.addLatLng(seq[i]);
      i++;
      setTimeout(step, 130);
    };
    step();
  }

  function abuDhabiPinClick(pin){
    if(pin.linksTo === 'gurgaon'){
      openModal(pin, () => setRegionAView('gurgaon'));
    } else {
      openModal(pin);
    }
  }

  function textAbuDhabi(){
    regionAText.innerHTML = `
      <div class="eyebrow">Abu Dhabi</div>
      <h1 class="headline">For most of my life, this was <em style="font-style:italic; color:var(--gold-bright);">my entire world.</em></h1>
      <div class="stack">
        <p>I was born and raised here. Every street here is a different kind of silence; the silence I hear when I look back at my life, exactly what you will hear as you explore my memory card.</p>
      </div>
      <div class="hint-tap"><span class="dot-demo"></span> Tap the gold pins to visit my pillars</div>
      <button class="continue-btn" id="to-dubai-btn">Continue the journey → Dubai
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </button>
    `;
    document.getElementById('to-dubai-btn').addEventListener('click', () => setRegionAView('dubai'));
  }

  function textGurgaon(){
    regionAText.innerHTML = `
      <div class="eyebrow">A Detour — Service &amp; Roots</div>
      <h1 class="headline" style="font-size:clamp(1.4rem,2.6vw,2.1rem);">Not everything that shaped me happened at home.</h1>
      <div class="stack">
        <p>Two pins here: the volunteering that changed how I think about building things, and the roots I still carry no matter how far I go.</p>
        <p>Every place here carries a different kind of silence — the silence I hear when I look back at my life, exactly what you will hear as you explore my memory card.</p>
      </div>
      <div class="hint-tap"><span class="dot-demo"></span> Tap the gold pins to visit my pillars</div>
      <button class="continue-btn secondary" id="fly-home-btn">‹ Fly back to Abu Dhabi
      </button>
    `;
    document.getElementById('fly-home-btn').addEventListener('click', () => setRegionAView('abudhabi'));
  }

  function textDubai(){
    regionAText.innerHTML = `
      <div class="eyebrow">An Hour Up The Road</div>
      <h1 class="headline" style="font-size:clamp(1.4rem,2.6vw,2.1rem);">Home doesn't always stay in one city.</h1>
      <div class="stack">
        <p>This pin continues the Home and Friendship pillars from Abu Dhabi — including the Dabhol group story — just a little further up the coast.</p>
        <p>Every place here carries a different kind of silence — the silence I hear when I look back at my life, exactly what you will hear as you explore my memory card.</p>
      </div>
      <div class="hint-tap"><span class="dot-demo"></span> Tap the gold pin to visit my pillars</div>
      <button class="continue-btn" id="to-departures-btn">Continue the journey → Departures
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </button>
    `;
    document.getElementById('to-departures-btn').addEventListener('click', () => {
      renderDepartures();
      showScene('scene-departures');
    });
  }

  function setRegionAView(view){
    const prev = regionAView;
    regionAView = view;

    if(view === 'abudhabi'){
      mapACaption.textContent = 'ABU DHABI';
      textAbuDhabi();
      clearMapA();
      mapA.flyTo(STORY.abudhabi.view.center, STORY.abudhabi.view.zoom, { duration: 1.2 });
      setTimeout(() => addPins(mapA, STORY.abudhabi.pins, mapAMarkers, abuDhabiPinClick), prev ? 1250 : 0);
    }
    else if(view === 'gurgaon'){
      mapACaption.textContent = 'ABU DHABI → GURGAON';
      textGurgaon();
      clearMapA();
      mapA.flyTo(STORY.gurgaon.wide.center, STORY.gurgaon.wide.zoom, { duration: 1.1 });
      setTimeout(() => {
        mapACaption.textContent = 'GURGAON, INDIA';
        mapA.flyTo(STORY.gurgaon.view.center, STORY.gurgaon.view.zoom, { duration: 1.2 });
        setTimeout(() => addPins(mapA, STORY.gurgaon.pins, mapAMarkers, (p) => openModal(p)), 1250);
      }, 1150);
    }
    else if(view === 'dubai'){
      mapACaption.textContent = 'ABU DHABI → DUBAI';
      textDubai();
      clearMapA();
      mapA.flyTo(STORY.wideUAE.center, STORY.wideUAE.zoom, { duration: 1.0 });
      setTimeout(() => {
        drawRoad(false, () => {
          mapACaption.textContent = 'DUBAI';
          mapA.flyTo(STORY.dubai.view.center, STORY.dubai.view.zoom, { duration: 1.2 });
          setTimeout(() => addPins(mapA, [STORY.dubai.pin], mapAMarkers, (p) => openModal(p)), 1250);
        });
      }, 1050);
    }
  }

  window.addEventListener('resize', () => { mapA.invalidateSize(); });

  /* ============================================================
     DEPARTURES + BOARDING PASS
  ============================================================ */
  function renderDepartures(){
    const rowsEl = document.getElementById('board-rows');
    rowsEl.innerHTML = '';
    STORY.departuresBoard.forEach(r => {
      const row = document.createElement('div');
      const statusClass = 'status-' + r.status.toLowerCase().replace(/\s+/g, '-');
      row.className = 'board-row' + (r.highlight ? ' highlight' : '');
      row.innerHTML = `<span>${r.dest}</span><span>${r.flight}</span><span>${r.gate || '—'}</span><span class="board-status ${statusClass}">${r.status}</span>`;
      rowsEl.appendChild(row);
    });
  }

  document.getElementById('claim-pass-btn').addEventListener('click', () => {
    const bp = STORY.boardingPass;
    document.getElementById('boardingpass-card').innerHTML = `
      <div class="bp-field"><div class="k">PASSENGER</div><div class="v">${bp.passenger}</div></div>
      <div class="bp-field"><div class="k">ORIGIN</div><div class="v">${bp.origin}</div></div>
      <div class="bp-field"><div class="k">DESTINATION</div><div class="v">${bp.destination}</div></div>
      <div class="bp-field"><div class="k">VIA</div><div class="v">${bp.via}</div></div>
      <div class="bp-field"><div class="k">DATE</div><div class="v">${bp.date}</div></div>
      <div class="bp-field"><div class="k">SEAT</div><div class="v">${bp.seat}</div></div>
      <div class="bp-full"><button class="board-btn" id="board-plane-btn">Board Plane →</button></div>
    `;
    showScene('scene-boardingpass');
    document.getElementById('board-plane-btn').addEventListener('click', startFlight);
  });

  /* ============================================================
     FLIGHT SEQUENCE
  ============================================================ */
  (function(){
    const wrap = document.getElementById('clouds');
    for(let i=0;i<10;i++){
      const c = document.createElement('span');
      const size = 140 + Math.random()*260;
      c.style.width = size+'px';
      c.style.height = size*0.5+'px';
      c.style.left = Math.random()*100+'%';
      c.style.top = Math.random()*100+'%';
      c.style.animationDuration = (30 + Math.random()*30) + 's';
      c.style.animationDelay = (-Math.random()*20) + 's';
      wrap.appendChild(c);
    }
  })();

  function startFlight(){
    showScene('scene-flight');
    const fl1 = document.getElementById('fl1');
    const landBtn = document.getElementById('land-austin-btn');
    fl1.classList.remove('show'); landBtn.style.display = 'none';
    setTimeout(() => fl1.classList.add('show'), 300);
    setTimeout(() => { landBtn.style.display = 'inline-flex'; }, 1800);
  }

  document.getElementById('land-austin-btn').addEventListener('click', () => {
    showScene('scene-austin');
    renderAustin();
  });

  /* ============================================================
     REGION B MAP (Austin)
  ============================================================ */
  const mapB = L.map('map-b', {
    center: STORY.austin.view.center,
    zoom: 4,
    scrollWheelZoom: false,
    zoomControl: false
  });
  tileLayer().addTo(mapB);
  L.control.zoom({ position: 'bottomright' }).addTo(mapB);

  let mapBMarkers = [];
  const mapBCaption = document.getElementById('map-b-caption');
  let austinRendered = false;
  const austinVisited = new Set();

  function clearMapB(){
    mapBMarkers.forEach(m => mapB.removeLayer(m));
    mapBMarkers = [];
  }

  function checkAustinComplete(){
    if(austinVisited.size >= STORY.austin.pins.length){
      document.getElementById('austin-closing').style.display = 'block';
      document.getElementById('austin-continue-btn').style.display = 'inline-flex';
      document.getElementById('austin-end-btn').style.display = 'none';
    }
  }

  function austinPinClick(pin){
    austinVisited.add(pin.id);
    openModal(pin);
    checkAustinComplete();
  }

  function renderAustin(){
    if(austinRendered) return;
    austinRendered = true;
    mapBCaption.textContent = 'NEW YORK → TEXAS';
    mapB.setView(STORY.usa ? [40.6413, -73.7781] : STORY.austin.view.center, 5);
    setTimeout(() => {
      mapB.flyTo(STORY.usa.wideUS.center, STORY.usa.wideUS.zoom, { duration: 1.1 });
      setTimeout(() => {
        mapB.flyTo(STORY.usa.wideTexas.center, STORY.usa.wideTexas.zoom, { duration: 1.1 });
        setTimeout(() => {
          mapBCaption.textContent = 'AUSTIN, TEXAS';
          mapB.flyTo(STORY.austin.view.center, STORY.austin.view.zoom, { duration: 1.3 });
          setTimeout(() => addPins(mapB, STORY.austin.pins, mapBMarkers, austinPinClick), 1350);
        }, 1150);
      }, 1150);
    }, 300);
  }

  document.getElementById('austin-continue-btn').addEventListener('click', () => {
    showScene('scene-final');
  });
  document.getElementById('austin-end-btn').addEventListener('click', () => {
    showScene('scene-final');
  });

  window.addEventListener('resize', () => { mapB.invalidateSize(); });

})();
