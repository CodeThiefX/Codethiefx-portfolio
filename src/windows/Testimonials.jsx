import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Star, ChevronLeft, Quote } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper";

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp",
    avatar: "SJ",
    avatarColor: "bg-blue-500",
    rating: 5,
    date: "Dec 2024",
    message:
      "Working with Tomiwa was an absolute pleasure. He delivered our DeFi platform ahead of schedule with exceptional code quality. His understanding of blockchain technology and user experience is remarkable.",
    project: "SurgeChain",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Startup Founder",
    company: "FinTech Labs",
    avatar: "MC",
    avatarColor: "bg-green-500",
    rating: 5,
    date: "Nov 2024",
    message:
      "Tomiwa built our mobile app from scratch. The attention to detail in the UI and the smooth animations made our users love the app. Highly recommend for any React Native project!",
    project: "Wages Finance",
  },
  {
    id: 3,
    name: "Emma Williams",
    role: "Creative Director",
    company: "Design Agency",
    avatar: "EW",
    avatarColor: "bg-purple-500",
    rating: 5,
    date: "Oct 2024",
    message:
      "The website redesign exceeded our expectations. Modern, fast, and beautiful. Tomiwa understood our vision perfectly and translated it into a stunning web experience.",
    project: "Valtrix",
  },
  {
    id: 4,
    name: "David Okonkwo",
    role: "CEO",
    company: "EventPro",
    avatar: "DO",
    avatarColor: "bg-orange-500",
    rating: 5,
    date: "Sep 2024",
    message:
      "Our event platform needed a complete overhaul. Tomiwa delivered a modern, scalable solution that handles thousands of concurrent users. Great communication throughout!",
    project: "TBM Events",
  },
  {
    id: 5,
    name: "Lisa Nguyen",
    role: "Tech Lead",
    company: "BookTech",
    avatar: "LN",
    avatarColor: "bg-pink-500",
    rating: 5,
    date: "Aug 2024",
    message:
      "BookLovo has been a hit with our users thanks to Tomiwa's excellent frontend work. The reading experience is smooth and the UI is absolutely beautiful.",
    project: "BookLovo",
  },
];

const Testimonials = ({ isMaximized }) => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  return (
    <div className="h-full flex bg-gray-100 dark:bg-gray-900">
      {/* Sidebar - Conversation List */}
      <div
        className={`${selectedTestimonial && !isMaximized ? "hidden" : "flex"} 
                      md:flex flex-col w-full md:w-80 border-r border-gray-200 dark:border-gray-700 
                      bg-gray-50 dark:bg-gray-850`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="flex gap-2">
              <button className="w-3 h-3 rounded-full bg-red-500 hover:brightness-110" />
              <button className="w-3 h-3 rounded-full bg-yellow-500 hover:brightness-110" />
              <button className="w-3 h-3 rounded-full bg-green-500 hover:brightness-110" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm font-medium">Testimonials</span>
          </div>
          <div className="w-12" />
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {testimonials.map((testimonial) => (
            <motion.button
              key={testimonial.id}
              onClick={() => setSelectedTestimonial(testimonial)}
              whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
              className={`w-full flex items-start gap-3 p-3 border-b border-gray-200/50 dark:border-gray-700/50
                         text-left transition-colors ${
                           selectedTestimonial?.id === testimonial.id
                             ? "bg-blue-50 dark:bg-blue-900/20"
                             : ""
                         }`}
            >
              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-full ${testimonial.avatarColor} 
                            flex items-center justify-center text-white font-semibold shrink-0`}
              >
                {testimonial.avatar}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-medium text-gray-800 dark:text-white text-sm truncate">
                    {testimonial.name}
                  </span>
                  <span className="text-xs text-gray-400">
                    {testimonial.date}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {testimonial.role} at {testimonial.company}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 truncate mt-1">
                  {testimonial.message}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Content - Message View */}
      <div
        className={`${!selectedTestimonial && !isMaximized ? "hidden" : "flex"} 
                      md:flex flex-1 flex-col bg-white dark:bg-gray-900`}
      >
        <AnimatePresence mode="wait">
          {selectedTestimonial ? (
            <motion.div
              key={selectedTestimonial.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col"
            >
              {/* Message Header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setSelectedTestimonial(null)}
                  className="md:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div
                  className={`w-10 h-10 rounded-full ${selectedTestimonial.avatarColor} 
                              flex items-center justify-center text-white font-semibold`}
                >
                  {selectedTestimonial.avatar}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {selectedTestimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedTestimonial.role} at {selectedTestimonial.company}
                  </p>
                </div>
              </div>

              {/* Message Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-2xl mx-auto"
                >
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < selectedTestimonial.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-blue-500/20" />
                    <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed pl-6">
                      {selectedTestimonial.message}
                    </p>
                  </div>

                  {/* Project Tag */}
                  <div className="mt-6 flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Project:
                    </span>
                    <span
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 
                                   text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium"
                    >
                      {selectedTestimonial.project}
                    </span>
                  </div>

                  {/* Timestamp */}
                  <p className="mt-4 text-sm text-gray-400 dark:text-gray-500">
                    Received {selectedTestimonial.date}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-gray-400"
            >
              <MessageSquare className="w-16 h-16 mb-4 opacity-30" />
              <p className="text-lg">Select a testimonial to read</p>
              <p className="text-sm">From satisfied clients</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WindowWrapper(Testimonials, "testimonials");
