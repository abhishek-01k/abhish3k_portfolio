export type AchievementItem = {
  id: string
  type: "card" | "polaroid" | "note" | "ticket"
  title: string
  description: string
  date: string
  tags: string[]
  image: string
  link?: string
  rotation: number
  size: "sm" | "md" | "lg"
  position: { x: number; y: number }
  pin: "thumbtack" | "washi-tape" | "binder-clip" | "paperclip"
  pinColor?: string
}

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "treehacks-2024",
    type: "polaroid",
    title: "1st Place — TreeHacks 2024",
    description: "Built a cross-chain privacy mixer using ZK-SNARKs on Ethereum. Won first place out of 400+ teams across 36 hours.",
    date: "Feb 2024",
    tags: ["hackathon", "winner", "blockchain"],
    image: "https://picsum.photos/seed/treehacks/400/500",
    link: "https://devpost.com",
    rotation: -5,
    size: "md",
    position: { x: 6, y: 8 },
    pin: "thumbtack",
    pinColor: "#e64a3b",
  },
  {
    id: "ethglobal-paris",
    type: "card",
    title: "ETHGlobal Paris — Top 10 Finalist",
    description: "Shipped a gasless cross-chain messaging protocol using EIP-4337 bundlers. Selected top 10 from 1,200+ hackers.",
    date: "Jul 2023",
    tags: ["hackathon", "ethereum", "winner"],
    image: "https://picsum.photos/seed/ethparis/600/400",
    link: "https://ethglobal.com",
    rotation: 3,
    size: "lg",
    position: { x: 38, y: 5 },
    pin: "washi-tape",
    pinColor: "#e64a3b",
  },
  {
    id: "google-startups",
    type: "note",
    title: "Google for Startups — Selected",
    description: "Omnitutor accepted into Google for Startups accelerator program. One of 12 teams selected from 3,000+ applicants globally.",
    date: "Apr 2023",
    tags: ["award", "startup", "AI"],
    image: "https://picsum.photos/seed/googlestartups/400/400",
    rotation: 2,
    size: "sm",
    position: { x: 72, y: 6 },
    pin: "binder-clip",
  },
  {
    id: "bnb-winner",
    type: "ticket",
    title: "BNB Chain Hackathon — 1st Place DeFi",
    description: "Won the DeFi track at BNB Chain Hackathon with a yield-aggregator that auto-routes liquidity across 6 protocols.",
    date: "Nov 2023",
    tags: ["hackathon", "winner", "defi"],
    image: "https://picsum.photos/seed/bnbchain/500/350",
    link: "https://bnbchain.org",
    rotation: -3,
    size: "md",
    position: { x: 4, y: 42 },
    pin: "paperclip",
  },
  {
    id: "omnitutor-launch",
    type: "card",
    title: "Omnitutor — 2,500 Users in 24 h",
    description: "Launched the Omnitutor beta and hit 2,500 signups within 24 hours with zero paid acquisition. Backed by Tavastra VC.",
    date: "Jan 2023",
    tags: ["project", "milestone", "AI"],
    image: "https://picsum.photos/seed/omnitutor/600/450",
    link: "https://omnitutor.io",
    rotation: 4,
    size: "lg",
    position: { x: 34, y: 44 },
    pin: "thumbtack",
    pinColor: "#e64a3b",
  },
  {
    id: "encode-best",
    type: "polaroid",
    title: "Encode Club — Best Web3 Project",
    description: "Awarded Best Web3 Project at Encode Club Hackathon for a decentralised identity layer built on Push Protocol.",
    date: "Aug 2023",
    tags: ["hackathon", "winner", "web3"],
    image: "https://picsum.photos/seed/encode/380/480",
    rotation: -6,
    size: "sm",
    position: { x: 72, y: 40 },
    pin: "washi-tape",
    pinColor: "#e64a3b",
  },
  {
    id: "push-tvl",
    type: "ticket",
    title: "Push Protocol — $16M TVL Milestone",
    description: "Led engineering for the yield-farming product that crossed $16M in total value locked. Integrated 8 EVM chains.",
    date: "Oct 2024",
    tags: ["project", "milestone", "defi"],
    image: "https://picsum.photos/seed/pushtvl/520/360",
    rotation: 2,
    size: "md",
    position: { x: 5, y: 76 },
    pin: "binder-clip",
  },
  {
    id: "tavastra-vc",
    type: "note",
    title: "Tavastra VC — Seed Funding",
    description: "Omnitutor secured seed investment from Tavastra VC. First cheque into an AI-native adaptive learning product.",
    date: "Mar 2023",
    tags: ["award", "funding", "startup"],
    image: "https://picsum.photos/seed/tavastra/400/400",
    rotation: -2,
    size: "sm",
    position: { x: 38, y: 78 },
    pin: "thumbtack",
    pinColor: "#e64a3b",
  },
  {
    id: "ethglobal-ny",
    type: "polaroid",
    title: "ETHGlobal New York — 2nd Place",
    description: "Built a real-time on-chain gaming engine with state channels and instant finality. 2nd place out of 800+ hackers.",
    date: "Sep 2023",
    tags: ["hackathon", "winner", "ethereum"],
    image: "https://picsum.photos/seed/ethny/400/500",
    link: "https://ethglobal.com",
    rotation: 5,
    size: "md",
    position: { x: 68, y: 74 },
    pin: "paperclip",
  },
  {
    id: "push-sdk-200",
    type: "card",
    title: "Push SDK — 200+ Integrations",
    description: "The Push Notification SDK I shipped passed 200 live dApp integrations. Became the de-facto notification standard in web3.",
    date: "Dec 2024",
    tags: ["project", "milestone", "open-source"],
    image: "https://picsum.photos/seed/pushsdk/560/380",
    link: "https://push.org",
    rotation: -4,
    size: "md",
    position: { x: 22, y: 14 },
    pin: "washi-tape",
    pinColor: "#e64a3b",
  },
]

export const PROJECTS = [
  {
    title: "Push Chain",
    description:
      "A universal, shared-state L1 blockchain built for consumer apps. Enables any-chain transactions, true wallet abstraction, and parallel transaction processing at scale.",
    tags: ["Solidity", "Node.js", "TypeScript", "EVM", "Web3.js"],
    github: "https://github.com/push-protocol",
    live: "https://push.org",
    year: "2022 – Present",
    image: "https://picsum.photos/seed/push-chain/1600/1000",
    category: "Protocol",
  },
  {
    title: "Cross-Chain DEX",
    description:
      "Automated yield-farming DEX operating across 8 EVM chains with $16M+ TVL. Handles cross-chain swaps, liquidity routing, and on-chain FX via Chainlink price feeds.",
    tags: ["Solidity", "Hardhat", "Chainlink", "React", "GraphQL"],
    github: "https://github.com/abhish3k",
    live: null,
    year: "2024",
    image: "https://picsum.photos/seed/cross-chain-dex/1200/900",
    category: "DeFi",
  },
  {
    title: "Omnitutor",
    description:
      "AI-powered adaptive learning platform backed by Tavastra VC and Google for Startups. Onboarded 2,500+ users in 24 h with personalised RAG-driven content pipelines.",
    tags: ["Next.js", "LangChain", "OpenAI API", "FastAPI", "PostgreSQL"],
    github: "https://github.com/abhish3k",
    live: "https://omnitutor.io",
    year: "2023 – Present",
    image: "https://picsum.photos/seed/omnitutor-project/1200/900",
    category: "AI Product",
  },
  {
    title: "Prompt-to-Video Engine",
    description:
      "Automated media-production pipeline that turns text prompts into polished short-form videos. Cut production costs by 90% for a creator-economy client.",
    tags: ["Python", "OpenAI API", "FFmpeg", "FastAPI", "AWS"],
    github: "https://github.com/abhish3k",
    live: null,
    year: "2023",
    image: "https://picsum.photos/seed/video-engine/1200/900",
    category: "Automation",
  },
  {
    title: "Push Notification SDK",
    description:
      "Open-source SDK enabling any dApp to send wallet-to-wallet notifications on-chain. 200+ integrations across the EVM ecosystem.",
    tags: ["TypeScript", "Ethers.js", "IPFS", "React", "Node.js"],
    github: "https://github.com/push-protocol/push-sdk",
    live: "https://push.org/docs",
    year: "2024",
    image: "https://picsum.photos/seed/push-sdk-project/1200/900",
    category: "Open Source",
  },
  {
    title: "Blockpay Escrow",
    description:
      "Multi-signature payment escrow suite on Ethereum mainnet with Chainlink price-feed integration. 98% test coverage across 12 contracts.",
    tags: ["Solidity", "Hardhat", "Chainlink", "TypeScript"],
    github: "https://github.com/abhish3k",
    live: null,
    year: "2022",
    image: "https://picsum.photos/seed/blockpay-escrow/1200/900",
    category: "Smart Contracts",
  },
  {
    title: "Push Chat",
    description:
      "Wallet-to-wallet messaging experience with encrypted conversations, live notifications, and cross-dApp identity built for the Push ecosystem.",
    tags: ["React", "TypeScript", "Ethers.js", "WebSockets", "IPFS"],
    github: "https://github.com/push-protocol",
    live: "https://app.push.org",
    year: "2023",
    image: "https://picsum.photos/seed/push-chat/1200/900",
    category: "Messaging",
  },
  {
    title: "MetaMask Push Snap",
    description:
      "A MetaMask Snap that brings web3 notifications directly into wallet flows, improving onboarding and event awareness for on-chain users.",
    tags: ["TypeScript", "MetaMask", "React", "Node.js"],
    github: "https://github.com/push-protocol",
    live: "https://push.org",
    year: "2023",
    image: "https://picsum.photos/seed/metamask-snap/1200/900",
    category: "Wallet UX",
  },
  {
    title: "Analytics Dashboard",
    description:
      "Real-time protocol analytics dashboard tracking notifications, users, integrations, and delivery performance across multiple networks.",
    tags: ["Next.js", "GraphQL", "PostgreSQL", "Tailwind", "Vercel"],
    github: "https://github.com/abhish3k",
    live: null,
    year: "2022",
    image: "https://picsum.photos/seed/analytics-dashboard/1200/900",
    category: "Data",
  },
  {
    title: "Creator Automation Suite",
    description:
      "Internal toolkit for scripting, rendering, and distributing short-form technical content with reusable media templates and AI-assisted workflows.",
    tags: ["Python", "FFmpeg", "AWS", "FastAPI", "OpenAI API"],
    github: "https://github.com/abhish3k",
    live: null,
    year: "2024",
    image: "https://picsum.photos/seed/creator-automation/1200/900",
    category: "Tools",
  },
]

export const RECOMMENDATIONS = [
  {
    quote:
      "Abhishek shipped some of the most complex cross-chain infrastructure I've seen from a single engineer. He owns problems end-to-end and never waits to be unblocked.",
    name: "Richa Joshi",
    role: "Co-Founder & CPO",
    company: "Push Protocol",
  },
  {
    quote:
      "One of the sharpest builders in our cohort. Abhishek's ability to bridge DeFi protocol design with real user experience is rare — he thinks in systems and ships in days.",
    name: "Mentor",
    role: "Program Lead",
    company: "ETHGlobal",
  },
  {
    quote:
      "Abhishek rebuilt our dashboard in three weeks and cut load time by 80%. Clean code, clear communication, and no nonsense — exactly what a fast-moving startup needs.",
    name: "Engineering Lead",
    role: "Lead Engineer",
    company: "Workspaceio",
  },
]

export const SKILLS = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "Solidity",
    "Ethereum",
    "Web3.js",
    "Hardhat",
    "IPFS",
    "Docker",
    "Kubernetes",
    "GraphQL",
    "Tailwind",
    "AWS",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "LangChain",
    "OpenAI API",
    "FastAPI",
    "Go",
    "Rust",
    "Vercel",
    "TensorFlow",
]

export const TIMELINE = [
  {
    year: 2026,
    company: "Push Chain",
    role: "Senior Full Stack Developer",
    period: "2022 – Present",
    bullets: [
      "Leading cross-chain interoperability R&D for Push Chain's next-gen universal layer.",
      "Architecting a DeFi routing engine that processes $2M+ in daily on-chain volume.",
      "Mentoring a 4-person engineering team across smart-contract and node infrastructure.",
      "Driving protocol governance proposals adopted by the broader Push ecosystem.",
    ],
  },
  {
    year: 2025,
    company: "Push Chain",
    role: "Senior Frontend Developer",
    period: "2022 – Present",
    bullets: [
      "Shipped Push Nodes v2 — a distributed messaging layer sustaining 99.9% uptime.",
      "Designed a fee-abstraction module that cut user onboarding friction by 60%.",
      "Integrated 12 new EVM-compatible chains into the Push Delivery Network.",
      "Reduced frontend bundle size by 42% through code-splitting and lazy loading.",
    ],
  },
  {
    year: 2024,
    company: "Push Chain",
    role: "Senior Frontend Developer",
    period: "2022 – Present",
    bullets: [
      "Built Universal Account Abstraction, removing wallet complexity across 8 chains.",
      "Automated yield-farming strategies that scaled protocol TVL from $4M to $16M.",
      "Launched Push Notification SDK, now adopted by 200+ dApps in the ecosystem.",
      "Led migration of the core dApp to App Router, improving LCP by 55%.",
    ],
  },
  {
    year: 2023,
    company: "Push Chain",
    role: "Frontend Developer",
    period: "2022 – Present",
    bullets: [
      "Developed the Push Snap for MetaMask — 50k+ installs within the first month.",
      "Refactored the core smart-contract suite, reducing average gas cost by 35%.",
      "Shipped real-time notification infrastructure handling 500k+ daily events.",
      "Designed and shipped Push Chat — wallet-to-wallet encrypted messaging.",
    ],
  },
  {
    year: 2022,
    company: "Push Chain",
    role: "Junior Frontend Developer",
    period: "Jun 2022 – Dec 2022",
    bullets: [
      "Joined Push Protocol (then EPNS) as the cross-chain product surpassed 100k users.",
      "Shipped initial dApp integrations and backend microservices in first 90 days.",
      "Contributed to the EIP-1271 signature standard implementation in the core protocol.",
      "Built the analytics dashboard tracking 20+ on-chain metrics in real time.",
    ],
  },
  {
    year: 2022,
    company: "Workspaceio",
    role: "Frontend Developer",
    period: "Mar 2022 – Jun 2022",
    bullets: [
      "Rebuilt the product dashboard in Next.js, slashing load time from 4 s to 0.8 s.",
      "Shipped 3 customer-facing features end-to-end under a tight 10-week sprint.",
      "Integrated Stripe billing flow that increased MRR by 18% within the first month.",
      "Established a component library that cut future feature development time by 30%.",
    ],
  },
  {
    year: 2021,
    company: "Blockpay",
    role: "React Developer",
    period: "Dec 2021 – Mar 2022",
    bullets: [
      "Developed multi-sig payment escrow smart contracts deployed to Ethereum mainnet.",
      "Integrated Chainlink price feeds for reliable on-chain FX rate resolution.",
      "Wrote a full Hardhat test suite achieving 98% coverage across 12 contracts.",
      "Implemented a React-based transaction dashboard with live block confirmation tracking.",
    ],
  },
]

export const AREAS = [
    {
      label: "Blockchain",
      heading: "On-chain protocol engineering.",
      body: "Cross-chain DEX, Universal Account Abstraction, $16M+ TVL yield farming. 7+ production dApps at Push Protocol serving thousands of users daily.",
    },
    {
      label: "AI Engineering",
      heading: "AI systems that actually ship.",
      body: "RAG pipelines, LLM toolchains, adaptive learning platforms. Cut media production costs by 90% with automated prompt-to-video generation.",
    },
    {
      label: "Content Creator",
      heading: "Making the complex simple.",
      body: "Technical walkthroughs and architecture deep-dives that turn hard concepts in DeFi, AI, and distributed systems into clear narratives.",
    },
    {
      label: "Founder",
      heading: "Backed and building.",
      body: "Founded Omnitutor (Tavastra VC · Google for Startups). 2,500+ users onboarded in 24 h. 10+ global hackathon wins across ETHGlobal, Encode, and BNB.",
    },
  ]