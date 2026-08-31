export const site = {
  name: 'Hsin-Han Li',
  nameZh: '李欣翰',
  handle: 'Graylee0128',
  title: 'DevOps & Cloud Engineer',
  description: 'AWS Certified Solutions Architect focused on Linux, Kubernetes, CI/CD, and DevSecOps guardrails for maintainable cloud systems.',
  url: 'https://graylee0128.github.io',
  email: 'xinhanli.job@gmail.com',
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
  subtitle: 'AWS Certified · Linux · Kubernetes · CI/CD · DevSecOps',
  about: [
    'I am an engineer working across Linux system operations and public cloud, holding the AWS Certified Solutions Architect - Associate certification. In my last role I led an enterprise RHEL 7 to 9 cross-major-version upgrade, including the boot-path failure analysis that came with it.',
    'Alongside a 530-hour cloud security program I administer the cohort shared server (Ubuntu 24.04, 20 accounts and around 30 containers), and on a five-person team project I owned the CI/CD pipelines and introduced automated secret scanning.',
    'What I keep coming back to: turning verification steps, rollback paths, and troubleshooting knowledge into repeatable scripts and documents rather than tribal memory.'
  ],
  meta: [
    { label: 'Location', value: 'New Taipei City, Taiwan' },
    { label: 'Education', value: 'NTNU · B.S. Technology Application & HRD · 2024' },
    { label: 'Languages', value: 'Mandarin (Native) · English (TOEIC 710) · Japanese (JLPT N2)' }
  ]
} as const;

export const experiences = [
  {
    role: 'Cloud Security Engineer Bootcamp (530h)',
    company: 'CCU Continuing Education x NTC.im',
    period: 'Apr 2026 - Sep 2026',
    type: 'Training'
  },
  {
    role: 'Linux / Cloud Systems Engineer',
    company: 'npdata',
    period: 'Jun 2025 - Jan 2026',
    type: 'Full-time'
  }
] as const;

export const projects = [
  {
    title: 'RHEL Enterprise System Upgrade',
    period: 'Oct 2025 - Jan 2026',
    icon: 'RHEL',
    status: 'Enterprise case study',
    description: 'Led a critical RHEL upgrade across major version boundaries in an enterprise environment, solving complex boot failures and LVM architecture issues.',
    highlights: [
      'Planned and executed a RHEL 7.2 -> 7.9 -> 8.10 -> 9.6 in-place upgrade with Red Hat Leapp in an offline (no-RHSM) VMware environment',
      'Root-caused post-upgrade dracut emergency mode to a dual-PV (sda2 + sdb1) LVM race, where RHEL 8/9 parallelized initramfs tried to activate the root VG before the second PV settled',
      'Hardened the boot path with an LVM devices-file whitelist packed into initramfs and GRUB rd.lvm.vg / rd.retry / rd.timeout tuning, plus an initramfs pre-activation service for residual races',
      'Authored the emergency-mode recovery SOP (chroot -> rebuild system.devices -> dracut --regenerate-all) and a pre/post-reboot checklist covering Oracle WebCenter Sites (WebLogic) app-layer validation'
    ],
    tags: ['RHEL', 'Linux', 'LVM', 'Red Hat Leapp', 'dracut', 'Oracle WebLogic', 'Shell Scripting', 'initramfs'],
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
    title: 'ARKAI Care Ark - CI/CD & DevSecOps',
    period: 'Jun 2026 - Aug 2026',
    icon: 'CI',
    status: 'Team project · 5 people',
    description: 'Technical lead on a five-person care-services web application, owning the delivery pipelines and the automated secret-scanning guardrail.',
    highlights: [
      'Largest contributor to the team repository at roughly 45% of commits, working issue-driven with feature branches and pull requests',
      'Built all four GitHub Actions workflows single-handed: backend-tests, frontend-tests, ci, and secret-scan',
      'Introduced gitleaks secret scanning on both push and pull_request over full git history (fetch-depth: 0), with a concurrency group that cancels superseded runs to keep CI cost down',
      'Wrote the technical documentation and user manual, then ran UAT and the resulting defect fixes',
      'Stack: React 19 + TypeScript + Vite, FastAPI, PostgreSQL, Docker, Nginx'
    ],
    tags: ['GitHub Actions', 'CI/CD', 'gitleaks', 'DevSecOps', 'FastAPI', 'React', 'PostgreSQL', 'Docker'],
    evidence: [
      {
        label: 'Live demo',
        href: 'https://878.wkbarret.com/'
      },
      {
        label: 'Pipeline audit',
        note: 'Pipeline ownership and gitleaks configuration were re-verified against the team repository git history before publishing.'
      }
    ]
  },
  {
    title: 'Shared Lab Server Operations (se218)',
    period: 'Apr 2026 - Sep 2026',
    icon: 'OPS',
    status: 'Live operations',
    description: 'Day-to-day administrator of the cohort shared server on Ubuntu 24.04 LTS, taken over after the initial build and run for the whole program.',
    highlights: [
      'Operates 20 user accounts and around 30 containers across Docker, PostgreSQL, Redis, Nginx, and Kubernetes (minikube); host uptime verified at 24 days with no unplanned reboots and zero container restart counts',
      'Wrote a hardened one-shot ELK Stack deployment script that tunes the vm.max_map_count kernel parameter and generates strong random credentials with openssl into .env, so default passwords never reach the environment',
      'Built a LAN topology discovery tool in Bash over three iterations (77 -> 104 -> 159 lines): environment detection for bare metal, VM, Docker, and K8s pod, default route and gateway MAC resolution via ARP, and docker0 / br- / cni0 / flannel bridge detection',
      'Replaced a serial 254-host sweep with concurrent background pings collected by a single wait, taking the sweep itself from a 254-second worst case to about 1.4 seconds measured',
      'Wrote a TCP service prober that completes handshake checks through the bash built-in /dev/tcp, with no external scanning tools required'
    ],
    tags: ['Linux', 'Ubuntu', 'Docker', 'Bash', 'ELK', 'Networking', 'Kubernetes', 'PostgreSQL'],
    evidence: [
      {
        label: 'Audit record',
        note: 'Line counts, uptime, and script timings were re-measured on the live host before publishing; the host itself is a private class environment.'
      },
      {
        label: 'Case page planned',
        note: 'Reserved for a sanitized writeup of the topology tool and the ELK hardening script.'
      }
    ]
  }
] as const;

export const skillGroups = [
  {
    title: 'Cloud Platform',
    skills: ['AWS EC2', 'AWS S3', 'AWS RDS', 'AWS Lambda', 'DynamoDB', 'VPC', 'IAM', 'API Gateway', 'GCP (basic)']
  },
  {
    title: 'DevOps & IaC',
    skills: ['Terraform', 'Kubernetes', 'Docker', 'Docker Compose', 'Git', 'GitHub Actions', 'CI/CD']
  },
  {
    title: 'Systems & Dev',
    skills: ['Linux (RHEL / Ubuntu)', 'Shell Scripting', 'LVM', 'systemd', 'Windows Server', 'Python', 'Go', 'PostgreSQL', 'MySQL']
  },
  {
    title: 'Security & Networking',
    skills: ['gitleaks Secret Scanning', 'Red / Blue Exercises', 'ELK Stack', 'Routing & ARP', 'Container Networking', 'TCP Service Probing']
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
  },
  {
    title: 'JLPT N2',
    detail: 'Japanese Language Proficiency Test · N2',
    year: ''
  }
] as const;

export const education = {
  school: 'National Taiwan Normal University',
  department: '國立臺灣師範大學 · Dept. of Technology Application & Human Resource Development',
  degree: 'B.S. · Sep 2020 - Aug 2024'
} as const;
