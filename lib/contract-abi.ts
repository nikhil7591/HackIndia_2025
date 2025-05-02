// ABI for the JobShield smart contract
export const JOB_SHIELD_ABI = [
  // Job posting functions
  "function postJob(string memory _title, string memory _description, uint256 _reward, string[] memory _requirements) public payable returns (uint256)",
  "function closeJob(uint256 _jobId) public",
  "function reopenJob(uint256 _jobId) public",
  "function getJob(uint256 _jobId) public view returns (string memory, string memory, address, uint256, string[] memory, bool)",
  "function getRecruiterJobs(address _recruiter) public view returns (uint256[] memory)",

  // Application functions
  "function applyForJob(uint256 _jobId, string[] memory _qualifications) public",
  "function getApplicationCount(uint256 _jobId) public view returns (uint256)",
  "function getApplicantQualifications(uint256 _jobId, address _applicant) public view returns (string[] memory)",
  "function getApplicantApplications(address _applicant) public view returns (uint256[] memory)",

  // Verification functions
  "function verifyApplicant(uint256 _jobId, address _applicant) public view returns (bool)",
  "function manuallyVerifyApplicant(uint256 _jobId, address _applicant, bool _qualified) public",

  // Events
  "event JobPosted(uint256 indexed jobId, address indexed recruiter, string title)",
  "event ApplicationSubmitted(uint256 indexed jobId, address indexed applicant)",
  "event QualificationVerified(uint256 indexed jobId, address indexed applicant, bool qualified)",
  "event RewardPaid(uint256 indexed jobId, address indexed applicant, uint256 amount)",
]
