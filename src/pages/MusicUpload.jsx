import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Music, Check, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';

export default function MusicUpload() {
  const [uploading, setUploading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(localStorage.getItem('spinshot-music-url') || '');
  const [success, setSuccess] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.mp3')) {
      alert('Please upload an MP3 file');
      return;
    }

    setUploading(true);
    setSuccess(false);

    try {
      const { data } = await base44.integrations.Core.UploadFile({ file });
      localStorage.setItem('spinshot-music-url', data.file_url);
      setCurrentUrl(data.file_url);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      alert('Upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const resetToDefault = () => {
    localStorage.removeItem('spinshot-music-url');
    setCurrentUrl('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-violet-950 p-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <Music className="w-16 h-16 mx-auto mb-4 text-pink-400" />
          <h1 className="text-4xl font-black text-white mb-2">Background Music Upload</h1>
          <p className="text-purple-300">Upload your custom MP3 file for SpinShot</p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-purple-900/40 backdrop-blur border border-purple-500/20 rounded-2xl p-8"
        >
          <div className="mb-6">
            <label className="block text-white font-semibold mb-4">
              Upload MP3 File
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".mp3,audio/mpeg"
                onChange={handleFileUpload}
                disabled={uploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button
                disabled={uploading}
                className="w-full h-24 bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white font-bold text-lg"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : success ? (
                  <>
                    <Check className="w-6 h-6 mr-2" />
                    Uploaded Successfully!
                  </>
                ) : (
                  <>
                    <Upload className="w-6 h-6 mr-2" />
                    Click to Upload MP3
                  </>
                )}
              </Button>
            </div>
          </div>

          {currentUrl && (
            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">
                Current Music URL
              </label>
              <div className="bg-purple-950/50 rounded-lg p-3 break-all text-sm text-purple-200">
                {currentUrl}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <Button
              onClick={resetToDefault}
              variant="outline"
              className="flex-1 border-purple-500/30 text-purple-200 hover:bg-purple-800/30"
            >
              Use Default Music
            </Button>
            <Button
              onClick={() => window.location.reload()}
              className="flex-1 bg-purple-700 hover:bg-purple-600"
            >
              Reload Game
            </Button>
          </div>

          <div className="mt-6 text-center text-purple-400 text-sm">
            💡 Tip: After uploading, reload the game page to hear your music
          </div>
        </motion.div>
      </div>
    </div>
  );
}