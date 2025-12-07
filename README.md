# Three.js Galaxy Visualization

A beautiful 3D particle galaxy visualization built with Three.js, featuring 100,000 particles arranged in a spiral pattern with dynamic color gradients.

![Galaxy Visualization](https://img.shields.io/badge/Three.js-r128-blue)

## Features

- **100,000 Particles**: High-density particle system creating a detailed galaxy effect
- **Spiral Galaxy Pattern**: Particles arranged in a three-arm spiral structure
- **Color Gradient**: Smooth transition from warm orange-red (#ff6030) at the center to cool blue (#0077ff) at the edges
- **Interactive Camera**: Orbit controls with damping for smooth, intuitive navigation
- **Responsive Design**: Automatically adapts to window resizing
- **Additive Blending**: Creates a glowing, luminous effect for particles

## Installation

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <your-repo-name>
```

2. Install dependencies:
```bash
npm install three
```

3. Ensure you have a basic HTML file with a canvas element:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Galaxy Visualization</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        body {
            overflow: hidden;
        }
        canvas.webgl {
            position: fixed;
            top: 0;
            left: 0;
        }
    </style>
</head>
<body>
    <canvas class="webgl"></canvas>
    <script type="module" src="./main.js"></script>
</body>
</html>
```

4. Run your development server (using Vite, Webpack, or similar)

## Usage

The visualization will automatically initialize when the page loads. Use your mouse to interact:

- **Left Click + Drag**: Rotate the camera around the galaxy
- **Right Click + Drag**: Pan the camera
- **Scroll Wheel**: Zoom in and out

## Configuration

You can customize the galaxy by modifying the `parameters` object and color values:

```javascript
const parameters = {
    count: 100000,  // Number of particles
}

const insideColor1 = '#ff6030'  // Center color (warm orange-red)
const outsideColor1 = '#0077ff'  // Edge color (cool blue)
```

### Material Properties

Adjust the particle appearance in the `PointsMaterial`:

```javascript
const material = new THREE.PointsMaterial({
    size: 0.01,              // Particle size
    sizeAttenuation: true,   // Size decreases with distance
    depthWrite: false,       // Prevents depth buffer issues
    blending: THREE.AdditiveBlending,  // Creates glow effect
    vertexColors: true       // Enables per-particle coloring
})
```

## Technical Details

### Galaxy Generation Algorithm

The particles are positioned using a combination of:

1. **Spiral Pattern**: Three-arm spiral calculated using trigonometric functions
2. **Radial Distribution**: Particles spread from 0 to 5 units from the center
3. **Random Offsets**: 
   - X and Z axes: ±0.25 × radius with cubic distribution
   - Y axis: Logarithmic distribution for vertical spread

### Color Interpolation

Colors are interpolated based on distance from the galaxy center using Three.js's `lerp()` method, creating a smooth gradient from warm to cool colors.

### Performance Optimizations

- **BufferGeometry**: Efficient geometry representation for large particle counts
- **Additive Blending**: Creates visual depth without performance overhead
- **Pixel Ratio Capping**: Limited to 2x for optimal performance on high-DPI displays

## Browser Support

Works in all modern browsers that support WebGL:
- Chrome/Edge (v90+)
- Firefox (v88+)
- Safari (v14+)

## Dependencies

- [Three.js](https://threejs.org/) (r128 or compatible)
  - `OrbitControls` from three/examples/jsm/controls

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

Built with [Three.js](https://threejs.org/), the excellent 3D library for JavaScript.

---

**Note**: For production use, consider implementing additional optimizations such as Level of Detail (LOD) systems or particle instancing for even better performance.
