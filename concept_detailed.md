# Bahri Blueprint Interactive Journey

## Executive Summary

The goal is to transform the static Enterprise Architecture blueprint for Bahri into a 2.5D interactive nautical experience. Instead of slides, stakeholders *navigate* the organization’s state using a ship as the central anchor and routes as business unit (BU) pathways.

## Core Metaphor Mapping

| Business Element | Visual Metaphor | Interaction Type |
| --- | --- | --- |
| **Corporate/Core** | The Mother Ship (Central Hub) | Constant anchor, starting point |
| **Business Units (BU)** | Nautical routes (glowing lines) | Path to follow, color-coded by maturity |
| **Findings / Gaps** | Waypoints / ports of call | Clickable nodes, detail pop-ups |
| **Target State** | Destination horizon | Final point of each route |
| **KPIs / Metrics** | Ship’s log / navigation panel | Side-panel data visualization |

## High-Level System Architecture

- **Frontend framework:** Next.js 14+ (App Router)
- **Visual engine:** React Three Fiber (Three.js)
- **Camera:** Orthographic, for a 2.5D isometric view
- **Animation:** GSAP (GreenSock) for cinematic transitions
- **State management:** Zustand for coordinates, active route, and zoom level

## Detailed User Journey & Micro-Interactions

### 1. Global Horizon (Macro View)

- **Entry state:** The camera is positioned high and isometric; the ship sits in the center.
- **Visual cues:** Routes appear as faint, pulsing lines of light.
- **Interaction:**
  - Hovering over a route triggers a glow effect and reveals a label: `[BU Name] - Current Maturity: [X%]`
  - Dragging the map creates a smooth parallax effect

### 2. Sailing Transition (BU Deep-Dive)

- **Action:** Clicking a route begins the *Sailing Sequence*.
- **Camera movement:** GSAP-powered `lerp` transition. The camera dives from the global view to a follow-cam perspective, gliding along the route line.
- **Atmospheric effect:** The ocean background shifts speed to simulate movement.
- **UI entrance:** As the camera progresses, waypoints (finding nodes) emerge from the water with a ripple animation.

### 3. Docking (Data Interface)

- **Action:** Clicking a waypoint node.
- **Transition:** The camera decelerates and centers on the node.
- **Interface:** A slide-in glass-morphism panel appears on the right side.
- **Content layout:**
  - **Header:** Title of the finding/gap
  - **Visual:** Embedded dynamic chart (R3F-based or SVG)
  - **Narrative:** A “log entry” style text describing the discovery
  - **Footer:** Transition buttons to *Next Waypoint* or *Return to Ship*

## Enterprise Architecture → Visual Mapping

This section defines how the blueprint data is translated into visual elements.

### Waypoint Semantics (Nodes)

The visual state of a waypoint is determined by the health of that blueprint node:

- **Green Beacon (Optimized):** High maturity, no gaps. Visual: steady white-green light.
- **Yellow Beacon (Warning):** Moderate maturity, minor gaps. Visual: pulsing amber light.
- **Red Beacon (Critical):** Low maturity, critical gap. Visual: rapidly blinking red light.
- **Anchor (Target):** The final state. Visual: a heavy golden anchor.

### Route Color-Coding (Paths)

Routes change color based on the overall BU health score:

- **80–100%:** Teal / cyan line (stable)
- **50–79%:** Orange line (improving)
- **Below 50%:** Red line (at risk)

### Data Payload per Node

Each node click triggers a payload retrieval from the JSON source:

- `node_id`: Unique identifier
- `category`: Process, Technology, People, Governance
- `current_state`: Description of the *As-Is* state
- `target_state`: Description of the *To-Be* state
- `gap_analysis`: Narrative of the delta
- `kpi_metrics`: Array of objects such as `{ label, value, trend }`

## Technical Implementation & Performance Strategy

### Render Pipeline

- **Canvas layer (CSS/HTML):** High-fidelity UI, text, and inputs
- **WebGL layer (R3F):** Ship, routes, and the 3D sea

### Optimization

- **LOD (Level of Detail):** Use simpler geometries for the ship in Global View and high-poly models when docked.
- **Instanced mesh:** Use `InstancedMesh` for water ripples and wavelets to maintain 60fps.
- **Texture compression:** Use Basis Universal or KTX2 textures for the nautical map to improve initial load time.

### State Management Flow

1. **Zustand store:** Holds `activeBU`, `activeNode`, `cameraPosition`, `isSailing`
2. **GSAP timeline:** On `activeBU` change → trigger `camera.moveTo(target_coords)`
3. **React effect:** When `activeNode` is set → trigger side-panel animation

### Interaction Layer

- **Raycasting:** Use R3F’s built-in raycaster to detect clicks on 3D routes and waypoints.
- **Responsive design:** Camera angle shifts automatically based on viewport width so the isometric feel stays consistent across screens.

## Edge Cases & User Experience Safeguards

- **Lost user:** If a user scrolls too far away from the ship/routes, a *Return to Center* button appears and smoothly zooms back to Global Horizon.
- **Data loading:** Show a *Loading the Chart...* overlay with a nautical compass animation while assets and JSON payloads are fetched.
- **Accessibility:** Provide high-contrast route colors and screen-reader support for narrative text in side panels.

## Implementation Roadmap

### Phase 1 — Static Sea (MVP)

- Basic 3D scene with an isometric camera
- Static ship model and basic route lines
- Basic side panel based on clicks

### Phase 2 — Living Ocean (Refinement)

- GSAP cinematic camera movement
- Sailing transition
- Dynamic route coloring based on maturity

### Phase 3 — Professional Chart (Final)

- High-fidelity models with LOD
- Advanced data visualizations inside panels
- Final polish of textures and atmospheric effects
