/** Client-side photo handling: read GPS (if any) from the original, then re-encode a smaller JPEG without metadata. */
export const MAX_EDGE = 1600
export const MAX_INPUT_MB = 25

export async function readGps(file: File): Promise<{ lat: number; lng: number } | null> {
  try {
    const exifr = (await import('exifr')).default
    const gps = await exifr.gps(file)
    if (gps && Number.isFinite(gps.latitude) && Number.isFinite(gps.longitude)) {
      return { lat: gps.latitude, lng: gps.longitude }
    }
  } catch {
    /* no EXIF data: fine */
  }
  return null
}

/** Resizes to MAX_EDGE and exports JPEG. Canvas export drops all EXIF/GPS data. */
export async function processPhoto(file: File): Promise<Blob> {
  if (!/^image\/(jpeg|png|webp|heic|heif)$/i.test(file.type) && !/\.(jpe?g|png|webp|heic|heif)$/i.test(file.name)) {
    throw new Error('Please choose a JPG, PNG, or WebP photo.')
  }
  if (file.size > MAX_INPUT_MB * 1024 * 1024) throw new Error(`That photo is over ${MAX_INPUT_MB} MB.`)
  let bitmap: ImageBitmap
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  } catch {
    throw new Error('This browser could not read that photo. Try a JPG or PNG.')
  }
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height))
  const w = Math.max(1, Math.round(bitmap.width * scale))
  const h = Math.max(1, Math.round(bitmap.height * scale))
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Could not process the photo.')
  ctx.drawImage(bitmap, 0, 0, w, h)
  bitmap.close()
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, 'image/jpeg', 0.82))
  if (!blob) throw new Error('Could not process the photo.')
  if (blob.size > 5 * 1024 * 1024) throw new Error('That photo is still too large after resizing.')
  return blob
}
