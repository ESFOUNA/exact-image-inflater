import React, { useRef, useState } from 'react';
import { X, Check } from 'lucide-react';

interface ImageCropperProps {
  imageUrl: string;
  onSave: (croppedImageUrl: string) => void;
  onCancel: () => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ imageUrl, onSave, onCancel }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && imageRef.current) {
      const containerRect = imageRef.current.getBoundingClientRect();
      const cropperSize = 200; // Size of the cropping window
      
      // Calculate new position within bounds
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      // Limit movement to keep image within cropping area
      const minX = containerRect.width / 2 - (containerRect.width * scale) / 2;
      const maxX = containerRect.width / 2 - cropperSize / 2;
      const minY = containerRect.height / 2 - (containerRect.height * scale) / 2;
      const maxY = containerRect.height / 2 - cropperSize / 2;
      
      setPosition({
        x: Math.min(Math.max(newX, minX), maxX),
        y: Math.min(Math.max(newY, minY), maxY)
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(e.target.value));
  };

  const handleSave = () => {
    // In a real app, we would use canvas to crop the image
    // For this demo, we'll just simulate creating a cropped image
    onSave(imageUrl);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-black/90 border border-gray-700 rounded-xl p-6 w-[90%] max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Adjust Profile Photo</h3>
          <button onClick={onCancel} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>
        
        <div 
          className="relative h-64 overflow-hidden rounded-xl border-2 border-lime-500 mb-4 cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          ref={imageRef}
        >
          {/* Circular crop mask */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border-2 border-lime-500 z-10 shadow-[0_0_0_9999px_rgba(0,0,0,0.6)]"></div>
          </div>
          
          {/* Image being cropped */}
          <div 
            style={{
              position: 'absolute',
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              width: '100%',
              height: '100%',
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              transition: isDragging ? 'none' : 'transform 0.1s ease',
            }}
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-white mb-1 text-sm">Zoom</label>
          <input 
            type="range" 
            min="1" 
            max="3" 
            step="0.01" 
            value={scale} 
            onChange={handleZoomChange}
            className="w-full accent-lime-500 bg-gray-700 rounded-lg h-2 appearance-none cursor-pointer"
          />
        </div>
        
        <div className="flex justify-end space-x-3">
          <button 
            onClick={onCancel}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="bg-lime-500 hover:bg-lime-600 text-black px-4 py-2 rounded-md transition flex items-center"
          >
            <Check size={18} className="mr-1" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
