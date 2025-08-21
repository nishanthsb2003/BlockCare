"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Stage,
  PresentationControls,
  Environment,
} from "@react-three/drei";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCw, ZoomIn, ZoomOut, RotateCcw, Home } from "lucide-react";

interface ModelProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
}

interface ModelViewerProps {
  modelPath: string;
  title?: string;
  description?: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
  width?: string;
  height?: string;
  showControls?: boolean;
  environment?: "studio" | "city" | "sunset" | "forest" | "apartment";
}

// 3D Model Component
function Model({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoRotate = false,
}: ModelProps) {
  const ref = useRef<any>(null);
  const { scene } = useGLTF(modelPath);

  useFrame((state) => {
    if (autoRotate && ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
}

// Loading Fallback Component
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-muted/20 rounded-lg">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
        <p className="text-sm text-muted-foreground">Loading 3D Model...</p>
      </div>
    </div>
  );
}

// Error Fallback Component
function ErrorFallback({ modelPath }: { modelPath: string }) {
  return (
    <div className="flex items-center justify-center w-full h-full bg-muted/20 rounded-lg">
      <div className="flex flex-col items-center gap-4 p-6 text-center">
        <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
          <span className="text-destructive text-xl">⚠️</span>
        </div>
        <div>
          <p className="font-medium text-foreground mb-1">
            Failed to load 3D model
          </p>
          <p className="text-sm text-muted-foreground">
            Could not load: {modelPath}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Supported formats: .glb, .gltf
          </p>
        </div>
      </div>
    </div>
  );
}

// Main ModelViewer Component
const ModelViewer: React.FC<ModelViewerProps> = ({
  modelPath,
  title = "3D Model Viewer",
  description = "Interactive 3D model display",
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoRotate = false,
  width = "100%",
  height = "400px",
  showControls = true,
  environment = "studio",
}) => {
  const [error, setError] = React.useState(false);
  const controlsRef = useRef<any>(null);

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const handleAutoRotateToggle = () => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = !controlsRef.current.autoRotate;
    }
  };

  return (
    <Card className="shadow-lg border-0 overflow-hidden">
      {title && (
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-xl">
            <div className="h-6 w-6 rounded bg-primary/10 flex items-center justify-center">
              <span className="text-primary text-sm">🎲</span>
            </div>
            {title}
          </CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}

      <CardContent className="p-0">
        <div className="relative" style={{ width, height }}>
          {/* Control Buttons */}
          {showControls && (
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleResetCamera}
                className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm border-0 shadow-md hover:bg-background/90"
              >
                <Home className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={handleAutoRotateToggle}
                className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm border-0 shadow-md hover:bg-background/90"
              >
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>
          )}

          {error ? (
            <ErrorFallback modelPath={modelPath} />
          ) : (
            <Canvas
              camera={{ position: [0, 0, 5], fov: 45 }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "0 0 8px 8px",
              }}
              onCreated={() => setError(false)}
              onError={() => setError(true)}
            >
              <Suspense fallback={null}>
                <Environment preset={environment} />
                <PresentationControls
                  enabled={true}
                  global={false}
                  cursor={true}
                  snap={false}
                  speed={1}
                  zoom={1}
                  rotation={[0, 0, 0]}
                  polar={[-Math.PI / 3, Math.PI / 3]}
                  azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
                >
                  <Stage
                    shadows={true}
                    adjustCamera={1.2}
                    intensity={0.5}
                    environment={environment}
                  >
                    <Model
                      modelPath={modelPath}
                      scale={scale}
                      position={position}
                      rotation={rotation}
                      autoRotate={autoRotate}
                    />
                  </Stage>
                </PresentationControls>
                <OrbitControls
                  ref={controlsRef}
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  minDistance={1}
                  maxDistance={20}
                  autoRotate={autoRotate}
                  autoRotateSpeed={1}
                />
              </Suspense>
            </Canvas>
          )}

          {/* Instructions */}
          {showControls && !error && (
            <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-md px-3 py-2 text-xs text-muted-foreground border-0 shadow-md">
              <p>
                🖱️ Drag to rotate • 🔍 Scroll to zoom • 🖐️ Right-click to pan
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Export the component and preload function
export default ModelViewer;

// Utility function to preload models
export const preloadModel = (modelPath: string) => {
  useGLTF.preload(modelPath);
};
