# State of the Art: 2.5D/3D Interactive Visualizations for Next.js

## Core Library Recommendations

### 1. React Three Fiber (R3F) - Recommended
- **Nature:** A React renderer for Three.js.
- **Why:** It is the most mature ecosystem for Next.js. It allows treating 3D objects as declarative React components.
- **Suitability for Bahri:** Perfect. You can use `drei` (a helper library) for complex controls, environment maps (sea/sky), and smooth transitions.
- **2.5D Approach:** Use an Orthographic Camera or a fixed-angle Perspective Camera to achieve the 2.5D "isometric" look.

### 2. Babylon.js
- **Nature:** Full-featured 3D engine.
- **Why:** Better built-in tools for professional lighting and huge scenes.
- **Suitability:** High, but overkill unless the ship model needs extreme fidelity (CAD-like). Integration with React is less "native" than R3F.

### 3. PixiJS
- **Nature:** 2D WebGL engine.
- **Why:** Unbeatable performance for 2D layers.
- **Suitability:** Excellent for 2.5D "Fake 3D" (sprites with depth sorting). If the vision is more "illustrated map" than "3D world", PixiJS is faster and easier.

## Architecture Pattern for "Narrative Map"
- **The Camera-Driven Narrative:** Instead of traditional navigation, the experience is a "Guided Tour". Users click a BU $ightarrow$ Camera lerps (linearly interpolates) to a specific 3D coordinate $ightarrow$ UI panel slides in.
- **State Management:** Use **Zustand**. It's lightweight and handles the global state (Current BU, Ship Position, Zoom Level) without the overhead of Redux.
- **Animation:** **GSAP (GreenSock)** is the standard for high-end cinematic movements and SVG/Canvas animations.

## Technical Stack Suggestion
- **Framework:** Next.js (App Router)
- **3D Engine:** React Three Fiber + Three.js
- **Helpers:** @react-three/drei (for OrbitControls, Html anchors)
- **Animation:** GSAP
- **State:** Zustand
- **Deployment:** Vercel (for seamless Next.js integration)
