'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  { name: 'Infrastructure', icon: '🏗️' },
  { name: 'Environment', icon: '🌿' },
  { name: 'Healthcare', icon: '🏥' },
  { name: 'Education', icon: '📚' },
  { name: 'Agriculture', icon: '🌾' },
  { name: 'Livelihood', icon: '💼' },
  { name: 'Utilities', icon: '🔧' },
  { name: 'Other', icon: '➕' },
];

export default function SubmitProblemPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 3 - images.length);
      setImages((prev) => [...prev, ...filesArray]);
      
      const newPreviews = filesArray.map((file) => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => {
      const newPreviews = [...prev];
      URL.revokeObjectURL(newPreviews[index]);
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !location || !description) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      let imageUrls: string[] = [];

      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((img) => formData.append('images', img));
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!uploadRes.ok) throw new Error('Image upload failed');
        const uploadData = await uploadRes.json();
        imageUrls = uploadData.urls;
      }

      const problemData = {
        title,
        category,
        location,
        description,
        reporterName: reporterName || null,
        images: JSON.stringify(imageUrls),
      };

      const res = await fetch('/api/problems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(problemData),
      });

      if (!res.ok) throw new Error('Failed to submit problem');

      const data = await res.json();
      router.push(`/problems/${data.id}`);
    } catch (err: any) {
      setError(err.message || 'An error occurred during submission.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 py-12 px-6 md:px-12 selection:bg-cyan-500/30">
      <div className="max-w-3xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">
            Report A<br />Problem
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 font-medium">
            Help us identify and track issues in Wayanad. Your voice matters.
          </p>
        </header>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-4 text-red-400 flex items-center gap-3">
            <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-semibold">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 bg-zinc-900/30 border border-zinc-800/80 p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-zinc-400 ml-1">Title <span className="text-emerald-500">*</span></label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Broken Bridge at Vythiri"
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 rounded-xl px-5 py-4 text-zinc-100 placeholder-zinc-600 outline-none transition-all focus:ring-4 focus:ring-emerald-500/10 text-lg"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold uppercase tracking-widest text-zinc-400 ml-1">Category <span className="text-emerald-500">*</span></label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setCategory(cat.name)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${
                    category === cat.name
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                      : 'border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400'
                  }`}
                >
                  <span className="text-2xl mb-2">{cat.icon}</span>
                  <span className="text-xs font-bold uppercase tracking-wider">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-zinc-400 ml-1">Location <span className="text-emerald-500">*</span></label>
            <div className="relative">
              <svg className="w-6 h-6 text-zinc-500 absolute left-5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Specific area or landmark"
                className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 rounded-xl pl-14 pr-5 py-4 text-zinc-100 placeholder-zinc-600 outline-none transition-all focus:ring-4 focus:ring-emerald-500/10 text-lg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-zinc-400 ml-1">Description <span className="text-emerald-500">*</span></label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide detailed information about the issue..."
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 rounded-xl px-5 py-4 text-zinc-100 placeholder-zinc-600 outline-none transition-all focus:ring-4 focus:ring-emerald-500/10 min-h-[200px] resize-y text-lg"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold uppercase tracking-widest text-zinc-400 ml-1">Images (Max 3)</label>
            <div className="relative border-2 border-dashed border-zinc-800 bg-zinc-900/40 rounded-2xl p-8 text-center hover:bg-zinc-900/60 transition-colors group">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                disabled={images.length >= 3}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-800/80 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-zinc-300 font-medium">Click or drag images here</p>
                  <p className="text-zinc-500 text-sm mt-1">PNG, JPG up to 10MB</p>
                </div>
              </div>
            </div>
            
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-zinc-800 group">
                    <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                    >
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2 pt-4 border-t border-zinc-800">
            <label className="text-sm font-bold uppercase tracking-widest text-zinc-400 ml-1">Reporter Name <span className="text-zinc-600 font-normal lowercase">(Optional)</span></label>
            <input
              type="text"
              value={reporterName}
              onChange={(e) => setReporterName(e.target.value)}
              placeholder="Leave blank to remain anonymous"
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-emerald-500/50 rounded-xl px-5 py-4 text-zinc-100 placeholder-zinc-600 outline-none transition-all focus:ring-4 focus:ring-emerald-500/10 text-lg"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-black uppercase tracking-widest text-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)]"
          >
            {isSubmitting ? 'Submitting Report...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  );
}
