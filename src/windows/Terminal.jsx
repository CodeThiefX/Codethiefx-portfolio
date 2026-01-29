import { Check, Flag } from "lucide-react";
// import { motion } from 'framer-motion'

import { techStack } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import WindowControls from "#components/WindowControls";

const Terminal = () => {
  return (
    <div className="h-full w-full flex flex-col">
      <div id="window-header">
        <WindowControls target="terminal" />
        <h2>Tech Stack</h2>
      </div>

      <div className="techstack flex-1 overflow-y-auto">
        <p>
          <span className="font-bold">@CodeThief % </span>
          show tech stack
        </p>

        <div className="label">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>
        <ul className="content">
          {techStack.map(({ category, items }) => (
            <li key={category} className="flex items-center">
              <Check className="check" size={20} />
              <h3>{category}</h3>
              <ul className="flex flex-wrap">
                {items.map((item, i) => (
                  <li key={i}>
                    {item}
                    {i < items.length - 1 ? "," : ""}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="footnote">
          <p>
            <Check size={20} /> {techStack.length} of {techStack.length} stacks
            loaded successfully (100%)
          </p>

          <p className="time">
            <Flag size={15} fill="white" />
            Render time: 6ms
          </p>
        </div>
      </div>
    </div>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
