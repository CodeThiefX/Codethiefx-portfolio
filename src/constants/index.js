const navLinks = [
  {
    id: 1,
    name: "Contact",
    type: "contact",
  },
  {
    id: 2,
    name: "Resume",
    type: "resume",
  },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

const dockApps = [
  {
    id: "finder",
    name: "Portfolio", // was "Finder"
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Articles", // was "Safari"
    icon: "safari.png",
    canOpen: true,
  },
  // {
  //   id: "photos",
  //   name: "Gallery", // was "Photos"
  //   icon: "photos.png",
  //   canOpen: true,
  // },
  {
    id: "contact",
    name: "Contact", // or "Get in touch"
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Skills", // was "Terminal"
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Archive", // was "Trash"
    icon: "trash.png",
    canOpen: false,
  },
];

const blogPosts = [
  {
    id: 1,
    date: "Jan 15, 2026",
    title:
      "TypeScript Explained: What It Is, Why It Matters, and How to Master It",
    image: "/images/blog1.png",
    link: "https://youtu.be/ZvZ7gvcmPmI?si=MEZr5TPduAGtzRVU",
  },
  {
    id: 2,
    date: "Jan 10, 2026",
    title: "The Ultimate Guide to Flutter for Mobile Development",
    image: "/images/blog2.png",
    link: "https://youtu.be/3kaGC_DrUnw?si=JQjwtV-FxVhi5dNU",
  },
  {
    id: 3,
    date: "Jan 5, 2026",
    title: "The Ultimate Guide to Mastering GSAP Animations",
    image: "/images/blog3.png",
    link: "https://youtu.be/AW1yfBKRMKc?si=ZrKw-7Ze1HCJvBGO",
  },
  {
    id: 4,
    date: "Dec 28, 2025",
    title: "Building Modern DeFi Applications with React and Web3",
    image: "/images/blog1.png",
    link: "https://youtu.be/ZvZ7gvcmPmI?si=MEZr5TPduAGtzRVU",
  },
  {
    id: 5,
    date: "Dec 20, 2025",
    title: "Next.js 15: What's New and How to Get Started",
    image: "/images/blog2.png",
    link: "https://youtu.be/3kaGC_DrUnw?si=JQjwtV-FxVhi5dNU",
  },
  {
    id: 6,
    date: "Dec 12, 2025",
    title: "Creating Stunning UI Animations with Framer Motion",
    image: "/images/blog3.png",
    link: "https://youtu.be/AW1yfBKRMKc?si=ZrKw-7Ze1HCJvBGO",
  },
];

const techStack = [
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "TypeScript", "Angular", "Remix.js"],
  },
  {
    category: "Mobile",
    items: ["React Native", "Expo", "Dart(Flutter)"],
  },
  {
    category: "Styling",
    items: ["Tailwind CSS", "Sass", "Bootstrap", "CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "NextJS", "Python", "Express.js"],
  },
  {
    category: "Database",
    items: ["MongoDB", "PostgreSQL", "Supabase", "SQL"],
  },
  {
    category: "Dev Tools",
    items: [
      "Git",
      "GitHub",
      "Docker",
      "AI",
      "Postman",
      "Swagger",
      "Figma",
      "CI/CD pipelines",
    ],
  },
];

const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/CodeThiefX",
  },
  // {
  //   id: 2,
  //   text: "Platform",
  //   icon: "/icons/atom.svg",
  //   bg: "#4bcb63",
  //   link: "https://jsmastery.com/",
  // },
  {
    id: 2,
    text: "Twitter/X",
    icon: "/icons/twitter.svg",
    bg: "#ff866b",
    link: "https://x.com/ceWayne_",
  },
  {
    id: 3,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/company/javascriptmastery/posts/?feedView=all",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  // {
  //   id: 1,
  //   img: "/images/gal1.png",
  // },
  // {
  //   id: 2,
  //   img: "/images/gal2.png",
  // },
  // {
  //   id: 3,
  //   img: "/images/gal3.png",
  // },
  // {
  //   id: 4,
  //   img: "/images/gal4.png",
  // },
];

export {
  navLinks,
  navIcons,
  dockApps,
  blogPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
};

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Projects",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // ▶ Project 1
    {
      id: 5,
      name: "SURGECHAIN",
      icon: "/images/folder.png",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "SURGECHAIN.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          description: [
            "SurgeChain is a comprehensive DeFi trading platform for cryptocurrency enthusiasts and traders.",
            "It offers lightning-fast Turbo Trades, AI-powered market insights, and seamless multi-chain support across Ethereum, Solana, Base, and more.",
            "Think of it like having a professional trading terminal—with real-time analytics, MEV protection, and advanced trading features at your fingertips.",
            "Built with modern web technologies, it delivers a fast, secure, and intuitive trading experience for the decentralized finance ecosystem.",
          ],
        },
        {
          id: 2,
          name: "nike.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://app.surgechain.io/",
        },
        {
          id: 4,
          name: "surgechain.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/surgechain.png",
        },
        // {
        //   id: 5,
        //   name: "Design.fig",
        //   icon: "/images/plain.png",
        //   kind: "file",
        //   fileType: "fig",
        //   href: "https://google.com",
        // },
      ],
    },

    // ▶ Project 2
    {
      id: 6,
      name: "SENTFI",
      icon: "/images/folder.png",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "SENTFI.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          description: [
            "SentFi is a modern finance and commerce platform designed to protect web3 users from scams and fraud.",
            "It supports personal and business loans, peer-to-peer commerce, NFT insurance, and anti-rug pull protection for NFT investors.",
            "Think of it like having a trusted financial guardian—ensuring you never buy or sell anything without proper security measures.",
            "Built with a sleek, modern interface, SentFi bridges traditional commerce with the new world of blockchain-based finance.",
          ],
        },
        {
          id: 2,
          name: "sentfi.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://sentfi.jeremy0x.dev/",
        },
        {
          id: 4,
          name: "sentfi.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/sentfi.png",
        },
        // {
        //   id: 5,
        //   name: "Design.fig",
        //   icon: "/images/plain.png",
        //   kind: "file",
        //   fileType: "fig",
        //   href: "https://google.com",
        // },
      ],
    },

    // ▶ Project 3
    {
      id: 7,
      name: "VALTRIX",
      icon: "/images/folder.png",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "VALTRIX.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          description: [
            "Valtrix is a full-service creative design and development agency that amplifies your brand's digital presence.",
            "They specialize in eye-catching branding, beautiful website design, and campaigns that stand out from the norm.",
            "Think of it like having a creative partner—crafting digital experiences, building brand strategies, and delivering impactful results.",
            "The website showcases their portfolio with bold visuals, smooth animations, and a premium, professional aesthetic.",
          ],
        },
        {
          id: 2,
          name: "valtrix.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://valtrix.jeremy0x.dev/",
        },
        {
          id: 4,
          name: "valtrix.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/valtrix.png",
        },
        // {
        //   id: 5,
        //   name: "Design.fig",
        //   icon: "/images/plain.png",
        //   kind: "file",
        //   fileType: "fig",
        //   href: "https://google.com",
        // },
      ],
    },

    // ▶ Project 4
    {
      id: 8,
      name: "MENTORMEINTECH",
      icon: "/images/folder.png",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "MENTORMEINTECH.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          description: [
            "MentorMeInTech is a community-driven mentorship platform connecting aspiring tech professionals with experienced mentors.",
            "It offers free mentorship across various tech paths including Product Design, Data Analysis, Frontend/Backend Development, and Product Management.",
            "Think of it like having a personal tech guide—helping Africans transition into tech careers with quality mentorship and support.",
            "Built with a clean, modern interface, the platform makes it easy to find mentors, book sessions, and start your tech journey.",
          ],
        },
        {
          id: 2,
          name: "mentormeintech.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://mentormeintech.jeremy0x.dev/",
        },
        {
          id: 4,
          name: "mentormeintech.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/mmit.png",
        },
        // {
        //   id: 5,
        //   name: "Design.fig",
        //   icon: "/images/plain.png",
        //   kind: "file",
        //   fileType: "fig",
        //   href: "https://google.com",
        // },
      ],
    },

    // ▶ Project 5
    {
      id: 9,
      name: "BOOKLOVO",
      icon: "/images/folder.png",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "BOOKLOVO.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          description: [
            "BookLovo is a modern book discovery and reading platform for book enthusiasts and avid readers.",
            "It provides a curated collection of books, making it easy to discover new titles, track reading progress, and connect with fellow book lovers.",
            "Think of it like having a digital library—organized, accessible, and designed to enhance your reading experience.",
            "Built with React and modern web technologies, it delivers a fast, responsive, and visually appealing interface.",
          ],
        },
        {
          id: 2,
          name: "booklovo.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://booklovo.com/",
        },
        {
          id: 4,
          name: "booklovo.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/booklovo.png",
        },
        // {
        //   id: 5,
        //   name: "Design.fig",
        //   icon: "/images/plain.png",
        //   kind: "file",
        //   fileType: "fig",
        //   href: "https://google.com",
        // },
      ],
    },

    // ▶ Project 6
    {
      id: 10,
      name: "GETANCHOR",
      icon: "/images/folder.png",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "GETANCHOR.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          description: [
            "GetAnchor is a Nigerian fintech platform that provides secured real estate-backed loans with a simplified application process.",
            "It offers personal loans, business loans, home loans, and auto loans with flexible repayment options and real-time tracking.",
            "Think of it like having a trusted lending partner—fast approvals, transparent processes, and secure transactions at your fingertips.",
            "Built with a modern, user-friendly interface, it streamlines the entire borrowing journey from application to disbursement.",
          ],
        },
        {
          id: 2,
          name: "getanchor.africa",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://getanchor.africa/",
        },
        {
          id: 4,
          name: "getanchor.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/anchor.png",
        },
        // {
        //   id: 5,
        //   name: "Design.fig",
        //   icon: "/images/plain.png",
        //   kind: "file",
        //   fileType: "fig",
        //   href: "https://google.com",
        // },
      ],
    },

    // ▶ Project 7
    {
      id: 11,
      name: "TBM EVENTS",
      icon: "/images/folder.png",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "TBM EVENTS.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          description: [
            "TBM Events is a modern event management platform that helps organizers create unforgettable experiences.",
            "It enables users to create stunning event pages, invite guests, and sell tickets seamlessly for any type of gathering.",
            "Think of it like having an all-in-one event toolkit—bringing your gatherings to life with professional-grade tools.",
            "Built with a clean, minimalist design, it makes event creation and management simple and accessible for everyone.",
          ],
        },
        {
          id: 2,
          name: "thetbmevents.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://thetbmevents.com/",
        },
        {
          id: 4,
          name: "tbmevents.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/tbm-events.png",
        },
        // {
        //   id: 5,
        //   name: "Design.fig",
        //   icon: "/images/plain.png",
        //   kind: "file",
        //   fileType: "fig",
        //   href: "https://google.com",
        // },
      ],
    },

    // ▶ Project 8
    {
      id: 12,
      name: "PETER'S E-COMMERCE",
      icon: "/images/folder.png",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "PETER'S E-COMMERCE.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          description: [
            "Peter Leo E-Commerce is a modern online shopping platform offering a curated selection of products.",
            "It provides a seamless shopping experience with intuitive navigation, product browsing, and secure checkout.",
            "Think of it like having a premium boutique store—accessible anytime, anywhere, with products delivered to your doorstep.",
            "Built with React and modern web technologies, it delivers a fast, responsive, and visually appealing shopping experience.",
          ],
        },
        {
          id: 2,
          name: "originalpeterleo.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://originalpeterleo.com/",
        },
        {
          id: 4,
          name: "peters-ecommerce.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/peter-leo.png",
        },
        // {
        //   id: 5,
        //   name: "Design.fig",
        //   icon: "/images/plain.png",
        //   kind: "file",
        //   fileType: "fig",
        //   href: "https://google.com",
        // },
      ],
    },

    // ▶ Project 9
    {
      id: 13,
      name: "TT AVENUE",
      icon: "/images/folder.png",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "TT AVENUE.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          description: [
            "TT Avenue is a comprehensive digital platform designed for modern commerce and business solutions.",
            "It offers e-commerce functionality, business management tools, and customer engagement features.",
            "Think of it like having a complete business hub—streamlining operations and connecting with customers efficiently.",
            "Built with modern web technologies, it delivers a professional and polished digital experience for businesses.",
          ],
        },
        {
          id: 2,
          name: "ttavenue.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://ttavenue.com/",
        },
        {
          id: 4,
          name: "ttavenue.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/avenue.png",
        },
        // {
        //   id: 5,
        //   name: "Design.fig",
        //   icon: "/images/plain.png",
        //   kind: "file",
        //   fileType: "fig",
        //   href: "https://google.com",
        // },
      ],
    },

    // ▶ Project 10
    {
      id: 14,
      name: "WAGES FINANCE",
      icon: "/images/folder.png",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "WAGES FINANCE.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          description: [
            "Wages Finance is a digital cooperative mobile app that helps users manage finances collaboratively.",
            "It provides tools for group savings, contributions, loans, and financial management within cooperative communities.",
            "Think of it like having a digital thrift society—making cooperative finance accessible, transparent, and convenient.",
            "Built with React Native, it works seamlessly on mobile devices with a clean, intuitive interface.",
          ],
        },
        {
          id: 2,
          name: "wagesfinance.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://play.google.com/store/apps/details?id=com.wages.wages_finance&hl=en",
        },
        {
          id: 4,
          name: "wagesfinance.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/wages.png",
        },
        // {
        //   id: 5,
        //   name: "Design.fig",
        //   icon: "/images/plain.png",
        //   kind: "file",
        //   fileType: "fig",
        //   href: "https://google.com",
        // },
      ],
    },

    // ▶ Project 11
    {
      id: 15,
      name: "MYCLIQ",
      icon: "/images/folder.png",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "TBM EVENTS.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          description: [
            "Mycliq is a QR payment and money transfer mobile app that simplifies digital transactions.",
            "It enables users to make quick payments via QR codes, transfer money instantly, and manage their wallet with ease.",
            "Think of it like having a digital wallet—fast, secure, and convenient for all your everyday payment needs.",
            "Built with React Native, it delivers a smooth, reliable experience on both Android and iOS devices.",
          ],
        },
        {
          id: 2,
          name: "mycliq.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://play.google.com/store/apps/details?id=app.mycliq.user&hl=en",
        },
        {
          id: 4,
          name: "mycliq.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/mycliq.png",
        },
        // {
        //   id: 5,
        //   name: "Design.fig",
        //   icon: "/images/plain.png",
        //   kind: "file",
        //   fileType: "fig",
        //   href: "https://google.com",
        // },
      ],
    },

    // ▶ Project 12
    {
      id: 16,
      name: "SYNC360",
      icon: "/images/folder.png",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "SYNC360.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          description: [
            "Sync360 is an inventory management mobile app designed specifically for small and medium enterprises.",
            "It helps business owners track stock levels, manage products, and keep their inventory organized efficiently.",
            "Think of it like having a smart inventory assistant—keeping your business operations running smoothly.",
            "Built with React Native, it delivers a clean, intuitive experience on both Android and iOS devices.",
          ],
        },
        {
          id: 2,
          name: "sync360.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://play.google.com/store/apps/details?id=com.sync.sink&hl=en",
        },
        {
          id: 4,
          name: "sync360.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/sync360.png",
        },
        // {
        //   id: 5,
        //   name: "Design.fig",
        //   icon: "/images/plain.png",
        //   kind: "file",
        //   fileType: "fig",
        //   href: "https://google.com",
        // },
      ],
    },

    // ▶ Project 13
    {
      id: 17,
      name: "CREATE TO EARN",
      icon: "/images/folder.png",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "CREATE TO EARN.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          description: [
            "Create To Earn is a decentralized creator economy platform powered by Solana blockchain.",
            "It lets creators launch challenges with SOL rewards, while participants submit content to win payouts.",
            "Think of it like having a Web3 talent platform—connecting creators, brands, and participants in a rewarding ecosystem.",
            "Built with Next.js, it delivers a premium experience with instant crypto payouts and seamless challenge management.",
          ],
        },
        {
          id: 2,
          name: "createtoearn.app",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://createtoearn.app/",
        },
        {
          id: 4,
          name: "createtorpng",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/creator.png",
        },
        // {
        //   id: 5,
        //   name: "Design.fig",
        //   icon: "/images/plain.png",
        //   kind: "file",
        //   fileType: "fig",
        //   href: "https://google.com",
        // },
      ],
    },

    // ▶ Project 14
    {
      id: 18,
      name: "REELPAY",
      icon: "/images/folder.png",
      kind: "folder",
      children: [
        {
          id: 1,
          name: "REELPAY.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          description: [
            "Reelpay is a creator marketplace platform that connects talented content creators with brands and hirers looking for their services.",
            "Creators showcase their portfolio and content, while hirers can discover talent, send offers, and pay for work—all in one seamless platform.",
            "Think of it like having a professional talent hub—where content creators get discovered, hired, and paid for their creative work.",
            "Built with Next.js and a modern tech stack, it delivers a sleek experience for both creators and businesses looking to collaborate.",
          ],
        },
        {
          id: 2,
          name: "reelpay.co",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://reelpay.co/",
        },
        {
          id: 4,
          name: "reelpay.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          imageUrl: "/images/reelpay.png",
        },
        // {
        //   id: 5,
        //   name: "Design.fig",
        //   icon: "/images/plain.png",
        //   kind: "file",
        //   fileType: "fig",
        //   href: "https://google.com",
        // },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "coming-soon.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      subtitle: "Coming Soon",
      description: [
        "🚧 This section is under construction!",
        "I'm currently working on adding my personal photos and a proper about me description.",
        "Check back soon for updates!",
      ],
    },
    // {
    //   id: 1,
    //   name: "me.png",
    //   icon: "/images/image.png",
    //   kind: "file",
    //   fileType: "img",
    //   imageUrl: "/images/adrian.jpg",
    // },
    // {
    //   id: 2,
    //   name: "casual-me.png",
    //   icon: "/images/image.png",
    //   kind: "file",
    //   fileType: "img",
    //   imageUrl: "/images/adrian-2.jpg",
    // },
    // {
    //   id: 3,
    //   name: "conference-me.png",
    //   icon: "/images/image.png",
    //   kind: "file",
    //   fileType: "img",
    //   imageUrl: "/images/adrian-3.jpeg",
    // },
    // {
    //   id: 4,
    //   name: "about-me.txt",
    //   icon: "/images/txt.png",
    //   kind: "file",
    //   fileType: "txt",
    //   subtitle: "Meet the Developer Behind the Code",
    //   image: "/images/adrian.jpg",
    //   description: [
    //     "Hey! I’m Codethiefx 👋, a web developer who enjoys building sleek, interactive websites that actually work well.",
    //     "I specialize in JavaScript, React, and Next.js—and I love making things feel smooth, fast, and just a little bit delightful.",
    //     "I’m big on clean UI, good UX, and writing code that doesn’t need a search party to debug.",
    //     "Outside of dev work, you'll find me tweaking layouts at 2AM, sipping overpriced coffee, or impulse-buying gadgets I absolutely convinced myself I needed 😅",
    //   ],
    // },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      // you can add `href` if you want to open a hosted resume
      // href: "/your/resume/path.pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "trash1.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      imageUrl: "/images/trash-1.png",
    },
    {
      id: 2,
      name: "trash2.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      imageUrl: "/images/trash-2.png",
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  contact: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  resume: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  safari: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  photos: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  terminal: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  txtfile: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  imgfile: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  testimonials: {
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };
