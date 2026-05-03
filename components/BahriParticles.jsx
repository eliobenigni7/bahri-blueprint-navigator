import * as THREE from 'three';

/**
 * Creates an ocean spray particle system around the ship.
 * Returns { points, update(elapsed, shipY) } for per-frame animation.
 */
export function createSprayParticles(scene) {
  const count = 300;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3); // stored separately for animation
  const lifetimes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    resetParticle(positions, velocities, lifetimes, i);
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const texture = makeSprayTexture();
  const material = new THREE.PointsMaterial({
    map: texture,
    size: 0.35,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
    opacity: 0.7,
    color: '#a8e8ff',
  });

  const points = new THREE.Points(geometry, material);
  points.name = 'spray';
  scene.add(points);

  return {
    points,
    positions,
    velocities,
    lifetimes,
    update(elapsed, shipY) {
      const pos = points.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        lifetimes[i] -= 0.016;
        // move particle
        pos[idx] += velocities[idx] * 0.016;
        pos[idx + 1] += velocities[idx + 1] * 0.016;
        pos[idx + 2] += velocities[idx + 2] * 0.016;
        // gravity / slow down
        velocities[idx + 1] -= 0.6 * 0.016;
        velocities[idx] *= 0.995;
        velocities[idx + 2] *= 0.995;
        // fade & reset
        if (lifetimes[i] <= 0 || pos[idx + 1] < -4 + shipY) {
          resetParticle(pos, velocities, lifetimes, i, shipY);
        }
      }
      points.geometry.attributes.position.needsUpdate = true;
    },
  };
}

function resetParticle(positions, velocities, lifetimes, i, shipY = 0) {
  const idx = i * 3;
  const angle = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 16;
  positions[idx] = Math.cos(angle) * radius;
  positions[idx + 1] = -1.2 + shipY + Math.random() * 2.5;
  positions[idx + 2] = Math.sin(angle) * radius;
  velocities[idx] = (Math.random() - 0.5) * 3.5;
  velocities[idx + 1] = 1.2 + Math.random() * 4.5;
  velocities[idx + 2] = (Math.random() - 0.5) * 3.5;
  lifetimes[i] = 0.8 + Math.random() * 2.5;
}

function makeSprayTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, 'rgba(200, 240, 255, 0.9)');
  gradient.addColorStop(0.25, 'rgba(160, 220, 255, 0.5)');
  gradient.addColorStop(0.6, 'rgba(80, 180, 240, 0.08)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Creates a starfield background sphere.
 */
export function createStarfield(scene) {
  const count = 800;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = 140 + Math.random() * 60;
    positions[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
    positions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * radius * 0.4; // flatten
    positions[i * 3 + 2] = Math.cos(phi) * radius;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    size: 0.45,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    transparent: true,
    opacity: 0.5,
    color: '#d4f0ff',
  });

  const stars = new THREE.Points(geometry, material);
  stars.name = 'starfield';
  scene.add(stars);

  return {
    stars,
    update(elapsed) {
      stars.rotation.y = elapsed * 0.015;
      stars.rotation.x = elapsed * 0.005;
      stars.material.opacity = 0.35 + Math.sin(elapsed * 0.3) * 0.08;
    },
  };
}

/**
 * Adds cargo containers to the ship deck for realism.
 */
export function addShipDetails(shipGroup) {
  // Cargo containers on deck
  const containerColors = ['#d63b1f', '#1a6fb5', '#d88b2c', '#2c8c4a', '#c4a43e', '#5c7a99'];
  const containerGeo = new THREE.BoxGeometry(1.2, 0.9, 2.4);

  for (let stack = 0; stack < 3; stack++) {
    for (let col = 0; col < 4; col++) {
      const color = containerColors[(stack * 4 + col) % containerColors.length];
      const mat = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.6,
        metalness: 0.2,
        emissive: color,
        emissiveIntensity: 0.05,
      });
      const container = new THREE.Mesh(containerGeo, mat);
      container.position.set(
        -6 + col * 1.4,
        5.5 + stack * 1.0,
        1.2,
      );
      container.castShadow = true;
      shipGroup.add(container);

      // second row
      const container2 = new THREE.Mesh(containerGeo, mat);
      container2.position.set(
        -6 + col * 1.4,
        5.5 + stack * 1.0,
        -1.2,
      );
      shipGroup.add(container2);
    }
  }

  // Portholes / oblò on hull
  const portholeGeo = new THREE.CircleGeometry(0.18, 12);
  const portholeMatGlow = new THREE.MeshBasicMaterial({
    color: '#ffeac2',
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  for (let i = 0; i < 10; i++) {
    const porthole = new THREE.Mesh(portholeGeo, portholeMatGlow);
    porthole.position.set(-8 + i * 2.2, 3.0, 4.26);
    shipGroup.add(porthole);
    const porthole2 = new THREE.Mesh(portholeGeo, portholeMatGlow);
    porthole2.position.set(-8 + i * 2.2, 3.0, -4.26);
    shipGroup.add(porthole2);
  }

  // Radar / antenna on bridge
  const radarBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.18, 1.8, 8),
    new THREE.MeshStandardMaterial({ color: '#8a9baa', roughness: 0.3, metalness: 0.7 })
  );
  radarBase.position.set(7.0, 9.4, 0);
  shipGroup.add(radarBase);

  const radarDish = new THREE.Mesh(
    new THREE.SphereGeometry(0.35, 8, 8),
    new THREE.MeshStandardMaterial({ color: '#ff4444', emissive: '#ff2222', emissiveIntensity: 0.8 })
  );
  radarDish.position.set(7.0, 10.4, 0);
  radarDish.name = 'radar';
  shipGroup.add(radarDish);
}
