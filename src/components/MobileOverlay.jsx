import { Monitor, Tablet, Smartphone } from "lucide-react";

const MobileOverlay = () => {
  return (
    <div className="sm:hidden fixed inset-0 z-[99999] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center">
      <div className="bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl max-w-sm">
        {/* <div className="flex justify-center gap-4 mb-6">
          <Monitor className="w-10 h-10 text-blue-400" />
          <Tablet className="w-8 h-8 text-blue-300" />
        </div> */}

        <div className="mb-6 relative">
          <Smartphone className="w-16 h-16 text-white/60 mx-auto" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-1 bg-red-500 rotate-45 rounded-full"></div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">Desktop Only</h2>

        <p className="text-white/70 text-sm leading-relaxed mb-6">
          This portfolio is optimized for desktop and tablet viewing. Please
          visit on a larger screen for the best experience.
        </p>

        <div className="flex items-center justify-center gap-2 text-white/50 text-xs">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span>CodeThiefx Portfolio</span>
        </div>
      </div>
    </div>
  );
};

export default MobileOverlay;
