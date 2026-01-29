import { Navbar, Welcome, Dock, MobileOverlay } from "#components";
import {
  Safari,
  Terminal,
  Resume,
  Finder,
  TextViewer,
  ImageViewer,
  Contact,
  Home,
} from "#windows";

// import gsap from "gsap";
// import { Draggable } from "gsap/Draggable";
// gsap.registerPlugin(Draggable);

function App() {
  return (
    <main>
      <MobileOverlay />
      <Navbar />
      <Welcome />
      <Dock />

      <Safari />
      <Terminal />
      <Resume />
      <Finder />
      <TextViewer />
      <ImageViewer />

      <Contact />
      {/* <Gallery /> */}
      <Home />
    </main>
  );
}

export default App;
