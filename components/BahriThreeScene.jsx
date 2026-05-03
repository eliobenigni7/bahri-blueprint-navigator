'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function parsePercent(value) {
  return Number.parseFloat(String(value).replace('%', '')) || 0;
}

function toWorldPosition(position) {
  const left = parsePercent(position.left);
  const top = parsePercent(position.top);
  return {
    x: (left - 50) * 1.62,
    y: 0,
    z: (50 - top) * 1.15,
  };
}

function makeCanvasTexture(drawFn, size = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  drawFn(ctx, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function makeRadialTexture(color = '#70e7ff', inner = 0.18, outer = 0.98) {
  return makeCanvasTexture((ctx, size) => {
    const gradient = ctx.createRadialGradient(size / 2, size / 2, size * inner, size / 2, size / 2, size * outer);
    gradient.addColorStop(0, `${color}ff`);
    gradient.addColorStop(0.35, `${color}90`);
    gradient.addColorStop(1, `${color}00`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  });
}

function makeTextTexture(text, fg = '#f4efe7', bg = 'rgba(6, 14, 22, 0.0)') {
  return makeCanvasTexture((ctx, size) => {
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, size, size);
    ctx.font = '700 44px Montserrat, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = fg;
    ctx.shadowColor = 'rgba(77, 214, 255, 0.45)';
    ctx.shadowBlur = 16;
    ctx.fillText(text, size / 2, size / 2);
  }, 256);
}

function makeNoiseTexture() {
  return makeCanvasTexture((ctx, size) => {
    const image = ctx.createImageData(size, size);
    for (let i = 0; i < image.data.length; i += 4) {
      const n = Math.random() * 255;
      image.data[i] = n;
      image.data[i + 1] = n;
      image.data[i + 2] = n;
      image.data[i + 3] = 20;
    }
    ctx.putImageData(image, 0, 0);
  }, 128);
}

function buildShip(scene) {
  const ship = new THREE.Group();
  ship.name = 'bahri-ship';

  const hullMat = new THREE.MeshStandardMaterial({
    color: '#101820',
    metalness: 0.55,
    roughness: 0.35,
    emissive: '#0a131d',
    emissiveIntensity: 0.55,
  });

  const deckMat = new THREE.MeshStandardMaterial({
    color: '#d6b88b',
    metalness: 0.12,
    roughness: 0.55,
    emissive: '#342316',
    emissiveIntensity: 0.14,
  });

  const accentMat = new THREE.MeshStandardMaterial({
    color: '#f7ede1',
    metalness: 0.05,
    roughness: 0.38,
    emissive: '#dfe8f3',
    emissiveIntensity: 0.15,
  });

  const hull = new THREE.Mesh(new THREE.BoxGeometry(30, 4.5, 8.5), hullMat);
  hull.position.y = 1.4;
  hull.castShadow = true;
  ship.add(hull);

  const bow = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 4.1, 8.5, 4), hullMat);
  bow.rotation.z = Math.PI / 2;
  bow.position.set(14, 1.6, 0);
  ship.add(bow);

  const stern = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 3.2, 7.4, 4), hullMat);
  stern.rotation.z = -Math.PI / 2;
  stern.position.set(-13.8, 1.6, 0);
  ship.add(stern);

  const deck = new THREE.Mesh(new THREE.BoxGeometry(22, 2.2, 6.4), deckMat);
  deck.position.set(-2, 4.15, 0);
  ship.add(deck);

  const bridge = new THREE.Mesh(new THREE.BoxGeometry(6.8, 5.5, 4.6), accentMat);
  bridge.position.set(4.3, 7.8, 0);
  ship.add(bridge);

  const funnel = new THREE.Mesh(new THREE.BoxGeometry(3.4, 5.6, 3.2), hullMat);
  funnel.position.set(-4.6, 8.6, 0);
  ship.add(funnel);

  const rail = new THREE.Mesh(new THREE.BoxGeometry(22.5, 0.45, 6.8), accentMat);
  rail.position.set(-1.5, 6.0, 0);
  ship.add(rail);

  const labelTexture = makeTextTexture('Bahri', '#f5efe7');
  const labelMat = new THREE.MeshBasicMaterial({ map: labelTexture, transparent: true, depthWrite: false });
  const label = new THREE.Mesh(new THREE.PlaneGeometry(10, 3.4), labelMat);
  label.position.set(0.4, 9.8, 4.42);
  ship.add(label);

  const glowMat = new THREE.SpriteMaterial({
    map: makeRadialTexture('#63e2ff', 0.12, 0.9),
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    opacity: 0.9,
  });
  const glow = new THREE.Sprite(glowMat);
  glow.scale.set(42, 18, 1);
  glow.position.set(0, 5.8, 0);
  ship.add(glow);

  const wake = new THREE.Mesh(
    new THREE.PlaneGeometry(46, 14),
    new THREE.MeshBasicMaterial({
      map: makeRadialTexture('#5ad8ff', 0.08, 0.98),
      transparent: true,
      blending: THREE.AdditiveBlending,
      opacity: 0.18,
      depthWrite: false,
    }),
  );
  wake.rotation.x = -Math.PI / 2;
  wake.position.set(-3, 0.25, 0);
  ship.add(wake);

  scene.add(ship);
  return { ship, wake };
}

function buildNode(scene, domain) {
  const world = toWorldPosition(domain.position);
  const group = new THREE.Group();
  group.position.set(world.x, 0, world.z);
  group.userData = { id: domain.id };

  const glowColor = new THREE.Color(domain.routeColor);
  const baseMat = new THREE.MeshStandardMaterial({
    color: glowColor,
    emissive: glowColor,
    emissiveIntensity: 1.25,
    metalness: 0.1,
    roughness: 0.28,
  });

  const core = new THREE.Mesh(new THREE.SphereGeometry(1.25, 28, 28), baseMat);
  core.position.y = 2.25;
  group.add(core);

  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: makeRadialTexture(domain.routeColor, 0.1, 0.9),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.9,
    }),
  );
  halo.position.y = 2.35;
  halo.scale.set(10.5, 10.5, 1);
  group.add(halo);

  const column = new THREE.Mesh(
    new THREE.CylinderGeometry(0.55, 1.9, 13.5, 22, 1, true),
    new THREE.MeshBasicMaterial({
      color: glowColor,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    }),
  );
  column.position.y = 8.0;
  group.add(column);

  const tip = new THREE.Mesh(
    new THREE.ConeGeometry(0.95, 2.4, 24),
    new THREE.MeshBasicMaterial({ color: glowColor, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending }),
  );
  tip.position.y = 9.2;
  group.add(tip);

  const mini = new THREE.Mesh(
    new THREE.TorusGeometry(2.0, 0.1, 8, 40),
    new THREE.MeshBasicMaterial({ color: glowColor, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending }),
  );
  mini.rotation.x = Math.PI / 2;
  mini.position.y = 2.15;
  group.add(mini);

  scene.add(group);
  return { group, core, halo, column, mini, world };
}

function buildRoute(scene, nodeRecord, index) {
  const start = new THREE.Vector3(0, 1.2, 0);
  const end = nodeRecord.group.position.clone();
  const bend = new THREE.Vector3(
    end.x * 0.34,
    13 + Math.abs(end.x) * 0.08 + index * 0.3,
    end.z * 0.34,
  );
  const bend2 = new THREE.Vector3(
    end.x * 0.72,
    6 + Math.abs(end.x) * 0.05,
    end.z * 0.72,
  );
  const curve = new THREE.CatmullRomCurve3([start, bend, bend2, end]);
  const tubeGeometry = new THREE.TubeGeometry(curve, 120, 0.35, 10, false);
  const glowGeometry = new THREE.TubeGeometry(curve, 120, 1.05, 14, false);

  const color = new THREE.Color(nodeRecord.group.children[0].material.color);
  const coreMat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.58,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const glowMat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.14,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const glowMesh = new THREE.Mesh(glowGeometry, glowMat);
  const coreMesh = new THREE.Mesh(tubeGeometry, coreMat);
  scene.add(glowMesh, coreMesh);

  const pulse = new THREE.Mesh(
    new THREE.SphereGeometry(0.7, 18, 18),
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  scene.add(pulse);

  return {
    curve,
    glowMesh,
    coreMesh,
    pulse,
    color,
    progress: index * 0.14,
  };
}

function FallbackScene({ domains, selectedId }) {
  const selected = domains.find((domain) => domain.id === selectedId) ?? domains[0];
  const ship = { x: 720, y: 525 };

  const domainPoint = (domain) => {
    const world = toWorldPosition(domain.position);
    return {
      x: ship.x + world.x * 7.15,
      y: ship.y - world.z * 4.9,
    };
  };

  const routePath = (domain, index) => {
    const point = domainPoint(domain);
    const midX = ship.x + (point.x - ship.x) * 0.34;
    const midY = ship.y - 70 - index * 4 - Math.abs(point.x - ship.x) * 0.1;
    const bendX = ship.x + (point.x - ship.x) * 0.74;
    const bendY = ship.y - 30 - Math.abs(point.x - ship.x) * 0.03;
    return `M ${ship.x} ${ship.y} C ${midX} ${midY}, ${bendX} ${bendY}, ${point.x} ${point.y}`;
  };

  return (
    <div className="fallback-stage" aria-hidden="true">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="fallback-svg">
        <defs>
          <linearGradient id="fallbackSea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#05111c" />
            <stop offset="55%" stopColor="#061829" />
            <stop offset="100%" stopColor="#03070d" />
          </linearGradient>
          <radialGradient id="fallbackHorizon" cx="50%" cy="30%" r="55%">
            <stop offset="0%" stopColor="#68e7ff" stopOpacity="0.35" />
            <stop offset="42%" stopColor="#68e7ff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#68e7ff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="fallbackRoute" x1="0" x2="1">
            <stop offset="0%" stopColor="#75ecff" />
            <stop offset="50%" stopColor="#52c0ff" />
            <stop offset="100%" stopColor="#d8b07b" />
          </linearGradient>
          <filter id="fallbackGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="1440" height="900" fill="url(#fallbackSea)" />
        <rect width="1440" height="900" fill="url(#fallbackHorizon)" />
        <ellipse cx="720" cy="500" rx="240" ry="110" fill="#69dfff" opacity="0.08" filter="url(#fallbackGlow)" />

        <g opacity="0.28">
          <circle cx="120" cy="180" r="5" fill="#6de8ff" />
          <circle cx="1260" cy="150" r="6" fill="#f1b160" />
          <circle cx="1320" cy="690" r="7" fill="#bd82ff" />
          <circle cx="155" cy="720" r="6" fill="#67efe0" />
        </g>

        {domains.map((domain, index) => {
          const point = domainPoint(domain);
          const selectedRoute = selected.id === domain.id;
          return (
            <g key={domain.id} filter="url(#fallbackGlow)">
              <path
                d={routePath(domain, index)}
                fill="none"
                stroke={domain.routeColor}
                strokeOpacity={selectedRoute ? 0.9 : 0.44}
                strokeWidth={selectedRoute ? 6 : 3.2}
                strokeLinecap="round"
              />
              <path
                d={routePath(domain, index)}
                fill="none"
                stroke="#ffffff"
                strokeOpacity={selectedRoute ? 0.14 : 0.06}
                strokeWidth={selectedRoute ? 12 : 8}
                strokeLinecap="round"
              />
              <line x1={point.x} y1={point.y - 6} x2={point.x} y2={point.y - 110} stroke={domain.routeColor} strokeOpacity="0.22" strokeWidth="2" />
              <circle cx={point.x} cy={point.y} r={selectedRoute ? 12 : 9} fill={domain.routeColor} fillOpacity={selectedRoute ? 0.92 : 0.78} />
              <circle cx={point.x} cy={point.y} r={selectedRoute ? 22 : 16} fill={domain.routeColor} fillOpacity="0.14" />
            </g>
          );
        })}

        <g transform="translate(720 525)" filter="url(#fallbackGlow)">
          <ellipse cx="-10" cy="60" rx="230" ry="24" fill="#000" opacity="0.4" />
          <path d="M -220 32 L -202 12 L 152 12 L 222 32 L 205 50 L 162 62 L -198 62 L -220 42 Z" fill="#0f1822" />
          <path d="M -174 20 L 146 20 L 186 32 L 176 40 L -164 40 Z" fill="#d7b88b" opacity="0.92" />
          <path d="M -104 30 L 38 30" stroke="#82e9ff" strokeOpacity="0.22" strokeWidth="4" strokeLinecap="round" />
          <rect x="2" y="0" width="60" height="38" rx="4" fill="#dcd1c0" opacity="0.9" />
          <rect x="18" y="-18" width="24" height="18" rx="3" fill="#0d141d" />
          <text x="18" y="10" fill="#f3eee6" fontFamily="Montserrat, Arial, sans-serif" fontSize="28" fontWeight="800" letterSpacing="0.04em">Bahri</text>
        </g>
      </svg>

      <div className="fallback-caption">
        <span className="fallback-caption-title">Fallback maritime hologram</span>
        <span className="fallback-caption-subtitle">WebGL unavailable in this browser context — static SVG scene shown instead.</span>
      </div>
    </div>
  );
}

export default function BahriThreeScene({ domains, selectedId, onSelect }) {
  const hostRef = useRef(null);
  const onSelectRef = useRef(onSelect);
  const selectedRef = useRef(selectedId);
  const sceneState = useRef(null);
  const [renderMode, setRenderMode] = useState('webgl');

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    selectedRef.current = selectedId;

    const state = sceneState.current;
    if (!state) return;

    state.nodes.forEach((node) => {
      const active = node.id === selectedId;
      node.core.material.emissiveIntensity = active ? 2.2 : 0.95;
      node.core.scale.setScalar(active ? 1.18 : 1);
      node.halo.material.opacity = active ? 1 : 0.7;
      node.column.material.opacity = active ? 0.24 : 0.12;
      node.mini.material.opacity = active ? 0.84 : 0.46;
    });

    state.routes.forEach((route) => {
      const active = route.id === selectedId;
      route.coreMesh.material.opacity = active ? 0.95 : 0.44;
      route.glowMesh.material.opacity = active ? 0.24 : 0.11;
      route.pulse.scale.setScalar(active ? 1.4 : 1);
    });
  }, [selectedId]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const supportsWebGL = (() => {
      try {
        const probe = document.createElement('canvas');
        return Boolean(probe.getContext('webgl2') || probe.getContext('webgl'));
      } catch {
        return false;
      }
    })();

    if (!supportsWebGL) {
      setRenderMode('fallback');
      return undefined;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog('#02060b', 45, 160);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      setRenderMode('fallback');
      return undefined;
    }

    setRenderMode('webgl');
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    host.appendChild(renderer.domElement);

    const aspect = host.clientWidth / host.clientHeight || 1;
    const camera = new THREE.PerspectiveCamera(30, aspect, 0.1, 420);
    camera.position.set(0, 24, 60);
    camera.lookAt(0, 6.5, 0);

    const ambient = new THREE.AmbientLight('#93b6d5', 1.7);
    const fill = new THREE.DirectionalLight('#fff0d8', 1.4);
    fill.position.set(45, 90, 40);
    const rim = new THREE.PointLight('#5fd8ff', 2.8, 250, 2);
    rim.position.set(0, 32, 38);
    const redAccent = new THREE.PointLight('#ff6b64', 1.6, 170, 2);
    redAccent.position.set(42, 14, -12);
    scene.add(ambient, fill, rim, redAccent);

    const shimmer = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: makeRadialTexture('#69e8ff', 0.04, 0.98),
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    shimmer.position.set(0, 24, -28);
    shimmer.scale.set(120, 60, 1);
    scene.add(shimmer);

    const ocean = new THREE.Mesh(
      new THREE.PlaneGeometry(260, 180, 180, 120),
      new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
          time: { value: 0 },
          deepColor: { value: new THREE.Color('#02070d') },
          seaColor: { value: new THREE.Color('#061a2b') },
          glowColor: { value: new THREE.Color('#4fd8ff') },
        },
        vertexShader: `
          uniform float time;
          varying vec2 vUv;
          varying float vWave;
          void main() {
            vUv = uv;
            vec3 pos = position;
            float waveA = sin((pos.x * 0.085) + time * 1.2) * 0.42;
            float waveB = cos((pos.y * 0.11) - time * 0.8) * 0.25;
            float waveC = sin((pos.x + pos.y) * 0.04 + time * 0.55) * 0.15;
            vWave = waveA + waveB + waveC;
            pos.y += vWave;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 deepColor;
          uniform vec3 seaColor;
          uniform vec3 glowColor;
          varying vec2 vUv;
          varying float vWave;
          void main() {
            float radial = distance(vUv, vec2(0.5));
            float depth = smoothstep(0.0, 1.0, vUv.y);
            vec3 color = mix(deepColor, seaColor, depth * 0.88);
            color += glowColor * (0.1 - radial * 0.045);
            color += vec3(0.05, 0.08, 0.1) * clamp(vWave * 0.8, 0.0, 1.0);
            gl_FragColor = vec4(color, 0.96);
          }
        `,
      }),
    );
    ocean.rotation.x = -Math.PI / 2;
    ocean.position.y = -8.1;
    scene.add(ocean);

    const waterGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(190, 130),
      new THREE.MeshBasicMaterial({
        map: makeRadialTexture('#6ad7ff', 0.16, 0.92),
        transparent: true,
        opacity: 0.18,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    );
    waterGlow.rotation.x = -Math.PI / 2;
    waterGlow.position.set(0, -7.8, -8);
    scene.add(waterGlow);

    const haloRing = new THREE.Mesh(
      new THREE.TorusGeometry(28, 0.28, 18, 180),
      new THREE.MeshBasicMaterial({
        color: '#66e8ff',
        transparent: true,
        opacity: 0.58,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    haloRing.rotation.x = Math.PI / 2;
    haloRing.position.set(0, 5.8, 0);
    scene.add(haloRing);

    const grid = new THREE.GridHelper(180, 18, '#153145', '#091423');
    grid.position.y = -6.85;
    grid.material.opacity = 0.08;
    grid.material.transparent = true;
    scene.add(grid);

    const islandPositions = [
      [-72, 4, -40],
      [75, 5, -31],
      [-58, 3, 44],
      [66, 5, 48],
    ];
    islandPositions.forEach(([x, y, z], index) => {
      const island = new THREE.Mesh(
        new THREE.DodecahedronGeometry(3.5 + index * 0.5, 0),
        new THREE.MeshStandardMaterial({
          color: index % 2 === 0 ? '#10202b' : '#1a2532',
          emissive: '#0d1721',
          emissiveIntensity: 0.2,
          roughness: 1,
          metalness: 0,
        }),
      );
      island.position.set(x, y, z);
      island.rotation.set(index * 0.3, index * 0.5, index * 0.2);
      scene.add(island);

      const light = new THREE.PointLight(index % 2 ? '#f0b15f' : '#5fd8ff', 1.4, 38, 2);
      light.position.set(x, y + 6, z);
      scene.add(light);
    });

    const shipRecord = buildShip(scene);
    shipRecord.ship.position.set(0, -0.6, 0);
    shipRecord.ship.scale.setScalar(1.28);
    shipRecord.ship.rotation.y = -0.14;

    const nodeRecords = domains.map((domain) => buildNode(scene, domain));
    const routeRecords = nodeRecords.map((node, index) => buildRoute(scene, node, index));

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(0, 0);
    const nodeMeshes = nodeRecords.map((entry) => entry.core);

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      const nextAspect = width / height || 1;
      camera.aspect = nextAspect;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const syncSelection = (selectedDomainId) => {
      nodeRecords.forEach((node) => {
        const active = node.group.userData.id === selectedDomainId;
        node.core.material.emissiveIntensity = active ? 2.2 : 0.95;
        node.core.scale.setScalar(active ? 1.18 : 1);
        node.halo.material.opacity = active ? 1 : 0.7;
        node.column.material.opacity = active ? 0.24 : 0.12;
        node.mini.material.opacity = active ? 0.84 : 0.46;
      });
      routeRecords.forEach((route, index) => {
        const id = domains[index].id;
        const active = id === selectedDomainId;
        route.coreMesh.material.opacity = active ? 0.95 : 0.44;
        route.glowMesh.material.opacity = active ? 0.24 : 0.11;
        route.pulse.scale.setScalar(active ? 1.4 : 1);
      });
    };

    syncSelection(selectedRef.current);
    resize();
    window.addEventListener('resize', resize);

    const onPointerMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      pointer.set(x, y);
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes, false);
      renderer.domElement.style.cursor = intersects.length ? 'pointer' : 'default';
    };

    const onClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      pointer.set(x, y);
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes, false);
      if (intersects.length) {
        const hit = intersects[0].object;
        const matched = nodeRecords.find((entry) => entry.core === hit || entry.core.children.includes(hit));
        if (matched) {
          const nextId = matched.group.userData.id;
          syncSelection(nextId);
          onSelectRef.current?.(nextId);
        }
      }
    };

    const onLeave = () => {
      renderer.domElement.style.cursor = 'default';
    };

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('click', onClick);
    renderer.domElement.addEventListener('pointerleave', onLeave);

    sceneState.current = {
      scene,
      camera,
      renderer,
      ocean,
      ship: shipRecord.ship,
      wake: shipRecord.wake,
      haloRing,
      nodes: nodeRecords,
      routes: routeRecords,
      pointer,
      raycaster,
      syncSelection,
    };

    let frame = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      frame = window.requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      ocean.material.uniforms.time.value = elapsed;
      shipRecord.ship.position.y = 0.45 + Math.sin(elapsed * 1.05) * 0.28;
      shipRecord.ship.rotation.z = Math.sin(elapsed * 0.26) * 0.015;
      shipRecord.ship.rotation.y = Math.sin(elapsed * 0.18) * 0.028;
      shipRecord.wake.material.opacity = 0.12 + Math.sin(elapsed * 1.25) * 0.03;
      if (sceneState.current?.haloRing) {
        sceneState.current.haloRing.rotation.z = elapsed * 0.08;
        sceneState.current.haloRing.material.opacity = 0.34 + Math.sin(elapsed * 1.7) * 0.08;
      }

      camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 3.2, 0.028);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 60 + pointer.y * 2.2, 0.02);
      camera.lookAt(pointer.x * 2.3, 6.4, 0);

      routeRecords.forEach((route, index) => {
        route.pulse.scale.setScalar(1 + Math.sin(elapsed * 1.8 + index) * 0.08);
        route.pulse.position.copy(route.curve.getPointAt((elapsed * 0.075 + route.progress) % 1));
      });

      nodeRecords.forEach((node, index) => {
        const active = node.group.userData.id === selectedRef.current;
        const pulse = active ? 1 : 0.65;
        node.group.position.y = Math.sin(elapsed * 1.35 + index) * 0.22;
        node.core.rotation.y = elapsed * 0.45;
        node.halo.scale.setScalar(1 + Math.sin(elapsed * 2.1 + index * 0.7) * 0.08 + (active ? 0.1 : 0));
        node.mini.rotation.z = elapsed * 0.26;
        node.column.rotation.y = elapsed * 0.08;
        node.core.material.emissiveIntensity = pulse + Math.max(0, Math.sin(elapsed * 2 + index) * 0.12);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('click', onClick);
      renderer.domElement.removeEventListener('pointerleave', onLeave);
      host.removeChild(renderer.domElement);
      renderer.dispose();
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose?.();
        if (object.material) {
          if (Array.isArray(object.material)) object.material.forEach((mat) => mat.dispose?.());
          else object.material.dispose?.();
        }
      });
      sceneState.current = null;
    };
  }, [domains]);

  return renderMode === 'webgl' ? (
    <div className="three-shell" ref={hostRef} />
  ) : (
    <div className="three-shell fallback-shell" ref={hostRef}>
      <FallbackScene domains={domains} selectedId={selectedId} />
    </div>
  );
}
