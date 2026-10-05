import type { Lesson, Badge } from '@/types';

export const lessons: Lesson[] = [
  {
    id: 'spot-phishing',
    title: 'How to spot a phishing email',
    category: 'phishing',
    duration: '4 min',
    skill: 'phishing',
    summary: 'Learn the five warning signs that reveal a phishing email before you click.',
    sections: [
      {
        heading: 'The sender is not who they claim to be',
        body: 'Phishing emails spoof sender addresses. The display name can say "PayPal" but the actual email address may be support@paypa1-security.com. Always expand the sender details and read the domain character by character. Attackers use lookalike domains with slight variations — a "1" instead of an "l", an extra hyphen, or a different top-level domain (.net instead of .com).',
      },
      {
        heading: 'Urgency is a weapon',
        body: 'Phishing emails create false deadlines: "Verify within 30 minutes or your account will be closed." This pressure is designed to make you act before you think. No legitimate service will close your account in 30 minutes. When you feel urgency, slow down — that feeling itself is a warning sign.',
      },
      {
        heading: 'Links lie',
        body: 'The text of a link and its actual destination can be completely different. An email may show "Click here to verify" with the link going to http://paypa1-security.com/verify. Always hover over links to see the real URL before clicking. On mobile, press and hold to preview the link.',
      },
      {
        heading: 'Generic greetings and poor grammar',
        body: 'Real companies address you by name: "Dear John." Phishing emails use "Dear Customer" or "Dear User." Watch for unusual grammar, odd spacing, or inconsistent capitalization — these suggest the email was mass-produced or translated.',
      },
    ],
    checklist: [
      'Check the sender domain character by character',
      'Hover over links before clicking',
      'Be suspicious of any time pressure',
      'Look for generic greetings',
      'When in doubt, go directly to the website',
    ],
  },
  {
    id: 'password-reuse',
    title: 'Why password reuse is dangerous',
    category: 'password',
    duration: '3 min',
    skill: 'passwords',
    summary: 'Understand how one breached password can unlock your entire digital life.',
    sections: [
      {
        heading: 'Credential stuffing is automated',
        body: 'When a website is breached, email and password pairs are leaked online. Attackers feed these into automated tools that try each pair on hundreds of other websites — banking, email, social media, shopping. If you reuse a password, a single breach can compromise every account that shares it.',
      },
      {
        heading: 'Breaches happen constantly',
        body: 'Over 10 billion records were exposed in data breaches in a single recent year. It is not a question of whether your password will be leaked, but when. You can check if your email appears in known breaches at haveibeenpwned.com.',
      },
      {
        heading: 'The solution: unique passwords',
        body: 'Use a password manager (Bitwarden, 1Password, or your browser built-in) to generate and store a unique random password for every account. You only need to remember one master password. Enable two-factor authentication on every account that supports it.',
      },
    ],
    checklist: [
      'Use a password manager for all accounts',
      'Generate a unique password for each site',
      'Enable 2FA everywhere it is available',
      'Check haveibeenpwned.com for known exposures',
      'Never reuse a password across accounts',
    ],
  },
  {
    id: 'what-happens-after-click',
    title: 'What actually happens after you click a malicious link?',
    category: 'url',
    duration: '4 min',
    skill: 'device',
    summary: 'Follow the chain of events from one click to a compromised device.',
    sections: [
      {
        heading: 'Step 1: The redirect',
        body: 'Malicious links often use URL shorteners or compromised websites to hide their true destination. When you click, you are silently redirected through multiple hops before landing on the attack page — sometimes within milliseconds, too fast to notice.',
      },
      {
        heading: 'Step 2: The exploit',
        body: 'The attack page may use a drive-by download — exploiting a vulnerability in your browser to install malware without any prompt or interaction. Or it may show a convincing fake login page to harvest your credentials. Either way, the attack begins the moment the page loads.',
      },
      {
        heading: 'Step 3: The payload',
        body: 'Malware can be a keylogger (records everything you type), a banking trojan (modifies transactions in real time), ransomware (encrypts your files and demands payment), or a remote access trojan (gives the attacker full control of your device). The damage spreads from there.',
      },
      {
        heading: 'Step 4: Lateral movement',
        body: 'Once on your device, attackers look for saved passwords, session cookies, and access to other accounts. One compromised device can lead to your email, banking, and work accounts being taken over.',
      },
    ],
    checklist: [
      'Keep your browser and OS fully updated',
      'Use a URL expander on shortened links',
      'Never click links from unknown senders',
      'Use an ad-blocker and anti-tracking extension',
      'Run regular malware scans',
    ],
  },
  {
    id: 'social-engineering',
    title: 'How social engineering works',
    category: 'social',
    duration: '5 min',
    skill: 'social',
    summary: 'Understand the psychological tactics attackers use to manipulate you.',
    sections: [
      {
        heading: 'Authority',
        body: 'Attackers impersonate authority figures — IT support, your boss, a bank official, a police officer. People are conditioned to comply with authority. The scammer relies on this conditioning to bypass your skepticism. Always verify identity through independent channels.',
      },
      {
        heading: 'Urgency and fear',
        body: 'Every social engineering attack includes some form of pressure: "Your account will be closed," "You will be arrested," "You have 30 minutes." Fear and urgency shut down rational thinking. When you feel pressured, that is the moment to stop and verify.',
      },
      {
        heading: 'Trust and rapport',
        body: 'Some attacks build rapport over weeks — a romance scammer, a fake recruiter, a new online friend. They invest time in gaining your trust so that when they eventually ask for money or information, it feels reasonable. Be wary of anyone who builds a relationship and then asks for sensitive information or financial help.',
      },
      {
        heading: 'The verification principle',
        body: 'The single most effective defense against social engineering is independent verification. If someone calls claiming to be from your bank, hang up and call the number on your card. If someone emails claiming to be from IT, check with IT through the official helpdesk. The cost of verification is seconds; the cost of compliance can be everything.',
      },
    ],
    checklist: [
      'Hang up and call back through official channels',
      'Be suspicious of any time pressure',
      'Do not share sensitive info with unsolicited contacts',
      'Verify identity independently — do not trust caller ID',
      'Slow down when you feel urgency or fear',
    ],
  },
  {
    id: 'check-url-safety',
    title: 'How to check a URL before opening it',
    category: 'url',
    duration: '3 min',
    skill: 'privacy',
    summary: 'Learn to read a URL like a security analyst and spot malicious domains.',
    sections: [
      {
        heading: 'Read the domain, not just the link text',
        body: 'The domain is the part between "https://" and the next slash. Everything after the first slash is a path that can be anything. A link like https://paypal.com.secure-login.net/verify looks like PayPal but the real domain is secure-login.net — paypal.com is just part of the path.',
      },
      {
        heading: 'Watch for homograph attacks',
        body: 'Attackers use international characters that look identical to ASCII letters. For example, "а" (Cyrillic a) looks the same as "a" (Latin a) but is a different character. apple.com with a Cyrillic а is a completely different domain. If a URL looks right but something feels off, type it manually.',
      },
      {
        heading: 'Check for HTTPS — but do not rely on it alone',
        body: 'HTTPS means the connection is encrypted, not that the site is legitimate. Free certificates are available to anyone, including scammers. The padlock icon means your data is encrypted in transit, but it does not verify who runs the site.',
      },
      {
        heading: 'Use URL expanders and reputation tools',
        body: 'For shortened links, use unshorten.it or expandurl.net to see the real destination. For any suspicious URL, check it on VirusTotal.com or urlvoid.com — these services scan URLs against dozens of security databases.',
      },
    ],
    checklist: [
      'Read the domain between https:// and the first /',
      'Be wary of subdomains that mimic brand names',
      'Do not trust HTTPS alone as a sign of legitimacy',
      'Expand shortened URLs before clicking',
      'Check suspicious URLs on VirusTotal.com',
    ],
  },
  {
    id: 'public-wifi-safety',
    title: 'Staying safe on public Wi-Fi',
    category: 'wifi',
    duration: '3 min',
    skill: 'device',
    summary: 'Learn how public networks can be compromised and how to protect yourself.',
    sections: [
      {
        heading: 'The evil twin attack',
        body: 'Attackers create a Wi-Fi hotspot with the same name as a legitimate one (e.g., "Starbucks_WiFi"). When you connect, your traffic flows through their device. They can intercept unencrypted data, redirect you to fake websites, and capture credentials.',
      },
      {
        heading: 'What is actually at risk',
        body: 'On an unencrypted public network, other users on the same network can potentially see the websites you visit and any data you send unencrypted. HTTPS protects the content of your communication, but the fact that you are visiting a specific site may still be visible.',
      },
      {
        heading: 'How to protect yourself',
        body: 'Use a VPN to encrypt all your traffic — even if the network is compromised, the attacker only sees encrypted data. Prefer cellular data for sensitive activities like banking. If you must use public Wi-Fi, stick to HTTPS sites and avoid logging into sensitive accounts. Never ignore browser certificate warnings on public networks.',
      },
    ],
    checklist: [
      'Use a VPN on public Wi-Fi',
      'Prefer cellular data for sensitive activities',
      'Verify the official network name with venue staff',
      'Stick to HTTPS websites',
      'Never ignore certificate warnings',
    ],
  },
];

export const badges: Badge[] = [
  {
    id: 'phish-slayer',
    name: 'Phish Slayer',
    description: 'Correctly identify 3 phishing attempts',
    icon: 'Fish',
    condition: 'phishing:3',
  },
  {
    id: 'password-ninja',
    name: 'Password Ninja',
    description: 'Master password security scenarios',
    icon: 'KeyRound',
    condition: 'passwords:2',
  },
  {
    id: 'social-detective',
    name: 'Social Engineering Detective',
    description: 'See through 3 manipulation attempts',
    icon: 'UserSearch',
    condition: 'social:3',
  },
  {
    id: 'device-guardian',
    name: 'Device Guardian',
    description: 'Protect your devices in 3 scenarios',
    icon: 'ShieldCheck',
    condition: 'device:3',
  },
  {
    id: 'first-blood',
    name: 'First Catch',
    description: 'Complete your first scenario',
    icon: 'Target',
    condition: 'total:1',
  },
  {
    id: 'halfway',
    name: 'Seasoned Defender',
    description: 'Complete 5 scenarios',
    icon: 'Medal',
    condition: 'total:5',
  },
  {
    id: 'completionist',
    name: 'Digital Guardian',
    description: 'Complete all 10 scenarios',
    icon: 'Crown',
    condition: 'total:10',
  },
  {
    id: 'perfect-run',
    name: 'Flawless Instinct',
    description: 'Get 5 correct decisions in a row',
    icon: 'Star',
    condition: 'streak:5',
  },
  {
    id: 'scholar',
    name: 'Knowledge Seeker',
    description: 'Complete 3 lessons',
    icon: 'BookOpen',
    condition: 'lessons:3',
  },
];

export const threatRadarData = [
  { category: 'Phishing', value: 82, trend: 'up', description: 'Most common attack vector — 3.4B phishing emails sent daily worldwide.' },
  { category: 'Malware', value: 65, trend: 'up', description: 'Ransomware attacks increased 13% in the last year across all sectors.' },
  { category: 'Social Engineering', value: 71, trend: 'stable', description: '60% of breaches involve a human element — manipulation, not hacking.' },
  { category: 'Data Breaches', value: 58, trend: 'up', description: 'Over 10 billion records exposed globally in a single recent year.' },
  { category: 'Credential Theft', value: 74, trend: 'up', description: 'Credential stuffing attempts have doubled as AI tools automate attacks.' },
];

export const skillsMeta = [
  { key: 'phishing' as const, label: 'Phishing Awareness', icon: 'Fish' },
  { key: 'passwords' as const, label: 'Password Security', icon: 'KeyRound' },
  { key: 'social' as const, label: 'Social Engineering', icon: 'UserSearch' },
  { key: 'privacy' as const, label: 'Privacy', icon: 'Eye' },
  { key: 'device' as const, label: 'Device Security', icon: 'ShieldCheck' },
];

export const levels = [
  { name: 'Rookie', minXP: 0, icon: 'Sprout' },
  { name: 'Defender', minXP: 150, icon: 'Shield' },
  { name: 'Analyst', minXP: 400, icon: 'Search' },
  { name: 'Hunter', minXP: 800, icon: 'Crosshair' },
  { name: 'Guardian', minXP: 1400, icon: 'Crown' },
];
