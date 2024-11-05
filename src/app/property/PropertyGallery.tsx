// src/app/components/PropertyGallery.tsx
import Image from "next/image";

interface PropertyGalleryProps {
  images: string[];
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {images.map((image, index) => (
        <div key={index} className="w-full h-64 relative group overflow-hidden rounded-xl shadow-lg">
          <Image
            src={image}
            alt={`Property image ${index + 1}`}
            layout="fill"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <p className="text-white text-lg font-semibold">View Image {index + 1}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
