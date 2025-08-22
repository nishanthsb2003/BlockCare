"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  Camera,
  Upload,
  X,
  FileText,
  Image as ImageIcon,
  FileIcon,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface UploadComponentProps {
  onFileSelect: (file: File) => void;
  onUpload?: (file: File) => void;
  acceptedTypes?: string[];
  maxSize?: number; // in MB
  showCamera?: boolean;
  showDragDrop?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface UploadedFile extends File {
  preview?: string;
}

const UploadComponent: React.FC<UploadComponentProps> = ({
  onFileSelect,
  onUpload,
  acceptedTypes = [".pdf", ".jpg", ".jpeg", ".png"],
  maxSize = 10,
  showCamera = true,
  showDragDrop = true,
  className,
  children,
}) => {
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [error, setError] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // File validation
  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }

    // Check file type
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      return `File type not supported. Accepted types: ${acceptedTypes.join(
        ", "
      )}`;
    }

    return null;
  };

  // Handle file selection
  const handleFileSelect = useCallback(
    (file: File) => {
      const validation = validateFile(file);
      if (validation) {
        setError(validation);
        return;
      }

      setError("");
      const fileWithPreview = Object.assign(file, {
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
      });

      setSelectedFile(fileWithPreview);
      onFileSelect(file);
    },
    [onFileSelect, acceptedTypes, maxSize]
  );

  // Handle drag and drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect]
  );

  // Handle file input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: 1920, height: 1080 },
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOpen(true);
      setError("");
    } catch (err) {
      setError("Unable to access camera. Please check permissions.");
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  // Capture photo
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
            const file = new File([blob], `camera-capture-${timestamp}.jpg`, {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            handleFileSelect(file);
            stopCamera();
          }
        },
        "image/jpeg",
        0.9
      );
    }
  };

  // Handle upload
  const handleUpload = async () => {
    if (!selectedFile || !onUpload) return;

    setIsUploading(true);
    try {
      await onUpload(selectedFile);
    } catch (err) {
      setError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Remove selected file
  const removeFile = () => {
    if (selectedFile?.preview) {
      URL.revokeObjectURL(selectedFile.preview);
    }
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Get file icon
  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) return ImageIcon;
    if (fileType.includes("pdf")) return FileText;
    return FileIcon;
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Card
      className={cn(
        "border-border shadow-lg bg-card/50 backdrop-blur-sm",
        className
      )}
    >
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Camera Modal */}
          {isCameraOpen && (
            <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-card rounded-lg shadow-xl max-w-2xl w-full">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Take a Photo</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={stopCamera}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-4">
                  <div className="relative bg-black rounded-lg overflow-hidden">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="flex justify-center space-x-4 mt-4">
                    <Button
                      onClick={capturePhoto}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Capture Photo
                    </Button>
                    <Button variant="outline" onClick={stopCamera}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hidden canvas for photo capture */}
          <canvas ref={canvasRef} style={{ display: "none" }} />

          {/* Error Display */}
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Selected File Display */}
          {selectedFile && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {selectedFile.preview ? (
                      <img
                        src={selectedFile.preview}
                        alt="Preview"
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        {React.createElement(getFileIcon(selectedFile.type), {
                          className: "h-6 w-6 text-primary",
                        })}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-200">
                      {selectedFile.name}
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      {formatFileSize(selectedFile.size)} • Ready to upload
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Upload Area */}
          {!selectedFile && (
            <div
              className={cn(
                "relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200",
                isDragOver
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/60 hover:bg-accent/20",
                showDragDrop ? "cursor-pointer" : ""
              )}
              onDragOver={showDragDrop ? handleDragOver : undefined}
              onDragLeave={showDragDrop ? handleDragLeave : undefined}
              onDrop={showDragDrop ? handleDrop : undefined}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={acceptedTypes.join(",")}
                onChange={handleInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Upload className="h-8 w-8 text-primary" />
                </div>

                <div>
                  <h3 className="text-lg font-medium text-foreground">
                    {showDragDrop
                      ? "Drop your file here or click to browse"
                      : "Click to browse files"}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Supports {acceptedTypes.join(", ")} files up to {maxSize}MB
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="font-semibold"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Browse Files
                  </Button>

                  {showCamera && (
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="font-semibold"
                      onClick={(e) => {
                        e.stopPropagation();
                        startCamera();
                      }}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Take Photo
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Upload Button */}
          {selectedFile && onUpload && (
            <div className="flex justify-center">
              <Button
                onClick={handleUpload}
                disabled={isUploading}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-8"
                size="lg"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Now
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Custom children content */}
          {children}
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadComponent;
