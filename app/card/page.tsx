"use client";
import { Disc3 } from "lucide-react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import localFont from "next/font/local";
import { motion, Variants, useAnimation, TargetAndTransition } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const manjari = localFont({
  src: "../../fonts/Manjari-Bold.ttf",
  variable: "--font-manjari",
  weight: "700",
  style: "normal",
});

// Hook to detect mobile
function useIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

const imageVariant: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: custom, duration: 0.8, ease: "easeOut" },
  }),
};

const giggleAnimation: TargetAndTransition = {
  y: [0, 5, 0, 5, 0],
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    duration: 5,
    ease: "easeInOut",
  },
};

function GiggleImage({
  src,
  alt,
  width,
  height,
  customDelay,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  customDelay: number;
  className?: string;
}) {
  const controls = useAnimation();
  useEffect(() => {
    async function runAnimation() {
      const visibleFn = imageVariant.visible as (delay?: number) => TargetAndTransition;
      await controls.start(visibleFn(customDelay));
      controls.start(giggleAnimation);
    }
    runAnimation();
  }, [controls, customDelay]);

  return (
    <motion.div className={className} initial="hidden" animate={controls} variants={imageVariant}>
      <Image src={src} alt={alt} width={width} height={height} />
    </motion.div>
  );
}

// Shared Card Component (used for both desktop and mobile, with responsive classes)
function CardLayout({
  name,
  msg,
  isPlaying,
  toggleMusicAndAnimation,
  router,
  isMobile,
}: any) {
  return (
    <div
      className="fixed inset-0 flex flex-col justify-center items-start p-0 overflow-hidden"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        className={`absolute ${isMobile ? "top-[9%] left-4 right-9 text-center" : "top-[30%] left-[6rem] text-left"} text-white`}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <h2
          className={`${
            isMobile ? "text-xl" : "text-3xl"
          } mb-2 font-semibold ${manjari.className}`}
        >
          ഹൃദയം നിറഞ്ഞ,
        </h2>
        <h1
          className={`${
            isMobile ? "text-5xl" : "text-8xl"
          } font-extrabold text-green-950 ${manjari.className}`}
        >
          ഓണാശംസകൾ
        </h1>
        <div className={`${isMobile ? "max-w-md mx-auto" : "max-w-3xl"}`}>
          <h2
            className={`${
              isMobile ? "text-lg" : "text-2xl"
            } font-extrabold text-white ${manjari.className}`}
          >
            സ്നേഹത്തിന്റെയും സന്തോഷത്തിന്റെയും, ഐക്യത്തിന്റെയും നിറം പൂക്കുന്ന ഓണം
            നിങ്ങൾക്കും കുടുംബത്തിനും സമൃദ്ധിയും സന്തോഷവും നൽകട്ടെ.
          </h2>
          <p
            className={`${
              isMobile ? "text-lg mt-2" : "text-2xl mt-2"
            } font-extrabold text-white ${manjari.className}`}
          >
            {msg}
          </p>
          <h2
            className={`${
              isMobile ? "text-lg mt-4" : "text-2xl mt-6"
            } font-bold text-green-900 ${manjari.className}`}
          >
            എന്ന് സ്വന്തം, {name}
          </h2>

          <button
  onClick={toggleMusicAndAnimation}
  className={`text-green-900 flex items-center justify-center gap-2 px-4 py-2 rounded-full ${
    isMobile ? "text-base" : "text-xl mt-6"
  } font-extrabold bg-yellow-300 hover:bg-yellow-400 transition-colors ${manjari.className} 
    ${isMobile ? "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50" : "mt-6"}`}
>
  <Disc3 size={isMobile ? 20 : 26} className={`shrink-0 ${isPlaying ? "animate-spin" : ""}`} />
  <span className={`leading-none ${isPlaying ? "mt-2" : "mt-1"}`}>
    {isPlaying ? "ലൈൻ Cut! ലൈൻ Cut!" : "സ്വൽപം music കേൾക്കാം"}
  </span>
</button>

        </div>
      </motion.div>

      {/* Decorations */}
      <GiggleImage src="/umbrella-right.png" alt="Umbrella" width={isMobile ? 0 : 250} height={isMobile ? 0 : 250} customDelay={0.2} className="absolute top-14 right-0" />
      <GiggleImage src="/grass-right.png" alt="Grass Right" width={isMobile ? 150 : 250} height={isMobile ? 120 : 200} customDelay={0.4} className="absolute bottom-0 right-0" />
      <GiggleImage src="/maveli.png" alt="Maveli" width={isMobile ? 300 : 600} height={isMobile ? 300 : 600} customDelay={0.6} className={`absolute bottom-0 ${isMobile ? "right-4" : "right-24"}`} />
      <GiggleImage src="/grass.png" alt="Grass" width={isMobile ? 150 : 250} height={isMobile ? 150 : 250} customDelay={0.8} className={`absolute bottom-0 ${isMobile ? "left-6" : "right-[38rem]"}`} />
      <GiggleImage src="/leaf.png" alt="Leaf" width={isMobile ? 100 : 200} height={isMobile ? 100 : 200} customDelay={1} className={`absolute bottom-0 ${isMobile ? "left-32" : "right-[50rem]"}`} />

      {/* Floating button */}
      <button
        onClick={() => router.push("/")}
        className="fixed bottom-6 right-6 z-50 px-4 py-2 rounded-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow-lg transition"
      >
        Make your own card
      </button>
    </div>
  );
}

export default function CardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const encoded = searchParams.get("d");

  const [isPlaying, setIsPlaying] = useState(false);
  const controls = useAnimation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    audioRef.current = new Audio("/onam-bgm.mp3");
    audioRef.current.loop = true;
  }, []);

  const toggleMusicAndAnimation = () => {
    if (isPlaying) {
      controls.stop();
      audioRef.current?.pause();
      audioRef.current!.currentTime = 0;
    } else {
      controls.start(giggleAnimation);
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  if (!encoded) {
    return <p className="text-center mt-10 text-red-600">Invalid or missing greeting details.</p>;
  }

  let name = "";
  let msg = "";
  try {
    const decoded = atob(encoded);
    const data = JSON.parse(decoded);
    name = data.name;
    msg = data.message;
  } catch {
    return <p className="text-center mt-10 text-red-600">Invalid greeting link.</p>;
  }

  return (
    <CardLayout
      name={name}
      msg={msg}
      isPlaying={isPlaying}
      toggleMusicAndAnimation={toggleMusicAndAnimation}
      router={router}
      isMobile={isMobile}
    />
  );
}
