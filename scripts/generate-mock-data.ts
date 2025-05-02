// This script would be used to generate mock data for testing

/*
import { ethers } from "hardhat";

async function main() {
  const [deployer, recruiter1, recruiter2, applicant1, applicant2, applicant3] = await ethers.getSigners();
  
  console.log("Generating mock data with accounts:");
  console.log(`Deployer: ${deployer.address}`);
  console.log(`Recruiter 1: ${recruiter1.address}`);
  console.log(`Recruiter 2: ${recruiter2.address}`);
  console.log(`Applicant 1: ${applicant1.address}`);
  console.log(`Applicant 2: ${applicant2.address}`);
  console.log(`Applicant 3: ${applicant3.address}`);
  
  // Get the deployed contract
  const jobShieldAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
  const JobShield = await ethers.getContractFactory("JobShield");
  const jobShield = JobShield.attach(jobShieldAddress);
  
  // Post mock jobs
  console.log("Posting mock jobs...");
  
  // Job 1: Frontend Developer
  const job1Requirements = [
    "React experience",
    "TypeScript knowledge",
    "CSS skills",
    "3+ years experience",
    "Bachelor's degree"
  ];
  
  await jobShield.connect(recruiter1).postJob(
    "Senior Frontend Developer",
    "We're looking for a Senior Frontend Developer with experience in React, Next.js, and TypeScript to join our team.",
    ethers.utils.parseEther("0.1"), // 0.1 MATIC reward
    job1Requirements,
    { value: ethers.utils.parseEther("0.5") } // Fund with 0.5 MATIC for multiple rewards
  );
  
  // Job 2: Blockchain Developer
  const job2Requirements = [
    "Solidity experience",
    "Smart contract development",
    "Web3.js knowledge",
    "2+ years experience",
    "Understanding of DeFi"
  ];
  
  await jobShield.connect(recruiter2).postJob(
    "Blockchain Developer",
    "Join our team to build decentralized applications on Ethereum and Polygon.",
    ethers.utils.parseEther("0.15"), // 0.15 MATIC reward
    job2Requirements,
    { value: ethers.utils.parseEther("0.6") } // Fund with 0.6 MATIC for multiple rewards
  );
  
  console.log("Mock jobs posted successfully!");
  
  // Submit mock applications
  console.log("Submitting mock applications...");
  
  // Applicant 1 applies for Job 1
  const applicant1Qualifications = [
    "5 years of React experience",
    "TypeScript expert",
    "Proficient in CSS and Tailwind",
    "Bachelor's in Computer Science"
  ];
  
  await jobShield.connect(applicant1).applyForJob(0, applicant1Qualifications);
  
  // Applicant 2 applies for Job 1
  const applicant2Qualifications = [
    "3 years of React experience",
    "Basic TypeScript knowledge",
    "CSS and SASS skills"
  ];
  
  await jobShield.connect(applicant2).applyForJob(0, applicant2Qualifications);
  
  // Applicant 3 applies for Job 2
  const applicant3Qualifications = [
    "Solidity developer for 3 years",
    "Built multiple smart contracts",
    "Experience with Web3.js and Ethers.js",
    "DeFi protocol development"
  ];
  
  await jobShield.connect(applicant3).applyForJob(1, applicant3Qualifications);
  
  console.log("Mock applications submitted successfully!");
  
  // Manually verify some applications
  console.log("Manually verifying applications...");
  
  // Recruiter 1 verifies Applicant 2 for Job 1
  await jobShield.connect(recruiter1).manuallyVerifyApplicant(0, applicant2.address, true);
  
  console.log("Mock data generation complete!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
*/
