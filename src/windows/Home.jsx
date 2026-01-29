import clsx from "clsx";
import { motion } from "framer-motion";

// import WindowWrapper from "#hoc/WindowWrapper"
import useWindowStore from "#store/window";
import { locations } from "#constants";

const projects = locations.work?.children ?? [];
import useLocationStore from "#store/location";

// Split projects: first column gets one more than second
const midPoint = Math.ceil((projects.length + 1) / 2);
const firstColumn = projects.slice(0, midPoint);
const secondColumn = projects.slice(midPoint);

const Home = () => {
  const { setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore();

  const handleOpenProject = (project) => {
    openWindow("finder");
    setActiveLocation(project);
  };

  const renderFolder = (project) => (
    <motion.li
      whileTap={{ scale: 0.94 }}
      drag
      key={project.id}
      className={clsx("group folder")}
      onClick={() => handleOpenProject(project)}
    >
      <img src="/images/folder.png" alt={project.name} />
      <p>{project.name}</p>
    </motion.li>
  );

  return (
    <section id="home">
      <div className="flex gap-3">
        <ul className="flex flex-col gap-3">{firstColumn.map(renderFolder)}</ul>
        <ul className="flex flex-col gap-3">
          {secondColumn.map(renderFolder)}
        </ul>
      </div>
    </section>
  );
};

export default Home;
