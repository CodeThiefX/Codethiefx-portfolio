import { motion } from "framer-motion";
import IOSAppIcon from "./iOSAppIcon";

const IOSDock = ({ apps, onAppClick }) => {
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2"
    >
      <div className="flex items-center justify-center gap-4 px-5 py-3 bg-white/20 backdrop-blur-xl rounded-[28px] border border-white/20">
        {apps.map((app) => (
          <IOSAppIcon
            key={app.id}
            icon={`/images/${app.icon}`}
            name={app.name}
            onClick={() => onAppClick(app)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default IOSDock;
