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
    title: "Ramenfi",
    bullets: [
      "First cross-chain decentralized exchange built on Push Chain.",
      "Enables seamless token swaps across connected ecosystems.",
      "Reached 1,000+ MAUs with LP positions, pools, and portfolio tracking.",
    ],
    about:
      "Ramenfi is the first onchain DEX built natively on Push Chain — a consumer-first L1. It lets users swap tokens, provide liquidity, and track their portfolio across the Push ecosystem, all from a single interface.",
    longDescription:
      "Building Ramenfi meant solving problems no existing DEX template covered: a brand-new chain with no liquidity bootstrapping playbook, no existing tooling, and a user base coming from Web3-native communities expecting a polished experience. The app shipped with LP position management, pool discovery, real-time price feeds, and a full portfolio view — built entirely from scratch in collaboration with the Push Chain core team.",
    problemsTackled: [
      "Bootstrapped liquidity on a brand-new chain with no prior DEX infrastructure, designing incentive flows that attracted early LPs without overpaying in emissions.",
      "Built a multi-wallet connection layer that unified on-chain identity across heterogeneous chains so users could interact seamlessly regardless of their wallet setup.",
      "Architected the YieldFarming V2 engine to handle $16M+ TVL at a sustained 15% APY without downtime or position loss during contract upgrades.",
    ],
    github: "https://github.com/pushchain/push-chain-internal-ramenfi-deployment",
    live: "https://www.ramenfi.xyz/",
    image: "/projects/Ramenfi_demo.mp4",
    category: "DeFi",
  },
  {
    title: "Omnitutor",
    bullets: [
      "AI-powered adaptive learning platform for personalized education.",
      "Backed by Tavastra VC and Google for Startups.",
      "Onboarded 2,500+ users in 24 hours with RAG-driven content pipelines.",
    ],
    about:
      "Omnitutor is an AI-powered adaptive learning platform backed by Tavastra VC and Google for Startups. It uses RAG-driven content pipelines to deliver personalized learning paths that recalibrate in real time based on how each student interacts with the material.",
    longDescription:
      "The core challenge was building an AI tutor that genuinely adapts — not just streams completions, but recalibrates content difficulty and topic sequencing based on interaction patterns. We combined retrieval-augmented generation with a real-time evaluation layer, and shipped from zero to 2,500+ users within the first 24 hours of launch with no service degradation.",
    problemsTackled: [
      "Designed a RAG pipeline that retrieves relevant course material and reranks content against each learner's history in real time, keeping responses accurate and contextually grounded.",
      "Built a cold-start onboarding flow that collects enough signal in under two minutes to meaningfully personalize the first learning session with no prior user data.",
      "Scaled the inference and retrieval backend to absorb a 2,500-user spike on day one without degrading response latency or retrieval quality.",
    ],
    github: "https://github.com/abhish3k",
    live: "https://omnitutor.live/",
    image: "/projects/omnitutor_demo_2.mp4",
    category: "AI Product",
  },
  {
    title: "Push Wallet",
    bullets: [
      "Universal Web3 wallet built for Push Chain.",
      "Streamlined onboarding for chain-native accounts.",
      "Designed wallet UX for cross-chain app access.",
    ],
    about:
      "Push Wallet is the universal Web3 wallet built for Push Chain. It strips away the seed-phrase friction that blocks most new users and replaces it with a streamlined account creation flow, while still giving power users full cross-chain app access from a single identity.",
    longDescription:
      "The wallet was designed to feel as simple as creating a web2 account — no seed phrase in the critical onboarding path, social recovery built in, and a UI that does not assume prior Web3 experience. Under the hood it handles cross-chain account abstraction so users can jump between Push ecosystem apps without re-connecting or re-approving.",
    problemsTackled: [
      "Removed seed phrase friction from the critical onboarding path without compromising key custody or recovery options for advanced users.",
      "Built cross-chain account abstraction so one Push Chain identity grants access to multiple ecosystem apps without extra wallet setup.",
      "Implemented a real-time transaction status layer with streaming feedback so users always know exactly where their on-chain operation stands.",
    ],
    github: "https://github.com/abhish3k",
    live: "https://wallet.push.org/",
    image: "/projects/push_wallet.png",
    category: "Web3",
  },
  {
    title: "Push Faucet",
    bullets: [
      "Token faucet for Push Chain developers and testers.",
      "Lets users claim network funds quickly.",
      "Helps teams onboard into Push ecosystem apps faster.",
    ],
    about:
      "Push Faucet is a token distribution tool for Push Chain developers and testers. It provides instant testnet fund claims to accelerate ecosystem onboarding, with abuse protection that stays invisible to legitimate users.",
    longDescription:
      "Faucets sound simple but carry real abuse surface: rate limiting, Sybil resistance, and reliable fund delivery under load all have to work together without adding friction for legitimate developers. Push Faucet was built to handle all three, with wallet validation and claim-rate logic that kept the reserves intact through high-traffic ecosystem events.",
    problemsTackled: [
      "Implemented rate limiting and Sybil resistance that blocks abuse patterns without adding any visible friction to legitimate developer claim flows.",
      "Ensured reliable fund delivery under concurrent claim spikes during major ecosystem launch events with no failed transactions or stuck queues.",
      "Added wallet address validation at the claim boundary to prevent invalid or misconfigured addresses from silently consuming faucet reserves.",
    ],
    github: "https://github.com/abhish3k",
    live: "https://faucet.push.org/",
    image: "/projects/Push_Faucet.png",
    category: "Web3",
  },
  {
    title: "Yield Farming V2",
    bullets: [
      "Second-generation Push yield farming app for staking and rewards.",
      "Improved DeFi UX for tracking positions and incentives.",
      "Supports interactions with Push ecosystem pools.",
    ],
    about:
      "Yield Farming V2 is a full rearchitecture of Push's staking and rewards interface. It replaced the V1 contract architecture with a new engine that supports Uni-V2 LP token staking alongside native PUSH, while delivering a significantly cleaner DeFi UX for managing positions and tracking incentives.",
    longDescription:
      "V2 meant new contracts, a new UI, and a live migration path for V1 stakers — all without disrupting existing positions or reward accrual. The biggest engineering challenge was maintaining continuity for stakers who had capital at risk while introducing new pool types and incentive structures on top of a rewritten contract layer.",
    problemsTackled: [
      "Managed a live migration from V1 to V2 contracts while preserving all staked positions and maintaining uninterrupted reward accrual throughout the transition.",
      "Architected support for Uni-V2 LP tokens alongside native PUSH staking in a single unified interface without fragmenting the user experience.",
      "Kept $16M+ TVL secure at a sustained 15% APY across the upgrade window with no smart contract downtime or loss of user funds.",
    ],
    github: "https://github.com/abhish3k",
    live: "https://app.push.org/yield",
    image: "/projects/Push_Yield_farming.png",
    category: "DeFi",
  },
  {
    title: "FluxDev",
    bullets: [
      "Hosted AI product-building platform built on the OpenCode engine.",
      "Turns prompts into live apps with branded workspaces and previews.",
      "Handles model credits, Postgres provisioning, and GCS-backed code persistence.",
    ],
    github: "https://github.com/sheshyaAI/FluxDev",
    live: "https://www.fluxdev.live/",
    image: "/projects/fluxdev_product.mov",
    category: "Automation",
  },
  {
    title: "Push Chain Rewards",
    bullets: [
      "Rewards portal for Push Chain Season 3.",
      "Helps users track eligibility, incentives, and campaign progress.",
      "Centralizes ecosystem participation in one branded portal.",
    ],
    tags: ["React", "TypeScript", "Web3", "Rewards", "Push Chain"],
    github: "Private Repo",
    live: "https://portal.push.org/rewards",
    image: "/projects/push_rewards_demo.mov",
    category: "Web3",
  },
  {
    title: "Farfield",
    bullets: [
      "Social commerce storefront built for Farcaster.",
      "Creates a community-native shopping flow inside the Farcaster app.",
      "Helps users discover and open products from social contexts.",
    ],
    tags: ["React", "TypeScript", "Farcaster", "Commerce"],
    github: "https://github.com/abhish3k",
    live: "https://www.farfield.shop/",
    image: "/projects/Farfield_logo.png",
    category: "Social Commerce",
  },
  {
    title: "Push Scan",
    bullets: [
      "Donut explorer for Push Network.",
      "Lets users inspect transactions, blocks, and addresses.",
      "Surfaces chain activity across the Push ecosystem.",
    ],
    github: "Private Repo",
    live: "https://donut.push.network/",
    image: "/projects/Push_scan.png",
    category: "Web3",
  },
  {
    title: "Universal dApp",
    bullets: [
      "Universal dApp toolkit for Push Chain developers.",
      "Helps teams create cross-chain apps from one experience.",
      "Connects users and assets across ecosystems.",
    ],
    tags: ["React Native", "TypeScript", "Web3", "Push Chain", "dApp"],
    github: "https://github.com/abhish3k",
    live: "https://www.npmjs.com/package/create-push-universal-app",
    image: "https://picsum.photos/seed/push-chain-rewards/1200/900",
    category: "Developer Tools",
  },
]

export const RECOMMENDATIONS = [
  {
    quote:
      "Working with Abhishek is quite smooth, he delivers what he commits quite smoothly. From ideation to deployment he stays completely involved and ensures everything stays on track.",
    name: "Rohit Malhotra",
    role: "Lead Frontend Engineer",
    company: "Push Chain",
    photo: "/recommenders/rohit.jpeg",
    initials: "RM",
    relationship: "Rohit managed Abhishek directly",
    linkedin: "https://www.linkedin.com/in/rohitmalhotra1420/",
  },
  {
    quote:
      "Abhishek has a knack for identifying UX problems that directly improve a product’s conversion rates and has deep insights into the product development lifecycle. I have worked with him on different products over time, and his insights have consistently helped improve our product development cycles.",
    name: "Sankhya Siddesh",
    role: "Engineer",
    company: "Privy (acq by Stripe)",
    photo: "/recommenders/siddesh.jpeg",
    initials: "SS",
    relationship: "Co-founded Farfield together",
    linkedin: "https://www.linkedin.com/in/sankhyasiddesh/",
  },
  {
    quote:
      "Abhishek have worked with me on multiple React JS projects for 3-4 months — he has a good understanding of ReactJS and was able to quickly learn and deliver efficient work within the defined time. Certainly someone I’d want to have on my team.",
    name: "Ramesh Upadhaya",
    role: "Full Stack Developer",
    company: "MERN · React · Next.js · Node",
    photo: "/recommenders/ramesh_up.jpeg",
    initials: "RU",
    relationship: "Managed Abhishek directly",
    linkedin: "https://www.linkedin.com/in/ramesh-upadhaya/",
  },
]


export const TIMELINE = [
  {
    year: 2026,
    company: "Push Chain",
    role: "Full Stack Developer",
    period: "2022 – Present",
    bullets: [
      "Focused on Ramenfi for Push Chain and built the product indexer.",
      "Created a chess game for Push and shipped core gameplay flows.",
      "Built Oakline for investment workflows and portfolio experiences.",
    ],
  },
  {
    year: 2025,
    company: "Push Chain",
    role: "Blockchain Developer",
    period: "2022 – Present",
    bullets: [
      "Built Push Wallet and Farfield across product, UI, and integrations.",
      "Won 4 hackathons and got selected for the Base Fellowship Program.",
      "Farfield won Onchain Summer Rewards.",
    ],
  },
  {
    year: 2024,
    company: "Push Protocol",
    role: "Senior Frontend Developer",
    period: "2022 – Present",
    bullets: [
      "Worked on Push Notifications and redesigned the Create Channel Flow.",
      "Redesigned the Notifications page and improved Push Chat experiences.",
      "Won 6 global hackathons while shipping Push ecosystem products.",
    ],
  },
  {
    year: 2023,
    company: "Push Protocol",
    role: "Frontend Developer",
    period: "2022 – Present",
    bullets: [
      "Worked on Yield Farming V2 and improved DeFi user flows.",
      "Built MetaMask Push Snap for wallet-native Push experiences.",
      "Contributed to Push Chat features and frontend product polish.",
    ],
  },
  {
    year: 2022,
    company: "Push Protocol",
    role: "Junior Frontend Developer",
    period: "Jun 2022 – Dec 2022",
    bullets: [
      "Joined Push Protocol, then EPNS, to work on Push Chat.",
      "Built chat-facing UI flows and helped shape early wallet messaging UX.",
      "Collaborated across product and engineering as Push expanded beyond notifications.",
    ],
  },
  {
    year: 2022,
    company: "Workspaceio",
    role: "React Developer",
    period: "Mar 2022 – Jun 2022",
    bullets: [
      "Shipped 3 customer-facing features end-to-end under a tight 10 week sprint.",
      "Worked in a cross-functional team of 5-8 engineers to deliver client-facing projects.",
      "Owned frontend architecture across UI design, components, third-party APIs, and Next.js delivery.",
    ],
  },
  {
    year: 2021,
    company: "BlockPay",
    role: "Blockchain Developer",
    period: "Dec 2021 – Mar 2022",
    bullets: [
      "Collaborated with a 4-member startup building a blockchain payment system.",
      "Developed authentication, user registration flows, and the MVP UI.",
      "Implemented real-time blockchain transaction status using WebSockets.",
    ],
  },
]

export const AREAS = [
    {
      heading: "Software Engineer",
      body: "Building scalable products across web3, AI, and consumer apps. I focus on reliable systems, crisp interfaces, and fast shipping.",
    },
    {
      heading: "Product Designer",
      body: "Designing clear user flows, interfaces, and product stories. I turn rough ideas into usable experiences that feel intentional.",
    },
    {
      heading: "Content Creator",
      body: "Explaining complex ideas through simple technical content. I write, demo, and teach so builders can understand faster.",
    },
    {
      heading: "Founder",
      body: "Starting and building early-stage products from zero. I care about sharp positioning, quick validation, and durable momentum.",
    },
  ]