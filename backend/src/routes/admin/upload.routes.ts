import express, { Request, Response } from 'express'
import { authenticateToken, requireAdmin } from '../../middleware/auth.middleware'
import { upload, handleMulterError } from '../../middleware/upload.middleware'
import {
  uploadMultipleImages,
  deleteImage,
  deleteMultipleImages,
} from '../../services/upload.service'

const router = express.Router()

/**
 * POST /api/admin/upload
 * Upload single or multiple images
 * @auth Admin only
 */
router.post(
  '/',
  authenticateToken,
  requireAdmin,
  upload.array('images', 10), // Field name: 'images', max 10 files
  handleMulterError,
  async (req: Request, res: Response) => {
    try {
      const files = req.files as Express.Multer.File[]

      if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' })
      }

      // Upload to Cloudinary
      const uploadedImages = await uploadMultipleImages(files)

      res.json({
        message: `${uploadedImages.length} image(s) uploaded successfully`,
        images: uploadedImages,
      })
    } catch (error: any) {
      console.error('Upload error:', error)
      res.status(500).json({
        error: 'Failed to upload images',
        message: error.message,
      })
    }
  }
)

/**
 * DELETE /api/admin/upload/:publicId
 * Delete single image
 * @auth Admin only
 */
router.delete(
  '/:publicId',
  authenticateToken,
  requireAdmin,
  async (req: Request, res: Response) => {
    try {
      const { publicId } = req.params

      // Decode public ID (URL encoded)
      const decodedPublicId = decodeURIComponent(publicId)

      const success = await deleteImage(decodedPublicId)

      if (success) {
        res.json({ message: 'Image deleted successfully' })
      } else {
        res.status(404).json({ error: 'Image not found or already deleted' })
      }
    } catch (error: any) {
      console.error('Delete error:', error)
      res.status(500).json({
        error: 'Failed to delete image',
        message: error.message,
      })
    }
  }
)

/**
 * POST /api/admin/upload/delete-multiple
 * Delete multiple images
 * @auth Admin only
 */
router.post(
  '/delete-multiple',
  authenticateToken,
  requireAdmin,
  async (req: Request, res: Response) => {
    try {
      const { publicIds } = req.body

      if (!Array.isArray(publicIds) || publicIds.length === 0) {
        return res.status(400).json({ error: 'publicIds array is required' })
      }

      const result = await deleteMultipleImages(publicIds)

      res.json({
        message: `Deleted ${result.deleted.length} image(s)`,
        deleted: result.deleted,
        failed: result.failed,
      })
    } catch (error: any) {
      console.error('Bulk delete error:', error)
      res.status(500).json({
        error: 'Failed to delete images',
        message: error.message,
      })
    }
  }
)

export default router
