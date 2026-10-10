export const currentUser = {
  id: "usr-1",
  name: "Alex Vance",
  email: "alex.vance@novapay-defense.io",
  avatarUrl:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
  role: "Principal Brand Protection Lead",
  organization: "NovaPay Global Inc.",
};

export const initialBrands = [
  {
    id: "brand-novapay",
    name: "NovaPay Global",
    legalName: "NovaPay Technologies Global Ltd.",
    description:
      "Premier digital banking and instant settlement network serving over 8 million verified mobile customers.",
    industry: "Financial Technology / Digital Banking",
    region: "North America & European Economic Area",
    website: "https://novapay.global",
    logoUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
    aliases: [
      "NovaPay",
      "Nova Pay",
      "NovaPay Wallet",
      "NovaPay Direct",
      "NovaPay Cash",
    ],
    socialAssets: [
      {
        id: "soc-1",
        platform: "x",
        handle: "@NovaPayGlobal",
        url: "https://x.com/NovaPayGlobal",
        profileId: "109823412",
        isVerified: true,
      },
      {
        id: "soc-2",
        platform: "instagram",
        handle: "@novapay_official",
        url: "https://instagram.com/novapay_official",
        isVerified: true,
      },
      {
        id: "soc-3",
        platform: "linkedin",
        handle: "novapay-technologies",
        url: "https://linkedin.com/company/novapay-technologies",
        isVerified: true,
      },
    ],
    mobileApps: [
      {
        id: "app-official-android",
        name: "NovaPay Wallet",
        store: "google_play",
        listingUrl:
          "https://play.google.com/store/apps/details?id=com.novapay.wallet",
        packageId: "com.novapay.wallet",
        storeId: "GP-98231",
        publisherName: "NovaPay Technologies Ltd",
        publisherId: "PUB-NPAY-CORP",
        isVerified: true,
        version: "4.18.2",
      },
      {
        id: "app-official-ios",
        name: "NovaPay Wallet & Send",
        store: "apple_app_store",
        listingUrl: "https://apps.apple.com/app/novapay-wallet/id1548291032",
        packageId: "com.novapay.ioswallet",
        storeId: "1548291032",
        publisherName: "NovaPay Technologies Ltd",
        publisherId: "APPLE-TEAM-9921",
        isVerified: true,
        version: "4.18.0",
      },
    ],
    authorizedPublishers: [
      {
        id: "pub-1",
        name: "NovaPay Technologies Ltd",
        website: "https://novapay.global/developers",
        identifier: "PUB-NPAY-CORP",
        notes:
          "Primary global publishing entity registered in Delaware and London.",
      },
      {
        id: "pub-2",
        name: "NovaPay EU Settlement B.V.",
        website: "https://novapay.global/eu",
        identifier: "PUB-NPAY-EU",
        notes:
          "Licensed payment intermediary for European regional compliance.",
      },
    ],
    trustedDomains: [
      "novapay.global",
      "api.novapay.global",
      "help.novapay.global",
      "auth.novapay.io",
    ],
    keywords: [
      "NovaPay wallet",
      "NovaPay customer service",
      "NovaPay login refund",
      "NovaPay token claim",
    ],
    verifiedStatus: "verified",
    lastScannedAt: "12 minutes ago",
    findingsCount: 5,
  },
  {
    id: "brand-aura",
    name: "Aura Health & Diagnostics",
    legalName: "Aura BioHealth Technologies Inc.",
    description:
      "AI-assisted medical diagnostics, biometric vitals monitoring, and clinical patient care portal.",
    industry: "Healthcare Technology / MedTech",
    region: "United States & Canada",
    website: "https://aurabiocare.com",
    logoUrl:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=200&q=80",
    aliases: ["Aura Health", "Aura BioCare", "Aura Portal"],
    socialAssets: [
      {
        id: "soc-aura-1",
        platform: "x",
        handle: "@AuraBioCare",
        url: "https://x.com/AuraBioCare",
        isVerified: true,
      },
    ],
    mobileApps: [
      {
        id: "app-official-aura",
        name: "Aura Vitals & Telehealth",
        store: "google_play",
        listingUrl:
          "https://play.google.com/store/apps/details?id=com.aurabiocare.vitals",
        packageId: "com.aurabiocare.vitals",
        publisherName: "Aura BioHealth Technologies Inc.",
        isVerified: true,
        version: "2.4.1",
      },
    ],
    authorizedPublishers: [
      {
        id: "pub-aura-1",
        name: "Aura BioHealth Technologies Inc.",
        website: "https://aurabiocare.com",
        identifier: "AURA-HEALTH-CORP",
      },
    ],
    trustedDomains: ["aurabiocare.com", "portal.aurabiocare.com"],
    keywords: ["Aura Health", "Aura Vitals telehealth"],
    verifiedStatus: "verified",
    lastScannedAt: "1 hour ago",
    findingsCount: 2,
  },
];

export const initialSocialFindings = [
  {
    id: "soc-find-1",
    brandId: "brand-novapay",
    brandName: "NovaPay Global",
    handle: "@novapay_customer_help",
    displayName: "NovaPay Customer Support & Help Desk",
    platform: "instagram",
    profileUrl: "https://instagram.com/novapay_customer_help",
    avatarUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
    nameSimilarity: 92,
    logoSimilarity: 86,
    riskScore: 89,
    riskLevel: "critical",
    threatCategory: "Potential Impersonation",
    bio: "Official NovaPay Support 24/7. Account locked? Pending transaction or charge dispute? Send Direct Message with your account phone number for instant unlock.",
    externalLinks: [
      "https://novapay-support-verify.replit.app",
      "https://bit.ly/novapay-help-desk",
    ],
    detectionReason:
      "Potential impersonation: the profile name strongly resembles the protected brand, the avatar uses a cropped version of the official brand logo, and the bio solicits sensitive credentials via DM.",
    supportingEvidence: [
      "Name match 92% similarity against verified brand alias",
      "Visual perceptual hash match: 86% identical to official vector logo",
      "Unverified account claiming to provide emergency customer support",
      "External link resolves to an unapproved third-party host (not in trusted domains)",
    ],
    firstDetectedAt: "2 hours ago",
    lastSeenAt: "14 minutes ago",
    reviewStatus: "pending",
    reviewerNotes: "",
    dataSource: "Social Graph Collector v2.4 (Sample Feed)",
  },
  {
    id: "soc-find-2",
    brandId: "brand-novapay",
    brandName: "NovaPay Global",
    handle: "@novapay_rewards_airdrop",
    displayName: "NovaPay Loyalty & Promo Hub",
    platform: "x",
    profileUrl: "https://x.com/novapay_rewards_airdrop",
    avatarUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
    nameSimilarity: 88,
    logoSimilarity: 82,
    riskScore: 84,
    riskLevel: "high",
    threatCategory: "Scam Giveaway",
    bio: "Claim your $250 NovaPay Spring Welcome Bonus! Connect your mobile banking credentials to claim exclusive cash back immediately.",
    externalLinks: ["https://claim-novapay-reward.online"],
    detectionReason:
      "Lure scam: unauthorized promotional account offering fake monetary bonuses while directing users to a credential-harvesting phishing link.",
    supportingEvidence: [
      "Brand name exact substring match in handle",
      "Phishing domain registered 48 hours ago via anonymous registrar",
      "Solicitation of banking credentials under the guise of rewards",
    ],
    firstDetectedAt: "5 hours ago",
    lastSeenAt: "28 minutes ago",
    reviewStatus: "investigating",
    reviewerNotes:
      "Flagged to registrar abuse desk; awaiting domain suspension.",
    dataSource: "X Platform Stream API (Sample)",
  },
  {
    id: "soc-find-3",
    brandId: "brand-novapay",
    brandName: "NovaPay Global",
    handle: "novapay-careers-recruiting",
    displayName: "NovaPay Talent Acquisition",
    platform: "linkedin",
    profileUrl: "https://linkedin.com/company/novapay-careers-recruiting",
    avatarUrl:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=120&q=80",
    nameSimilarity: 81,
    logoSimilarity: 75,
    riskScore: 71,
    riskLevel: "high",
    threatCategory: "Potential Impersonation",
    bio: "Remote work recruiter for NovaPay Technologies. Hiring Data Entry and Payment Coordinators. $45/hr. Apply via Telegram contact.",
    externalLinks: ["https://t.me/novapay_hr_desk"],
    detectionReason:
      "Fake employer recruitment profile directing job applicants to off-platform messaging for advance-fee or identity theft scam.",
    supportingEvidence: [
      "Unverified corporate entity claiming affiliation with NovaPay Global",
      "Directs job seekers to anonymous messaging app",
      "No correlation with official HR LinkedIn page",
    ],
    firstDetectedAt: "1 day ago",
    lastSeenAt: "2 hours ago",
    reviewStatus: "pending",
    reviewerNotes: "",
    dataSource: "Professional Network Crawler (Sample)",
  },
  {
    id: "soc-find-4",
    brandId: "brand-novapay",
    brandName: "NovaPay Global",
    handle: "@novapay_fintech_forum",
    displayName: "NovaPay Community Discussion Group",
    platform: "facebook",
    profileUrl: "https://facebook.com/novapay_fintech_forum",
    avatarUrl:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=120&q=80",
    nameSimilarity: 68,
    logoSimilarity: 41,
    riskScore: 35,
    riskLevel: "low",
    threatCategory: "Look-alike Name",
    bio: "Unofficial fan discussion forum for NovaPay app updates, peer tips, and fintech news.",
    externalLinks: ["https://reddit.com/r/fintech"],
    detectionReason:
      "Community discussion page. Low risk of impersonation; clearly self-identifies as unofficial and contains no credential harvesting.",
    supportingEvidence: [
      'Bio explicitly includes disclaimer: "Unofficial fan discussion"',
      "No malicious links or payment solicitation detected",
    ],
    firstDetectedAt: "3 days ago",
    lastSeenAt: "5 hours ago",
    reviewStatus: "legitimate",
    reviewerNotes: "Verified as independent user forum. Marked legitimate.",
    dataSource: "Social Graph Collector v2.4 (Sample)",
  },
  {
    id: "soc-find-5",
    brandId: "brand-aura",
    brandName: "Aura Health & Diagnostics",
    handle: "@aura_health_rx_support",
    displayName: "Aura Health Prescription Refills",
    platform: "instagram",
    profileUrl: "https://instagram.com/aura_health_rx_support",
    avatarUrl:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=120&q=80",
    nameSimilarity: 87,
    logoSimilarity: 80,
    riskScore: 82,
    riskLevel: "high",
    threatCategory: "Potential Impersonation",
    bio: "Expedited online prescription refills for Aura BioHealth clinical patients. Direct WhatsApp consults.",
    externalLinks: ["https://wa.me/18005550199"],
    detectionReason:
      "Illegitimate healthcare impersonation attempting to redirect clinical patients to an unmonitored messaging line.",
    supportingEvidence: [
      "High name and logo resemblance to registered healthcare brand",
      "Unauthorized prescription fulfillment claims",
    ],
    firstDetectedAt: "8 hours ago",
    lastSeenAt: "1 hour ago",
    reviewStatus: "pending",
    reviewerNotes: "",
    dataSource: "Social Graph Collector v2.4 (Sample)",
  },
];

export const initialAppFindings = [
  {
    id: "app-find-1",
    brandId: "brand-novapay",
    brandName: "NovaPay Global",
    appName: "NovaPay Wallet Support",
    store: "google_play",
    packageId: "com.novapay.walletsupport",
    storeListingUrl:
      "https://play.google.com/store/apps/details?id=com.novapay.walletsupport",
    developerName: "QuickSupport Global LLC",
    developerWebsite: "http://quicksupport-cloud.xyz",
    iconUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=160&q=80",
    comparedToOfficialAppId: "app-official-android",
    comparedToOfficialAppName: "NovaPay Wallet",
    nameSimilarity: 94,
    iconSimilarity: 88,
    descriptionSimilarity: 78,
    packageDifference: true,
    publisherMismatch: true,
    riskScore: 91,
    riskLevel: "critical",
    threatCategory: "Potential Impersonation",
    descriptionSnippet:
      "Official companion app for NovaPay Wallet customers. Recover forgotten passcode, resolve stuck payment transactions, and verify your master security seed phrase with certified engineers.",
    suspiciousLinks: [
      "http://quicksupport-cloud.xyz/novapay/login",
      "https://api.novapay-session.top",
    ],
    evidenceSignals: [
      {
        label: "Name Similarity",
        score: 94,
        description:
          'Appends generic term "Support" to the official trademarked product name.',
      },
      {
        label: "Icon Visual Resemblance",
        score: 88,
        description:
          "Replicates the official brand badge with an overlaid wrench symbol.",
      },
      {
        label: "Package Identifier Mismatch",
        score: 95,
        description:
          "Package ID `com.novapay.walletsupport` is unverified and registered outside authorized namespace.",
      },
      {
        label: "Publisher Discrepancy",
        score: 90,
        description:
          "Developer `QuickSupport Global LLC` is not present on the authorized publishers whitelist.",
      },
      {
        label: "Deceptive Description Text",
        score: 85,
        description:
          "Solicits users master security seed phrase and banking pin under the pretext of support.",
      },
    ],
    detectionReason:
      "Potential brand impersonation: the candidate uses a name and icon virtually identical to the official application, while its package identifier and publisher differ from verified assets. The app requests high-risk sensitive credentials.",
    firstDetectedAt: "2 hours ago",
    lastSeenAt: "12 minutes ago",
    reviewStatus: "pending",
    reviewerNotes: "",
    dataSource: "Google Play Store Scanner (Automated Connector)",
  },
  {
    id: "app-find-2",
    brandId: "brand-novapay",
    brandName: "NovaPay Global",
    appName: "NovaPay Rewards & Bonus Cash",
    store: "google_play",
    packageId: "com.reward.novapay.points",
    storeListingUrl:
      "https://play.google.com/store/apps/details?id=com.reward.novapay.points",
    developerName: "FreePoints Hub Studios",
    developerWebsite: "https://freepointshub.cc",
    iconUrl:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=160&q=80",
    comparedToOfficialAppId: "app-official-android",
    comparedToOfficialAppName: "NovaPay Wallet",
    nameSimilarity: 82,
    iconSimilarity: 79,
    descriptionSimilarity: 64,
    packageDifference: true,
    publisherMismatch: true,
    riskScore: 84,
    riskLevel: "high",
    threatCategory: "Counterfeit App",
    descriptionSnippet:
      "Earn $50 to $200 instantly in your NovaPay account by rating apps and sharing referral links. Connect your NovaPay login credentials to receive payouts.",
    suspiciousLinks: ["https://freepointshub.cc/payout/novapay"],
    evidenceSignals: [
      {
        label: "Name Similarity",
        score: 82,
        description:
          "Uses brand name to lure users with promotional cash promises.",
      },
      {
        label: "Package Identifier Mismatch",
        score: 85,
        description:
          "Package ID `com.reward.novapay.points` is unaffiliated with official release pipeline.",
      },
      {
        label: "Publisher Discrepancy",
        score: 90,
        description: "Developer has multiple ad-fraud applications on store.",
      },
    ],
    detectionReason:
      "Suspected fake reward utility impersonating NovaPay promotional programs to harvest credentials and inject aggressive adware.",
    firstDetectedAt: "7 hours ago",
    lastSeenAt: "1 hour ago",
    reviewStatus: "investigating",
    reviewerNotes:
      "Submitted formal DMCA and trademark infringement takedown notice to Google Play trust team.",
    dataSource: "Google Play Store Scanner (Automated Connector)",
  },
  {
    id: "app-find-3",
    brandId: "brand-novapay",
    brandName: "NovaPay Global",
    appName: "Nova Pay Security Companion",
    store: "apple_app_store",
    packageId: "org.security.guide.novapay",
    storeListingUrl:
      "https://apps.apple.com/app/nova-pay-security-guide/id1698214490",
    developerName: "Independent Mobile Tips LLC",
    developerWebsite: "https://independenttips.org",
    iconUrl:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=160&q=80",
    comparedToOfficialAppId: "app-official-ios",
    comparedToOfficialAppName: "NovaPay Wallet & Send",
    nameSimilarity: 71,
    iconSimilarity: 34,
    descriptionSimilarity: 52,
    packageDifference: true,
    publisherMismatch: true,
    riskScore: 58,
    riskLevel: "medium",
    threatCategory: "Unofficial Utility",
    descriptionSnippet:
      "Third-party user manual and tutorials for safely setting up peer-to-peer transfers, two-factor authentication, and transaction alerts in fintech apps including NovaPay.",
    suspiciousLinks: [],
    evidenceSignals: [
      {
        label: "Name Similarity",
        score: 71,
        description: "Contains trademark name with spaced formatting.",
      },
      {
        label: "Icon Visual Resemblance",
        score: 34,
        description:
          "Custom padlock graphic; does not copy official brand logo.",
      },
      {
        label: "Publisher Discrepancy",
        score: 70,
        description:
          "Independent guide publisher; explicitly disclaims official affiliation in subtitle.",
      },
    ],
    detectionReason:
      "Educational reference app. Does not claim official status and lacks credential harvesting vectors; monitored for potential logo or branding drift.",
    firstDetectedAt: "2 days ago",
    lastSeenAt: "4 hours ago",
    reviewStatus: "pending",
    reviewerNotes: "",
    dataSource: "Apple App Store Connector v1.9 (Sample)",
  },
  {
    id: "app-find-4",
    brandId: "brand-novapay",
    brandName: "NovaPay Global",
    appName: "NovaPay Wallet",
    store: "google_play",
    packageId: "com.novapay.wallet",
    storeListingUrl:
      "https://play.google.com/store/apps/details?id=com.novapay.wallet",
    developerName: "NovaPay Technologies Ltd",
    developerWebsite: "https://novapay.global",
    iconUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=160&q=80",
    comparedToOfficialAppId: "app-official-android",
    comparedToOfficialAppName: "NovaPay Wallet",
    nameSimilarity: 100,
    iconSimilarity: 100,
    descriptionSimilarity: 100,
    packageDifference: false,
    publisherMismatch: false,
    riskScore: 0,
    riskLevel: "low",
    threatCategory: "Official / Excluded",
    descriptionSnippet:
      "Official verified application published by NovaPay Technologies Ltd.",
    suspiciousLinks: [],
    evidenceSignals: [
      {
        label: "Package ID Exact Match",
        score: 0,
        description:
          "Exact match with registered official asset `com.novapay.wallet`. Excluded from threat findings.",
      },
      {
        label: "Publisher Match",
        score: 0,
        description:
          "Publisher matches registered authorized developer whitelist.",
      },
    ],
    detectionReason:
      "Verified Official Application: Exact match against registered brand assets. Automatically excluded from threat alerts.",
    firstDetectedAt: "30 days ago",
    lastSeenAt: "12 minutes ago",
    reviewStatus: "legitimate",
    isOfficialExcluded: true,
    reviewerNotes: "Official asset verified.",
    dataSource: "Google Play Store Scanner (Automated Connector)",
  },
  {
    id: "app-find-5",
    brandId: "brand-aura",
    brandName: "Aura Health & Diagnostics",
    appName: "Aura Health Tele-Med Clinic",
    store: "google_play",
    packageId: "com.aura.teleclinic.free",
    storeListingUrl:
      "https://play.google.com/store/apps/details?id=com.aura.teleclinic.free",
    developerName: "HealthNet Global Appworks",
    iconUrl:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=160&q=80",
    comparedToOfficialAppId: "app-official-aura",
    comparedToOfficialAppName: "Aura Vitals & Telehealth",
    nameSimilarity: 88,
    iconSimilarity: 84,
    descriptionSimilarity: 72,
    packageDifference: true,
    publisherMismatch: true,
    riskScore: 86,
    riskLevel: "high",
    threatCategory: "Potential Impersonation",
    descriptionSnippet:
      "Connect with medical practitioners on Aura Health. Upload biometric telemetry and health records for immediate prescription consultation.",
    suspiciousLinks: ["https://aura-telemed.cloud"],
    evidenceSignals: [
      {
        label: "Name Similarity",
        score: 88,
        description:
          "Misleading imitation of registered clinical telehealth trademark.",
      },
      {
        label: "Icon Visual Resemblance",
        score: 84,
        description:
          "Copies medical cross and gradient styling of Aura BioHealth.",
      },
    ],
    detectionReason:
      "Potential healthcare impersonation: gathers confidential health vitals and records without authorized medical certifications.",
    firstDetectedAt: "14 hours ago",
    lastSeenAt: "1 hour ago",
    reviewStatus: "pending",
    reviewerNotes: "",
    dataSource: "Google Play Store Scanner (Automated Connector)",
  },
];

export const initialScanRuns = [
  {
    id: "scan-run-1049",
    brandId: "brand-novapay",
    brandName: "NovaPay Global",
    scanType: "Full Digital Risk Scan",
    dataSources: [
      "Google Play Store",
      "Apple App Store",
      "X Platform",
      "Instagram",
      "LinkedIn",
    ],
    startTime: "2026-10-08T22:30:00Z",
    endTime: "2026-10-08T22:34:18Z",
    durationSeconds: 258,
    candidatesProcessed: 342,
    officialAssetsExcluded: 2,
    findingsCreated: 4,
    status: "completed",
    searchQueries: [
      "NovaPay",
      "NovaPay Wallet",
      "NovaPay support",
      "com.novapay.*",
    ],
  },
  {
    id: "scan-run-1048",
    brandId: "brand-novapay",
    brandName: "NovaPay Global",
    scanType: "App Store Deep Scan",
    dataSources: ["Google Play Store", "Apple App Store"],
    startTime: "2026-10-08T18:15:00Z",
    endTime: "2026-10-08T18:18:42Z",
    durationSeconds: 222,
    candidatesProcessed: 188,
    officialAssetsExcluded: 2,
    findingsCreated: 2,
    status: "completed",
    searchQueries: ["NovaPay Wallet", "com.novapay.*", "Nova Pay"],
  },
  {
    id: "scan-run-1047",
    brandId: "brand-aura",
    brandName: "Aura Health & Diagnostics",
    scanType: "Full Digital Risk Scan",
    dataSources: ["Google Play Store", "Instagram"],
    startTime: "2026-10-08T14:00:00Z",
    endTime: "2026-10-08T14:03:10Z",
    durationSeconds: 190,
    candidatesProcessed: 115,
    officialAssetsExcluded: 1,
    findingsCreated: 2,
    status: "completed",
    searchQueries: ["Aura Health", "Aura BioCare vitals"],
  },
  {
    id: "scan-run-1046",
    brandId: "brand-novapay",
    brandName: "NovaPay Global",
    scanType: "Social Channels Scan",
    dataSources: ["X Platform", "Meta Graph API (Sample)"],
    startTime: "2026-10-07T21:00:00Z",
    endTime: "2026-10-07T21:04:45Z",
    durationSeconds: 285,
    candidatesProcessed: 420,
    officialAssetsExcluded: 3,
    findingsCreated: 3,
    status: "partial",
    searchQueries: ["@NovaPay*", "novapay help", "novapay customer service"],
    errorsReported: [
      "LinkedIn crawler hit regional rate throttling; partial results returned.",
    ],
  },
];

export const initialReports = [
  {
    id: "rep-2026-081",
    title: "Brand Impersonation & Rogue App Dossier: NovaPay Global",
    brandId: "brand-novapay",
    brandName: "NovaPay Global",
    entityType: "Brand Comprehensive",
    generatedAt: "2026-10-08 22:45 UTC",
    riskScore: 91,
    severity: "critical",
    findingsCount: 5,
    summary:
      "Executive Summary: Systematic digital brand impersonation detected targeting NovaPay Global retail consumers across mobile app stores and social platforms. A critical rogue mobile application (NovaPay Wallet Support, package: com.novapay.walletsupport) actively impersonates official banking assets and solicits user master seed phrases. Concurrently, unverified Instagram support handles are engaging consumers with deceptive account unlock promises.",
    evidenceItems: [
      {
        category: "Mobile Application Store",
        signal:
          "Package ID mismatch: com.novapay.walletsupport vs official com.novapay.wallet",
        severity: "Critical",
      },
      {
        category: "Publisher Verification",
        signal:
          'Developer "QuickSupport Global LLC" lacks cryptographic binding or authorization',
        severity: "Critical",
      },
      {
        category: "Social Impersonation",
        signal:
          "Instagram handle @novapay_customer_help using 86% matched cropped vector brand badge",
        severity: "High",
      },
      {
        category: "Phishing Infrastructure",
        signal:
          "Unapproved external URL redirects resolving to unregistered off-domain endpoints",
        severity: "High",
      },
    ],
    recommendedActions: [
      "Issue expedited trademark infringement and security alert via Google Play Developer Console Abuse reporting.",
      "Request domain suspension for fraudulent landing host quicksupport-cloud.xyz.",
      "Broadcast in-app consumer alert within official NovaPay Wallet advising that customer support will never request private recovery phrases.",
      "Submit Instagram brand impersonation report with verified corporate registration documentation.",
    ],
  },
  {
    id: "rep-2026-080",
    title: "Technical Forensic Analysis: NovaPay Wallet Support Listing",
    brandId: "brand-novapay",
    brandName: "NovaPay Global",
    entityType: "Mobile App Investigation",
    generatedAt: "2026-10-08 20:10 UTC",
    riskScore: 91,
    severity: "critical",
    findingsCount: 1,
    summary:
      "In-depth forensic audit of rogue candidate package com.novapay.walletsupport found on Google Play. Visual assets match verified NovaPay brand identity at 88% perceptual confidence. High likelihood of credential interception mechanism.",
    evidenceItems: [
      {
        category: "Binary & Package ID",
        signal: "Namespace violation in package com.novapay.walletsupport",
        severity: "Critical",
      },
      {
        category: "Icon Perceptual Hash",
        signal: "Visual distance <= 4 from official production app icon",
        severity: "High",
      },
    ],
    recommendedActions: [
      "Immediate DMCA takedown notice to Google Play App Review Team.",
      "Notify financial fraud monitoring team for customer account credential resets.",
    ],
  },
];

export const initialNotifications = [
  {
    id: "notif-1",
    title: "Critical Threat Discovered",
    description:
      'Suspicious mobile app "NovaPay Wallet Support" detected on Google Play with 91/100 risk score.',
    timestamp: "12 min ago",
    type: "threat",
    severity: "critical",
    isRead: false,
    targetView: "apps",
    targetId: "app-find-1",
  },
  {
    id: "notif-2",
    title: "Potential Social Impersonation",
    description:
      "Instagram handle @novapay_customer_help detected soliciting user credentials in direct messages.",
    timestamp: "2 hours ago",
    type: "threat",
    severity: "high",
    isRead: false,
    targetView: "social",
    targetId: "soc-find-1",
  },
  {
    id: "notif-3",
    title: "Scan Completed Successfully",
    description:
      "Full Digital Risk Scan completed: 342 candidates processed, 2 official assets excluded.",
    timestamp: "3 hours ago",
    type: "scan",
    severity: "low",
    isRead: true,
    targetView: "scans",
    targetId: "scan-run-1049",
  },
  {
    id: "notif-4",
    title: "Official Asset Auto-Excluded",
    description:
      "Legitimate release com.novapay.wallet matched verified registry and excluded from threat alerts.",
    timestamp: "4 hours ago",
    type: "system",
    severity: "low",
    isRead: true,
    targetView: "apps",
    targetId: "app-find-4",
  },
];
