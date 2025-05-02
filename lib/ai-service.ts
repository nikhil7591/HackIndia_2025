// This is a simplified AI service for the hackathon
// In a real-world scenario, you would use a more sophisticated ML model

interface JobPost {
  title: string
  description: string
  company: string
  requirements: string[]
}

export function analyzeTrustScore(jobPost: JobPost): number {
  // This is a simplified algorithm for the hackathon
  // In a real implementation, you would use a trained ML model

  let score = 70 // Base score

  // Check for red flags in the job description
  const redFlags = [
    "urgent hiring",
    "immediate start",
    "no experience needed",
    "work from home",
    "unlimited earning",
    "be your own boss",
    "quick money",
    "easy money",
    "get rich",
    "investment required",
    "fee required",
    "send money",
    "bank details",
    "personal information",
  ]

  // Check title and description for red flags
  const combinedText = `${jobPost.title.toLowerCase()} ${jobPost.description.toLowerCase()}`

  redFlags.forEach((flag) => {
    if (combinedText.includes(flag)) {
      score -= 10 // Reduce score for each red flag
    }
  })

  // Check if requirements are specific and detailed
  if (jobPost.requirements.length < 2) {
    score -= 10 // Too few requirements is suspicious
  } else {
    // Reward more detailed requirements
    const detailedRequirements = jobPost.requirements.filter((req) => req.length > 15)
    score += detailedRequirements.length * 2
  }

  // Check if company name is provided
  if (!jobPost.company || jobPost.company.length < 3) {
    score -= 15
  }

  // Ensure score is within 0-100 range
  return Math.max(0, Math.min(100, score))
}

export function getJobRecommendations(userSkills: string[]): number[] {
  // In a real implementation, this would use a recommendation algorithm
  // For the hackathon, we'll return mock job IDs
  return [1, 3, 5]
}

export function matchApplicantToJob(
  jobRequirements: string[],
  applicantQualifications: string[],
): {
  matchScore: number
  matchedQualifications: string[]
} {
  // Simple matching algorithm for the hackathon
  const matchedQualifications: string[] = []

  jobRequirements.forEach((requirement) => {
    const normalizedRequirement = requirement.toLowerCase()

    // Check if any qualification matches this requirement
    const match = applicantQualifications.find(
      (qualification) =>
        qualification.toLowerCase().includes(normalizedRequirement) ||
        normalizedRequirement.includes(qualification.toLowerCase()),
    )

    if (match) {
      matchedQualifications.push(match)
    }
  })

  const matchScore = (matchedQualifications.length / jobRequirements.length) * 100

  return {
    matchScore: Math.round(matchScore),
    matchedQualifications,
  }
}
