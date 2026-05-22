"use client";

import { useState } from "react";
import { Upload, Loader2, X } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
}

export function ImageUpload({ value, onChange, placeholder = "Upload Image" }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json() as { error?: string };
        throw new Error(data.error || "Upload failed");
      }

      const data = await res.json() as { url: string };
      onChange(data.url); // The /api/media/key URL returned by R2
    } catch (err: any) {
      setError(err.message || "Failed to upload image.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="w-full">
      {value ? (
        <div className="relative rounded-lg overflow-hidden border border-hairline w-full aspect-video bg-surface-soft flex items-center justify-center">
          <img src={value} alt="Uploaded preview" className="object-cover w-full h-full" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-hairline rounded-lg cursor-pointer bg-surface-soft hover:bg-ink/5 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <Loader2 className="h-6 w-6 text-ink/50 animate-spin mb-2" />
            ) : (
              <Upload className="h-6 w-6 text-ink/50 mb-2" />
            )}
            <p className="caption-mono text-ink/60 text-xs text-center px-4">
              {uploading ? "Uploading to R2..." : placeholder}
            </p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={uploading} />
        </label>
      )}
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
}
