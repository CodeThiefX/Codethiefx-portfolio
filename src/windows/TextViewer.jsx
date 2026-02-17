import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import { Github, Twitter } from "lucide-react";

const TextViewer = ({ onDragStart }) => {
  const { windows } = useWindowStore();
  const data = windows.txtfile?.data;

  if (!data) return null;

  const { name, image, subtitle, description } = data;

  return (
    <div className="h-full w-full flex flex-col">
      <div id="window-header" onPointerDown={onDragStart}>
        <WindowControls target="txtfile" />
      </div>

      <div className="p-4 space-y-6 bg-white dark:bg-[#1e1e1e] flex-1 overflow-y-auto">
        {name === "about-me.txt" ? (
          <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto pt-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gray-200 dark:bg-gray-700 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <img
                src="https://github.com/CodeThiefX.png"
                alt="Profile"
                className="relative w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 object-cover shadow-2xl"
              />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Promise Adesiyan
              </h1>
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                {subtitle}
              </p>
            </div>

            <div className="space-y-4 text-left w-full px-4 sm:px-12">
              {Array.isArray(description) &&
                description.map((para, index) => (
                  <p
                    key={index}
                    className="text-gray-600 dark:text-gray-300 leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
            </div>

            <div className="flex items-center gap-4 pt-4">
              <a
                href="https://github.com/CodeThiefX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2 bg-[#24292e] text-white rounded-full font-medium hover:bg-[#2f363d] hover:scale-105 transition-all shadow-lg"
              >
                <Github size={20} />
                <span>GitHub</span>
              </a>
              <a
                href="https://x.com/ceWayne_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 hover:scale-105 transition-all shadow-lg"
              >
                <Twitter size={20} />
                <span>Twitter</span>
              </a>
            </div>
          </div>
        ) : (
          <>
            {image ? (
              <div className="w-full">
                <img src={image} alt={name} className="w-full h-auto rounded" />
              </div>
            ) : null}

            {subtitle ? (
              <h2 className="text-lg font-semibold dark:text-gray-200">
                {subtitle}
              </h2>
            ) : null}

            {Array.isArray(description) && description.length > 0 ? (
              <div className="space-y-2">
                {description.map((para, index) => (
                  <p
                    key={index}
                    className="leading-relaxed text-base dark:text-gray-300"
                  >
                    {para}
                  </p>
                ))}
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

const TextWindow = WindowWrapper(TextViewer, "txtfile");

export default TextWindow;
