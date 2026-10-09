export const POPULAR_CATEGORIES = [
  { id: 'web-dev', name: 'Web Development', icon: 'Code', count: '1,420+ workers' },
  { id: 'mobile-dev', name: 'Mobile Development', icon: 'Smartphone', count: '890+ workers' },
  { id: 'ui-ux', name: 'UI/UX Design', icon: 'Layout', count: '1,150+ workers' },
  { id: 'graphic-design', name: 'Graphic Design', icon: 'Palette', count: '940+ workers' },
  { id: 'content-writing', name: 'Content Writing', icon: 'FileText', count: '760+ workers' },
  { id: 'digital-marketing', name: 'Digital Marketing', icon: 'TrendingUp', count: '810+ workers' },
  { id: 'data-science', name: 'Data Science & AI', icon: 'Database', count: '520+ workers' },
  { id: 'video-editing', name: 'Video Editing', icon: 'Video', count: '630+ workers' },
  { id: 'photography', name: 'Photography', icon: 'Camera', count: '480+ workers' },
  { id: 'translation', name: 'Translation & Localization', icon: 'Globe', count: '390+ workers' },
  { id: 'accounting', name: 'Accounting & Finance', icon: 'DollarSign', count: '310+ workers' },
  { id: 'consulting', name: 'Business Consulting', icon: 'Briefcase', count: '450+ workers' },
];

export const INITIAL_WORKERS = [
  {
    id: 'worker-1',
    name: 'Sarah Johnson',
    title: 'Lead UI/UX & Design Systems Specialist',
    domain: 'UI/UX Design',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    location: 'San Francisco, CA, USA',
    timezone: 'UTC-8 (PST)',
    hourlyRate: 45,
    availability: 'Available now',
    availabilityHours: '35 hrs/week',
    responseTime: '< 1 hour',
    yearsExperience: 6,
    completedProjects: 42,
    rating: 4.95,
    totalReviews: 38,
    bio: 'Senior Product Designer with 6+ years specializing in SaaS design systems, user journey mapping, high-fidelity Figma prototyping, and design-to-code alignment. Previously designed core flows for fintech scale-ups.',
    skills: ['Figma', 'UI/UX', 'Design Systems', 'User Research', 'Prototyping', 'Wireframing', 'Tailwind CSS', 'Mobile UI'],
    languages: ['English (Native)', 'Spanish (Conversational)'],
    verified: {
      email: true,
      phone: true,
      identity: true,
      certifications: true
    },
    portfolio: [
      {
        id: 'port-1',
        title: 'Nexus Fintech Dashboard',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
        description: 'Complete overhaul of an enterprise treasury analytics suite, reducing daily user transaction time by 34%.',
        technologies: ['Figma', 'Tokens Studio', 'Design System'],
        role: 'Lead UX Architect',
        result: 'Processed $12M+ monthly volume with zero UI usability complaints.',
        link: 'https://behance.net/sample'
      },
      {
        id: 'port-2',
        title: 'CalmFlow Health & Wellness App',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
        description: 'End-to-end mobile design for guided mindfulness featuring micro-interactions and audio haptics.',
        technologies: ['Figma', 'Principle', 'iOS HIG'],
        role: 'Mobile UI Designer',
        result: 'Featured on App Store "New Apps We Love" with 4.8-star review.',
        link: 'https://dribbble.com/sample'
      }
    ],
    certifications: [
      {
        name: 'Nielsen Norman Group UX Master Certified',
        org: 'NN/g',
        date: '2023',
        credentialId: 'NNG-992014',
        link: 'https://nngroup.com'
      },
      {
        name: 'Enterprise Design Thinking Practitioner',
        org: 'IBM',
        date: '2022',
        credentialId: 'IBM-DT-4421',
        link: 'https://credly.com'
      }
    ],
    experience: [
      {
        title: 'Senior Product Designer',
        company: 'Veloce Digital Labs',
        period: '2021 — 2024',
        description: 'Guided multi-disciplinary design squad building B2B SaaS portals and customer self-service suites.'
      },
      {
        title: 'UI/UX Designer',
        company: 'Apex Interactive Studio',
        period: '2018 — 2021',
        description: 'Delivered responsive web applications and e-commerce checkout funnels for Series A/B startups.'
      }
    ],
    education: [
      {
        degree: 'B.S. in Human-Computer Interaction',
        school: 'University of Washington',
        year: '2018'
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        clientName: 'David Miller',
        clientCompany: 'Apex Cloud',
        date: '2 weeks ago',
        rating: 5.0,
        categories: { quality: 5, communication: 5, professionalism: 5, timeliness: 5 },
        comment: 'Sarah is easily the best UI designer we have hired on any platform. Her attention to typography, spacing, and user psychology was extraordinary!'
      },
      {
        id: 'rev-2',
        clientName: 'Chloe Bennett',
        clientCompany: 'SaaS Pulse',
        date: '1 month ago',
        rating: 4.9,
        categories: { quality: 5, communication: 5, professionalism: 5, timeliness: 4.7 },
        comment: 'Incredible Figma components and design tokens. Hand-off to our React engineering team was seamless.'
      }
    ]
  },
  {
    id: 'worker-2',
    name: 'Marcus Chen',
    title: 'Senior Full-Stack & React / Node.js Engineer',
    domain: 'Web Development',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    location: 'Toronto, Canada',
    timezone: 'UTC-5 (EST)',
    hourlyRate: 55,
    availability: 'Available now',
    availabilityHours: '40 hrs/week',
    responseTime: '< 30 mins',
    yearsExperience: 7,
    completedProjects: 58,
    rating: 4.92,
    totalReviews: 51,
    bio: 'Full-stack software architect building high-performance web applications using React, Next.js, Node.js, TypeScript, PostgreSQL, and AWS. Specializing in secure APIs, Stripe payments, and real-time WebSockets.',
    skills: ['React', 'Node.js', 'TypeScript', 'Next.js', 'PostgreSQL', 'Tailwind CSS', 'Stripe API', 'GraphQL', 'Docker', 'AWS'],
    languages: ['English (Fluent)', 'Mandarin (Native)'],
    verified: { email: true, phone: true, identity: true, certifications: true },
    portfolio: [
      {
        id: 'port-3',
        title: 'HyperCart E-Commerce Engine',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
        description: 'Multi-vendor marketplace platform with headless Shopify integration, Stripe Connect, and dynamic checkout.',
        technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe'],
        role: 'Full-Stack Architect',
        result: 'Sub-100ms API response latency and handles 5,000 concurrent cart updates.',
        link: 'https://github.com/sample'
      }
    ],
    certifications: [
      {
        name: 'AWS Certified Solutions Architect – Associate',
        org: 'Amazon Web Services',
        date: '2023',
        credentialId: 'AWS-ARCH-8742',
        link: 'https://aws.amazon.com'
      }
    ],
    experience: [
      {
        title: 'Lead Full-Stack Developer',
        company: 'CloudNova Systems',
        period: '2020 — 2024',
        description: 'Engineered microservices and frontend platforms handling 2M+ active user events per day.'
      }
    ],
    education: [
      {
        degree: 'B.Eng. in Computer Engineering',
        school: 'University of Waterloo',
        year: '2017'
      }
    ],
    reviews: [
      {
        id: 'rev-3',
        clientName: 'Robert Sterling',
        clientCompany: 'FinDirect',
        date: '3 weeks ago',
        rating: 5.0,
        categories: { quality: 5, communication: 5, professionalism: 5, timeliness: 5 },
        comment: 'Marcus delivered a flawless Node.js + React platform ahead of deadline. Clean code, comprehensive documentation, and zero bugs.'
      }
    ]
  },
  {
    id: 'worker-3',
    name: 'Elena Rodriguez',
    title: 'Senior Cross-Platform Mobile Engineer (Flutter & iOS)',
    domain: 'Mobile Development',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    location: 'Madrid, Spain',
    timezone: 'UTC+1 (CET)',
    hourlyRate: 50,
    availability: 'Available now',
    availabilityHours: '30 hrs/week',
    responseTime: '< 2 hours',
    yearsExperience: 5,
    completedProjects: 31,
    rating: 4.88,
    totalReviews: 29,
    bio: 'Mobile application developer with 5+ years of production experience shipping 15+ native & Flutter apps across App Store and Google Play. Expert in offline-first architecture, push notifications, and payment gateways.',
    skills: ['Flutter', 'React Native', 'iOS', 'Swift', 'Android', 'Dart', 'Firebase', 'REST APIs', 'In-App Purchases'],
    languages: ['Spanish (Native)', 'English (Fluent)', 'French (Intermediate)'],
    verified: { email: true, phone: true, identity: true, certifications: true },
    portfolio: [
      {
        id: 'port-4',
        title: 'UrbanGo Mobility & Bike Share',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80',
        description: 'Geolocation tracking mobile application with Bluetooth smart lock unlock and QR ticketing.',
        technologies: ['Flutter', 'Google Maps API', 'Firebase', 'Bloc'],
        role: 'Sole Mobile Architect',
        result: 'Over 250,000 active urban commuters in 4 European capital cities.',
        link: 'https://github.com/sample'
      }
    ],
    certifications: [
      {
        name: 'Google Associate Android Developer',
        org: 'Google',
        date: '2022',
        credentialId: 'GOOG-AND-3318',
        link: 'https://google.com'
      }
    ],
    experience: [
      {
        title: 'Lead Mobile Developer',
        company: 'AppFrontiers',
        period: '2021 — 2024',
        description: 'Built cross-platform Flutter and React Native solutions for transport and retail clients.'
      }
    ],
    education: [
      {
        degree: 'B.S. in Software Systems',
        school: 'Universidad Politécnica de Madrid',
        year: '2019'
      }
    ],
    reviews: [
      {
        id: 'rev-4',
        clientName: 'Martin Krause',
        clientCompany: 'TransLogix',
        date: '1 month ago',
        rating: 4.9,
        categories: { quality: 5, communication: 4.8, professionalism: 5, timeliness: 5 },
        comment: 'Elena delivered our Flutter app across both stores effortlessly. Her offline caching logic is rock solid.'
      }
    ]
  },
  {
    id: 'worker-4',
    name: 'David Kim',
    title: 'Senior AI Engineer & Machine Learning Specialist',
    domain: 'Data Science',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    location: 'Seoul, South Korea',
    timezone: 'UTC+9 (KST)',
    hourlyRate: 65,
    availability: 'Part-time available',
    availabilityHours: '20 hrs/week',
    responseTime: '< 3 hours',
    yearsExperience: 8,
    completedProjects: 36,
    rating: 4.97,
    totalReviews: 32,
    bio: 'Data Scientist and ML researcher specializing in NLP, predictive analytics, LLM fine-tuning, computer vision pipelines, and Python/PyTorch production deployments.',
    skills: ['Python', 'Machine Learning', 'Data Science', 'PyTorch', 'TensorFlow', 'NLP', 'SQL', 'Pandas', 'FastAPI', 'LangChain'],
    languages: ['Korean (Native)', 'English (Fluent)'],
    verified: { email: true, phone: true, identity: true, certifications: true },
    portfolio: [
      {
        id: 'port-5',
        title: 'SentientSense Sentiment & Trend Engine',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
        description: 'NLP sentiment extraction model monitoring 50,000 news articles and financial filings in real-time.',
        technologies: ['Python', 'BERT', 'FastAPI', 'Docker', 'Redis'],
        role: 'Principal ML Engineer',
        result: 'Achieved 94.2% classification F1 score outperforming existing enterprise baselines.',
        link: 'https://huggingface.co/sample'
      }
    ],
    certifications: [
      {
        name: 'Deep Learning Specialization',
        org: 'DeepLearning.AI',
        date: '2021',
        credentialId: 'DLAI-3091',
        link: 'https://coursera.org'
      }
    ],
    experience: [
      {
        title: 'Senior Data Scientist',
        company: 'HyperScale AI Labs',
        period: '2019 — 2024',
        description: 'Trained and deployed custom transformer models for fintech and healthcare clients.'
      }
    ],
    education: [
      {
        degree: 'M.S. in Computer Science (Artificial Intelligence)',
        school: 'KAIST',
        year: '2018'
      }
    ],
    reviews: [
      {
        id: 'rev-5',
        clientName: 'Samantha Green',
        clientCompany: 'AlphaBio Analytics',
        date: '2 months ago',
        rating: 5.0,
        categories: { quality: 5, communication: 5, professionalism: 5, timeliness: 5 },
        comment: 'David built an end-to-end Python prediction model with an interactive FastAPI endpoint in under two weeks. Astounding depth of knowledge.'
      }
    ]
  },
  {
    id: 'worker-5',
    name: 'Amara Okafor',
    title: 'Brand Identity & Visual Design Director',
    domain: 'Graphic Design',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    location: 'Lagos, Nigeria',
    timezone: 'UTC+1 (WAT)',
    hourlyRate: 35,
    availability: 'Available now',
    availabilityHours: '40 hrs/week',
    responseTime: '< 1 hour',
    yearsExperience: 5,
    completedProjects: 49,
    rating: 4.91,
    totalReviews: 44,
    bio: 'Brand designer crafting high-impact visual identities, custom typography, logo systems, brand guidelines, and print/packaging collateral for international consumer brands.',
    skills: ['Graphic Design', 'Brand Identity', 'Adobe Illustrator', 'Photoshop', 'Typography', 'Logo Design', 'Packaging', 'Vector Art'],
    languages: ['English (Fluent)', 'Yoruba (Native)'],
    verified: { email: true, phone: true, identity: true, certifications: true },
    portfolio: [
      {
        id: 'port-6',
        title: 'Verde Organics Global Rebrand',
        image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=600&auto=format&fit=crop&q=80',
        description: 'Complete brand identity including logomark, bespoke typography, eco packaging, and brand book.',
        technologies: ['Adobe Illustrator', 'InDesign', 'Cinema 4D'],
        role: 'Brand Creative Director',
        result: 'Product sales climbed 48% within 90 days of relaunching in nationwide supermarkets.',
        link: 'https://behance.net/sample'
      }
    ],
    certifications: [
      {
        name: 'Brand Master Academy Certification',
        org: 'Brand Master',
        date: '2022',
        credentialId: 'BM-CERT-884',
        link: 'https://brandmasteracademy.com'
      }
    ],
    experience: [
      {
        title: 'Senior Brand Identity Designer',
        company: 'Apex Creative Studio',
        period: '2020 — 2024',
        description: 'Led visual design packages for 30+ venture-backed consumer product brands.'
      }
    ],
    education: [
      {
        degree: 'B.A. in Fine Arts & Visual Communication',
        school: 'University of Lagos',
        year: '2019'
      }
    ],
    reviews: [
      {
        id: 'rev-6',
        clientName: 'Oliver Vance',
        clientCompany: 'Verde Organics',
        date: '1 month ago',
        rating: 5.0,
        categories: { quality: 5, communication: 5, professionalism: 5, timeliness: 5 },
        comment: 'Amara gave our brand an unforgettable personality. Her logo design and guideline manuals are world-class.'
      }
    ]
  },
  {
    id: 'worker-6',
    name: 'Julian Vance',
    title: 'Senior Technical B2B Content & SEO Copywriter',
    domain: 'Content Writing',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80',
    location: 'London, United Kingdom',
    timezone: 'UTC+0 (GMT)',
    hourlyRate: 40,
    availability: 'Available now',
    availabilityHours: '30 hrs/week',
    responseTime: '< 2 hours',
    yearsExperience: 6,
    completedProjects: 65,
    rating: 4.89,
    totalReviews: 58,
    bio: 'B2B SaaS copywriter and technical content strategist with proven success ranking articles on page 1 of Google. Deep focus on cloud architecture, cybersecurity, and developer tools.',
    skills: ['Content Writing', 'SEO Copywriting', 'B2B SaaS', 'Technical Writing', 'Editing', 'Keyword Research', 'Content Strategy'],
    languages: ['English (Native)'],
    verified: { email: true, phone: true, identity: true, certifications: false },
    portfolio: [
      {
        id: 'port-7',
        title: 'CloudSec Whitepaper & Pillar Hub',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80',
        description: 'Comprehensive 12-chapter whitepaper on Zero Trust Kubernetes architectures with 5 accompanying blog pillars.',
        technologies: ['Ahrefs', 'Clearscope', 'Markdown'],
        role: 'Lead Content Strategist',
        result: 'Generated 4,200 qualified enterprise downloads and 180 MQLs in Q1.',
        link: 'https://medium.com/sample'
      }
    ],
    certifications: [
      {
        name: 'HubSpot Inbound Content Marketing',
        org: 'HubSpot Academy',
        date: '2023',
        credentialId: 'HS-CONT-1029',
        link: 'https://academy.hubspot.com'
      }
    ],
    experience: [
      {
        title: 'Senior Content Strategist',
        company: 'SaaS Growth Agency',
        period: '2019 — 2024',
        description: 'Drafted 300+ technical articles and whitepapers for Fortune 500 tech leaders.'
      }
    ],
    education: [
      {
        degree: 'B.A. in English Literature & Journalism',
        school: 'University of Edinburgh',
        year: '2018'
      }
    ],
    reviews: [
      {
        id: 'rev-7',
        clientName: 'Daniel Hayes',
        clientCompany: 'DevSphere',
        date: '3 weeks ago',
        rating: 5.0,
        categories: { quality: 5, communication: 4.9, professionalism: 5, timeliness: 5 },
        comment: 'Julian understands complex developer terminology and converts it into captivating, high-converting prose.'
      }
    ]
  },
  {
    id: 'worker-7',
    name: 'Priya Sharma',
    title: 'Performance Marketing & Paid Ads Lead (Google / Meta)',
    domain: 'Digital Marketing',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    location: 'Bengaluru, India',
    timezone: 'UTC+5:30 (IST)',
    hourlyRate: 38,
    availability: 'Available now',
    availabilityHours: '40 hrs/week',
    responseTime: '< 30 mins',
    yearsExperience: 7,
    completedProjects: 72,
    rating: 4.94,
    totalReviews: 67,
    bio: 'Data-driven growth marketer managing over $4.5M in paid ad spend across Google Ads, Meta Ads, TikTok, and LinkedIn. Expert in ROAS optimization, conversion rate funnels, and attribution modeling.',
    skills: ['Digital Marketing', 'Google Ads', 'Meta Ads', 'Conversion Rate Optimization', 'Analytics', 'TikTok Ads', 'Growth Hacking'],
    languages: ['English (Fluent)', 'Hindi (Native)'],
    verified: { email: true, phone: true, identity: true, certifications: true },
    portfolio: [
      {
        id: 'port-8',
        title: 'D2C Apparel Scaling Campaign',
        image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&auto=format&fit=crop&q=80',
        description: 'Omnichannel scaling program scaling monthly revenue from $40k to $310k while maintaining 3.8x blended ROAS.',
        technologies: ['Google Ads', 'Meta Ads Manager', 'GA4', 'Triple Whale'],
        role: 'Growth Marketing Director',
        result: 'Lowered customer acquisition cost (CAC) by 41% year-over-year.',
        link: 'https://growthcase.com/sample'
      }
    ],
    certifications: [
      {
        name: 'Google Ads Search & Measurement Certified',
        org: 'Google',
        date: '2023',
        credentialId: 'GOOG-ADS-4481',
        link: 'https://skillshop.google.com'
      }
    ],
    experience: [
      {
        title: 'Lead Growth Marketer',
        company: 'VentureScale Partners',
        period: '2019 — 2024',
        description: 'Scaled paid media budgets for 25 high-growth e-commerce and fintech companies.'
      }
    ],
    education: [
      {
        degree: 'B.B.A. in Marketing & Data Analytics',
        school: 'Symbiosis International University',
        year: '2017'
      }
    ],
    reviews: [
      {
        id: 'rev-8',
        clientName: 'Liam Carter',
        clientCompany: 'Aura Lifestyle',
        date: '2 weeks ago',
        rating: 5.0,
        categories: { quality: 5, communication: 5, professionalism: 5, timeliness: 5 },
        comment: 'Priya skyrocketed our ROAS from 1.8x to 3.9x in under 60 days. The reports she provided were so insightful!'
      }
    ]
  },
  {
    id: 'worker-8',
    name: 'Alexandre Dubois',
    title: 'Senior Motion Graphic Designer & Video Editor',
    domain: 'Video Editing',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    location: 'Paris, France',
    timezone: 'UTC+1 (CET)',
    hourlyRate: 48,
    availability: 'Available now',
    availabilityHours: '35 hrs/week',
    responseTime: '< 1 hour',
    yearsExperience: 6,
    completedProjects: 53,
    rating: 4.93,
    totalReviews: 48,
    bio: 'Creative video editor and 2D/3D motion designer with 6 years experience crafting YouTube documentaries, viral short-form content, commercial product teasers, and brand explainer animations.',
    skills: ['Video Editing', 'Premiere Pro', 'After Effects', 'Motion Graphics', 'Sound Design', 'DaVinci Resolve', 'Color Grading'],
    languages: ['French (Native)', 'English (Fluent)'],
    verified: { email: true, phone: true, identity: true, certifications: true },
    portfolio: [
      {
        id: 'port-9',
        title: 'Luminary AI Product Reveal Trailer',
        image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=80',
        description: 'Sleek 90-second 3D product showcase video with kinematic typography and original spatial audio mix.',
        technologies: ['After Effects', 'Premiere Pro', 'Blender', 'Logic Pro'],
        role: 'Director & Lead Animator',
        result: 'Gained 1.8M organic views on YouTube and X within launch week.',
        link: 'https://vimeo.com/sample'
      }
    ],
    certifications: [
      {
        name: 'Adobe Certified Professional in Digital Video',
        org: 'Adobe',
        date: '2022',
        credentialId: 'ADBE-VID-771',
        link: 'https://adobe.com'
      }
    ],
    experience: [
      {
        title: 'Senior Video Producer',
        company: 'Studio Lumos',
        period: '2020 — 2024',
        description: 'Produced promotional and explainer video assets for international SaaS and tech clients.'
      }
    ],
    education: [
      {
        degree: 'B.A. in Audiovisual Media & Cinema',
        school: 'Université Paris 8',
        year: '2018'
      }
    ],
    reviews: [
      {
        id: 'rev-9',
        clientName: 'Lucas Bernard',
        clientCompany: 'Pulse Media',
        date: '1 month ago',
        rating: 5.0,
        categories: { quality: 5, communication: 5, professionalism: 5, timeliness: 5 },
        comment: 'Alexandre has supreme mastery over pacing, sound effects, and motion graphics. Fast iterations and superb delivery.'
      }
    ]
  },
  {
    id: 'worker-9',
    name: 'Sophia Martinez',
    title: 'Commercial Product & Editorial Photographer',
    domain: 'Photography',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    location: 'Austin, TX, USA',
    timezone: 'UTC-6 (CST)',
    hourlyRate: 50,
    availability: 'Available now',
    availabilityHours: '25 hrs/week',
    responseTime: '< 2 hours',
    yearsExperience: 8,
    completedProjects: 62,
    rating: 4.96,
    totalReviews: 59,
    bio: 'Professional studio and location photographer with 8+ years specializing in e-commerce packshots, food & beverage staging, lifestyle brand imagery, and editorial portraits.',
    skills: ['Photography', 'Product Photography', 'Lighting', 'Photo Retouching', 'Adobe Lightroom', 'Photoshop', 'Studio Staging'],
    languages: ['English (Native)', 'Spanish (Fluent)'],
    verified: { email: true, phone: true, identity: true, certifications: true },
    portfolio: [
      {
        id: 'port-10',
        title: 'Botanica Skincare Global Campaign',
        image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80',
        description: 'Comprehensive studio still-life photography suite for 14 new organic cosmetic SKUs.',
        technologies: ['Sony A7R V', 'Profoto Lighting', 'Capture One Pro', 'Photoshop'],
        role: 'Lead Commercial Photographer',
        result: 'Hero imagery syndicated across Sephora online and 400 retail storefronts.',
        link: 'https://sophiamartinez.photo'
      }
    ],
    certifications: [
      {
        name: 'Professional Photographers of America (PPA) Master',
        org: 'PPA',
        date: '2021',
        credentialId: 'PPA-M-5510',
        link: 'https://ppa.com'
      }
    ],
    experience: [
      {
        title: 'Principal Commercial Photographer',
        company: 'Atelier Light & Form',
        period: '2018 — 2024',
        description: 'Delivered high-resolution editorial photography for global luxury and lifestyle brands.'
      }
    ],
    education: [
      {
        degree: 'B.F.A. in Commercial Photography',
        school: 'Brooks Institute of Photography',
        year: '2016'
      }
    ],
    reviews: [
      {
        id: 'rev-10',
        clientName: 'Hannah Scott',
        clientCompany: 'Botanica Naturals',
        date: '3 weeks ago',
        rating: 5.0,
        categories: { quality: 5, communication: 5, professionalism: 5, timeliness: 5 },
        comment: 'Sophia’s eye for lighting and product texture is simply unmatched. The photos made our conversion rates surge immediately.'
      }
    ]
  },
  {
    id: 'worker-10',
    name: 'Thomas Becker',
    title: 'Certified Public Accountant (CPA) & SaaS Financial Modeler',
    domain: 'Accounting',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    location: 'Berlin, Germany',
    timezone: 'UTC+1 (CET)',
    hourlyRate: 60,
    availability: 'Available now',
    availabilityHours: '30 hrs/week',
    responseTime: '< 1 hour',
    yearsExperience: 9,
    completedProjects: 45,
    rating: 4.95,
    totalReviews: 41,
    bio: 'Licensed CPA and fractional CFO helping startups build investor-ready 5-year financial models, SaaS cohort retention dashboards, tax compliance filings, and unit economics audits.',
    skills: ['Accounting', 'Financial Modeling', 'QuickBooks', 'Excel / Financial Analysis', 'SaaS Metrics', 'Tax Compliance', 'Valuation'],
    languages: ['German (Native)', 'English (Fluent)'],
    verified: { email: true, phone: true, identity: true, certifications: true },
    portfolio: [
      {
        id: 'port-11',
        title: 'Series A Venture Financial Model & Data Room',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
        description: 'Comprehensive financial projection model including headcount plan, CAC/LTV cohorts, and runway stress tests.',
        technologies: ['Advanced Excel', 'QuickBooks Online', 'Stripe Sigma', 'LivePlan'],
        role: 'Fractional CFO & Modeler',
        result: 'Client successfully secured $4.2M Series A funding with praise on data room clarity.',
        link: 'https://thomasbecker.finance'
      }
    ],
    certifications: [
      {
        name: 'Certified Public Accountant (CPA)',
        org: 'German Chamber of Tax Advisers',
        date: '2017',
        credentialId: 'CPA-DE-99412',
        link: 'https://bstbk.de'
      }
    ],
    experience: [
      {
        title: 'Senior Audit & Valuation Specialist',
        company: 'Deloitte Germany',
        period: '2016 — 2020',
        description: 'Performed financial statement audits and corporate valuations for mid-market European enterprises.'
      }
    ],
    education: [
      {
        degree: 'M.Sc. in Finance & Accounting',
        school: 'Humboldt University of Berlin',
        year: '2016'
      }
    ],
    reviews: [
      {
        id: 'rev-11',
        clientName: 'Maximilien Weber',
        clientCompany: 'CognitiveVentures',
        date: '1 month ago',
        rating: 5.0,
        categories: { quality: 5, communication: 5, professionalism: 5, timeliness: 5 },
        comment: 'Thomas constructed a flawless 5-year SaaS financial model for our board meeting. Extremely thorough and mathematically pristine.'
      }
    ]
  }
];

export const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    title: 'SaaS Analytics Dashboard UI/UX Redesign',
    description: 'We are seeking an elite product designer to redesign our core customer dashboard in Figma. You will build clean user journeys, implement a modern design system with reusable components, and prepare hand-off specs for React engineers. Needs deep experience in SaaS metrics and dark mode UI.',
    domain: 'UI/UX Design',
    skills: ['Figma', 'UI/UX', 'Design Systems', 'Prototyping', 'User Research'],
    experienceRequired: 4,
    budgetMin: 35,
    budgetMax: 55,
    paymentType: 'Hourly',
    timeline: '3 to 4 weeks',
    hoursPerWeek: '30-40 hrs/week',
    availabilityRequired: 'Available now',
    locationPreference: 'Remote (Worldwide)',
    timezone: 'Flexible',
    status: 'In Progress',
    clientId: 'customer-1',
    clientName: 'Alex Morgan',
    clientCompany: 'MetricPulse Inc.',
    clientAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
    assignedWorkerId: 'worker-1',
    assignedWorkerName: 'Sarah Johnson',
    createdAt: '2026-10-01',
    progress: 65,
    milestones: [
      { id: 'm-1', title: 'User Research & Wireframes', status: 'Completed', dueDate: '2026-10-04' },
      { id: 'm-2', title: 'High-Fidelity Component Library', status: 'In Progress', dueDate: '2026-10-12' },
      { id: 'm-3', title: 'Interactive Prototype & Dev Hand-off', status: 'Pending', dueDate: '2026-10-20' }
    ]
  },
  {
    id: 'proj-2',
    title: 'Full-Stack E-Commerce Marketplace with Stripe Connect',
    description: 'Looking for a seasoned Full-Stack Engineer to build a responsive web marketplace. Must use Next.js, Node.js, and PostgreSQL with robust Stripe checkout and vendor payouts. Need clean TypeScript code, test coverage, and fast API response times.',
    domain: 'Web Development',
    skills: ['React', 'Node.js', 'TypeScript', 'Next.js', 'PostgreSQL', 'Stripe API'],
    experienceRequired: 5,
    budgetMin: 45,
    budgetMax: 65,
    paymentType: 'Hourly',
    timeline: '6 weeks',
    hoursPerWeek: '40 hrs/week',
    availabilityRequired: 'Available now',
    locationPreference: 'Remote',
    timezone: 'EST/PST preferred',
    status: 'Open',
    clientId: 'customer-1',
    clientName: 'Alex Morgan',
    clientCompany: 'MetricPulse Inc.',
    clientAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
    assignedWorkerId: null,
    createdAt: '2026-10-05',
    progress: 0,
    milestones: [
      { id: 'm-4', title: 'Architecture & Database Schema', status: 'Pending', dueDate: '2026-10-15' },
      { id: 'm-5', title: 'Stripe Payment Gateway Integration', status: 'Pending', dueDate: '2026-10-28' },
      { id: 'm-6', title: 'Beta Testing & Deployment', status: 'Pending', dueDate: '2026-11-15' }
    ]
  },
  {
    id: 'proj-3',
    title: 'Cross-Platform Delivery Mobile App (Flutter / iOS)',
    description: 'We need an experienced mobile developer to construct an on-demand food & parcel delivery app using Flutter. Features include GPS driver tracking, push notifications, customer cart, and Apple Pay/Google Pay.',
    domain: 'Mobile Development',
    skills: ['Flutter', 'iOS', 'Android', 'Firebase', 'REST APIs'],
    experienceRequired: 4,
    budgetMin: 40,
    budgetMax: 55,
    paymentType: 'Hourly',
    timeline: '5 weeks',
    hoursPerWeek: '30 hrs/week',
    availabilityRequired: 'Available now',
    locationPreference: 'Remote',
    timezone: 'Any',
    status: 'Open',
    clientId: 'customer-2',
    clientName: 'Jessica Taylor',
    clientCompany: 'SwiftDrop Logistics',
    clientAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    assignedWorkerId: null,
    createdAt: '2026-10-06',
    progress: 0,
    milestones: []
  }
];

export const INITIAL_CONVERSATIONS = [
  {
    id: 'conv-1',
    workerId: 'worker-1',
    workerName: 'Sarah Johnson',
    workerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    clientId: 'customer-1',
    clientName: 'Alex Morgan',
    clientAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
    projectId: 'proj-1',
    projectTitle: 'SaaS Analytics Dashboard UI/UX Redesign',
    lastMessage: 'I have finalized the high-fidelity component library and uploaded the Figma link to milestone 2!',
    lastMessageTime: '10:45 AM',
    unreadCount: 0,
    isOnline: true,
    messages: [
      {
        id: 'msg-1',
        senderId: 'customer-1',
        senderName: 'Alex Morgan',
        text: 'Hi Sarah! Loved your work on the Nexus Dashboard. Would you be interested in redesigning our SaaS analytics portal?',
        timestamp: 'Yesterday 3:15 PM'
      },
      {
        id: 'msg-2',
        senderId: 'worker-1',
        senderName: 'Sarah Johnson',
        text: 'Hello Alex! Yes, absolutely. I checked your project brief and I can dedicate 35 hours per week to complete the full design system in 3-4 weeks.',
        timestamp: 'Yesterday 3:25 PM'
      },
      {
        id: 'msg-3',
        senderId: 'customer-1',
        senderName: 'Alex Morgan',
        text: 'Awesome! We have accepted your proposal and started Milestone 1.',
        timestamp: 'Yesterday 4:00 PM'
      },
      {
        id: 'msg-4',
        senderId: 'worker-1',
        senderName: 'Sarah Johnson',
        text: 'I have finalized the high-fidelity component library and uploaded the Figma link to milestone 2!',
        timestamp: '10:45 AM'
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'match',
    title: '95% Match Found!',
    description: 'Sarah Johnson matched with your SaaS Analytics Dashboard project.',
    time: '2 hours ago',
    read: false
  },
  {
    id: 'notif-2',
    type: 'message',
    title: 'New message from Sarah Johnson',
    description: 'Sarah updated Milestone 2 for your review.',
    time: '4 hours ago',
    read: false
  },
  {
    id: 'notif-3',
    type: 'profile',
    title: 'Profile Strength: 88%',
    description: 'Add 1 more verified certification to reach 95% profile strength!',
    time: '1 day ago',
    read: true
  }
];
