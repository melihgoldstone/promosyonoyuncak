import cloudinary from '../config/cloudinary'
import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'

interface UploadResult {
  url: string
  publicId: string
  width: number
  height: number
  format: string
  size: number
}

/**
 * Upload image to Cloudinary with optimization
 */
export const uploadImage = async (
  file: Express.Multer.File,
  folder: string = 'promosyonoyuncak'
): Promise<UploadResult> => {
  try {
    // Optimize image with sharp
    const optimized = await sharp(file.buffer)
      .resize(1920, 1920, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 85 }) // Convert to WebP for better compression
      .toBuffer()

    // Get metadata
    const metadata = await sharp(optimized).metadata()

    // Generate unique filename
    const filename = `${Date.now()}-${uuidv4()}`

    // Upload to Cloudinary
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          public_id: filename,
          resource_type: 'image',
          format: 'webp',
          transformation: [
            { quality: 'auto:good' },
            { fetch_format: 'auto' },
          ],
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error)
            reject(new Error('Failed to upload image to Cloudinary'))
          } else if (result) {
            resolve({
              url: result.secure_url,
              publicId: result.public_id,
              width: result.width,
              height: result.height,
              format: result.format,
              size: result.bytes,
            })
          }
        }
      )

      uploadStream.end(optimized)
    })
  } catch (error) {
    console.error('Image processing error:', error)
    throw new Error('Failed to process image')
  }
}

/**
 * Upload multiple images
 */
export const uploadMultipleImages = async (
  files: Express.Multer.File[],
  folder: string = 'promosyonoyuncak'
): Promise<UploadResult[]> => {
  const uploadPromises = files.map((file) => uploadImage(file, folder))
  return Promise.all(uploadPromises)
}

/**
 * Delete image from Cloudinary
 */
export const deleteImage = async (publicId: string): Promise<boolean> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    return result.result === 'ok'
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    throw new Error('Failed to delete image from Cloudinary')
  }
}

/**
 * Delete multiple images
 */
export const deleteMultipleImages = async (
  publicIds: string[]
): Promise<{ deleted: string[]; failed: string[] }> => {
  const results = await Promise.allSettled(
    publicIds.map((id) => deleteImage(id))
  )

  const deleted: string[] = []
  const failed: string[] = []

  results.forEach((result, index) => {
    if (result.status === 'fulfilled' && result.value) {
      deleted.push(publicIds[index])
    } else {
      failed.push(publicIds[index])
    }
  })

  return { deleted, failed }
}

/**
 * Generate thumbnail URL from Cloudinary public ID
 */
export const getThumbnailUrl = (
  publicId: string,
  width: number = 200,
  height: number = 200
): string => {
  return cloudinary.url(publicId, {
    width,
    height,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto:good',
    fetch_format: 'auto',
  })
}
