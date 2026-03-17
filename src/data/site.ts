export const site = {
  name: 'Hsin-Han Li',
  nameZh: '李欣翰',
  handle: 'Graylee0128',
  title: 'DevOps & Cloud Engineer',
  description: 'AWS Certified Solutions Architect focused on Linux, Terraform, Kubernetes, and maintainable cloud systems.',
  url: 'https://graylee0128.github.io',
  email: '910128asd@gmail.com',
  github: 'https://github.com/Graylee0128',
  linkedin: 'https://www.linkedin.com/in/hsin-han-li-2518a11b6/'
} as const;

export const navItems = [
  { label: 'Portfolio', href: '/', external: false },
  { label: 'Articles', href: '/articles/', external: false },
  { label: 'GitHub', href: site.github, external: true }
] as const;

export const homeSections = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certs', href: '#certs' }
] as const;

export const profile = {
  greeting: "Hi, I'm",
  kicker: 'Portfolio',
  subtitle: 'AWS Certified · Linux · Terraform · Kubernetes',
  about: [
    'I am a DevOps and Cloud Engineer focused on cloud architecture optimization and automated deployment. Holding the AWS Certified Solutions Architect - Associate certification, I work across AWS core services and serverless architecture implementation.',
    'With hands-on experience in Linux system administration, Python development, and Kubernetes containerization, I build cloud systems that are easier to operate, reason about, and evolve.'
  ],
  meta: [
    { label: 'Location', value: 'New Taipei City, Taiwan' },
    { label: 'Education', value: 'NTNU · B.S. Technology Application & HRD · 2024' },
    { label: 'Languages', value: 'Mandarin (Native) · English (Professional)' }
  ]
} as const;

export const experiences = [
  {
    role: 'Linux / Cloud Systems Engineer',
    company: 'npdata',
    period: 'Jun 2025 - Jan 2026',
    type: 'Full-time'
  },
  {
    role: 'Technical Contributor',
    company: 'NTC.im',
    period: 'Mar 2025 - Sep 2025',
    type: 'Project'
  }
] as const;

export const projects = [
  {
    title: 'Secure FinOps Platform for Kubernetes',
    period: '2026 - In progress',
    icon: 'K8S',
    status: 'Portfolio build',
    description: 'Umbrella homelab platform project combining GitOps, observability, DevSecOps guardrails, incident response, and FinOps practices around a Kubernetes workload.',
    highlights: [
      'Defines a platform narrative from GitHub Actions and GHCR to ArgoCD and k3s',
      'Uses an observable workload to validate monitoring, alerting, runbooks, rollback, and backup patterns',
      'Maps homelab implementation choices to AWS services such as EKS, ALB, CloudWatch, IAM, and Cost Explorer'
    ],
    tags: ['Kubernetes', 'GitOps', 'SRE', 'DevSecOps', 'FinOps', 'ArgoCD'],
    evidence: [
      {
        label: 'Repo',
        href: 'https://github.com/Graylee0128/devops-homelab'
      },
      {
        label: 'Project plan',
        href: 'https://github.com/Graylee0128/devops-homelab/tree/master/projects/secure-finops-k8s-platform'
      },
      {
        label: 'Demo page planned',
        note: 'Reserved for a future live walkthrough, dashboard, or architecture demo page.'
      }
    ]
  },
  {
    title: 'Observable E-commerce Platform',
    period: '2026 - In progress',
    icon: 'SRE',
    status: 'Workload lab',
    description: 'A production-flow SRE lab that uses a simplified e-commerce workload to demonstrate deployment, monitoring, logs, alerts, rollback, backup, and persistent state management.',
    highlights: [
      'Models an app stack with API, PostgreSQL, Redis, worker, and mock payment boundary',
      'Plans Docker Compose and Kubernetes paths so the workload can be validated locally and in homelab k3s',
      'Uses Prometheus, Grafana, Loki, Alertmanager, GitHub Actions, and ArgoCD as operational evidence'
    ],
    tags: ['Observability', 'Prometheus', 'Grafana', 'Loki', 'CI/CD', 'PostgreSQL'],
    evidence: [
      {
        label: 'Repo',
        href: 'https://github.com/Graylee0128/devops-homelab'
      },
      {
        label: 'Project plan',
        href: 'https://github.com/Graylee0128/devops-homelab/tree/master/projects/observable-ecommerce-platform'
      },
      {
        label: 'Demo page planned',
        note: 'Reserved for a future live walkthrough, dashboard, or architecture demo page.'
      }
    ]
  },
  {
    title: 'RHEL Enterprise System Upgrade',
    period: 'Oct 2025 - Jan 2026',
    icon: 'RHEL',
    status: 'Enterprise case study',
    description: 'Led a critical RHEL upgrade across major version boundaries in an enterprise environment, solving complex boot failures and LVM architecture issues.',
    highlights: [
      'Planned and executed RHEL 7.x -> 8.10 -> 9.6 cross-version upgrade using Red Hat Leapp',
      'Resolved LVM dual-PV architecture post-upgrade boot failure with an initramfs pre-boot mechanism and LVM device whitelist',
      'Authored upgrade SOP with pre/post reboot validation checklist and rollback procedures',
      'Validated Oracle WebLogic / WebCenter Sites compatibility on the new RHEL environment'
    ],
    tags: ['RHEL', 'Linux', 'LVM', 'Red Hat Leapp', 'Oracle WebLogic', 'Shell Scripting', 'initramfs'],
    evidence: [
      {
        label: 'Private case study',
        note: 'Enterprise environment; public demo and repo are intentionally omitted.'
      },
      {
        label: 'Case page planned',
        note: 'Reserved for a sanitized writeup that explains the architecture and failure analysis without exposing private materials.'
      }
    ]
  },
  {
    title: 'Company Website AWS Migration PoC',
    period: 'Aug 2025 - Oct 2025',
    icon: 'AWS',
    status: 'Architecture PoC',
    description: 'Led an on-premise to AWS migration proof of concept comparing traditional and serverless architectures, with a projected 80% cost reduction.',
    highlights: [
      'Designed and compared 2-Tier (EC2 + RDS) and Serverless (Lambda + DynamoDB) architectures',
      'Automated infrastructure deployment via Terraform across VPC, EC2, RDS, Lambda, API Gateway, and DynamoDB',
      'Produced cost analysis: traditional architecture around $230/mo vs serverless around $25-45/mo',
      'Delivered PoC documentation covering architecture design, deployment guide, and performance testing'
    ],
    tags: ['AWS', 'Terraform', 'Lambda', 'DynamoDB', 'EC2', 'RDS', 'API Gateway', 'IaC'],
    evidence: [
      {
        label: 'AWS articles',
        href: '/articles/'
      },
      {
        label: 'Private PoC',
        note: 'Company migration materials are private; public representation is handled through architecture writeups.'
      },
      {
        label: 'Demo page planned',
        note: 'Reserved for a sanitized architecture comparison page or Terraform walkthrough.'
      }
    ]
  }
] as const;

export const skillGroups = [
  {
    title: 'Cloud Platform',
    skills: ['AWS EC2', 'AWS S3', 'AWS RDS', 'AWS Lambda', 'DynamoDB', 'VPC', 'IAM', 'API Gateway']
  },
  {
    title: 'DevOps & IaC',
    skills: ['Terraform', 'Kubernetes', 'Docker', 'Git', 'GitHub Actions', 'CI/CD']
  },
  {
    title: 'Systems & Dev',
    skills: ['Linux (RHEL)', 'Shell Scripting', 'LVM', 'Python', 'MySQL']
  }
] as const;

export const credentials = [
  {
    title: 'AWS Certified Solutions Architect',
    detail: 'Associate Level · SAA-C03',
    year: '2025'
  },
  {
    title: 'TOEIC',
    detail: 'Score: 710',
    year: '2024'
  }
] as const;

export const education = {
  school: 'National Taiwan Normal University',
  department: '國立臺灣師範大學 · Dept. of Technology Application & Human Resource Development',
  degree: 'B.S. · Sep 2020 - Aug 2024'
} as const;
