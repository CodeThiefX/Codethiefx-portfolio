import { motion } from "framer-motion";

const iOSAppIcon = ({ icon, name, onClick, badge }) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.85 }}
      className="flex flex-col items-center gap-1.5 w-[72px]"
    >
      {/* Icon Container */}
      <div className="relative">
        <div className="w-14 h-14 rounded-[14px] overflow-hidden shadow-lg bg-white/10 backdrop-blur-sm">
          <img src={icon} alt={name} className="w-full h-full object-cover" />
        </div>

        {/* Notification Badge */}
        {badge && (
          <div className="absolute -top-1 -right-1 min-w-5 h-5 bg-red-500 rounded-full flex items-center justify-center px-1.5">
            <span className="text-white text-xs font-bold">{badge}</span>
          </div>
        )}
      </div>

      {/* App Name */}
      <span className="text-white text-[11px] font-medium text-center leading-tight line-clamp-1 w-full">
        {name}
      </span>
    </motion.button>
  );
};

export default iOSAppIcon;
