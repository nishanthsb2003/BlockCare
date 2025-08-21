# 3D Models Directory

This directory contains 3D models for the BlockCare application.

## Supported Formats

- `.glb` (binary glTF) - Recommended
- `.gltf` (glTF with separate files)

## File Organization

- `medical/` - Medical anatomy models (heart, brain, organs)
- `devices/` - Medical devices and equipment
- `molecules/` - Molecular and chemical structures
- `misc/` - Other 3D models

## Model Requirements

- Optimized for web (< 10MB per model recommended)
- Include embedded textures when possible
- Proper scaling (1 unit = 1 meter in most cases)
- Clean geometry and materials

## Example Models

To get started, you can download free medical 3D models from:

- Sketchfab (search for CC licensed medical models)
- NIH 3D Print Exchange
- Open source medical model repositories

## Usage

Place your models in this directory and reference them in the ModelViewer component:

```tsx
<ModelViewer
  modelPath="/models/medical/heart.glb"
  title="Human Heart"
  scale={1.5}
  autoRotate={true}
/>
```
