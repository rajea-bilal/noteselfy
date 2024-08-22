"use client"

import React, { useState } from 'react';
import UploadForm from '@/components/UploadForm';
import ExtractedInfoDisplay from '@/components/TextDisplay';
import { Loader2 } from "lucide-react";

export default function UploadPage() {
  const [ocrResult, setOcrResult] = useState(null);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUploadSuccess = (result) => {
    setOcrResult(result.extractedText);
    setCategory(result.category);
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-white/40">Upload a screenshot</h1>
      <UploadForm 
        onUploadSuccess={handleUploadSuccess}
        onUploadStart={() => setLoading(true)}
      />

      {loading && <Loader2 className="animate-spin h-8 w-8 mt-4" />}

      {ocrResult && (
        <ExtractedInfoDisplay 
          extractedText={ocrResult}
          category={category}
        />
      )}
    </div>
  );
}