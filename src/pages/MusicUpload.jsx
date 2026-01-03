import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Music, Check, Loader2, Link } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function MusicUpload() {
  const [uploading, setUploading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(localStorage.getItem('spinshot-music-url') || '');
  const [urlInput, setUrlInput] = useState('');
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
      console.log('Starting upload...');
      const response = await base44.integrations.Core.UploadFile({ file });
      console.log('Upload response:', response);

      // The integration returns { file_url: string }
      const fileUrl = response?.file_url || response?.data?.file_url;

      if (!fileUrl) {
        console.error('No file_url in response:', response);
        throw new Error('Upload succeeded but no file URL was returned. Response: ' + JSON.stringify(response));
      }

      console.log('File uploaded successfully! URL:', fileUrl);
      localStorage.setItem('spinshot-music-url', fileUrl);
      setCurrentUrl(fileUrl);
      setSuccess(true);

      // Auto-reload after successful upload
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed: ' + (error.message || 'Unknown error. Check console for details.'));
    } finally {
      setUploading(false);
    }
  };

  const convertGoogleDriveUrl = (url) => {
    // Convert Google Drive sharing link to direct download link
    const match = url.match(/\/file\/d\/([^/]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
    return url;
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) {
      alert('Please enter a valid URL');
      return;
    }
    
    let finalUrl = urlInput.trim();
    
    // Auto-convert Google Drive links
    if (finalUrl.includes('drive.google.com')) {
      finalUrl = convertGoogleDriveUrl(finalUrl);
      console.log('Converted Google Drive URL to:', finalUrl);
    }
    
    localStorage.setItem('spinshot-music-url', finalUrl);
    setCurrentUrl(finalUrl);
    setUrlInput('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
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
              Paste MP3 URL
            </label>
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="https://example.com/your-music.mp3"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="flex-1 bg-purple-950/50 border-purple-500/30 text-white placeholder:text-purple-400"
              />
              <Button
                onClick={handleUrlSubmit}
                className="bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500"
              >
                <Link className="w-5 h-5 mr-2" />
                Set URL
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-white font-semibold mb-4">
              Or Upload MP3 File
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
                className="w-full h-20 bg-gradient-to-r from-purple-500 to-indigo-400 hover:from-purple-600 hover:to-indigo-500 text-white font-bold"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : success ? (
                  <>
                    <Check className="w-6 h-6 mr-2" />
                    Success!
                  </>
                ) : (
                  <>
                    <Upload className="w-6 h-6 mr-2" />
                    Upload MP3
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

          <div className="mt-6 space-y-2">
            <div className="text-center text-purple-400 text-sm">
              💡 Tip: Use direct MP3 links or upload files
            </div>
            {currentUrl && currentUrl.includes('drive.google.com') && (
              <div className="text-center text-yellow-400 text-xs">
                ⚠️ Google Drive link detected - converted to direct download
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}