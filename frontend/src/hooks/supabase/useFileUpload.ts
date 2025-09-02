"use client";

import { useState } from 'react';
import { storageService, documentService } from '@/lib/supabase';

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Upload a file to Supabase Storage and save metadata to the database
  const uploadFile = async (
    patientId: string,
    file: File,
    metadata: Record<string, any> = {}
  ) => {
    try {
      setIsUploading(true);
      setProgress(0);
      setError(null);

      // Initialize buckets if needed
      await storageService.initializeBuckets();

      // Simulated progress updates (actual progress tracking not available in Supabase JS client)
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 10;
          return newProgress >= 90 ? 90 : newProgress;
        });
      }, 300);

      // Upload file to storage
      const uploadedFile = await storageService.uploadFile(patientId, file, {
        contentType: file.type,
      });

      if (!uploadedFile) {
        throw new Error('File upload failed');
      }

      // Create document record in database
      const documentData = {
        patient_id: patientId,
        name: file.name,
        size: file.size,
        type: file.type,
        path: uploadedFile.path,
        metadata: metadata,
      };

      const createdDocument = await documentService.createDocument(documentData);

      // Complete progress
      clearInterval(progressInterval);
      setProgress(100);

      return {
        success: true,
        document: createdDocument,
        file: uploadedFile,
      };
    } catch (err: any) {
      setError(err.message || 'Failed to upload file');
      return { success: false, error: err };
    } finally {
      setIsUploading(false);
    }
  };

  // Get a download URL for a file
  const getFileUrl = async (path: string) => {
    try {
      return await storageService.getFileUrl(path);
    } catch (err: any) {
      setError(err.message || 'Failed to get file URL');
      throw err;
    }
  };

  // Delete a file and its database record
  const deleteFile = async (documentId: string, filePath: string) => {
    try {
      setError(null);
      
      // Delete from storage
      await storageService.deleteFile(filePath);
      
      // Delete metadata from database
      await documentService.deleteDocument(documentId);
      
      return { success: true };
    } catch (err: any) {
      setError(err.message || 'Failed to delete file');
      return { success: false, error: err };
    }
  };

  return {
    uploadFile,
    getFileUrl,
    deleteFile,
    isUploading,
    progress,
    error,
  };
}
