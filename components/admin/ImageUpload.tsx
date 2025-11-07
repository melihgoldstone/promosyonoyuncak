'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { X, Upload, Image as ImageIcon, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface UploadedImage {
  url: string
  publicId: string
  width: number
  height: number
  format: string
  size: number
}

interface ImageUploadProps {
  value?: string[] // Array of image URLs
  onChange: (urls: string[]) => void
  maxFiles?: number
  disabled?: boolean
}

export default function ImageUpload({
  value = [],
  onChange,
  maxFiles = 10,
  disabled = false,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (disabled) return

      // Check max files limit
      if (value.length + acceptedFiles.length > maxFiles) {
        setError(`Maximum ${maxFiles} images allowed`)
        setTimeout(() => setError(null), 3000)
        return
      }

      setUploading(true)
      setError(null)
      setUploadProgress(0)

      try {
        // Create FormData
        const formData = new FormData()
        acceptedFiles.forEach((file) => {
          formData.append('images', file)
        })

        // Upload to backend
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / (progressEvent.total || 1)
              )
              setUploadProgress(percentCompleted)
            },
          }
        )

        // Extract URLs from response
        const uploadedImages: UploadedImage[] = response.data.images
        const newUrls = uploadedImages.map((img) => img.url)

        // Update parent component
        onChange([...value, ...newUrls])
      } catch (err: any) {
        console.error('Upload error:', err)
        setError(err.response?.data?.error || 'Failed to upload images')
        setTimeout(() => setError(null), 5000)
      } finally {
        setUploading(false)
        setUploadProgress(0)
      }
    },
    [value, onChange, maxFiles, disabled]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    disabled: disabled || uploading,
    multiple: true,
  })

  const removeImage = (indexToRemove: number) => {
    if (disabled) return
    const newUrls = value.filter((_, index) => index !== indexToRemove)
    onChange(newUrls)
  }

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`
          relative rounded-xl border-2 border-dashed transition-all duration-200
          ${
            isDragActive
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
              : 'border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50'
          }
          ${disabled || uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-blue-400'}
          ${error ? 'border-red-500' : ''}
        `}
      >
        <input {...getInputProps()} />

        <div className="p-8 text-center">
          {uploading ? (
            <>
              <Loader2 className="w-12 h-12 mx-auto mb-4 text-blue-500 animate-spin" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Uploading... {uploadProgress}%
              </p>
              <div className="mt-3 w-full max-w-xs mx-auto bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </>
          ) : (
            <>
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {isDragActive
                  ? 'Drop images here...'
                  : 'Drag & drop images here, or click to select'}
              </p>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                PNG, JPG, WebP, GIF up to 5MB ({value.length}/{maxFiles} uploaded)
              </p>
            </>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {/* Uploaded Images Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {value.map((url, index) => (
            <div
              key={index}
              className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800"
            >
              <Image
                src={url}
                alt={`Upload ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
              />

              {/* Delete Button */}
              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Image Index Badge */}
              <div className="absolute bottom-2 left-2 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm">
                <p className="text-xs text-white font-medium">{index + 1}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {value.length === 0 && !uploading && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <ImageIcon className="w-16 h-16 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No images uploaded yet</p>
        </div>
      )}
    </div>
  )
}
