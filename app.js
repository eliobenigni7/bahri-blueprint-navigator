const scene = document.getElementById('scene');
const hero = document.querySelector('.scene-frame');
const hudStatus = document.getElementById('hud-status');
const sceneTitle = document.getElementById('scene-title');
const sceneSubtitle = document.getElementById('scene-subtitle');
const footerPill = document.getElementById('footer-pill');

const routeDefs = [
  {
    hud: 'Route 01 · Red Sea Corridor',
    title: 'La nave guida la blueprint: la camera resta dietro di lei',
    subtitle: 'Cinque rotte, cinque boe per rotta. Ogni boa apre un punto della blueprint, ma la scena resta centrata sulla navigazione della nave.',
    footer: 'Click su una boa per aprire la vista blueprint',
    routeColor: 'rgba(219, 198, 153, 0.82)',
    routeGlow: 'rgba(219, 198, 153, 0.14)',
    hue: 'sand',
    points: [
      [728, 758], [662, 690], [608, 606], [548, 470], [478, 302],
    ],
    buoys: [
      { t: 0.14, title: 'Fleet Ops', metric: '94% readiness', detail: 'Regole operative, routine di bordo e controllo delle deviazioni.' },
      { t: 0.32, title: 'Port Handshake', metric: '6 touchpoints', detail: 'Connessione fra terminale, schedule e finestra di ormeggio.' },
      { t: 0.50, title: 'Safety Layer', metric: '0 critical gaps', detail: 'Sicurezza, compliance e stabilità del viaggio.' },
      { t: 0.68, title: 'Maintenance', metric: '12 open items', detail: 'Asset health, manutenzione programmata e priorità tecniche.' },
      { t: 0.84, title: 'Opportunity', metric: '+18% leverage', detail: 'Spazio per ridurre attrito e aumentare il rendimento della rotta.' },
    ],
  },
  {
    hud: 'Route 02 · Gulf Connector',
    title: 'La nave avanza, le rotte restano visibili come intelligence di bordo',
    subtitle: 'Il sistema non è un pannello: è una navigazione executive con boe informative che emergono dal mare in modo sobrio.',
    footer: 'Mouse sulla nave e sulle boe per cambiare fuoco',
    routeColor: 'rgba(202, 181, 143, 0.8)',
    routeGlow: 'rgba(202, 181, 143, 0.12)',
    hue: 'bronze',
    points: [
      [732, 760], [694, 690], [654, 600], [642, 462], [690, 306],
    ],
    buoys: [
      { t: 0.14, title: 'Commercial Flow', metric: 'Stable', detail: 'Flusso commerciale, priorità di capacità e visibilità sul carico.' },
      { t: 0.32, title: 'Rate Curve', metric: 'Tracked', detail: 'Andamento dei rate e pressione competitiva sulla tratta.' },
      { t: 0.50, title: 'Cargo Mix', metric: 'Balanced', detail: 'Composizione dei carichi e bilanciamento della domanda.' },
      { t: 0.68, title: 'Lead Time', metric: 'Tuned', detail: 'Tempi di risposta, sincronizzazione e disciplina di schedulazione.' },
      { t: 0.84, title: 'Expansion', metric: '+2 lanes', detail: 'Opzioni di estensione della rete e consolidamento degli scali.' },
    ],
  },
  {
    hud: 'Route 03 · Mediterranean Reach',
    title: 'Dalla poppa, il sistema appare come una rotta misurata e autorevole',
    subtitle: 'Le cinque boe sono i cinque punti di interesse della blueprint: la scena le mostra subito, poi le rende interrogabili una alla volta.',
    footer: 'Navigazione del vessel: route, buoy, blueprint',
    routeColor: 'rgba(195, 176, 142, 0.84)',
    routeGlow: 'rgba(195, 176, 142, 0.12)',
    hue: 'gold',
    points: [
      [736, 762], [730, 690], [724, 598], [720, 458], [720, 286],
    ],
    buoys: [
      { t: 0.14, title: 'Planning Hub', metric: 'Realtime', detail: 'Pianificazione centrale con visione corta e lunga distanza.' },
      { t: 0.32, title: 'Capacity', metric: '88% load', detail: 'Capacità disponibile e sua saturazione sulle finestre chiave.' },
      { t: 0.50, title: 'Exception Control', metric: 'Low drift', detail: 'Eccezioni, derapage e gestione dell’asset in tempo utile.' },
      { t: 0.68, title: 'ETA Discipline', metric: '±2.1h', detail: 'Affidabilità dell’arrivo e coerenza con il piano operativo.' },
      { t: 0.84, title: 'Optimization', metric: 'Next best', detail: 'Migliorie sistemiche e opportunità di efficienza immediata.' },
    ],
  },
  {
    hud: 'Route 04 · Indian Ocean Spine',
    title: 'Una navigazione in cui la nave è il centro e la blueprint si apre davanti',
    subtitle: 'I pannelli non invadono: emergono solo quando un punto di interesse viene aperto, lasciando la nave come protagonista assoluta.',
    footer: 'Buoy selection apre i dettagli blueprint',
    routeColor: 'rgba(188, 172, 139, 0.8)',
    routeGlow: 'rgba(188, 172, 139, 0.12)',
    hue: 'steel',
    points: [
      [740, 760], [764, 690], [806, 600], [862, 462], [930, 304],
    ],
    buoys: [
      { t: 0.14, title: 'Service Level', metric: 'Tier A', detail: 'SLA, affidabilità e continuità percepita dal business.' },
      { t: 0.32, title: 'Visibility', metric: 'High', detail: 'Monitoraggio lungo la rotta e trasparenza del viaggio.' },
      { t: 0.50, title: 'Coordination', metric: 'Synchronized', detail: 'Orchestrazione fra asset, staff e punti di handover.' },
      { t: 0.68, title: 'Issue Handling', metric: 'Contained', detail: 'Risoluzione delle anomalie senza rumore di scena.' },
      { t: 0.84, title: 'Network Value', metric: '+1.4x', detail: 'Valore generato dalla rete e dalle connessioni strategiche.' },
    ],
  },
  {
    hud: 'Route 05 · Europe Forward Arc',
    title: 'La vista è dietro alla nave: il viaggio è la narrazione della blueprint',
    subtitle: 'Cinque rotte, cinque boe ciascuna. La mappa è quasi una pista nautica executive dove ogni punto apre un livello informativo.',
    footer: 'Rotte visibili, boe interrogabili, nave protagonista',
    routeColor: 'rgba(184, 169, 137, 0.78)',
    routeGlow: 'rgba(184, 169, 137, 0.11)',
    hue: 'graphite',
    points: [
      [744, 758], [804, 690], [880, 602], [960, 470], [1058, 304],
    ],
    buoys: [
      { t: 0.14, title: 'As-Is Layer', metric: 'Below deck', detail: 'Strato sommerso, discreto e leggibile senza diventare dominante.' },
      { t: 0.32, title: 'Data Spine', metric: 'Connected', detail: 'Flusso dati e continuità di lettura fra i nodi blueprint.' },
      { t: 0.50, title: 'Control Tower', metric: 'Observed', detail: 'Punto di comando che governa la vista senza rumore aggiuntivo.' },
      { t: 0.68, title: 'Gaps', metric: '3 flagged', detail: 'Vuoti e disallineamenti prioritari per la roadmap di miglioramento.' },
      { t: 0.84, title: 'Roadmap', metric: 'Phase 2', detail: 'Direzione di trasformazione che la blueprint rende immediata.' },
    ],
  },
];

const state = {
  routeIndex: 2,
  buoyIndex: 0,
  pointerX: 0.5,
  pointerY: 0.46,
  time: 0,
  nodes: {
    stars: [],
    clouds: [],
    routeGroups: [],
    routeLines: [],
    buoyGroups: [],
    buoyPanels: [],
    ship: null,
    shipWake: null,
    parallaxGroup: null,
    waterLines: [],
    horizonGlow: null,
  },
};

function createSvgEl(tag, attrs = {}) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
  return el;
}

function setText(el, text) {
  el.textContent = text;
  return el;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function polylineLength(points) {
  let total = 0;
  for (let i = 0; i < points.length - 1; i += 1) {
    const dx = points[i + 1][0] - points[i][0];
    const dy = points[i + 1][1] - points[i][1];
    total += Math.hypot(dx, dy);
  }
  return total;
}

function pointAtPolyline(points, t) {
  const target = clamp(t, 0, 1) * polylineLength(points);
  let travelled = 0;
  for (let i = 0; i < points.length - 1; i += 1) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    const segLen = Math.hypot(x2 - x1, y2 - y1);
    if (travelled + segLen >= target) {
      const localT = segLen === 0 ? 0 : (target - travelled) / segLen;
      return {
        x: lerp(x1, x2, localT),
        y: lerp(y1, y2, localT),
        angle: Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI,
      };
    }
    travelled += segLen;
  }
  const last = points[points.length - 1];
  const prev = points[points.length - 2];
  return {
    x: last[0],
    y: last[1],
    angle: Math.atan2(last[1] - prev[1], last[0] - prev[0]) * 180 / Math.PI,
  };
}

function pathFromPoints(points) {
  return points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`).join(' ');
}

function clearScene() {
  scene.innerHTML = '';
  state.nodes = {
    stars: [],
    clouds: [],
    routeGroups: [],
    routeLines: [],
    buoyGroups: [],
    buoyPanels: [],
    ship: null,
    shipWake: null,
    parallaxGroup: null,
    waterLines: [],
    horizonGlow: null,
  };
}

function buildShip(view) {
  const ship = createSvgEl('g', {
    transform: `translate(${view.x} ${view.y}) rotate(${view.tilt}) scale(${view.scale})`,
    filter: 'url(#softShadow)',
  });

  ship.appendChild(createSvgEl('ellipse', { cx: -8, cy: 58, rx: 224, ry: 25, fill: 'rgba(0,0,0,0.44)' }));
  ship.appendChild(createSvgEl('ellipse', { cx: 32, cy: 64, rx: 216, ry: 15, fill: 'rgba(210, 190, 162, 0.05)', filter: 'url(#blurSmall)' }));

  ship.appendChild(createSvgEl('path', {
    d: 'M -220 30 L -202 10 L 156 10 L 220 30 L 208 46 L 164 60 L -194 60 L -220 40 Z',
    class: 'ship-body',
  }));
  ship.appendChild(createSvgEl('path', {
    d: 'M -176 18 L 148 18 L 188 30 L 178 38 L -164 38 Z',
    class: 'ship-highlight',
    opacity: '0.88',
  }));
  ship.appendChild(createSvgEl('path', {
    d: 'M -220 30 L -202 10 L -186 18 L -198 60 L -220 40 Z',
    fill: 'rgba(255,255,255,0.04)',
  }));
  ship.appendChild(createSvgEl('path', {
    d: 'M 156 10 L 220 30 L 208 46 L 164 60 L 178 38 L 188 30 Z',
    fill: 'rgba(255,255,255,0.035)',
  }));

  ship.appendChild(createSvgEl('path', {
    d: 'M -168 22 L 146 22 L 186 30',
    fill: 'none',
    stroke: 'rgba(232, 226, 217, 0.16)',
    'stroke-width': '4',
    'stroke-linecap': 'round',
  }));
  ship.appendChild(createSvgEl('path', {
    d: 'M -102 28 L 34 28',
    fill: 'none',
    stroke: 'rgba(255, 196, 140, 0.1)',
    'stroke-width': '2.5',
    'stroke-linecap': 'round',
  }));

  [-126, -90, -56, -20, 18].forEach((x) => {
    ship.appendChild(createSvgEl('circle', { cx: x, cy: 24, r: 2.4, fill: 'rgba(18, 20, 24, 0.54)' }));
  });
  [ -22, 12, 46 ].forEach((x) => {
    ship.appendChild(createSvgEl('rect', {
      x,
      y: 16,
      width: 18,
      height: 6,
      rx: 2,
      fill: 'rgba(22, 25, 30, 0.34)',
    }));
  });

  const stern = createSvgEl('g', { transform: 'translate(110 -34)' });
  stern.appendChild(createSvgEl('path', { d: 'M 0 34 L 0 4 L 60 4 L 60 34 Z', fill: 'url(#deckGrad)' }));
  stern.appendChild(createSvgEl('path', { d: 'M 12 4 L 12 -18 L 40 -18 L 40 4 Z', fill: 'url(#deckGrad)' }));
  stern.appendChild(createSvgEl('rect', { x: 10, y: -10, width: 22, height: 6, rx: 1.5, fill: 'rgba(18, 22, 28, 0.82)' }));
  stern.appendChild(createSvgEl('rect', { x: 10, y: -2, width: 22, height: 6, rx: 1.5, fill: 'rgba(18, 22, 28, 0.76)' }));
  stern.appendChild(createSvgEl('rect', { x: 44, y: 0, width: 6, height: 34, rx: 1.5, fill: 'rgba(84, 90, 98, 0.82)' }));
  stern.appendChild(createSvgEl('line', {
    x1: 47,
    y1: 0,
    x2: 47,
    y2: -24,
    stroke: 'rgba(166, 171, 177, 0.48)',
    'stroke-width': '2',
    'stroke-linecap': 'round',
  }));
  stern.appendChild(createSvgEl('circle', { cx: 47, cy: -28, r: 2.1, fill: 'rgba(205, 211, 216, 0.56)' }));
  ship.appendChild(stern);

  const deckDetails = createSvgEl('g', { opacity: '0.78' });
  [ -62, -34, -6 ].forEach((x) => {
    deckDetails.appendChild(createSvgEl('rect', {
      x,
      y: 0,
      width: 16,
      height: 10,
      rx: 2,
      fill: 'rgba(186, 189, 192, 0.26)',
    }));
  });
  ship.appendChild(deckDetails);

  ship.appendChild(createSvgEl('path', {
    d: 'M -172 42 C -78 20, 54 20, 164 44',
    fill: 'none',
    stroke: 'rgba(204, 194, 180, 0.14)',
    'stroke-width': '4',
    'stroke-linecap': 'round',
  }));
  ship.appendChild(createSvgEl('path', {
    d: 'M -180 52 C -92 36, -6 34, 78 36 C 126 37, 168 48, 202 64',
    fill: 'none',
    stroke: 'rgba(250, 242, 230, 0.06)',
    'stroke-width': '3',
    'stroke-linecap': 'round',
    opacity: '0.7',
  }));
  ship.appendChild(createSvgEl('path', {
    d: 'M -182 48 C -112 42, -32 42, 48 44 C 120 46, 172 54, 196 64',
    fill: 'none',
    stroke: 'rgba(0, 0, 0, 0.28)',
    'stroke-width': '8',
    'stroke-linecap': 'round',
    opacity: '0.42',
  }));

  return ship;
}

function buildBuoyPanel(route, buoy, anchor, side, isActive) {
  const panel = createSvgEl('g', {
    transform: `translate(${anchor.x} ${anchor.y})`,
    opacity: isActive ? '1' : '0',
  });
  if (!isActive) panel.style.pointerEvents = 'none';

  const panelW = 186;
  const panelH = 96;
  const dx = side === 'left' ? -panelW - 22 : 22;
  const dy = -panelH - 6;

  panel.appendChild(createSvgEl('line', {
    x1: 0,
    y1: 0,
    x2: dx + (side === 'left' ? panelW : 0),
    y2: dy + panelH * 0.42,
    stroke: 'rgba(232, 226, 217, 0.2)',
    'stroke-width': '1.5',
  }));

  panel.appendChild(createSvgEl('rect', {
    x: dx,
    y: dy,
    width: panelW,
    height: panelH,
    rx: 18,
    fill: 'rgba(6, 10, 15, 0.54)',
    stroke: 'rgba(255,255,255,0.08)',
    'stroke-width': '1',
    filter: 'url(#blurSmall)',
  }));
  panel.appendChild(createSvgEl('rect', {
    x: dx,
    y: dy,
    width: panelW,
    height: panelH,
    rx: 18,
    fill: 'rgba(8, 12, 17, 0.72)',
    stroke: isActive ? route.routeColor : 'rgba(255,255,255,0.04)',
    'stroke-width': isActive ? '1.5' : '1',
  }));

  const title = createSvgEl('text', { x: dx + 16, y: dy + 22, class: 'panel-kicker' });
  setText(title, `${route.hud.split('·')[0].trim()} · Point ${String(buoy.index + 1).padStart(2, '0')}`);
  panel.appendChild(title);

  const main = createSvgEl('text', { x: dx + 16, y: dy + 46, class: 'panel-title' });
  setText(main, buoy.title);
  panel.appendChild(main);

  const metric = createSvgEl('text', { x: dx + 16, y: dy + 67, class: 'panel-metric' });
  setText(metric, buoy.metric);
  panel.appendChild(metric);

  const detail = createSvgEl('text', { x: dx + 16, y: dy + 86, class: 'panel-detail' });
  setText(detail, buoy.detail);
  panel.appendChild(detail);

  return panel;
}

function drawScene() {
  const activeRoute = routeDefs[state.routeIndex];
  hudStatus.textContent = activeRoute.hud;
  sceneTitle.textContent = activeRoute.title;
  sceneSubtitle.textContent = activeRoute.subtitle;
  footerPill.textContent = activeRoute.footer;

  clearScene();

  const defs = createSvgEl('defs');
  defs.innerHTML = `
    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0f1620" />
      <stop offset="28%" stop-color="#1b2430" />
      <stop offset="58%" stop-color="#313844" />
      <stop offset="82%" stop-color="#5f594f" />
      <stop offset="100%" stop-color="#a48d6d" />
    </linearGradient>
    <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#09111a" />
      <stop offset="54%" stop-color="#08111a" />
      <stop offset="100%" stop-color="#050b11" />
    </linearGradient>
    <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(255, 248, 232, 0.98)" />
      <stop offset="38%" stop-color="rgba(255, 204, 130, 0.96)" />
      <stop offset="100%" stop-color="rgba(255, 126, 64, 0)" />
    </radialGradient>
    <linearGradient id="hullGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#302026" />
      <stop offset="42%" stop-color="#22161c" />
      <stop offset="100%" stop-color="#121015" />
    </linearGradient>
    <linearGradient id="deckGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#d5d5d2" />
      <stop offset="100%" stop-color="#8f959b" />
    </linearGradient>
    <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="18" stdDeviation="10" flood-color="#000" flood-opacity="0.46" /></filter>
    <filter id="sunGlow" x="-140%" y="-140%" width="380%" height="380%"><feGaussianBlur stdDeviation="20" /></filter>
    <filter id="blurSmall" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="8" /></filter>
    <filter id="glow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
  `;
  scene.appendChild(defs);

  const root = createSvgEl('g');
  state.nodes.parallaxGroup = root;

  root.appendChild(createSvgEl('rect', { x: 0, y: 0, width: 1440, height: 900, fill: 'url(#skyGrad)' }));
  root.appendChild(createSvgEl('ellipse', {
    cx: 1060,
    cy: 222,
    rx: 150,
    ry: 60,
    fill: 'url(#sunGrad)',
    filter: 'url(#sunGlow)',
    opacity: '0.9',
  }));

  const stars = [
    [98, 108, 1.2, 0.62], [168, 82, 1.3, 0.7], [246, 120, 1, 0.46], [312, 64, 1.6, 0.82], [392, 100, 1.1, 0.54],
    [470, 74, 1.4, 0.74], [558, 118, 1.1, 0.54], [622, 86, 1.2, 0.62], [708, 126, 1, 0.45], [786, 72, 1.7, 0.88],
    [864, 114, 1.1, 0.48], [954, 90, 1.4, 0.7], [1038, 78, 1.2, 0.6], [1116, 120, 1.05, 0.5], [1214, 74, 1.5, 0.76],
    [1328, 110, 1.15, 0.58], [1402, 84, 1.2, 0.66], [182, 184, 0.9, 0.34], [268, 166, 1, 0.42], [364, 196, 0.9, 0.32],
    [482, 154, 1, 0.4], [596, 184, 0.9, 0.32], [746, 166, 1, 0.46], [906, 190, 0.85, 0.28], [1078, 170, 1, 0.4], [1246, 188, 0.9, 0.3],
  ];
  state.nodes.stars = stars.map(([x, y, r, a], i) => {
    const star = createSvgEl('circle', { cx: x, cy: y, r, fill: 'rgba(255,248,232,0.94)', opacity: a });
    star.dataset.baseOpacity = String(a);
    star.dataset.index = String(i);
    root.appendChild(star);
    return star;
  });

  const clouds = [
    'M -60 130 C 110 96, 236 150, 398 126 S 650 92, 806 126 S 1042 160, 1490 108',
    'M -16 176 C 146 146, 272 190, 430 162 S 720 126, 872 160 S 1118 180, 1454 138',
    'M 92 100 C 210 78, 302 96, 396 92 S 592 78, 694 96',
    'M 606 118 C 690 102, 772 104, 846 116 S 1002 122, 1090 104',
  ];
  state.nodes.clouds = clouds.map((d, i) => {
    const g = createSvgEl('g', { opacity: i === 0 ? '0.22' : '0.14', filter: 'url(#blurSmall)' });
    const color = i % 2 === 0 ? 'rgba(255, 214, 166, 0.14)' : 'rgba(236, 139, 162, 0.1)';
    const thickness = i === 0 ? 24 : i === 1 ? 18 : 12;
    const path = createSvgEl('path', { d, fill: 'none', stroke: color, 'stroke-width': String(thickness), 'stroke-linecap': 'round' });
    g.appendChild(path);
    g.dataset.baseX = String(i * 22);
    g.dataset.speed = String(0.18 + i * 0.04);
    root.appendChild(g);
    return g;
  });

  root.appendChild(createSvgEl('rect', { x: 0, y: 400, width: 1440, height: 500, fill: 'url(#seaGrad)' }));
  root.appendChild(createSvgEl('rect', { x: 0, y: 398, width: 1440, height: 8, fill: 'rgba(255,255,255,0.08)' }));
  state.nodes.horizonGlow = createSvgEl('path', {
    d: 'M -12 132 C 130 104, 260 134, 384 114 S 602 90, 748 124 S 962 152, 1460 104',
    fill: 'none',
    stroke: 'rgba(255, 214, 166, 0.08)',
    'stroke-width': '28',
    'stroke-linecap': 'round',
    filter: 'url(#blurSmall)',
  });
  root.appendChild(state.nodes.horizonGlow);

  root.appendChild(createSvgEl('path', {
    d: 'M 34 414 C 208 398, 368 414, 562 406 S 882 398, 1148 412 S 1338 420, 1430 406',
    fill: 'none',
    stroke: 'rgba(255,255,255,0.13)',
    'stroke-width': '2',
  }));

  root.appendChild(createSvgEl('path', {
    d: 'M 60 658 C 198 640, 324 660, 474 646 S 756 628, 952 646 S 1210 664, 1338 638',
    fill: 'none',
    stroke: 'rgba(255,255,255,0.08)',
    'stroke-width': '2.4',
  }));

  root.appendChild(createSvgEl('path', {
    d: 'M 148 742 C 292 730, 420 746, 566 736 S 824 722, 998 736 S 1228 752, 1368 726',
    fill: 'none',
    stroke: 'rgba(255,255,255,0.06)',
    'stroke-width': '1.7',
    'stroke-dasharray': '8 16',
  }));

  const waterLines = [
    'M 88 620 C 204 606, 294 620, 420 604 S 652 586, 796 606 S 1040 622, 1180 596',
    'M 16 648 C 164 632, 264 660, 404 644 S 654 624, 822 644 S 1052 660, 1206 634',
    'M 112 688 C 228 672, 348 696, 512 680 S 786 656, 936 680 S 1130 698, 1216 672',
  ];
  state.nodes.waterLines = waterLines.map((d, i) => {
    const line = createSvgEl('path', {
      d,
      class: 'wave-line',
      stroke: i === 1 ? 'rgba(255, 191, 126, 0.15)' : 'rgba(255,255,255,0.09)',
      'stroke-width': i === 1 ? '4' : '2.4',
    });
    root.appendChild(line);
    return line;
  });

  const routeBase = 0.08;
  const shipPos = pointAtPolyline(activeRoute.points, routeBase);
  const shipState = {
    x: shipPos.x,
    y: shipPos.y + 18,
    tilt: shipPos.angle + 92,
    scale: 1.68,
  };
  state.nodes.ship = buildShip(shipState);
  root.appendChild(state.nodes.ship);

  state.nodes.shipWake = createSvgEl('g', { opacity: '0.86' });
  state.nodes.shipWake.appendChild(createSvgEl('path', {
    d: `M ${shipState.x - 16} ${shipState.y + 50} C ${shipState.x - 60} ${shipState.y + 102}, ${shipState.x - 86} ${shipState.y + 164}, ${shipState.x - 92} ${shipState.y + 206}`,
    fill: 'none',
    stroke: 'rgba(225, 207, 176, 0.14)',
    'stroke-width': '30',
    'stroke-linecap': 'round',
    filter: 'url(#blurSmall)',
  }));
  state.nodes.shipWake.appendChild(createSvgEl('path', {
    d: `M ${shipState.x + 16} ${shipState.y + 50} C ${shipState.x + 56} ${shipState.y + 102}, ${shipState.x + 78} ${shipState.y + 160}, ${shipState.x + 82} ${shipState.y + 206}`,
    fill: 'none',
    stroke: 'rgba(255,255,255,0.08)',
    'stroke-width': '16',
    'stroke-linecap': 'round',
    filter: 'url(#blurSmall)',
  }));
  root.appendChild(state.nodes.shipWake);

  state.nodes.routeGroups = [];
  state.nodes.routeLines = [];
  state.nodes.buoyGroups = [];
  state.nodes.buoyPanels = [];

  routeDefs.forEach((route, routeIndex) => {
    const active = routeIndex === state.routeIndex;
    const routeGroup = createSvgEl('g', { class: active ? 'route-group route-group-active' : 'route-group' });
    const path = createSvgEl('path', {
      d: pathFromPoints(route.points),
      class: 'route-line',
      stroke: active ? route.routeColor : 'rgba(255,255,255,0.12)',
      'stroke-width': active ? '6' : '2.3',
      'stroke-dasharray': active ? '0' : '10 12',
      opacity: active ? '0.98' : '0.26',
      filter: active ? 'url(#glow)' : 'none',
    });
    routeGroup.appendChild(path);
    state.nodes.routeLines.push(path);

    const routeLabelPoint = pointAtPolyline(route.points, 0.86);
    if (active) {
      const routeLabel = createSvgEl('text', {
        x: routeLabelPoint.x,
        y: routeLabelPoint.y - 10,
        class: 'route-label',
        'text-anchor': 'middle',
      });
      setText(routeLabel, route.hud.split('·')[1].trim());
      routeGroup.appendChild(routeLabel);
    }

    route.buoys.forEach((buoy, buoyIndex) => {
      const p = pointAtPolyline(route.points, buoy.t);
      const next = pointAtPolyline(route.points, clamp(buoy.t + 0.02, 0, 1));
      const tangent = Math.atan2(next.y - p.y, next.x - p.x);
      const normalX = -Math.sin(tangent);
      const normalY = Math.cos(tangent);
      const side = routeIndex < 2 ? 'left' : 'right';
      const panelAnchor = {
        x: p.x + normalX * (side === 'left' ? -72 : 72),
        y: p.y + normalY * (side === 'left' ? -72 : -62),
      };
      const isActiveBuoy = routeIndex === state.routeIndex && buoyIndex === state.buoyIndex;

      const buoyGroup = createSvgEl('g', {
        transform: `translate(${p.x} ${p.y})`,
        class: isActiveBuoy ? 'buoy-group buoy-group-active' : 'buoy-group',
        style: 'cursor:pointer;',
      });
      buoyGroup.appendChild(createSvgEl('circle', {
        cx: 0,
        cy: 0,
        r: isActiveBuoy ? 10 : 7,
        fill: isActiveBuoy ? 'rgba(255, 233, 191, 0.96)' : 'rgba(216, 200, 170, 0.9)',
        stroke: isActiveBuoy ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.16)',
        'stroke-width': isActiveBuoy ? '2.2' : '1.2',
        filter: isActiveBuoy ? 'url(#glow)' : 'none',
      }));
      buoyGroup.appendChild(createSvgEl('circle', {
        cx: 0,
        cy: 0,
        r: isActiveBuoy ? 20 : 14,
        fill: 'rgba(255,255,255,0.03)',
      }));
      buoyGroup.appendChild(createSvgEl('text', {
        x: 0,
        y: -14,
        'text-anchor': 'middle',
        class: 'buoy-index',
      }));
      setText(buoyGroup.lastChild, String(buoyIndex + 1).padStart(2, '0'));
      routeGroup.appendChild(buoyGroup);
      state.nodes.buoyGroups.push(buoyGroup);

      const panel = buildBuoyPanel(route, { ...buoy, index: buoyIndex }, panelAnchor, side, isActiveBuoy);
      routeGroup.appendChild(panel);
      state.nodes.buoyPanels.push(panel);

      buoyGroup.addEventListener('click', (event) => {
        event.stopPropagation();
        state.routeIndex = routeIndex;
        state.buoyIndex = buoyIndex;
        drawScene();
      });
      buoyGroup.addEventListener('mouseenter', () => {
        state.routeIndex = routeIndex;
        state.buoyIndex = buoyIndex;
        drawScene();
      });
    });

    root.appendChild(routeGroup);
    state.nodes.routeGroups.push(routeGroup);
  });

  const infoTag = createSvgEl('g', { transform: 'translate(948 124)' });
  infoTag.appendChild(createSvgEl('rect', { x: 0, y: 0, width: 356, height: 50, rx: 25, class: 'badge-pill' }));
  const infoText = createSvgEl('text', { x: 22, y: 31, class: 'route-label', style: 'font-size:14px; font-weight:600;' });
  setText(infoText, 'Hover / click su boe e rotte per aprire i dettagli blueprint');
  infoTag.appendChild(infoText);
  root.appendChild(infoTag);

  scene.appendChild(root);
}

function nextRoute(delta = 1) {
  state.routeIndex = (state.routeIndex + delta + routeDefs.length) % routeDefs.length;
  state.buoyIndex = 0;
  drawScene();
}

function updateFrame(ts) {
  state.time = ts * 0.001;
  const t = state.time;
  const px = state.pointerX - 0.5;
  const py = state.pointerY - 0.46;

  if (state.nodes.parallaxGroup) {
    state.nodes.parallaxGroup.setAttribute('transform', `translate(${px * 18} ${py * 12})`);
  }

  state.nodes.clouds.forEach((cloud, i) => {
    const baseX = Number(cloud.dataset.baseX || 0);
    const speed = Number(cloud.dataset.speed || 0.2);
    const offset = baseX + Math.sin(t * speed + i) * 14 + px * 18;
    cloud.setAttribute('transform', `translate(${offset} ${Math.sin(t * 0.22 + i) * 2})`);
    cloud.style.opacity = String(0.22 + Math.max(0, Math.cos(t * 0.18 + i)) * 0.1);
  });

  state.nodes.stars.forEach((star, i) => {
    const base = Number(star.dataset.baseOpacity || star.getAttribute('opacity') || 0.5);
    const twinkle = 0.08 * Math.sin(t * 1.3 + i * 0.7) + 0.05 * Math.cos(t * 0.8 + i);
    star.setAttribute('opacity', Math.max(0.16, Math.min(0.95, base + twinkle)).toFixed(3));
    const x = Number(star.getAttribute('cx')) + px * 4;
    star.setAttribute('cx', x.toFixed(2));
  });

  state.nodes.routeLines.forEach((path, i) => {
    const active = i === state.routeIndex;
    path.setAttribute('stroke-dashoffset', String(active ? -(t * 34 + i * 4) : 0));
    path.setAttribute('opacity', active ? '1' : '0.4');
  });

  state.nodes.waterLines.forEach((line, i) => {
    const offset = Math.sin(t * (0.58 + i * 0.08) + i) * 8 + px * 18;
    line.setAttribute('transform', `translate(${offset} ${Math.sin(t * 0.4 + i) * 1.2})`);
    line.setAttribute('stroke-width', String(i === 1 ? 4.2 + 0.7 * Math.sin(t * 1.2) : 2.2 + 0.4 * Math.sin(t * 0.9 + i)));
  });

  if (state.nodes.horizonGlow) {
    const drift = Math.sin(t * 0.16) * 8;
    state.nodes.horizonGlow.setAttribute('transform', `translate(${drift} 0)`);
  }

  const activeRoute = routeDefs[state.routeIndex];
  const shipPoint = pointAtPolyline(activeRoute.points, 0.08);
  if (state.nodes.ship) {
    const shipTilt = shipPoint.angle + 92 + Math.sin(t * 0.65) * 0.32 + px * 0.7;
    const shipScale = 1.55 + Math.sin(t * 0.5) * 0.006;
    state.nodes.ship.setAttribute('transform', `translate(${shipPoint.x} ${shipPoint.y + 18}) rotate(${shipTilt}) scale(${shipScale})`);
  }
  if (state.nodes.shipWake) {
    state.nodes.shipWake.setAttribute('transform', `translate(${px * 3} ${py * 2})`);
  }

  requestAnimationFrame(updateFrame);
}

hero.addEventListener('click', () => nextRoute(1));
hero.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    nextRoute(1);
  }
  if (event.key === 'ArrowRight') nextRoute(1);
  if (event.key === 'ArrowLeft') nextRoute(-1);
});

hero.addEventListener('pointermove', (event) => {
  const rect = hero.getBoundingClientRect();
  state.pointerX = clamp((event.clientX - rect.left) / rect.width, 0, 1);
  state.pointerY = clamp((event.clientY - rect.top) / rect.height, 0, 1);
});

hero.addEventListener('pointerleave', () => {
  state.pointerX = 0.5;
  state.pointerY = 0.46;
});

state.routeIndex = 2;
state.buoyIndex = 0;
drawScene();
requestAnimationFrame(updateFrame);
