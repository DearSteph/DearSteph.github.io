import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    img: "/images/photo1.jpg",
    text: "They say a picture is worth a thousand words.\nIf a photo is worth a thousand words, then what is the value of a single memory?\nOur memories are priceless.\nThere isn’t a single thing that exists that I would trade them for.\nThe good, or the bad.",
  },
  {
    img: "/images/photo2.jpg",
    text: "All of this began when I told you I thought your sword was cool.\nIsn’t it insane to think back about those early experiences we shared?",
  },
  {
    img: "/images/photo3.jpg",
    text: "Just a few months later we took our first road trip together.\nYou got to meet my daughter,\nand even though it was certainly an eventful experience I was grateful for it.",
  },
  {
    img: "/images/photo4.jpg",
    text: "I had a blast the next few days at the wedding.\nHanging out with Ace, and forming that bond early on was so very special to me.",
  },
  {
    img: "/images/photo5.jpg",
    text: "I remember watching you prepare to be a bridesmaid throughout that day.\nI saw you here and there and,\nEvery time I locked eyes with you I felt as if I could have melted.\nWhen you walked down the aisle in that gorgeous blue dress I could swear my heart was going to burst.\nI told myself I was going to marry you one day.",
  },
  {
    img: "/images/photo6.jpg",
    text: "Fast forward and there we were.\nOur family on that same bench.\nWe made our vows, and began a new journey.",
  },
  {
    img: "/images/photo7.jpg",
    text: "This journey has felt like one of the longest boss battles.\nThe challenges we’ve faced,\nThe obstacles we’ve surpassed,\nand it’s not even close to what we will accomplish.",
  },
  {
    video: "/images/IMG_0274.MOV",
    text: "There’s been so many memories, and every day that I spend in this life I can only hope we will have countless more.\nNearly 3.5 thousand days since we began this journey.\nJuly 20, 2026 will make 10 years.\nThank you for sharing a decade of your life with me.\nThank you for saving my life.\nI love you, Stephanie.",
  },
];

export default function Slideshow() {
  const [index, setIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const videoRef = useRef(null);

  const current = slides[index];

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Typewriter + video volume effect
  useEffect(() => {
    setTypedText("");

    let i = 0;
    const interval = setInterval(() => {
      setTypedText(current.text.slice(0, i));
      i++;
      if (i > current.text.length) clearInterval(interval);
    }, 50);

    // Set video volume if this slide has a video
    if (current.video && videoRef.current) {
      videoRef.current.volume = 0.05;
    }

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div className="font-nothing relative w-full h-full overflow-hidden">

      {/* Media (image or video) */}
      {current.video ? (
        <video
          ref={videoRef}
          src={current.video}
          className="w-full h-full object-contain"
          autoPlay
          controls
        />
      ) : (
        <img
          src={current.img}
          className="w-full h-full object-contain opacity-90"
        />
      )}

      {/* Typewriter Text (hidden on video slide) */}
      <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-semibold select-none">
        <span className="font-nothing backdrop-blur-sm px-4 py-2 bg-black/30 rounded whitespace-pre-line text-center">
          {typedText}
        </span>
      </div>



      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="
          absolute left-6 top-1/2 -translate-y-1/2
          transition-all duration-200
          hover:scale-125
        "
      >
        <ChevronLeft
          size={80}
          className="
            text-white
            drop-shadow-[0_0_3px_white]
            hover:drop-shadow-[0_0_6px_white]
          "
        />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="
          absolute right-6 top-1/2 -translate-y-1/2
          transition-all duration-200
          hover:scale-125
        "
      >
        <ChevronRight
          size={80}
          className="
            text-white
            drop-shadow-[0_0_3px_white]
            hover:drop-shadow-[0_0_6px_white]
          "
        />
      </button>
    </div>
  );
}