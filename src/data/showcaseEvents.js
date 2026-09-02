export const showcasePhotos = {
  hero: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=80',
  cta: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80',
  location: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80',
  watch: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80',
}

const speakerData = {
  cloudSpeakers: [
    {
      name: 'Nadine Mbala', role: 'Staff SRE · MTN', topic: 'Keeping 12M users online at 2am', initials: 'NM',
      img: '/images/org1.png', thumb: '/images/org1.png',
      bio: [
        'Nadine keeps MTN’s mobile-money stack online around the clock — measurable, boring, and fast.',
        'She’ll walk through the incident that took down services in three regions, and the runbook that stopped it from ever recurring.',
      ],
      social: { linkedin: '#', github: '#' },
    },
    {
      name: 'Kevin Talla', role: 'Platform Lead · Orange Cameroun', topic: 'From Kubernetes toys to production fleets', initials: 'KT',
      img: '/images/org2.png', thumb: '/images/org2.png',
      bio: [
        'Kevin runs the platform team that moved Orange Cameroun’s workloads onto production Kubernetes.',
        'He talks about the boring decisions that made the migration stick, and the three mistakes he hopes you won’t repeat.',
      ],
      social: { linkedin: '#', website: '#' },
    },
    {
      name: 'Arielle Foko', role: 'Cloud Architect · Kudi', topic: 'Designing for failure in African fintech', initials: 'AF',
      img: '/images/org3.png', thumb: '/images/org3.png',
      bio: [
        'Arielle designs fintech architectures that assume the worst and stay fast anyway.',
        'Her talk maps a multi-region AWS design built on a shoestring budget, fault injection included.',
      ],
      social: { linkedin: '#', github: '#' },
    },
    {
      name: 'Brice Nganou', role: 'Co-founder · Infra Labs', topic: 'Terraform at team scale without the tears', initials: 'BN',
      img: '/images/org4.png', thumb: '/images/org4.png',
      bio: [
        'Brice co-founded Infra Labs to give local startups infrastructure muscle on a budget.',
        'He demonstrates Terraform workflows that scale across teams without turning your repos into war zones.',
      ],
      social: { linkedin: '#', website: '#' },
    },
    {
      name: 'Clarisse Ndongo', role: 'CTO · Cauri', topic: 'Building multi-cloud on a startup budget', initials: 'CN',
      img: '/images/org5.png', thumb: '/images/org5.png',
      bio: [
        'Clarisse ships products on three clouds without letting cost control the roadmap.',
        'She’s here to show how small teams stay multi-cloud without the multi-cloud headaches.',
      ],
      social: { linkedin: '#', website: '#' },
    },
    {
      name: 'Fabrice Song', role: 'Cloud Consultant · Google Cloud', topic: 'Right-sizing every workload you run', initials: 'FS',
      img: '/images/IMG2.png', thumb: '/images/IMG2.png',
      bio: [
        'Fabrice helps companies pay for capacity they actually use, not capacity they’re afraid of running out of.',
        'Expect a live cost-optimization clinic on real customer bills.',
      ],
      social: { linkedin: '#', github: '#' },
    },
    {
      name: 'Mireille Abena', role: 'DevOps Lead · Ndovu Labs', topic: 'Shipping observability before launch day', initials: 'MA',
      img: '/images/org1.png', thumb: '/images/org1.png',
      bio: [
        'Mireille leads DevOps at Ndovu Labs, where observability is a launch requirement, not an afterthought.',
        'She’ll share the instrumentation checklist her teams ship before any go-live.',
      ],
      social: { linkedin: '#', website: '#' },
    },
    {
      name: 'Hugo Essomba', role: 'Systems Engineer · Canal+', topic: 'Bare metal that refuses to break', initials: 'HE',
      img: '/images/org2.png', thumb: '/images/org2.png',
      bio: [
        'Hugo keeps broadcast infrastructure alive in environments where the cloud isn’t an option.',
        'He defends boring, well-tested systems with surprising enthusiasm.',
      ],
      social: { linkedin: '#', github: '#' },
    },
    {
      name: 'Diane Nkoulou', role: 'Cloud Security Engineer · WiPay', topic: 'Securing the pipeline end to end', initials: 'DN',
      img: '/images/org3.png', thumb: '/images/org3.png',
      bio: [
        'Diane bakes security into the pipeline so releases stop being a trust exercise.',
        'Her session covers workload identity, secret handling, and the audits that actually catch things.',
      ],
      social: { linkedin: '#', website: '#' },
    },
  ],
  sreSpeakers: [
    {
      name: 'Carmen Atangana', role: 'Head of Observability · MTN', topic: 'Metrics, logs, traces — pick your fight', initials: 'CA',
      img: '/images/org4.png', thumb: '/images/org4.png',
      bio: [
        'Carmen runs observability for MTN’s most critical platforms, from KPIs to on-call discipline.',
        'She’ll show what changes when you stop collecting everything and start collecting the right things.',
      ],
      social: { linkedin: '#', website: '#' },
    },
    {
      name: 'Serge Ekollo', role: 'On-call Lead · Wave', topic: 'Burnout-free on-call rotations', initials: 'SE',
      img: '/images/org5.png', thumb: '/images/org5.png',
      bio: [
        'Serge designed Wave’s on-call program around alert fatigue, follow-the-sun rotations, and sleep.',
        'He’s here to prove reliability and a healthy team aren’t in conflict.',
      ],
      social: { linkedin: '#', github: '#' },
    },
    {
      name: 'Yann Djomga', role: 'Incident Commander · Diginext', topic: 'Running the postmortem without blame', initials: 'YD',
      img: '/images/IMG2.png', thumb: '/images/IMG2.png',
      bio: [
        'Yann leads incident response at Diginext and has commanded some genuinely scary firefights.',
        'His postmortem framework turns outages into system fixes instead of excuses.',
      ],
      social: { linkedin: '#', website: '#' },
    },
    {
      name: 'Rosine Makembe', role: 'SRE · Tangerine Finance', topic: 'SLIs/SLOs your team will actually keep', initials: 'RM',
      img: '/images/org1.png', thumb: '/images/org1.png',
      bio: [
        'Rosine translates business risk into SLIs/SLOs that don’t get abandoned after the first quarter.',
        'She’ll walk through the SLO process her fintech team adopted and still uses.',
      ],
      social: { linkedin: '#', website: '#' },
    },
    {
      name: 'Loïc Kamdem', role: 'Reliability Engineer · AfrikPay', topic: 'Turning chaos days on and off', initials: 'LK',
      img: '/images/org2.png', thumb: '/images/org2.png',
      bio: [
        'Loïc runs chaos experiments at AfrikPay, deliberately breaking the platform to keep it honest.',
        'He’ll demo a controlled blast-radius failure exercise on a staging production clone.',
      ],
      social: { linkedin: '#', github: '#' },
    },
    {
      name: 'Chantal Mbouombouo', role: 'SRE · Energy of Cameroon', topic: 'Reliability for critical national services', initials: 'CM',
      img: '/images/org3.png', thumb: '/images/org3.png',
      bio: [
        'Chantal works on infrastructure where downtime has national consequences.',
        'She speaks to the weight of reliability when your users aren’t optional.',
      ],
      social: { linkedin: '#', website: '#' },
    },
    {
      name: 'Patrick Nana', role: 'Observability Engineer · Orange', topic: 'Dashboards people actually look at', initials: 'PN',
      img: '/images/org4.png', thumb: '/images/org4.png',
      bio: [
        'Patrick designs dashboards that answer questions before anyone has to ask them.',
        'Expect a live critique of real, terrible dashboards — his own included.',
      ],
      social: { linkedin: '#', github: '#' },
    },
    {
      name: 'Sandrine Owona', role: 'Platform SRE · Kortex', topic: 'Self-service reliability for product teams', initials: 'SO',
      img: '/images/org5.png', thumb: '/images/org5.png',
      bio: [
        'Sandrine builds the guardrails that let product teams ship without an SRE babysitting every deploy.',
        'Her platform gives teams ownership and safety at the same time.',
      ],
      social: { linkedin: '#', website: '#' },
    },
    {
      name: 'Cedric Bengono', role: 'Chaos Engineer · Kudi', topic: 'Fault injection without the drama', initials: 'CB',
      img: '/images/IMG2.png', thumb: '/images/IMG2.png',
      bio: [
        'Cedric breaks systems on purpose, on a schedule, and records what happens.',
        'He’ll share the failure taxonomy his team uses to pick what to break next.',
      ],
      social: { linkedin: '#', github: '#' },
    },
  ],
  kubeSpeakers: [
    {
      name: 'Paul Essongue', role: 'CNCF Ambassador', topic: 'Kubernetes networking, demystified', initials: 'PE',
      img: '/images/IMG2.png', thumb: '/images/IMG%202.png',
      bio: [
        'Paul is a CNCF Ambassador who has run Kubernetes clusters for everyone from startups to telecoms.',
        'His session untangles service meshes, CNIs, and egress policies without the jargon.',
      ],
      social: { linkedin: '#', website: '#' },
    },
    {
      name: 'Larissa Njo', role: 'DevOps Engineer · Saasili', topic: 'CI/CD pipelines that survive Mondays', initials: 'LN',
      img: '/images/org1.png', thumb: '/images/org1.png',
      bio: [
        'Larissa builds pipelines at Saasili that deploy on Fridays without drama.',
        'She’ll walk through the pipeline that turns a merge into a monitored production release.',
      ],
      social: { linkedin: '#', github: '#' },
    },
    {
      name: 'Didier Mvondo', role: 'Cluster Admin · Telephony Lab', topic: 'GitOps your entire platform', initials: 'DM',
      img: '/images/org2.png', thumb: '/images/org2.png',
      bio: [
        'Didier manages clusters where a misapplied config has real-world consequences.',
        'He’ll demo a full GitOps loop where nothing touches a cluster except a pull request.',
      ],
      social: { linkedin: '#', website: '#' },
    },
    {
      name: 'Grace Bidjeck', role: 'DevEx Engineer', topic: 'Platform engineering for humans', initials: 'GB',
      img: '/images/org3.png', thumb: '/images/org3.png',
      bio: [
        'Grace reduces the distance between developers and the platform they deploy to.',
        'She treats developer experience as a product with users, not a service with tickets.',
      ],
      social: { linkedin: '#', website: '#' },
    },
    {
      name: 'Vanessa Mbarga', role: 'Kubernetes Engineer · AWS', topic: 'Scaling stateful workloads', initials: 'VM',
      img: '/images/org4.png', thumb: '/images/org4.png',
      bio: [
        'Vanessa runs stateful workloads on Kubernetes at AWS and has seen every storage trap there is.',
        'Her talk is the stateful scaling playbook she wishes she’d had as a beginner.',
      ],
      social: { linkedin: '#', github: '#' },
    },
    {
      name: 'Jean-Claude Biya', role: 'Platform Engineer · MTN', topic: 'Ruthless cost control on clusters', initials: 'JB',
      img: '/images/org5.png', thumb: '/images/org5.png',
      bio: [
        'Jean-Claude optimizes cluster spend at MTN, where every idle CPU has a price tag.',
        'He’ll show the autoscaling policies that cut their cloud bill without touching service quality.',
      ],
      social: { linkedin: '#', website: '#' },
    },
    {
      name: 'Josiane Effa', role: 'CI/CD Engineer · Orange', topic: 'Deploying hundreds of services safely', initials: 'JE',
      img: '/images/IMG2.png', thumb: '/images/IMG2.png',
      bio: [
        'Josiane orchestrates hundreds of service deploys every week at Orange.',
        'Her session covers progressive delivery: canaries, rollbacks, and confidence gates.',
      ],
      social: { linkedin: '#', github: '#' },
    },
    {
      name: 'Stephane Abena', role: 'GitOps Lead · Kudi', topic: 'Reviewing configs like code', initials: 'SA',
      img: '/images/org1.png', thumb: '/images/org1.png',
      bio: [
        'Stephane leads GitOps adoption at Kudi, where every manifest change goes through review.',
        'He’ll share the policy engines and tests that keep bad configs out of clusters.',
      ],
      social: { linkedin: '#', website: '#' },
    },
    {
      name: 'Marlène Titti', role: 'SRE · Ndovu', topic: 'Day-2 Kubernetes operations', initials: 'MT',
      img: '/images/org2.png', thumb: '/images/org2.png',
      bio: [
        'Marlène runs day-2 operations at Ndovu, where the interesting work starts after the cluster is up.',
        'She’ll cover upgrades, security patching, and capacity planning nobody plans for.',
      ],
      social: { linkedin: '#', website: '#' },
    },
  ],
}

const organizerBase = [
  { name: 'DevOps Cameroon', role: 'Community Organizers · Core team', initials: 'DC', photo: '/images/org1.png' },
  { name: 'Volunteer Crew', role: 'Oversight, logistics & AV', initials: 'VC', photo: '/images/org2.png' },
  { name: 'Cloud Partners', role: 'Sponsors & cloud credits', initials: 'CP', photo: '/images/org3.png' },
  { name: 'Logistics Team', role: 'Venue, catering & setup', initials: 'LT', photo: '/images/org4.png' },
  { name: 'Marketing & Comms', role: 'Social, press & outreach', initials: 'MC', photo: '/images/org5.png' },
  { name: 'Tech Operations', role: 'Infra, AV & on-site support', initials: 'TO', photo: '/images/IMG2.png' },
]

export const showcaseEvents = [
  {
    id: 'devops-showcase-2026',
    year: '2026',
    title: 'DevOps Showcase',
    tag: 'Cloud · Infrastructure',
    accent: '#3ddc84',
    dateISO: '2026-11-21T09:00:00',
    dateLabel: '21 November 2026',
    venue: 'Douala Polytechnic, Cameroon',
    format: 'Talks · Workshops · Career Fair',
    seats: '300 seats',
    capacity: 300,
    taken: 247,
    featured: true,
    status: 'open',
    img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=900&q=80',
    desc: "Cameroon's flagship cloud and infrastructure event — talks, workshops, and a hiring fair that turns real skill into real roles.",
    summary: 'The most anticipated edition yet: 18 talks, hands-on labs, live incident drills, and hiring conversations with our partners.',
    highlights: [
      '18 talks and lightning demos from the country’s top infra teams',
      'Hands-on workshops on Terraform, Kubernetes, and observability',
      'Career fair with hiring teams from partner companies',
      'A live incident-response drill on a real production system',
    ],
    speakers: speakerData.cloudSpeakers,
    organizers: organizerBase,
    topics: ['Kubernetes', 'CI/CD pipelines', 'Observability', 'Mentorship', 'Terraform', 'Cloud infrastructure'],
  },
  {
    id: 'sre-observability-2026',
    year: '2026',
    title: 'SRE · Observability Day',
    tag: 'SRE · Observability',
    accent: '#60a5fa',
    dateISO: '2026-08-29T09:00:00',
    dateLabel: '29 August 2026',
    venue: 'Institut Universitaire de la Côte, Douala',
    format: 'Talks · Labs',
    seats: '240 seats',
    capacity: 240,
    taken: 185,
    featured: false,
    status: 'open',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80',
    desc: 'Deep dives into on-call culture, monitoring, and the reliability engineering behind growing stacks.',
    summary: 'A full day on observability: OpenTelemetry labs, on-call runbooks, and honest reliability stories from local teams.',
    highlights: [
      'Deep dives into SRE culture and on-call runbooks',
      'OpenTelemetry and monitoring labs with live data',
      'First-time speaker track for community engineers',
      'Networking that turns into freelance contracts and roles',
    ],
    speakers: speakerData.sreSpeakers,
    organizers: organizerBase,
    topics: ['Observability', 'Monitoring', 'On-call culture', 'SRE practices', 'OpenTelemetry', 'Incident response'],
  },
  {
    id: 'kube-cicd-week-2026',
    year: '2026',
    title: 'Kubernetes · CI/CD Week',
    tag: 'Kubernetes · CI/CD',
    accent: '#2dd4bf',
    dateISO: '2026-07-11T09:00:00',
    dateLabel: '11 July 2026',
    venue: 'Catholic University Institute, Douala',
    format: 'Workshops · Talks',
    seats: '180 seats',
    capacity: 180,
    taken: 95,
    featured: false,
    status: 'open',
    img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80',
    desc: 'A week-long deep dive into building, testing, and deploying — from first commit to a running cluster.',
    summary: 'Pipeline bootcamps, Kubernetes labs, and GitOps sessions for engineers new to containers.',
    highlights: [
      'First large-scale CI/CD pipeline workshops in the city',
      'Kubernetes bootcamp for engineers new to containers',
      'GitOps your entire platform — live',
      'The launch of the DevOps Cameroon community',
    ],
    speakers: speakerData.kubeSpeakers,
    organizers: organizerBase,
    topics: ['Kubernetes', 'CI/CD pipelines', 'GitOps', 'Docker', 'Helm', 'ArgoCD'],
  },
  {
    id: 'cloud-summit-2026',
    year: '2026',
    title: 'Cloud Summit',
    tag: 'Cloud · Infrastructure',
    accent: '#3ddc84',
    dateISO: '2026-11-07T09:00:00',
    dateLabel: '7 November 2026',
    venue: 'Yaoundé · SaaS tech hub',
    format: 'Talks · Labs',
    seats: '150 seats',
    capacity: 150,
    taken: 72,
    featured: false,
    status: 'open',
    img: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=900&q=80',
    desc: 'Hands-on labs and talks on cloud fundamentals, cost optimization, and getting teams to production safely.',
    summary: 'AWS and GCP fundamentals, a live cost-optimization clinic, and safe production deploys for small teams.',
    highlights: [
      'AWS and GCP fundamentals labs for first-time cloud builders',
      'A live cost-optimization clinic on real bills',
      'Talks on safe production deploys for small teams',
      'Mentorship corner with senior infrastructure engineers',
    ],
    speakers: speakerData.cloudSpeakers,
    organizers: organizerBase,
    topics: ['Cloud infrastructure', 'Cost optimization', 'AWS', 'GCP', 'Production deploys', 'Mentorship'],
  },
  {
    id: 'kube-cicd-week-2026-bis',
    year: '2026',
    title: 'Kube · CI/CD Week',
    tag: 'Kubernetes · CI/CD',
    accent: '#cfa342',
    dateISO: '2026-12-11T09:00:00',
    dateLabel: '11 December 2026',
    venue: 'Douala · bSpace coworking',
    format: 'Bootcamps · Labs · GitOps',
    seats: '200 seats',
    capacity: 200,
    taken: 120,
    featured: false,
    status: 'open',
    img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80',
    desc: 'A second week of pipeline bootcamps, Kubernetes labs, and GitOps sessions — for those who missed the first edition.',
    summary: 'Repeat edition: pipeline bootcamps, Kubernetes labs, and GitOps sessions for engineers new to containers.',
    highlights: [
      'Pipeline bootcamps for engineers new to containers',
      'Hands-on Kubernetes labs with local mentors',
      'GitOps sessions and a live demo loop',
      'Networking mixer with partner hiring teams',
    ],
    speakers: speakerData.kubeSpeakers,
    organizers: organizerBase,
    topics: ['Kubernetes', 'CI/CD pipelines', 'GitOps', 'Docker', 'Helm', 'ArgoCD'],
  },
]

export const showcaseFaqs = [
  {
    q: 'What is DevOps Showcase and how does it help engineers?',
    a: "It's DevOps Cameroon's flagship annual event, bringing together the country's top infrastructure engineers for talks, workshops, and direct access to hiring teams.",
  },
  {
    q: 'Who can participate in these events?',
    a: 'Any engineer working with cloud, infrastructure, or automation — from students shipping their first pipeline to senior SREs running production at scale.',
  },
  {
    q: 'What opportunities do the events offer engineers?',
    a: "Direct conversations with hiring companies, hands-on workshop credit, and visibility with the sponsors and partners funding Cameroon's DevOps talent pipeline.",
  },
  {
    q: 'Will there be support for finding job opportunities?',
    a: 'Yes — partner companies host a career fair on-site, and our Slack community stays active with job postings and referrals year-round.',
  },
  {
    q: "How do these events impact engineers' careers?",
    a: 'Past attendees have landed roles, freelance contracts, and speaking invitations directly from connections made at the events.',
  },
]