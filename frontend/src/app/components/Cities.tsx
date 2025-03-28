"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface CityCardProps {
  name: string;
  image: string;
}

const cities: CityCardProps[] = [
  { name: "Toronto", image: "/images/cities/toronto.png" },
  { name: "Vancouver", image: "/images/cities/vancouver.png" },
  { name: "Montreal", image: "/images/cities/montreal.png" },
  { name: "Calgary", image: "/images/cities/calgary.png" },
  { name: "Ottawa", image: "/images/cities/ottawa.png" },
  { name: "Edmonton", image: "/images/cities/edmonton.png" },
  { name: "Winnipeg", image: "/images/cities/winnipeg.png" },
  { name: "Quebec", image: "/images/cities/quebec.png" },
  { name: "Halifax", image: "/images/cities/halifax.png" },
  { name: "Victoria", image: "/images/cities/victoria.png" },
];

const CARD_WIDTH = 240;

export default function CityCardSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const router = useRouter();

  const getVisibleCards = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [visibleCards, setVisibleCards] = useState(getVisibleCards());

  useEffect(() => {
    const handleResize = () => {
      setVisibleCards(getVisibleCards());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => Math.max(0, prev - 1));
    }
  };

  const handleNextClick = () => {
    if (currentIndex < cities.length - visibleCards) {
      setCurrentIndex(prev => Math.min(cities.length - visibleCards, prev + 1));
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (sliderRef.current?.offsetLeft || 0);
    scrollLeft.current = currentIndex * CARD_WIDTH;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    
    const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = (x - startX.current);
    const newScrollLeft = scrollLeft.current - walk;
    const newIndex = newScrollLeft / CARD_WIDTH;
    
    setCurrentIndex(Math.max(0, Math.min(cities.length - visibleCards, Math.round(newIndex))));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0);
    scrollLeft.current = currentIndex * CARD_WIDTH;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    
    const x = e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = (x - startX.current);
    const newScrollLeft = scrollLeft.current - walk;
    const newIndex = newScrollLeft / CARD_WIDTH;
    
    setCurrentIndex(Math.max(0, Math.min(cities.length - visibleCards, Math.round(newIndex))));
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    // Check if the user is using two fingers for horizontal scrolling
    if (e.deltaMode === 0) { // 0 means pixels
      const deltaX = e.deltaX; // Horizontal scroll
      const newScrollLeft = currentIndex * CARD_WIDTH + deltaX;
      const newIndex = newScrollLeft / CARD_WIDTH;
      
      setCurrentIndex(Math.max(0, Math.min(cities.length - visibleCards, Math.round(newIndex))));
    }
  };

  return (
    <div className="relative w-full justify-center mx-auto py-8 lg:px-5">
      <h1 className="text-3xl flex md:p-2 justify-center font-bold mb-4">
        Popular Cities
      </h1>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrevClick}
          disabled={currentIndex === 0}
          className={`p-2 transition duration-200 ${
            currentIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:opacity-80"
          }`}
        >
          <ChevronLeft size={32} />
        </button>

        <div
          ref={sliderRef}
          className="overflow-hidden w-full select-none"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
        >
          <div
            className="flex gap-x-8 transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(-${currentIndex * CARD_WIDTH}px)`,
              width: `${cities.length * CARD_WIDTH}px`,
            }}
          >
            {cities.map((city, index) => (
              <div
                key={index}
                className="flex-shrink-0 p-4"
                style={{ width: CARD_WIDTH }}
              >
                <div
                  className="flex flex-col items-center cursor-pointer"
                  onClick={() => router.push(`/properties?search=${city.name}`)}
                >
                  <div
                    className="rounded-lg overflow-hidden shadow-lg"
                    style={{
                      width: "240px",
                      height: "240px",
                      backgroundImage: `url(${city.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <p
                    className="mt-4 text-lg font-semibold text-center"
                    style={{ color: "var(--copy-secondary)" }}
                  >
                    {city.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleNextClick}
          disabled={currentIndex === cities.length - visibleCards}
          className={`p-2 transition duration-200 ${
            currentIndex === cities.length - visibleCards
              ? "opacity-50 cursor-not-allowed"
              : "hover:opacity-80"
          }`}
        >
          <ChevronRight size={32} />
        </button>
      </div>
    </div>
  );
}
