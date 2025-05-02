import { ethers } from "ethers"
import { JOB_SHIELD_ABI } from "@/lib/contract-abi"

// Mumbai testnet contract address (this would be your deployed contract address)
const JOB_SHIELD_CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000"

export async function getJobShieldContract(signer: ethers.JsonRpcSigner | null) {
  if (!signer) {
    throw new Error("Wallet not connected")
  }

  return new ethers.Contract(JOB_SHIELD_CONTRACT_ADDRESS, JOB_SHIELD_ABI, signer)
}

export async function postJob(
  signer: ethers.JsonRpcSigner | null,
  title: string,
  description: string,
  reward: string,
  requirements: string[],
) {
  const contract = await getJobShieldContract(signer)
  const rewardInWei = ethers.parseEther(reward)

  const tx = await contract.postJob(title, description, rewardInWei, requirements, {
    value: rewardInWei, // Send the reward amount with the transaction
  })

  return tx.wait()
}

export async function applyForJob(signer: ethers.JsonRpcSigner | null, jobId: number, qualifications: string[]) {
  const contract = await getJobShieldContract(signer)
  const tx = await contract.applyForJob(jobId, qualifications)

  return tx.wait()
}

export async function getJob(signer: ethers.JsonRpcSigner | null, jobId: number) {
  const contract = await getJobShieldContract(signer)
  const jobData = await contract.getJob(jobId)

  return {
    title: jobData[0],
    description: jobData[1],
    recruiter: jobData[2],
    reward: ethers.formatEther(jobData[3]),
    requirements: jobData[4],
    isActive: jobData[5],
  }
}

export async function verifyApplicant(signer: ethers.JsonRpcSigner | null, jobId: number, applicantAddress: string) {
  const contract = await getJobShieldContract(signer)
  return contract.verifyApplicant(jobId, applicantAddress)
}

export async function getRecruiterJobs(signer: ethers.JsonRpcSigner | null) {
  const contract = await getJobShieldContract(signer)
  return contract.getRecruiterJobs(await signer?.getAddress())
}

export async function getApplicantApplications(signer: ethers.JsonRpcSigner | null) {
  const contract = await getJobShieldContract(signer)
  return contract.getApplicantApplications(await signer?.getAddress())
}

export async function closeJob(signer: ethers.JsonRpcSigner | null, jobId: number) {
  const contract = await getJobShieldContract(signer)
  const tx = await contract.closeJob(jobId)
  return tx.wait()
}

export async function reopenJob(signer: ethers.JsonRpcSigner | null, jobId: number) {
  const contract = await getJobShieldContract(signer)
  const tx = await contract.reopenJob(jobId)
  return tx.wait()
}

export async function manuallyVerifyApplicant(
  signer: ethers.JsonRpcSigner | null,
  jobId: number,
  applicantAddress: string,
  qualified: boolean,
) {
  const contract = await getJobShieldContract(signer)
  const tx = await contract.manuallyVerifyApplicant(jobId, applicantAddress, qualified)
  return tx.wait()
}

export async function getApplicationCount(signer: ethers.JsonRpcSigner | null, jobId: number) {
  const contract = await getJobShieldContract(signer)
  return contract.getApplicationCount(jobId)
}

export async function getApplicantQualifications(
  signer: ethers.JsonRpcSigner | null,
  jobId: number,
  applicantAddress: string,
) {
  const contract = await getJobShieldContract(signer)
  return contract.getApplicantQualifications(jobId, applicantAddress)
}

// Function to get contract balance
export async function getContractBalance(provider: ethers.BrowserProvider | null) {
  if (!provider) {
    throw new Error("Provider not available")
  }

  const balance = await provider.getBalance(JOB_SHIELD_CONTRACT_ADDRESS)
  return ethers.formatEther(balance)
}

// Function to listen for events
export function listenForEvents(provider: ethers.BrowserProvider | null, callback: (event: any) => void) {
  if (!provider) return () => {}

  const contract = new ethers.Contract(JOB_SHIELD_CONTRACT_ADDRESS, JOB_SHIELD_ABI, provider)

  // Listen for JobPosted events
  const jobPostedFilter = contract.filters.JobPosted()
  contract.on(jobPostedFilter, (jobId, recruiter, title, event) => {
    callback({
      type: "JobPosted",
      jobId: Number(jobId),
      recruiter,
      title,
      event,
    })
  })

  // Listen for ApplicationSubmitted events
  const applicationSubmittedFilter = contract.filters.ApplicationSubmitted()
  contract.on(applicationSubmittedFilter, (jobId, applicant, event) => {
    callback({
      type: "ApplicationSubmitted",
      jobId: Number(jobId),
      applicant,
      event,
    })
  })

  // Listen for QualificationVerified events
  const qualificationVerifiedFilter = contract.filters.QualificationVerified()
  contract.on(qualificationVerifiedFilter, (jobId, applicant, qualified, event) => {
    callback({
      type: "QualificationVerified",
      jobId: Number(jobId),
      applicant,
      qualified,
      event,
    })
  })

  // Listen for RewardPaid events
  const rewardPaidFilter = contract.filters.RewardPaid()
  contract.on(rewardPaidFilter, (jobId, applicant, amount, event) => {
    callback({
      type: "RewardPaid",
      jobId: Number(jobId),
      applicant,
      amount: ethers.formatEther(amount),
      event,
    })
  })

  // Return a function to remove all listeners
  return () => {
    contract.removeAllListeners()
  }
}
