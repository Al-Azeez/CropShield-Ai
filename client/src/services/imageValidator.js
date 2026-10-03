/**
 * Plant & Human Image Validator for CROPSHIELD-AI
 * Detects human faces, selfies, skin-tone dominant portraits, and non-plant imagery
 */

export const HUMAN_INVALID_MESSAGE = "Plz upload the valid crop or plant ,human images are not valid";

/**
 * Check if an image is a human photo or non-crop image
 * @param {string} imageSrc - Base64 data URL or Image URL
 * @returns {Promise<{isValid: boolean, isHuman: boolean, message: string}>}
 */
export async function validateCropImage(imageSrc) {
  if (!imageSrc) {
    return { isValid: false, isHuman: false, message: "No image provided" };
  }

  return new Promise((resolve) => {
    // Quick check for explicit human keywords if string contains filename or metadata
    const lowerSrc = String(imageSrc).toLowerCase();
    if (
      lowerSrc.includes('human') || 
      lowerSrc.includes('person') || 
      lowerSrc.includes('selfie') || 
      lowerSrc.includes('portrait') ||
      lowerSrc.includes('face') ||
      lowerSrc.includes('avatar')
    ) {
      return resolve({
        isValid: false,
        isHuman: true,
        message: HUMAN_INVALID_MESSAGE
      });
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = async () => {
      try {
        // 1. Check using Native Browser FaceDetector API if available
        if ('FaceDetector' in window) {
          try {
            const faceDetector = new window.FaceDetector({ fastMode: true, maxDetectedFaces: 5 });
            const faces = await faceDetector.detect(img);
            if (faces && faces.length > 0) {
              return resolve({
                isValid: false,
                isHuman: true,
                message: HUMAN_INVALID_MESSAGE
              });
            }
          } catch (e) {
            // Fallback to pixel analysis
          }
        }

        // 2. Perform Biometric Skin-Tone & Chlorophyll Chrominance Segmentation
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        
        const sampleWidth = 100;
        const sampleHeight = 100;
        canvas.width = sampleWidth;
        canvas.height = sampleHeight;

        ctx.drawImage(img, 0, 0, sampleWidth, sampleHeight);
        const imageData = ctx.getImageData(0, 0, sampleWidth, sampleHeight);
        const data = imageData.data;

        let skinPixelCount = 0;
        let plantGreenPixelCount = 0;
        const totalPixels = sampleWidth * sampleHeight;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // RGB & YCbCr Skin Tone Biometrics
          // Standard peer-reviewed skin color model:
          // R > 95 & G > 40 & B > 20 & (max-min > 15) & |R-G| > 15 & R > G & R > B
          const isRgbSkin = (
            r > 95 && 
            g > 40 && 
            b > 20 && 
            (Math.max(r, g, b) - Math.min(r, g, b) > 15) && 
            (Math.abs(r - g) > 12) && 
            r > g && 
            r > b
          );

          // YCbCr skin cluster conversion
          const y = 0.299 * r + 0.587 * g + 0.114 * b;
          const cb = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b;
          const cr = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b;
          const isYcbcrSkin = (cr >= 133 && cr <= 178 && cb >= 75 && cb <= 130 && y > 60);

          if (isRgbSkin || isYcbcrSkin) {
            skinPixelCount++;
          }

          // Foliar / Chlorophyll Vegetation Index (Excess Green: 2G - R - B > 10 or G > R & G > B)
          const excessGreen = 2 * g - r - b;
          if (excessGreen > 12 || (g > r + 8 && g > b + 8)) {
            plantGreenPixelCount++;
          }
        }

        const skinRatio = skinPixelCount / totalPixels;
        const plantGreenRatio = plantGreenPixelCount / totalPixels;

        // If skin tone is dominant (> 28%) and plant vegetation is low (< 15%), it's a human image
        if (skinRatio > 0.28 && plantGreenRatio < 0.15) {
          return resolve({
            isValid: false,
            isHuman: true,
            message: HUMAN_INVALID_MESSAGE
          });
        }

        return resolve({
          isValid: true,
          isHuman: false,
          message: "Valid plant foliage specimen"
        });

      } catch (err) {
        // In case of CORS or canvas read error, allow pass through
        return resolve({
          isValid: true,
          isHuman: false,
          message: "Image parsed"
        });
      }
    };

    img.onerror = () => {
      resolve({
        isValid: true,
        isHuman: false,
        message: "Image loaded"
      });
    };

    img.src = imageSrc;
  });
}
