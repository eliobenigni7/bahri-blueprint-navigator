# State of the Art: 2.5D / 3D Interactive Visualizations for Next.js

## Core Library Recommendations

| Library | Nature | Strengths | Suitability for Bahri |
| --- | --- | --- | --- |
| **React Three Fiber (R3F)** | React renderer for Three.js | Mature ecosystem, declarative 3D components, seamless React integration | **Recommended** — ideal for the ship, routes, and cinematic navigation |
| **Babylon.js** | Full-featured 3D engine | Strong lighting and scene tooling | Good option, but likely overkill unless the ship model needs CAD-like fidelity |
| **PixiJS** | 2D WebGL engine | Excellent performance for 2D layers | Great for a “fake 3D” illustrated map, but less aligned with a true 3D experience |

## Recommendation

For Bahri, the strongest choice is **React Three Fiber + Three.js**. It gives the best balance between:

- React-friendly architecture
- 3D rendering flexibility
- Smooth transition and animation workflows
- Extensibility through `@react-three/drei`

If the final experience becomes more of an illustrated navigation map than a real 3D scene, PixiJS can be considered as a lighter alternative.

## Architecture Pattern for a Narrative Map

- **Camera-driven narrative:** Users click a BU → the camera lerps to a specific 3D coordinate → a UI panel slides in.
- **State management:** Use **Zustand** for current BU, ship position, zoom level, and interaction state.
- **Animation:** Use **GSAP (GreenSock)** for cinematic motion and SVG / canvas transitions.

## Technical Stack Suggestion

| Layer | Suggested Technology |
| --- | --- |
| **Framework** | Next.js (App Router) |
| **3D engine** | React Three Fiber + Three.js |
| **Helpers** | `@react-three/drei` (OrbitControls, Html anchors, scene helpers) |
| **Animation** | GSAP |
| **State** | Zustand |
| **Deployment** | Vercel |

## Practical Conclusion

**Best-fit stack for Bahri Blueprint:**

- Next.js for application structure
- R3F for the interactive 2.5D/3D scene
- GSAP for movement and transitions
- Zustand for global interaction state
- Vercel for deployment
