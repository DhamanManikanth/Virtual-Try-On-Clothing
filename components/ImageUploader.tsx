
import React, { useRef } from 'react';
import UploadIcon from './icons/UploadIcon';

interface ImageUploaderProps {
  title: string;
  description: string;
  imageData: string | null;
  onImageSelect: (data: string | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ title, description, imageData, onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelect(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleClearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageSelect(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg h-full flex flex-col">
      <h3 className="text-xl font-semibold text-slate-700 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 mb-4">{description}</p>
      <div 
        className="flex-grow border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center text-center cursor-pointer hover:border-sky-400 hover:bg-sky-50 transition-all duration-300 relative aspect-w-1 aspect-h-1"
        onClick={handleBoxClick}
      >
        <input
          type="file"
          accept="image/png, image/jpeg, image/webp"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        {imageData ? (
          <>
            <img src={imageData} alt="Preview" className="object-contain w-full h-full max-h-96 rounded-lg"/>
             <button
              onClick={handleClearImage}
              className="absolute top-2 right-2 bg-slate-800 bg-opacity-50 text-white rounded-full p-1.5 hover:bg-opacity-75 transition-colors"
              aria-label="Remove image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </>
        ) : (
          <div className="text-slate-400 flex flex-col items-center p-4">
            <UploadIcon className="w-12 h-12 mb-2"/>
            <p className="font-semibold">Click to upload</p>
            <p className="text-xs">PNG, JPG, WEBP</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
