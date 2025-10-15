
import React from 'react';

interface ResultDisplayProps {
  isLoading: boolean;
  resultImage: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, resultImage }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mt-8 w-full">
      <h3 className="text-xl font-semibold text-slate-700 mb-4 text-center">Your Virtual Try-On</h3>
      <div className="w-full aspect-w-1 aspect-h-1 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
        {isLoading && (
          <div className="w-full h-full bg-slate-200 animate-pulse"></div>
        )}
        {!isLoading && resultImage && (
          <img src={resultImage} alt="Virtual try-on result" className="object-contain w-full h-full"/>
        )}
        {!isLoading && !resultImage && (
          <div className="text-center text-slate-400 p-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-4 font-semibold">Your generated image will appear here.</p>
            <p className="text-sm">Upload your photos and click "Virtually Try On".</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultDisplay;
