import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Calendar, ArrowLeftRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { SMILE_TRANSFORMATIONS } from '../data/clinicData';
import customBeforeImg from '../assets/images/custom_before.jpg';
import customAfterImg from '../assets/images/custom_after.jpg';

interface SmileTransformationSliderProps {
  onConsultTransformation: (treatmentType: string) => void;
}

export const SmileTransformationSlider: React.FC<SmileTransformationSliderProps> = ({
  onConsultTransformation,
}) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = SMILE_TRANSFORMATIONS[activeCaseIndex];

  // Documented dental case photographs
  const caseVisuals: Record<string, { before: string; after: string }> = {
    'case-aligners': {
      before: customBeforeImg,
      after: customAfterImg,
    },
    'case-veneers': {
      before: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=1000', // tooth aesthetic
      after: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1000', // bright smile
    },
    'case-implant': {
      before: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000', // clinical consultation
      after: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000', // restored confidence smile
    },
  };

  const currentVisual = caseVisuals[activeCase.id] || caseVisuals['case-aligners'];

  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="transformations" className="py-16 sm:py-24 bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7EFEA] text-[#173829] text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#265B43]" />
              <span>Documented Clinical Cases</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173829] tracking-tight">
              Real Smiles. True Proportions.
            </h2>
            <p className="text-base sm:text-lg text-[#525E56]">
              We design smiles that fit your individual facial aesthetics—preserving character rather than creating artificial, blinding-white "piano keys".
            </p>
          </div>

          {/* Case Navigator buttons */}
          <div className="flex items-center gap-2">
            {SMILE_TRANSFORMATIONS.map((c, i) => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveCaseIndex(i);
                  setSliderPosition(50);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                  activeCaseIndex === i
                    ? 'bg-[#173829] text-[#FAF9F5] border-[#173829] shadow-xs'
                    : 'bg-white text-[#4A574F] hover:bg-[#F2EFE8] border-[#DED9CC]'
                }`}
              >
                Case 0{i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Case Interactive Stage */}
        <div className="bg-white rounded-2xl border border-[#D5CFBF] shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left: Interactive Comparison Stage (7 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#E8E4D9]">
              
              <div className="flex items-center justify-between text-xs text-[#6B7870] mb-3">
                <span className="font-medium flex items-center gap-1.5">
                  <ArrowLeftRight className="w-3.5 h-3.5 text-[#265B43]" />
                  Drag the slider horizontally to compare
                </span>
                <span className="font-semibold text-[#173829]">
                  {sliderPosition < 50 ? 'Before State' : 'After Treatment'}
                </span>
              </div>

              {/* Slider Viewport */}
              <div
                ref={containerRef}
                className="relative h-72 sm:h-96 w-full rounded-xl overflow-hidden select-none cursor-ew-resize border border-[#DDD7C9] touch-none"
                onPointerDown={(e) => {
                  setIsDragging(true);
                  handleMove(e.clientX);
                }}
                onPointerUp={() => setIsDragging(false)}
                onPointerLeave={() => setIsDragging(false)}
                onPointerMove={(e) => {
                  if (isDragging) handleMove(e.clientX);
                }}
                onClick={(e) => handleMove(e.clientX)}
              >
                {/* AFTER IMAGE (Base Layer) */}
                <img
                  src={currentVisual.after}
                  alt={`After ${activeCase.title}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* AFTER LABEL */}
                <div className="absolute top-4 right-4 bg-[#173829]/90 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-xs z-10 pointer-events-none">
                  AFTER RESULT
                </div>

                {/* BEFORE IMAGE (Clipped Overlay Layer) */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={currentVisual.before}
                    alt={`Before ${activeCase.title}`}
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{
                      width: containerWidth ? `${containerWidth}px` : (containerRef.current ? `${containerRef.current.clientWidth}px` : '100%'),
                    }}
                    referrerPolicy="no-referrer"
                  />
                  {/* BEFORE LABEL */}
                  <div className="absolute top-4 left-4 bg-black/75 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-xs pointer-events-none">
                    BEFORE
                  </div>
                </div>

                {/* DIVIDER HANDLE */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-lg pointer-events-none z-20 flex items-center justify-center"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="w-8 h-8 rounded-full bg-[#173829] text-white border-2 border-white flex items-center justify-center shadow-md">
                    <ArrowLeftRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 text-xs text-[#6A766E]">
                <span>Initial presentation</span>
                <span>Final clinical outcome</span>
              </div>
            </div>

            {/* Right: Clinical Case Details (5 cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#FAF9F5]">
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#265B43]">
                    {activeCase.treatmentType}
                  </span>
                  <h3 className="font-editorial text-2xl font-bold text-[#173829] mt-1">
                    {activeCase.title}
                  </h3>
                  <p className="text-xs text-[#67736A] mt-0.5">
                    {activeCase.patientAge} • {activeCase.duration}
                  </p>
                </div>

                <p className="text-sm text-[#48554D] leading-relaxed">
                  {activeCase.caseDescription}
                </p>

                {/* Before vs After notes */}
                <div className="space-y-2.5 pt-2">
                  <div className="p-3 rounded-lg bg-stone-100 border border-stone-200">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block">
                      Initial Condition:
                    </span>
                    <p className="text-xs text-stone-800 mt-0.5 font-medium">
                      {activeCase.beforeDescription}
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                      Final Treatment Result:
                    </span>
                    <p className="text-xs text-emerald-950 mt-0.5 font-medium">
                      {activeCase.afterDescription}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E4D9]">
                <button
                  onClick={() => onConsultTransformation(activeCase.treatmentType)}
                  className="w-full py-3.5 rounded-xl bg-[#173829] hover:bg-[#23503B] text-[#FAF9F5] font-semibold text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-emerald-300" />
                  <span>Book Consultation for Similar Result</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
