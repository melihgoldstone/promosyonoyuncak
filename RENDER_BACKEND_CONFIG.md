# Render Backend Ayarları

## 🔧 Render Dashboard'da Bu Ayarları Kullanın:

### General:
- **Name:** promosyonoyuncak-backend
- **Region:** Frankfurt (ya da database ile aynı)
- **Branch:** main
- **Root Directory:** `backend`

### Build & Deploy:
- **Runtime:** Node
- **Build Command:** 
  ```
  npm install && npm run build && npx prisma generate && npx prisma migrate deploy
  ```

- **Start Command:**
  ```
  npm start
  ```

### Environment Variables:
```env
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://promosyonoyuncak_user:fkCOEQU7huZQ9fyfr3nLe6vyMSNDpblY@dpg-d46blbuuk2gs73d2grs0-a/promosyonoyuncak
JWT_SECRET=<güçlü-random-key>
JWT_EXPIRES_IN=30d
FRONTEND_URL=http://localhost:3000
```

### Plan:
- Free ($0/month) - 15dk sonra uyur, ilk istek yavaş
- Starter ($7/month) - 7/24 aktif, hızlı

## 🔄 Ayarları Değiştirdikten Sonra:
1. **"Manual Deploy"** → Deploy latest commit
2. Build log'larını izleyin
3. Başarılı olursa: https://promosyonoyuncak.onrender.com/health test edin
