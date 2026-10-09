/**
 * Worker Profile Strength Calculation System
 * 
 * Weights Distribution:
 * - Basic info (Name, Title, Location, Hourly Rate, Photo): 10%
 * - Professional bio (At least 80 characters): 10%
 * - Skills (At least 4 tags): 10%
 * - Experience (At least 1 listed position): 15%
 * - Portfolio Projects (At least 2 case studies): 20%
 * - Certifications (At least 1 verified cert): 10%
 * - Education (Degree / School): 5%
 * - Work History / Completed Projects (> 0): 10%
 * - Availability details configured: 5%
 * - Verification indicators (Email / ID / Phone): 5%
 * Total = 100%
 */

export function calculateProfileStrength(worker) {
  if (!worker) {
    return {
      score: 0,
      suggestions: ['Complete your basic profile to start receiving project matches.'],
      sections: []
    };
  }

  let score = 0;
  const suggestions = [];
  const sections = [];

  // 1. Basic Info (10%)
  const hasBasic = Boolean(
    worker.name &&
    worker.title &&
    worker.location &&
    worker.hourlyRate &&
    worker.avatar
  );
  if (hasBasic) {
    score += 10;
    sections.push({ name: 'Basic Information', completed: true, weight: 10 });
  } else {
    suggestions.push('Complete basic profile details (headline, location, and hourly rate).');
    sections.push({ name: 'Basic Information', completed: false, weight: 10 });
  }

  // 2. Professional Bio (10%)
  const bioLength = (worker.bio || '').trim().length;
  if (bioLength >= 80) {
    score += 10;
    sections.push({ name: 'Professional Biography', completed: true, weight: 10 });
  } else {
    suggestions.push('Expand your professional bio to at least 80 characters for better client trust.');
    sections.push({ name: 'Professional Biography', completed: false, weight: 10 });
  }

  // 3. Skills (10%)
  const skillsCount = (worker.skills || []).length;
  if (skillsCount >= 4) {
    score += 10;
    sections.push({ name: 'Core Skills Badges', completed: true, weight: 10 });
  } else {
    suggestions.push(`Add ${Math.max(1, 4 - skillsCount)} more technical skills to boost keyword discoverability.`);
    sections.push({ name: 'Core Skills Badges', completed: false, weight: 10 });
  }

  // 4. Experience (15%)
  const expCount = (worker.experience || []).length;
  if (expCount >= 1) {
    score += 15;
    sections.push({ name: 'Employment Experience', completed: true, weight: 15 });
  } else {
    suggestions.push('Add your previous work experience and past job roles (+15%).');
    sections.push({ name: 'Employment Experience', completed: false, weight: 15 });
  }

  // 5. Portfolio (20%)
  const portCount = (worker.portfolio || []).length;
  if (portCount >= 2) {
    score += 20;
    sections.push({ name: 'Portfolio Case Studies', completed: true, weight: 20 });
  } else if (portCount === 1) {
    score += 10;
    suggestions.push('Add 1 more portfolio project with live results to gain +10% strength.');
    sections.push({ name: 'Portfolio Case Studies', completed: false, weight: 20 });
  } else {
    suggestions.push('Add at least 2 portfolio case studies to demonstrate your craft (+20%).');
    sections.push({ name: 'Portfolio Case Studies', completed: false, weight: 20 });
  }

  // 6. Certifications (10%)
  const certCount = (worker.certifications || []).length;
  if (certCount >= 1) {
    score += 10;
    sections.push({ name: 'Professional Certifications', completed: true, weight: 10 });
  } else {
    suggestions.push('Add a verified industry certification to strengthen client confidence (+10%).');
    sections.push({ name: 'Professional Certifications', completed: false, weight: 10 });
  }

  // 7. Education (5%)
  const eduCount = (worker.education || []).length;
  if (eduCount >= 1) {
    score += 5;
    sections.push({ name: 'Education & Degrees', completed: true, weight: 5 });
  } else {
    suggestions.push('Add your university or formal education details (+5%).');
    sections.push({ name: 'Education & Degrees', completed: false, weight: 5 });
  }

  // 8. Work History & Track Record (10%)
  const compProjects = Number(worker.completedProjects) || 0;
  if (compProjects >= 5 || (worker.experience && worker.experience.length >= 2)) {
    score += 10;
    sections.push({ name: 'Work History & Track Record', completed: true, weight: 10 });
  } else {
    suggestions.push('Complete your work history timeline to showcase project longevity.');
    sections.push({ name: 'Work History & Track Record', completed: false, weight: 10 });
  }

  // 9. Availability (5%)
  if (worker.availability && worker.availabilityHours) {
    score += 5;
    sections.push({ name: 'Working Availability', completed: true, weight: 5 });
  } else {
    suggestions.push('Specify your weekly hours and working availability schedule (+5%).');
    sections.push({ name: 'Working Availability', completed: false, weight: 5 });
  }

  // 10. Profile Verification (5%)
  const v = worker.verified || {};
  if (v.identity && v.email) {
    score += 5;
    sections.push({ name: 'Identity & Email Verification', completed: true, weight: 5 });
  } else {
    suggestions.push('Verify your identity and email address to earn a verified trust badge (+5%).');
    sections.push({ name: 'Identity & Email Verification', completed: false, weight: 5 });
  }

  return {
    score: Math.min(100, score),
    suggestions: suggestions.length > 0 ? suggestions : ['Your profile is fully optimized for top client matches!'],
    sections
  };
}
