import { useState, useRef, useEffect, useCallback } from "react";
import { Check, Flag } from "lucide-react";

import { techStack, socials, locations } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import WindowControls from "#components/WindowControls";

// Available commands
const commands = {
  help: {
    description: "Show available commands",
    execute: () => ({
      type: "list",
      content: [
        "Available commands:",
        "",
        "  help      - Show this help message",
        "  about     - Learn about me",
        "  skills    - View my tech stack",
        "  projects  - List my projects",
        "  contact   - Get my contact info",
        "  clear     - Clear the terminal",
        "  social    - View social links",
        "",
        "Tip: Type a command and press Enter",
      ],
    }),
  },
  about: {
    description: "About me",
    execute: () => ({
      type: "text",
      content: [
        "┌────────────────────────────────────┐",
        "│           ABOUT CODETHIEFX         │",
        "├────────────────────────────────────┤",
        "│ Full-Stack Developer & Designer    │",
        "│ Building digital experiences that  │",
        "│ delight and inspire.               │",
        "│                                    │",
        "│ Passionate about clean code,       │",
        "│ modern UI/UX, and creating         │",
        "│ impactful solutions.               │",
        "└────────────────────────────────────┘",
      ],
    }),
  },
  skills: {
    description: "View tech stack",
    execute: () => ({
      type: "skills",
      content: techStack,
    }),
  },
  projects: {
    description: "List projects",
    execute: () => {
      const projectList = [];
      Object.values(locations || {}).forEach((location) => {
        if (location.children) {
          location.children.forEach((child) => {
            if (child.kind === "folder") {
              projectList.push(child.name);
            }
          });
        }
      });
      return {
        type: "list",
        content: ["My Projects:", "", ...projectList.map((p) => `  → ${p}`)],
      };
    },
  },
  contact: {
    description: "Contact information",
    execute: () => ({
      type: "list",
      content: [
        "📧 Email: timiwade97@gmail.com",
        "🐙 GitHub: github.com/CodeThiefX",
        "🐦 Twitter: @ceWayne_",
        "",
        "Open for opportunities & collaborations!",
      ],
    }),
  },
  social: {
    description: "Social links",
    execute: () => ({
      type: "list",
      content: socials.map((s) => `  ${s.text}: ${s.link}`),
    }),
  },
  clear: {
    description: "Clear terminal",
    execute: () => ({ type: "clear" }),
  },
};

const TypewriterText = ({ text, onComplete, onUpdate, className }) => {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = Array.isArray(text) ? text.join("\n") : text;
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayedText("");

    // Calculate delay to ensure total duration < 2000ms
    // Min delay 10ms, max delay 50ms
    const totalDuration = 2000;
    const calculatedDelay = Math.max(
      10,
      Math.min(50, totalDuration / fullText.length),
    );
    // If text is very long, type multiple chars per tick
    const charsPerTick =
      calculatedDelay === 10
        ? Math.ceil(fullText.length / (totalDuration / 10))
        : 1;

    const intervalId = setInterval(() => {
      if (indexRef.current < fullText.length) {
        indexRef.current += charsPerTick;
        // Ensure index doesn't exceed length, though slice handles it gracefully
        setDisplayedText(fullText.slice(0, indexRef.current));
        if (onUpdate) onUpdate();
      } else {
        clearInterval(intervalId);
        // Ensure full text is displayed at end
        setDisplayedText(fullText);
        if (onUpdate) onUpdate();
        if (onComplete) onComplete();
      }
    }, calculatedDelay);

    return () => clearInterval(intervalId);
  }, [fullText, onComplete, onUpdate]);

  return (
    <div className={`whitespace-pre-wrap ${className}`}>{displayedText}</div>
  );
};

const Terminal = ({ onDragStart }) => {
  const [history, setHistory] = useState([
    { type: "system", content: "Welcome to CodeThiefx Terminal v1.0" },
    { type: "system", content: 'Type "help" for available commands.\n' },
    {
      type: "system",
      content: (
        <span>
          <Flag size={15} fill="currentColor" className="inline mr-2" />
          Interactive terminal ready
        </span>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  // Auto-scroll to bottom function
  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  // Auto-scroll when history changes
  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    // Add to history
    setHistory((prev) => [
      ...prev,
      { type: "input", content: `@CodeThief % ${cmd}` },
    ]);

    if (!trimmedCmd) return;

    // Add to command history
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    const command = commands[trimmedCmd];

    if (command) {
      const result = command.execute();

      if (result.type === "clear") {
        setHistory([{ type: "system", content: "Terminal cleared.\n" }]);
      } else if (result.type === "skills") {
        setHistory((prev) => [
          ...prev,
          { type: "skills", content: result.content },
        ]);
      } else if (result.type === "list") {
        setHistory((prev) => [
          ...prev,
          { type: "typewriter", content: result.content },
        ]);
      } else if (result.type === "text") {
        setHistory((prev) => [
          ...prev,
          { type: "typewriter", content: result.content },
        ]);
      }
    } else {
      setHistory((prev) => [
        ...prev,
        {
          type: "error",
          content: `Command not found: ${trimmedCmd}. Type "help" for available commands.`,
        },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex < commandHistory.length - 1
            ? historyIndex + 1
            : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div
      className="h-full w-full flex flex-col cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div id="window-header" onPointerDown={onDragStart}>
        <WindowControls target="terminal" />
        <h2>Terminal</h2>
      </div>

      <div
        ref={terminalRef}
        className="techstack flex-1 overflow-y-auto font-mono text-sm"
      >
        {history.map((entry, idx) => (
          <div key={idx} className="mb-1">
            {entry.type === "input" && (
              <p className="text-teal-400">{entry.content}</p>
            )}
            {entry.type === "system" && (
              <div className="text-gray-400">{entry.content}</div>
            )}
            {entry.type === "error" && (
              <div className="text-red-400">
                <TypewriterText
                  text={entry.content}
                  onUpdate={scrollToBottom}
                />
              </div>
            )}
            {entry.type === "output" && (
              <div className="text-gray-300 whitespace-pre-wrap">
                {entry.content.map((line, i) => (
                  <p key={i}>{line || "\u00A0"}</p>
                ))}
              </div>
            )}
            {entry.type === "typewriter" && (
              <div className="text-gray-300">
                <TypewriterText
                  text={entry.content}
                  onUpdate={scrollToBottom}
                />
              </div>
            )}
            {entry.type === "skills" && (
              <div className="mt-2 mb-4">
                <p className="text-teal-400 mb-2">─── Tech Stack ───</p>
                {entry.content.map(({ category, items }) => (
                  <div key={category} className="flex items-start mb-2">
                    <Check
                      className="text-teal-600 w-4 mr-2 mt-0.5"
                      size={16}
                    />
                    <div>
                      <span className="text-teal-400 font-semibold">
                        {category}:
                      </span>
                      <span className="text-gray-300 ml-2">
                        <TypewriterText
                          text={items.join(", ")}
                          onUpdate={scrollToBottom}
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Input Line */}
        <div className="flex items-center text-teal-400">
          <span className="text-teal-400 font-bold mr-2">@CodeThief %</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-teal-400 caret-teal-400"
            autoFocus
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
