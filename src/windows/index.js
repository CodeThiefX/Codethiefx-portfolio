import { lazy } from "react";

const Terminal = lazy(() => import("./Terminal"));
const Safari = lazy(() => import("./Safari"));
const Resume = lazy(() => import("./Resume"));
const Finder = lazy(() => import("./Finder"));
const TextViewer = lazy(() => import("./TextViewer"));
const ImageViewer = lazy(() => import("./ImageViewer"));
const Contact = lazy(() => import("./Contact"));
const Home = lazy(() => import("./Home"));
const Gallery = lazy(() => import("./Gallery"));
const InteractiveResume = lazy(() => import("./InteractiveResume"));
const Testimonials = lazy(() => import("./Testimonials"));

export {
  Terminal,
  Safari,
  Resume,
  Finder,
  TextViewer,
  ImageViewer,
  Contact,
  Home,
  Gallery,
  InteractiveResume,
  Testimonials,
};
