/**
 * AI-Based Project Requirement Analyzer
 * 
 * Takes a natural language description from the customer and extracts:
 * - Domain / Category
 * - Technical Skills Required
 * - Recommended Experience Level
 * - Estimated Complexity (Low / Medium / High)
 * - Suggested Budget Range
 * - Estimated Completion Timeline
 * - Recommended Worker Persona
 */

const DOMAIN_KEYWORDS = {
  'Web Development': ['website', 'web', 'web app', 'react', 'next.js', 'vue', 'frontend', 'backend', 'full-stack', 'api', 'node', 'database', 'postgres', 'saas', 'stripe', 'e-commerce'],
  'Mobile Development': ['mobile', 'app', 'ios', 'android', 'flutter', 'react native', 'swift', 'smartphone', 'tablet', 'push notification', 'apple pay', 'google play'],
  'UI/UX Design': ['figma', 'ui', 'ux', 'wireframe', 'prototype', 'design system', 'redesign', 'user interface', 'user experience', 'mockup', 'landing page design'],
  'Graphic Design': ['logo', 'brand', 'branding', 'identity', 'illustrator', 'photoshop', 'vector', 'packaging', 'typography', 'poster', 'flyer'],
  'Data Science': ['data', 'machine learning', 'ai', 'nlp', 'llm', 'python', 'pytorch', 'tensorflow', 'model', 'analytics', 'prediction', 'pandas', 'gpt'],
  'Content Writing': ['content', 'article', 'blog', 'seo', 'copywriting', 'writing', 'technical writing', 'whitepaper', 'copy', 'editing'],
  'Digital Marketing': ['marketing', 'ads', 'google ads', 'meta ads', 'facebook ads', 'roas', 'growth', 'seo', 'social media', 'traffic', 'funnel', 'conversion'],
  'Video Editing': ['video', 'youtube', 'tiktok', 'reels', 'premiere', 'after effects', 'motion graphics', 'editing', 'animation', 'render', 'davinci'],
  'Photography': ['photo', 'photography', 'product shots', 'packshot', 'retouching', 'lightroom', 'studio', 'portrait', 'camera'],
  'Accounting': ['accounting', 'tax', 'cpa', 'financial', 'bookkeeping', 'quickbooks', 'excel', 'valuation', 'cfo', 'audit']
};

const SKILL_KEYWORDS = {
  // Web & Mobile
  'React': ['react', 'react.js'],
  'Next.js': ['next', 'next.js', 'ssr'],
  'Node.js': ['node', 'node.js', 'express'],
  'TypeScript': ['typescript', 'ts'],
  'PostgreSQL': ['postgres', 'postgresql', 'sql database'],
  'Stripe API': ['stripe', 'payment', 'checkout', 'payments', 'credit card'],
  'Flutter': ['flutter', 'cross-platform mobile'],
  'iOS': ['ios', 'iphone', 'apple app'],
  'Android': ['android', 'google play'],
  'Firebase': ['firebase', 'realtime database', 'firestore'],
  // Design
  'Figma': ['figma', 'figma components'],
  'UI/UX': ['ui', 'ux', 'user interface', 'user experience'],
  'Design Systems': ['design system', 'component library', 'tokens'],
  'Prototyping': ['prototype', 'interactive prototype', 'wireframe'],
  'Brand Identity': ['brand', 'branding', 'logo', 'identity'],
  'Adobe Illustrator': ['illustrator', 'vector art'],
  // Data & Marketing
  'Python': ['python', 'py'],
  'Machine Learning': ['machine learning', 'ml', 'ai model', 'deep learning'],
  'NLP': ['nlp', 'text processing', 'llm', 'chatgpt'],
  'SEO Copywriting': ['seo', 'search engine optimization', 'keywords'],
  'Google Ads': ['google ads', 'adwords', 'search ads'],
  'Meta Ads': ['meta ads', 'facebook ads', 'instagram ads']
};

export function analyzeProjectBrief(promptText) {
  if (!promptText || promptText.trim().length === 0) {
    return {
      success: false,
      message: 'Please provide a project description to analyze.'
    };
  }

  const text = promptText.toLowerCase();

  // 1. Detect Domain
  let matchedDomain = 'Web Development'; // default
  let maxDomainMatches = 0;

  for (const [domain, keywords] of Object.entries(DOMAIN_KEYWORDS)) {
    let count = 0;
    keywords.forEach(kw => {
      if (text.includes(kw)) count++;
    });
    if (count > maxDomainMatches) {
      maxDomainMatches = count;
      matchedDomain = domain;
    }
  }

  // 2. Extract Skills
  const extractedSkills = [];
  for (const [skill, keywords] of Object.entries(SKILL_KEYWORDS)) {
    if (keywords.some(kw => text.includes(kw))) {
      extractedSkills.push(skill);
    }
  }

  // Fallbacks if no specific skills detected
  if (extractedSkills.length === 0) {
    if (matchedDomain === 'UI/UX Design') extractedSkills.push('Figma', 'UI/UX', 'Design Systems', 'Prototyping');
    else if (matchedDomain === 'Mobile Development') extractedSkills.push('Flutter', 'iOS', 'Android', 'Firebase');
    else if (matchedDomain === 'Graphic Design') extractedSkills.push('Brand Identity', 'Adobe Illustrator', 'Logo Design');
    else if (matchedDomain === 'Data Science') extractedSkills.push('Python', 'Machine Learning', 'Data Science');
    else extractedSkills.push('React', 'Node.js', 'PostgreSQL', 'Tailwind CSS');
  }

  // 3. Complexity & Experience Assessment
  let complexity = 'Medium';
  let minExperience = 4;
  let budgetMin = 40;
  let budgetMax = 65;
  let timeline = '4 to 6 weeks';

  const highComplexityTerms = ['enterprise', 'scale', 'ai', 'machine learning', 'payment', 'stripe', 'marketplace', 'real-time', 'full-stack', 'cross-platform', 'architecture'];
  const simpleTerms = ['landing page', 'simple', 'quick', 'small', 'one page', 'fix', 'tweaks', 'flyer'];

  const highMatches = highComplexityTerms.filter(t => text.includes(t)).length;
  const simpleMatches = simpleTerms.filter(t => text.includes(t)).length;

  if (highMatches >= 2) {
    complexity = 'High';
    minExperience = 5;
    budgetMin = 50;
    budgetMax = 80;
    timeline = '6 to 8 weeks';
  } else if (simpleMatches >= 1 && highMatches === 0) {
    complexity = 'Low';
    minExperience = 2;
    budgetMin = 25;
    budgetMax = 45;
    timeline = '1 to 2 weeks';
  }

  // 4. Generate Title suggestion
  let suggestedTitle = '';
  const firstSentence = promptText.split(/[.!?]/)[0].trim();
  if (firstSentence.length > 10 && firstSentence.length < 80) {
    suggestedTitle = firstSentence.charAt(0).toUpperCase() + firstSentence.slice(1);
  } else {
    suggestedTitle = `${matchedDomain} Project: Custom Solution`;
  }

  return {
    success: true,
    domain: matchedDomain,
    skills: extractedSkills,
    experienceRequired: minExperience,
    complexity,
    budgetMin,
    budgetMax,
    paymentType: 'Hourly',
    timeline,
    hoursPerWeek: '30-40 hrs/week',
    suggestedTitle,
    insights: [
      `Detected Primary Domain: ${matchedDomain} based on ${maxDomainMatches} context signals.`,
      `Extracted ${extractedSkills.length} key required competencies: ${extractedSkills.slice(0, 4).join(', ')}.`,
      `Estimated project scope as ${complexity} complexity (${timeline}).`
    ]
  };
}
