
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import ResultDisplay from './components/ResultDisplay';
import { virtualTryOn } from './services/geminiService';

const App: React.FC = () => {
  const [personImage, setPersonImage] = useState<string | null>(null);
  const [clothingImage, setClothingImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleTryOn = useCallback(async () => {
    if (!personImage || !clothingImage) {
      setError('Please upload both images before trying on.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setResultImage(null);

    try {
      const generatedImage = await virtualTryOn(personImage, clothingImage);
      setResultImage(generatedImage);
    } catch (err) {
      console.error(err);
      setError('Failed to generate the image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [personImage, clothingImage]);
  
  const canTryOn = personImage && clothingImage && !isLoading;

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <ImageUploader 
              title="Upload Your Photo"
              description="For best results, use a clear, full-body photo."
              imageData={personImage}
              onImageSelect={setPersonImage} 
            />
            <ImageUploader 
              title="Upload Clothing Photo"
              description="Use a photo of a single clothing item on a plain background."
              imageData={clothingImage}
              onImageSelect={setClothingImage}
            />
          </div>

          <div className="flex justify-center my-6">
            <button
              onClick={handleTryOn}
              disabled={!canTryOn}
              className={`px-8 py-4 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105
                ${canTryOn 
                  ? 'bg-sky-500 hover:bg-sky-600 text-white' 
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </div>
              ) : (
                'Virtually Try On'
              )}
            </button>
          </div>
          
          {error && (
            <div className="text-center my-4 p-4 bg-red-100 text-red-700 rounded-lg">
              <p>{error}</p>
            </div>
          )}

          <ResultDisplay 
            isLoading={isLoading} 
            resultImage={resultImage} 
          />
        </div>
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>Powered by Google Gemini. For entertainment purposes only.</p>
      </footer>
    </div>
  );
};

export default App;
