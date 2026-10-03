import React, { useRef, useState, useEffect } from 'react';
import { Camera, RefreshCw, X, AlertCircle, Sparkles, Check, RotateCcw, Upload, AlertTriangle } from 'lucide-react';
import { useScan } from '../context/ScanContext.jsx';
import { validateCropImage, HUMAN_INVALID_MESSAGE } from '../services/imageValidator.js';

export const CameraCaptureModal = ({ isOpen, onClose, onCapture }) => {
  const { t } = useScan();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState('');
  const [facingMode, setFacingMode] = useState('environment'); // Prefer back camera for crops
  const [capturedSnapshot, setCapturedSnapshot] = useState(null);
  const [isHumanDetected, setIsHumanDetected] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [isFlashing, setIsFlashing] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setCapturedSnapshot(null);
      setIsHumanDetected(false);
      setValidationError('');
      setIsCameraReady(false);
      return;
    }

    setCapturedSnapshot(null);
    setIsHumanDetected(false);
    setValidationError('');
    startCamera();

    return () => {
      stopCamera();
    };
  }, [isOpen, facingMode]);

  const startCamera = async () => {
    setCameraError('');
    setIsCameraReady(false);
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }

      const constraints = {
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1920, min: 640 },
          height: { ideal: 1080, min: 480 }
        },
        audio: false
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch(e => console.warn('Autoplay prevented:', e));
          setIsCameraReady(true);
        };
      }
    } catch (err) {
      console.error('Camera access error:', err);
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        setStream(fallbackStream);
        if (videoRef.current) {
          videoRef.current.srcObject = fallbackStream;
          videoRef.current.play().catch(() => {});
          setIsCameraReady(true);
        }
      } catch (fallbackErr) {
        setCameraError(t('camera.errorMsg', 'Unable to access camera. Please check camera permissions or try uploading a saved photo.'));
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const toggleCameraFacing = () => {
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
  };

  // Snapshot capture handler
  const handleTakeSnapshot = async () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;

    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);

    try {
      const imageBase64 = canvas.toDataURL('image/jpeg', 0.94);

      // Trigger visual shutter flash
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 200);

      setCapturedSnapshot(imageBase64);
      setIsValidating(true);

      // Validate if captured photo is a human or non-crop image
      const validation = await validateCropImage(imageBase64);
      setIsValidating(false);

      if (validation.isHuman || !validation.isValid) {
        setIsHumanDetected(true);
        setValidationError(validation.message || HUMAN_INVALID_MESSAGE);
      } else {
        setIsHumanDetected(false);
        setValidationError('');
      }

    } catch (err) {
      console.error('Failed to capture snapshot:', err);
      setIsValidating(false);
    }
  };

  const handleConfirmSnapshot = () => {
    if (!capturedSnapshot || isHumanDetected) return;
    const photoToSubmit = capturedSnapshot;
    stopCamera();
    setCapturedSnapshot(null);
    onCapture(photoToSubmit);
  };

  const handleRetake = () => {
    setCapturedSnapshot(null);
    setIsHumanDetected(false);
    setValidationError('');
    if (!stream) {
      startCamera();
    }
  };

  const handleFallbackFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result;
        setCapturedSnapshot(base64);
        setIsValidating(true);
        const validation = await validateCropImage(base64);
        setIsValidating(false);

        if (validation.isHuman || !validation.isValid) {
          setIsHumanDetected(true);
          setValidationError(validation.message || HUMAN_INVALID_MESSAGE);
        } else {
          setIsHumanDetected(false);
          setValidationError('');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-forest-dark border border-forest-border rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
        
        {/* Shutter White Flash overlay */}
        {isFlashing && (
          <div className="absolute inset-0 bg-white z-50 pointer-events-none transition-opacity duration-200" />
        )}

        {/* Top Header */}
        <div className="p-4 bg-forest-card/90 border-b border-forest-border flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <Camera className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm text-white font-heading">
              {t('camera.viewfinderTitle', 'Plant Camera Viewfinder')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!capturedSnapshot && (
              <button
                onClick={toggleCameraFacing}
                className="p-2 rounded-xl bg-forest-dark hover:bg-forest-border text-slate-300 transition-colors border border-forest-border/60"
                title={t('camera.switchCamera', 'Switch Camera')}
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-forest-dark hover:bg-forest-border text-slate-300 transition-colors border border-forest-border/60"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Viewfinder / Captured Preview Area */}
        <div className="relative aspect-video sm:aspect-[4/3] bg-black flex items-center justify-center overflow-hidden">
          
          {capturedSnapshot ? (
            /* Snapshot Preview */
            <div className="relative w-full h-full">
              <img
                src={capturedSnapshot}
                alt="Captured crop snapshot"
                className="w-full h-full object-cover"
              />

              {/* Status Header Badge */}
              {isHumanDetected ? (
                <div className="absolute top-3 left-3 right-3 bg-rose-950/90 border border-rose-500/60 text-rose-200 text-xs font-bold p-3 rounded-2xl flex items-start gap-2.5 shadow-2xl backdrop-blur-md animate-bounce">
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-extrabold text-white">{HUMAN_INVALID_MESSAGE}</p>
                    <p className="text-[11px] text-rose-300/90 mt-0.5 font-normal">
                      Please point the camera directly at plant leaves, crops, or agricultural produce.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="absolute top-3 left-3 bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isValidating ? 'Validating foliar image...' : t('camera.photoCaptured', 'Plant Foliage Snapshot Ready')}</span>
                </div>
              )}
            </div>
          ) : cameraError ? (
            /* Error & Fallback View */
            <div className="p-6 text-center max-w-sm space-y-4">
              <AlertCircle className="w-12 h-12 text-rose-400 mx-auto" />
              <p className="text-xs text-rose-200">{cameraError}</p>
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={startCamera}
                  className="px-4 py-2.5 rounded-xl bg-forest-card border border-forest-border text-xs text-slate-200 hover:bg-emerald-500/20 font-semibold"
                >
                  {t('camera.retryCamera', 'Retry Camera')}
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-xs text-emerald-300 hover:bg-emerald-500/30 font-semibold flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  <span>Choose Photo from Device</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFallbackFileUpload}
                  className="hidden"
                />
              </div>
            </div>
          ) : (
            /* Live Camera Stream */
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* Crop Target Alignment Overlay */}
              <div className="absolute inset-6 sm:inset-10 border-2 border-dashed border-emerald-400/70 rounded-3xl pointer-events-none flex flex-col justify-between p-3.5 shadow-inner">
                <div className="flex justify-between items-center text-[10px] text-emerald-300 font-mono bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg self-start">
                  <span>{t('camera.alignLeaf', '[ALIGN CROP LEAF HERE]')}</span>
                </div>
                <div className="text-center text-[11px] text-emerald-200 font-medium bg-black/60 backdrop-blur-md py-1.5 px-3.5 rounded-full mx-auto border border-emerald-500/30 shadow-md">
                  {t('camera.distanceHint', 'Hold camera 15-20 cm from crop foliage')}
                </div>
              </div>

              {/* Center Floating Quick Shutter Button on Camera */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1">
                <button
                  onClick={handleTakeSnapshot}
                  disabled={!isCameraReady}
                  title="Capture Snapshot"
                  className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white/20 p-1.5 border-4 border-white backdrop-blur-md hover:scale-110 active:scale-95 transition-all shadow-2xl group flex items-center justify-center cursor-pointer"
                >
                  <div className="w-full h-full rounded-full bg-emerald-500 group-hover:bg-emerald-400 transition-colors flex items-center justify-center shadow-lg shadow-emerald-500/50">
                    <Camera className="w-6 h-6 text-forest-dark" />
                  </div>
                </button>
                <span className="text-[10px] font-bold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/20">
                  {t('camera.capturePhoto', 'Capture Photo')}
                </span>
              </div>
            </>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Bottom Control Bar */}
        <div className="p-4 sm:p-5 bg-forest-dark border-t border-forest-border flex items-center justify-between gap-3 shrink-0">
          
          {capturedSnapshot ? (
            /* Actions when photo is captured */
            <>
              <button
                onClick={handleRetake}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-forest-border bg-forest-card hover:bg-forest-border text-xs text-slate-200 font-bold transition-all"
              >
                <RotateCcw className="w-4 h-4 text-slate-300" />
                <span>{isHumanDetected ? 'Retake Plant Photo' : t('camera.retake', 'Retake Photo')}</span>
              </button>

              {isHumanDetected ? (
                <button
                  onClick={handleRetake}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-rose-600/30 transition-all hover:scale-105"
                >
                  <Camera className="w-4 h-4" />
                  <span>Point Camera at Crop</span>
                </button>
              ) : (
                <button
                  onClick={handleConfirmSnapshot}
                  disabled={isValidating}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-forest-dark font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-forest-dark" />
                  <span>{t('camera.usePhoto', 'Analyze This Crop Photo')}</span>
                </button>
              )}
            </>
          ) : (
            /* Actions during live viewfinder */
            <>
              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-forest-border text-xs text-slate-300 hover:bg-forest-card font-semibold transition-colors"
              >
                {t('camera.cancel', 'Cancel')}
              </button>
              
              <button
                onClick={handleTakeSnapshot}
                disabled={cameraError || !isCameraReady}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:from-emerald-400 hover:to-teal-300 text-forest-dark font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-500/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Camera className="w-5 h-5 text-forest-dark" />
                <span>{t('camera.capturePhoto', 'Capture Crop Photo')}</span>
              </button>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
