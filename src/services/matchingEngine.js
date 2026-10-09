/**
 * SkillMatch Deterministic Matching Engine
 * 
 * Computes an auditable, transparent match score (0-100%) between a Customer Project and a Worker profile.
 * 
 * Weights Distribution:
 * - Skill Overlap: 30%
 * - Domain Alignment: 15%
 * - Experience Depth: 15%
 * - Availability Match: 10%
 * - Worker Rating: 10%
 * - Previous Completed Projects: 10%
 * - Budget / Rate Compatibility: 5%
 * - Response Time: 5%
 */

export function calculateMatchScore(project, worker) {
  if (!project || !worker) {
    return {
      totalScore: 0,
      breakdown: {},
      reasons: []
    };
  }

  const reasons = [];

  // 1. Skill Match (30 points max)
  let skillScore = 0;
  const projectSkills = (project.skills || []).map(s => s.toLowerCase().trim());
  const workerSkills = (worker.skills || []).map(s => s.toLowerCase().trim());

  let matchedSkillsCount = 0;
  if (projectSkills.length > 0) {
    projectSkills.forEach(ps => {
      const isMatch = workerSkills.some(ws => ws.includes(ps) || ps.includes(ws));
      if (isMatch) matchedSkillsCount++;
    });
    const skillRatio = matchedSkillsCount / projectSkills.length;
    skillScore = Math.round(skillRatio * 30);
    
    if (skillRatio === 1) {
      reasons.push(`✓ 100% skill match (${project.skills.slice(0, 3).join(', ')})`);
    } else if (skillRatio >= 0.6) {
      reasons.push(`✓ Strong skill match (${matchedSkillsCount}/${projectSkills.length} required skills matched)`);
    } else if (skillRatio > 0) {
      reasons.push(`• Partial skill overlap (${matchedSkillsCount}/${projectSkills.length} skills)`);
    }
  } else {
    skillScore = 25; // default baseline if project has no specified skills
  }

  // 2. Domain Match (15 points max)
  let domainScore = 0;
  const pDomain = (project.domain || '').toLowerCase().trim();
  const wDomain = (worker.domain || '').toLowerCase().trim();

  if (pDomain && wDomain) {
    if (pDomain === wDomain || wDomain.includes(pDomain) || pDomain.includes(wDomain)) {
      domainScore = 15;
      reasons.push(`✓ Direct domain expert in ${worker.domain}`);
    } else {
      domainScore = 5; // adjacent field
    }
  } else {
    domainScore = 10;
  }

  // 3. Experience Match (15 points max)
  let experienceScore = 0;
  const reqExp = Number(project.experienceRequired) || 1;
  const workerExp = Number(worker.yearsExperience) || 0;

  if (workerExp >= reqExp) {
    experienceScore = 15;
    if (workerExp > reqExp + 2) {
      reasons.push(`✓ ${workerExp} years of experience exceeds your ${reqExp}-year requirement`);
    } else {
      reasons.push(`✓ ${workerExp} years of verified experience meets requirements`);
    }
  } else {
    const ratio = Math.max(0, workerExp / reqExp);
    experienceScore = Math.round(ratio * 15);
  }

  // 4. Availability Match (10 points max)
  let availabilityScore = 0;
  const wAvail = (worker.availability || '').toLowerCase();
  if (wAvail.includes('available now') || wAvail.includes('immediately')) {
    availabilityScore = 10;
    reasons.push(`✓ Available immediately for project start`);
  } else if (wAvail.includes('part-time') || wAvail.includes('20')) {
    availabilityScore = 7;
    reasons.push(`• Part-time availability (${worker.availabilityHours || '20+ hrs/wk'})`);
  } else {
    availabilityScore = 4;
  }

  // 5. Rating Score (10 points max)
  const rating = Number(worker.rating) || 4.0;
  const ratingScore = Math.min(10, Math.round((rating / 5.0) * 10));
  if (rating >= 4.8) {
    reasons.push(`✓ Elite client satisfaction: ${rating.toFixed(1)}/5.0 average rating`);
  } else if (rating >= 4.5) {
    reasons.push(`✓ Proven positive track record: ${rating.toFixed(1)}/5.0`);
  }

  // 6. Previous Completed Projects (10 points max)
  const completed = Number(worker.completedProjects) || 0;
  let completedScore = 0;
  if (completed >= 40) {
    completedScore = 10;
    reasons.push(`✓ Successfully completed ${completed}+ freelance projects`);
  } else if (completed >= 20) {
    completedScore = 8;
    reasons.push(`✓ ${completed} successfully delivered projects`);
  } else if (completed >= 5) {
    completedScore = 6;
  } else {
    completedScore = 4;
  }

  // 7. Budget Compatibility (5 points max)
  let budgetScore = 0;
  const workerRate = Number(worker.hourlyRate) || 40;
  const bMin = Number(project.budgetMin) || 0;
  const bMax = Number(project.budgetMax) || 100;

  if (workerRate >= bMin && workerRate <= bMax) {
    budgetScore = 5;
    reasons.push(`✓ Rate ($${workerRate}/hr) aligns cleanly with your budget ($${bMin}–$${bMax}/hr)`);
  } else if (workerRate < bMin) {
    budgetScore = 5; // under budget is great for client
    reasons.push(`✓ Competitive rate ($${workerRate}/hr) below your target budget`);
  } else if (workerRate <= bMax * 1.15) {
    budgetScore = 3; // slightly above
  } else {
    budgetScore = 1;
  }

  // 8. Response Time (5 points max)
  let responseScore = 0;
  const resp = (worker.responseTime || '').toLowerCase();
  if (resp.includes('30 min') || resp.includes('1 hour') || resp.includes('< 1')) {
    responseScore = 5;
    reasons.push(`✓ Fast responder (${worker.responseTime})`);
  } else if (resp.includes('2 hour') || resp.includes('3 hour')) {
    responseScore = 4;
  } else {
    responseScore = 2;
  }

  const totalScore = Math.min(100, Math.max(10, (
    skillScore +
    domainScore +
    experienceScore +
    availabilityScore +
    ratingScore +
    completedScore +
    budgetScore +
    responseScore
  )));

  return {
    totalScore,
    breakdown: {
      skillScore: { score: skillScore, max: 30, label: 'Skill Match' },
      domainScore: { score: domainScore, max: 15, label: 'Domain Fit' },
      experienceScore: { score: experienceScore, max: 15, label: 'Experience Depth' },
      availabilityScore: { score: availabilityScore, max: 10, label: 'Availability' },
      ratingScore: { score: ratingScore, max: 10, label: 'Client Ratings' },
      completedScore: { score: completedScore, max: 10, label: 'Track Record' },
      budgetScore: { score: budgetScore, max: 5, label: 'Budget Fit' },
      responseScore: { score: responseScore, max: 5, label: 'Response Velocity' }
    },
    reasons
  };
}

/**
 * Ranks all workers for a given project in descending order of match score
 */
export function rankWorkersForProject(project, workers = []) {
  if (!project || !workers.length) return [];

  const scoredWorkers = workers.map(worker => {
    const matchData = calculateMatchScore(project, worker);
    return {
      ...worker,
      matchScore: matchData.totalScore,
      matchBreakdown: matchData.breakdown,
      matchReasons: matchData.reasons
    };
  });

  return scoredWorkers.sort((a, b) => b.matchScore - a.matchScore);
}
