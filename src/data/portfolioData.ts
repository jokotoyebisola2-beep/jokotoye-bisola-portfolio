import bisolaPortrait from '../assets/images/bisola_portrait_1784837572717.jpg';
import fintechImage from '../assets/images/fintech_ai_thumbnail_1784837587099.jpg';
import fashionImage from '../assets/images/fashion_web_thumbnail_1784837597716.jpg';
import saasImage from '../assets/images/sales_saas_thumbnail_1784837608935.jpg';
import { Project, Service, ProcessStep, Testimonial, FAQItem, ProjectScopeOption } from '../types';

export const WHATSAPP_NUMBER = '2349033467029';
export const WHATSAPP_MESSAGE = `Hi Bisola,\n\nI found your portfolio and I'd like to discuss a project with you.`;
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const BISOLA_INFO = {
  name: 'Jokotoye Bisola',
  title: 'AI Product Engineer & UI/UX Designer',
  tagline: 'Helping businesses grow through smart design, AI, and modern web experiences.',
  bio: 'I help companies turn website visitors into paying customers and automate daily tasks with simple, reliable software.',
  portraitUrl: 'https://res.cloudinary.com/dtws4emsj/image/upload/v1784838821/ChatGPT_Image_Jul_23_2026_09_00_13_PM_jai3ju.png',
  location: 'Lagos & Remote Worldwide',
  email: 'jokotoyebisola2@gmail.com',
  phone: '+234 (0) 814 290 1120',
  linkedin: 'https://linkedin.com/in/jokotoyebisola',
  github: 'https://github.com/jokotoyebisola',
  twitter: 'https://x.com/jokotoyebisola',
  availabilityStatus: 'Available for New Projects',
  stats: [
    { label: 'Client Revenue Generated', value: '$4.2M+' },
    { label: 'More Leads & Sales', value: '+140%' },
    { label: 'Hours Saved via AI', value: '18,500+' },
    { label: 'Products Shipped', value: '28+' }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'ai-fintech-intelligence',
    slug: 'ai-fintech-intelligence',
    title: 'Aura Finance',
    subtitle: 'Automated cashflow tracking and fraud warnings for finance teams.',
    industry: 'Fintech & AI',
    category: 'ai-fintech',
    image: fintechImage,
    challenge: 'Finance teams spent 18 hours every week copying bank data into spreadsheets manually.',
    solution: 'I built a dashboard that imports bank records automatically and answers financial questions in plain English.',
    keyFeatures: [
      'Ask financial questions in plain English',
      'Automatic bank data sync',
      'Instant fraud and error warnings',
      'Simple cashflow projections'
    ],
    businessOutcome: {
      metric: '+340% User Growth',
      description: 'Saved finance teams 14 hours a week and increased user retention by 88%.'
    },
    technologies: ['React 19', 'TypeScript', 'Node.js', 'Express', 'Gemini AI API', 'Recharts', 'Tailwind CSS'],
    liveDemoUrl: 'https://aura-finance-ai.demo',
    githubUrl: 'https://github.com/jokotoyebisola/aura-finance-ai',
    status: 'published',
    featured: true,
    year: '2025',
    clientName: 'FinPulse Capital'
  },
  {
    id: 'luxe-fashion-storefront',
    slug: 'luxe-fashion-storefront',
    title: 'Maison Noir',
    subtitle: 'High-converting online store with an instant size assistant.',
    industry: 'Retail & E-Commerce',
    category: 'ecommerce',
    image: fashionImage,
    challenge: 'Mobile shoppers left the store quickly due to slow page loads and size confusion.',
    solution: 'I built a fast store with an instant size assistant and a simple 1-step checkout.',
    keyFeatures: [
      'Pages load in under half a second',
      'Simple size helper for shoppers',
      'Smooth product image lookbook',
      '1-step checkout process'
    ],
    businessOutcome: {
      metric: '+48% More Sales',
      description: 'Increased store sales conversion rate from 1.8% to 3.4%.'
    },
    technologies: ['React', 'TypeScript', 'Motion', 'Tailwind CSS', 'Stripe', 'Node.js'],
    liveDemoUrl: 'https://maisonnoir-fashion.demo',
    githubUrl: 'https://github.com/jokotoyebisola/maisonnoir-web',
    status: 'published',
    featured: true,
    year: '2025',
    clientName: 'Maison Noir Paris'
  },
  {
    id: 'nexus-saas-funnel',
    slug: 'nexus-saas-funnel',
    title: 'Nexus Growth',
    subtitle: 'Interactive product demo that helps convert business buyers.',
    industry: 'Software & Automation',
    category: 'saas',
    image: saasImage,
    challenge: 'Potential buyers left the site because the software felt too complex to understand.',
    solution: 'I built an interactive test drive where buyers can try the product before booking a call.',
    keyFeatures: [
      'Live product test drive in browser',
      'Instant savings calculator',
      'Direct calendar booking integration',
      'Simple, clean page design'
    ],
    businessOutcome: {
      metric: '+112% More Demo Calls',
      description: 'Doubled sales call requests in 30 days and reduced bounce rates.'
    },
    technologies: ['React', 'TypeScript', 'Motion', 'Express', 'Tailwind CSS', 'PostgreSQL'],
    liveDemoUrl: 'https://nexus-growth.demo',
    githubUrl: 'https://github.com/jokotoyebisola/nexus-saas-app',
    status: 'published',
    featured: true,
    year: '2024',
    clientName: 'Nexus Automations'
  },
  {
    id: 'gourmet-go-logistics',
    slug: 'gourmet-go-logistics',
    title: 'GourmetGo',
    subtitle: 'Real-time delivery tracking and smart food recommendations.',
    industry: 'Food & Logistics',
    category: 'on-demand',
    image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=1200&q=80',
    challenge: 'Customers struggled with confusing menus and inaccurate delivery times.',
    solution: 'I built a fast web app with live map tracking and personalized food suggestions.',
    keyFeatures: [
      'Live map tracking for delivery drivers',
      'Smart food recommendations',
      'Easy group order cart',
      'Instant status updates'
    ],
    businessOutcome: {
      metric: '98% Customer Rating',
      description: 'Increased repeat orders by 35% in 30 days.'
    },
    technologies: ['React', 'Google Maps Platform', 'Node.js', 'Express', 'Tailwind CSS', 'WebSockets'],
    liveDemoUrl: 'https://gourmetgo.demo',
    status: 'published',
    featured: false,
    year: '2024',
    clientName: 'GourmetGo Global'
  },
  {
    id: 'retro-arcade-ai',
    slug: 'retro-arcade-ai',
    title: 'ChronoQuest AI',
    subtitle: 'Interactive web game with characters powered by AI.',
    industry: 'Web & Gaming',
    category: 'interactive',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    challenge: 'Web games often feel repetitive with scripted, fixed character lines.',
    solution: 'I built a fast game engine where characters respond dynamically in natural language.',
    keyFeatures: [
      'Fast 60fps game graphics',
      'Characters that talk naturally in plain English',
      'Live player leaderboards',
      'Custom background audio'
    ],
    businessOutcome: {
      metric: '150,000+ Plays',
      description: 'Drove 150,000 unique game sessions with an average play time of 8 minutes.'
    },
    technologies: ['React', 'HTML5 Canvas', 'Gemini AI API', 'TypeScript', 'Tailwind CSS'],
    liveDemoUrl: 'https://chronoquest-ai.demo',
    status: 'published',
    featured: false,
    year: '2024',
    clientName: 'Arcade Digital'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'ai-product-dev',
    title: 'AI App & Tool Development',
    tagline: 'I build AI tools that save your team time and make your software smarter.',
    description: 'I build custom AI helpers, search tools, and automated workflows right inside your web product.',
    businessOutcome: 'Cuts manual work by up to 70% and gives your business a clear edge.',
    keyDeliverables: [
      'Custom AI helpers for your app',
      'Instant search across your company files',
      'Simple chat and voice tools',
      'Private and secure setup'
    ],
    idealFor: 'Software companies & teams that want AI built into their products.',
    iconName: 'Cpu',
    status: 'active',
    category: 'ai'
  },
  {
    id: 'high-conversion-websites',
    title: 'High-Converting Websites',
    tagline: 'Turn website visitors into paying customers.',
    description: 'Clear messaging, fast loading times, and clean design that makes buying or booking simple.',
    businessOutcome: 'Increases inquiries and sales without spending more on ads.',
    keyDeliverables: [
      'Clear page layout and messaging',
      'Fast and mobile-friendly design',
      'Simple booking and lead forms',
      'Connected to your CRM or email'
    ],
    idealFor: 'Growing brands, agencies, and service businesses.',
    iconName: 'Sparkles',
    status: 'active',
    category: 'design'
  },
  {
    id: 'fullstack-web-apps',
    title: 'Full Stack Web Apps',
    tagline: 'Web applications built to grow with your business.',
    description: 'I build complete web applications using React, Node.js, and reliable databases.',
    businessOutcome: 'A dependable app that handles thousands of daily users effortlessly.',
    keyDeliverables: [
      'Fast React & TypeScript frontend',
      'Secure backend and database',
      'User accounts and permissions',
      'Payment and subscription setup'
    ],
    idealFor: 'Startups and businesses launching web applications.',
    iconName: 'Layers',
    status: 'active',
    category: 'fullstack'
  },
  {
    id: 'saas-development',
    title: 'SaaS MVP Development',
    tagline: 'Turn your software idea into a launch-ready product.',
    description: 'Everything you need to launch: user accounts, subscription payments, dashboard, and onboarding.',
    businessOutcome: 'Launch 2-3 months faster with software that is ready to charge customers.',
    keyDeliverables: [
      'Stripe payments and billing',
      'User signup and login',
      'Simple customer onboarding',
      'Built-in analytics'
    ],
    idealFor: 'Founders building and launching new software.',
    iconName: 'Rocket',
    status: 'active',
    category: 'fullstack'
  },
  {
    id: 'ai-automation',
    title: 'AI Workflows & Automation',
    tagline: 'Replace repetitive data entry with automated workflows.',
    description: 'Connect your tools and let AI handle paperwork, customer support, and lead organization.',
    businessOutcome: 'Cuts operational costs and prevents costly human errors.',
    keyDeliverables: [
      'Automatic document reading',
      'Connected apps and APIs',
      'AI support and lead routing',
      'Simple status dashboards'
    ],
    idealFor: 'Businesses burdened by manual repetitive workflows.',
    iconName: 'Workflow',
    status: 'active',
    category: 'ai'
  },
  {
    id: 'product-strategy-ux',
    title: 'Product Strategy & Layout',
    tagline: 'Design user flows that are easy to understand and use.',
    description: 'I help plan your product features and test clickable prototypes before writing code.',
    businessOutcome: 'Saves time and money by getting the product right before building.',
    keyDeliverables: [
      'Customer journey planning',
      'Clickable prototype demos',
      'Clean design system',
      'Simple UX improvements'
    ],
    idealFor: 'Companies seeking to simplify existing products.',
    iconName: 'Target',
    status: 'active',
    category: 'strategy'
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Strategy & Goal Setting',
    duration: 'Week 1',
    description: 'We discuss your business goals, target audience, and key metrics before writing any code.',
    outputs: ['Simple Product Plan', 'User Flow Map', 'Timeline & Milestones']
  },
  {
    number: '02',
    title: 'Design & Planning',
    duration: 'Week 2',
    description: 'We map out page layouts, screen flows, and database setup for maximum clarity.',
    outputs: ['Clickable Layout Demo', 'Database Plan', 'Design Components']
  },
  {
    number: '03',
    title: 'Building & Coding',
    duration: 'Weeks 3 - 5',
    description: 'I write clean code, integrate AI tools, and set up your app for fast performance.',
    outputs: ['Working Codebase', 'Connected APIs', 'Mobile & Desktop App']
  },
  {
    number: '04',
    title: 'Testing & Polish',
    duration: 'Week 6',
    description: 'We test across mobile and desktop to make sure everything works smoothly.',
    outputs: ['Fast Loading Speed', 'Security Check', 'Full Quality Test']
  },
  {
    number: '05',
    title: 'Launch & Support',
    duration: 'Ongoing',
    description: 'We launch your product live, set up analytics, and provide full video walkthroughs.',
    outputs: ['Live Product', 'Video Tutorials', '30-Day Free Support']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: 'Bisola transformed our online presence. Our sales inquiries jumped by 185% within 30 days of launch.',
    author: 'Marcus Vance',
    role: 'Managing Partner',
    company: 'Apex Scale Media',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    status: 'published',
    resultsAchieved: '+185% Lead Growth',
    projectContext: 'Company Website'
  },
  {
    id: '2',
    quote: 'She built our AI finance app ahead of schedule. Our users love how simple and fast it is.',
    author: 'Elena Rostova',
    role: 'Product Lead',
    company: 'FinPulse Capital',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    status: 'published',
    resultsAchieved: 'Delivered 2 Weeks Early',
    projectContext: 'AI Finance App'
  },
  {
    id: '3',
    quote: 'Working with Bisola was seamless. She automated our workflows and saved our team 140+ hours every month.',
    author: 'David Chen',
    role: 'VP Operations',
    company: 'Lumina Logistics',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    status: 'published',
    resultsAchieved: '140+ Hours Saved Monthly',
    projectContext: 'AI Automation'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'How are you different from other developers or agencies?',
    answer: 'I focus on business results, not just writing code. I combine clear strategy, clean design, and full-stack development so your app actually helps your business grow.',
    category: 'General'
  },
  {
    question: 'How long does a project take?',
    answer: 'Websites take 2 to 3 weeks. Full web apps and AI tools take 4 to 6 weeks. You get a clear schedule before we start.',
    category: 'Process'
  },
  {
    question: 'Do I need technical documentation ready?',
    answer: 'No. I help you figure out what you need on our first call. We define the features and plan together.',
    category: 'Getting Started'
  },
  {
    question: 'Can you add AI to my existing website or app?',
    answer: 'Yes. I can connect AI tools to your current app to help answer questions, process data, or automate tasks.',
    category: 'Technical'
  },
  {
    question: 'What happens after launch?',
    answer: 'Every project includes 30 days of free post-launch support and bug fixes to make sure everything runs smoothly.',
    category: 'Support'
  }
];

export const SCOPE_OPTIONS: ProjectScopeOption[] = [
  {
    id: 'ai-app',
    label: 'AI Product / App',
    description: 'Custom AI tools, automated tasks, and simple chat search interface.',
    estimatedWeeks: 4,
    typicalOutcome: 'Cuts manual work and makes your software smarter.',
    icon: 'Brain'
  },
  {
    id: 'conversion-website',
    label: 'High-Converting Website',
    description: 'Clean website designed to turn visitors into paying customers.',
    estimatedWeeks: 2,
    typicalOutcome: '+40% to +150% increase in customer inquiries.',
    icon: 'Layout'
  },
  {
    id: 'fullstack-saas',
    label: 'Full Stack Web App',
    description: 'Complete software with user accounts, billing, and simple dashboard.',
    estimatedWeeks: 5,
    typicalOutcome: 'Ready to launch and accept paying subscribers.',
    icon: 'Layers'
  },
  {
    id: 'workflow-automation',
    label: 'AI Workflows & Automation',
    description: 'Automating document processing, emails, and CRM updates.',
    estimatedWeeks: 2,
    typicalOutcome: 'Saves 100+ team hours every month.',
    icon: 'Zap'
  }
];

