import { v2 as cloudinary } from 'cloudinary'

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Use HTTPS
})

// Validate configuration
const validateConfig = () => {
  const { cloud_name, api_key, api_secret } = cloudinary.config()

  if (!cloud_name || !api_key || !api_secret) {
    console.warn('⚠️  Cloudinary credentials not configured. Image upload will fail.')
    console.warn('Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env')
  } else {
    console.log('✅ Cloudinary configured successfully')
  }
}

validateConfig()

export default cloudinary
