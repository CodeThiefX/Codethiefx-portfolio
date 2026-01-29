import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Grid,
  Share2,
} from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper";

// Gallery images - using project images as gallery content
const galleryImages = [
  {
    id: 1,
    src: "/images/surgechain.png",
    title: "SurgeChain",
    category: "Web3",
  },
  { id: 2, src: "/images/sentfi.png", title: "SentFi", category: "Fintech" },
  { id: 3, src: "/images/valtrix.png", title: "Valtrix", category: "Agency" },
  {
    id: 4,
    src: "/images/mmit.png",
    title: "MentorMeInTech",
    category: "EdTech",
  },
  {
    id: 5,
    src: "/images/booklovo.png",
    title: "BookLovo",
    category: "Reading",
  },
  { id: 6, src: "/images/anchor.png", title: "GetAnchor", category: "Fintech" },
  {
    id: 7,
    src: "/images/tbm-events.png",
    title: "TBM Events",
    category: "Events",
  },
  {
    id: 8,
    src: "/images/peter-leo.png",
    title: "Peter Leo",
    category: "E-commerce",
  },
  {
    id: 9,
    src: "/images/avenue.png",
    title: "TT Avenue",
    category: "Business",
  },
  {
    id: 10,
    src: "/images/wages.png",
    title: "Wages Finance",
    category: "Mobile",
  },
  { id: 11, src: "/images/mycliq.png", title: "MyCliq", category: "Mobile" },
  { id: 12, src: "/images/sync360.png", title: "Sync360", category: "Mobile" },
  {
    id: 13,
    src: "/images/creator.png",
    title: "Create To Earn",
    category: "Web3",
  },
  { id: 14, src: "/images/reelpay.png", title: "ReelPay", category: "Creator" },
];

const categories = [
  "All",
  "Web3",
  "Fintech",
  "Mobile",
  "Agency",
  "E-commerce",
  "EdTech",
  "Events",
  "Business",
  "Reading",
  "Creator",
];

const Gallery = ({ isMaximized }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setZoom(1);
  };

  const handlePrev = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id,
    );
    const prevIndex =
      (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
    setZoom(1);
  };

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id,
    );
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
    setZoom(1);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  };

  return (
    <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* Title Bar */}
      <div
        className="flex items-center justify-between px-4 py-2 bg-gray-200/80 dark:bg-gray-800/80 
                      backdrop-blur border-b border-gray-300 dark:border-gray-700"
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <button className="w-3 h-3 rounded-full bg-red-500 hover:brightness-110" />
            <button className="w-3 h-3 rounded-full bg-yellow-500 hover:brightness-110" />
            <button className="w-3 h-3 rounded-full bg-green-500 hover:brightness-110" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <img src="/images/photos.png" alt="Photos" className="w-5 h-5" />
          <span className="text-sm font-medium">Gallery</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-gray-300/50 dark:hover:bg-gray-700/50 rounded">
            <Grid className="w-4 h-4 text-gray-500" />
          </button>
          <button className="p-1 hover:bg-gray-300/50 dark:hover:bg-gray-700/50 rounded">
            <Share2 className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div
        className="flex gap-2 p-3 overflow-x-auto bg-gray-50 dark:bg-gray-850 
                      border-b border-gray-200 dark:border-gray-700"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap
                       transition-colors ${
                         activeCategory === category
                           ? "bg-blue-500 text-white"
                           : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                       }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleImageClick(image)}
              className="aspect-square rounded-lg overflow-hidden cursor-pointer group
                       bg-gray-200 dark:bg-gray-800 relative"
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform 
                         group-hover:scale-105"
                loading="lazy"
              />
              <div
                className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity
                            flex items-end p-3"
              >
                <div>
                  <p className="text-white text-sm font-medium">
                    {image.title}
                  </p>
                  <p className="text-white/70 text-xs">{image.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <Grid className="w-12 h-12 mb-3 opacity-30" />
            <p>No images in this category</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/95 flex flex-col"
          >
            {/* Lightbox Header */}
            <div className="flex items-center justify-between p-4">
              <button
                onClick={() => setSelectedImage(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              <div className="text-white text-center">
                <p className="font-medium">{selectedImage.title}</p>
                <p className="text-sm text-white/60">
                  {selectedImage.category}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleZoomOut}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <ZoomOut className="w-5 h-5 text-white" />
                </button>
                <span className="text-white text-sm min-w-12 text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <ZoomIn className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Image Container */}
            <div className="flex-1 flex items-center justify-center overflow-hidden relative">
              <button
                onClick={handlePrev}
                className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 
                         transition-colors z-10"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <motion.img
                key={selectedImage.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: zoom }}
                exit={{ opacity: 0 }}
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-[80%] max-h-[80%] object-contain rounded-lg shadow-2xl"
                draggable={false}
              />

              <button
                onClick={handleNext}
                className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 
                         transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="p-4 overflow-x-auto">
              <div className="flex gap-2 justify-center">
                {filteredImages.map((image) => (
                  <button
                    key={image.id}
                    onClick={() => {
                      setSelectedImage(image);
                      setZoom(1);
                    }}
                    className={`w-16 h-12 rounded overflow-hidden shrink-0 transition-all
                               ${
                                 selectedImage.id === image.id
                                   ? "ring-2 ring-white scale-110"
                                   : "opacity-50 hover:opacity-80"
                               }`}
                  >
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WindowWrapper(Gallery, "photos");
