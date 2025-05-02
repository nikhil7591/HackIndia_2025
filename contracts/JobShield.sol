// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title JobShield
 * @dev A smart contract for verifying job applications and rewarding qualified applicants
 */
contract JobShield {
    struct Job {
        string title;
        string description;
        address recruiter;
        uint256 reward;
        string[] requirements;
        bool isActive;
        uint256 createdAt;
    }
    
    struct Application {
        address applicant;
        string[] qualifications;
        bool isVerified;
        bool isPaid;
        uint256 appliedAt;
        uint256 matchScore;
    }
    
    uint256 private jobIdCounter;
    mapping(uint256 => Job) private jobs;
    mapping(uint256 => Application[]) private applications;
    mapping(address => uint256[]) private recruiterJobs;
    mapping(address => uint256[]) private applicantApplications;
    
    // Minimum number of matches required for automatic qualification
    uint256 public constant MIN_MATCHES_REQUIRED = 3;
    
    // Events
    event JobPosted(uint256 indexed jobId, address indexed recruiter, string title);
    event ApplicationSubmitted(uint256 indexed jobId, address indexed applicant);
    event QualificationVerified(uint256 indexed jobId, address indexed applicant, bool qualified);
    event RewardPaid(uint256 indexed jobId, address indexed applicant, uint256 amount);
    event JobStatusChanged(uint256 indexed jobId, bool isActive);
    
    // Modifiers
    modifier onlyRecruiter(uint256 _jobId) {
        require(jobs[_jobId].recruiter == msg.sender, "Only the recruiter can perform this action");
        _;
    }
    
    modifier jobExists(uint256 _jobId) {
        require(_jobId < jobIdCounter, "Job does not exist");
        _;
    }
    
    /**
     * @dev Post a new job with requirements and reward
     * @param _title Job title
     * @param _description Job description
     * @param _reward Amount of tokens to reward qualified applicants
     * @param _requirements List of job requirements
     * @return jobId The ID of the newly created job
     */
    function postJob(
        string memory _title,
        string memory _description,
        uint256 _reward,
        string[] memory _requirements
    ) public payable returns (uint256) {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(_requirements.length >= 2, "At least 2 requirements needed");
        require(msg.value >= _reward, "Insufficient funds for reward");
        
        uint256 jobId = jobIdCounter++;
        
        jobs[jobId] = Job({
            title: _title,
            description: _description,
            recruiter: msg.sender,
            reward: _reward,
            requirements: _requirements,
            isActive: true,
            createdAt: block.timestamp
        });
        
        recruiterJobs[msg.sender].push(jobId);
        
        emit JobPosted(jobId, msg.sender, _title);
        
        return jobId;
    }
    
    /**
     * @dev Apply for a job with qualifications
     * @param _jobId The ID of the job to apply for
     * @param _qualifications List of applicant qualifications
     */
    function applyForJob(uint256 _jobId, string[] memory _qualifications) public jobExists(_jobId) {
        require(jobs[_jobId].isActive, "Job is not active");
        require(_qualifications.length > 0, "Qualifications cannot be empty");
        
        // Check if applicant has already applied
        for (uint256 i = 0; i < applications[_jobId].length; i++) {
            require(applications[_jobId][i].applicant != msg.sender, "Already applied for this job");
        }
        
        // Calculate match score
        (uint256 matchCount, uint256 matchScore) = calculateMatchScore(_jobId, _qualifications);
        
        applications[_jobId].push(Application({
            applicant: msg.sender,
            qualifications: _qualifications,
            isVerified: false,
            isPaid: false,
            appliedAt: block.timestamp,
            matchScore: matchScore
        }));
        
        applicantApplications[msg.sender].push(_jobId);
        
        emit ApplicationSubmitted(_jobId, msg.sender);
        
        // Auto-verify if possible
        if (matchCount >= MIN_MATCHES_REQUIRED) {
            verifyQualifications(_jobId, applications[_jobId].length - 1);
        }
    }
    
    /**
     * @dev Calculate the match score between job requirements and applicant qualifications
     * @param _jobId The ID of the job
     * @param _qualifications List of applicant qualifications
     * @return matchCount Number of matched requirements
     * @return matchScore Percentage score of the match
     */
    function calculateMatchScore(uint256 _jobId, string[] memory _qualifications) 
        internal 
        view 
        returns (uint256 matchCount, uint256 matchScore) 
    {
        Job storage job = jobs[_jobId];
        matchCount = 0;
        
        // Simple matching algorithm (in a real implementation, this would be more sophisticated)
        for (uint256 i = 0; i < job.requirements.length; i++) {
            for (uint256 j = 0; j < _qualifications.length; j++) {
                // This is a simplified check - in reality, you'd use a more sophisticated matching algorithm
                if (keccak256(bytes(job.requirements[i])) == keccak256(bytes(_qualifications[j]))) {
                    matchCount++;
                    break;
                }
            }
        }
        
        // Calculate match score as a percentage
        matchScore = (matchCount * 100) / job.requirements.length;
        
        return (matchCount, matchScore);
    }
    
    /**
     * @dev Verify applicant qualifications and pay reward if qualified
     * @param _jobId The ID of the job
     * @param _applicationIndex Index of the application in the applications array
     */
    function verifyQualifications(uint256 _jobId, uint256 _applicationIndex) internal jobExists(_jobId) {
        Job storage job = jobs[_jobId];
        Application storage application = applications[_jobId][_applicationIndex];
        
        uint256 matchCount = 0;
        
        // Simple matching algorithm (in a real implementation, this would be more sophisticated)
        for (uint256 i = 0; i < job.requirements.length; i++) {
            for (uint256 j = 0; j < application.qualifications.length; j++) {
                // This is a simplified check - in reality, you'd use a more sophisticated matching algorithm
                if (keccak256(bytes(job.requirements[i])) == keccak256(bytes(application.qualifications[j]))) {
                    matchCount++;
                    break;
                }
            }
        }
        
        bool qualified = matchCount >= MIN_MATCHES_REQUIRED || 
                         (job.requirements.length < MIN_MATCHES_REQUIRED && matchCount == job.requirements.length);
        
        application.isVerified = true;
        
        emit QualificationVerified(_jobId, application.applicant, qualified);
        
        // If qualified, pay the reward
        if (qualified && !application.isPaid) {
            payReward(_jobId, _applicationIndex);
        }
    }
    
    /**
     * @dev Pay reward to qualified applicant
     * @param _jobId The ID of the job
     * @param _applicationIndex Index of the application in the applications array
     */
    function payReward(uint256 _jobId, uint256 _applicationIndex) internal {
        Job storage job = jobs[_jobId];
        Application storage application = applications[_jobId][_applicationIndex];
        
        require(job.isActive, "Job is not active");
        require(application.isVerified, "Application not verified");
        require(!application.isPaid, "Reward already paid");
        
        application.isPaid = true;
        
        // Transfer reward to applicant
        (bool success, ) = application.applicant.call{value: job.reward}("");
        require(success, "Reward payment failed");
        
        emit RewardPaid(_jobId, application.applicant, job.reward);
    }
    
    /**
     * @dev Manually verify an applicant (can only be done by the recruiter)
     * @param _jobId The ID of the job
     * @param _applicant Address of the applicant
     * @param _qualified Whether the applicant is qualified
     */
    function manuallyVerifyApplicant(uint256 _jobId, address _applicant, bool _qualified) 
        public 
        jobExists(_jobId) 
        onlyRecruiter(_jobId) 
    {
        for (uint256 i = 0; i < applications[_jobId].length; i++) {
            if (applications[_jobId][i].applicant == _applicant) {
                applications[_jobId][i].isVerified = true;
                
                emit QualificationVerified(_jobId, _applicant, _qualified);
                
                if (_qualified && !applications[_jobId][i].isPaid) {
                    payReward(_jobId, i);
                }
                
                return;
            }
        }
        
        revert("Applicant not found");
    }
    
    /**
     * @dev Close a job (can only be done by the recruiter)
     * @param _jobId The ID of the job
     */
    function closeJob(uint256 _jobId) public jobExists(_jobId) onlyRecruiter(_jobId) {
        jobs[_jobId].isActive = false;
        emit JobStatusChanged(_jobId, false);
    }
    
    /**
     * @dev Reopen a job (can only be done by the recruiter)
     * @param _jobId The ID of the job
     */
    function reopenJob(uint256 _jobId) public jobExists(_jobId) onlyRecruiter(_jobId) {
        jobs[_jobId].isActive = true;
        emit JobStatusChanged(_jobId, true);
    }
    
    /**
     * @dev Get job details
     * @param _jobId The ID of the job
     * @return title Job title
     * @return description Job description
     * @return recruiter Address of the recruiter
     * @return reward Amount of tokens to reward qualified applicants
     * @return requirements List of job requirements
     * @return isActive Whether the job is active
     */
    function getJob(uint256 _jobId) public view jobExists(_jobId) returns (
        string memory,
        string memory,
        address,
        uint256,
        string[] memory,
        bool
    ) {
        Job storage job = jobs[_jobId];
        return (
            job.title,
            job.description,
            job.recruiter,
            job.reward,
            job.requirements,
            job.isActive
        );
    }
    
    /**
     * @dev Get the number of applications for a job
     * @param _jobId The ID of the job
     * @return Number of applications
     */
    function getApplicationCount(uint256 _jobId) public view jobExists(_jobId) returns (uint256) {
        return applications[_jobId].length;
    }
    
    /**
     * @dev Get applicant qualifications for a job
     * @param _jobId The ID of the job
     * @param _applicant Address of the applicant
     * @return List of applicant qualifications
     */
    function getApplicantQualifications(uint256 _jobId, address _applicant) 
        public 
        view 
        jobExists(_jobId) 
        returns (string[] memory) 
    {
        for (uint256 i = 0; i < applications[_jobId].length; i++) {
            if (applications[_jobId][i].applicant == _applicant) {
                return applications[_jobId][i].qualifications;
            }
        }
        
        revert("Applicant not found");
    }
    
    /**
     * @dev Get all jobs posted by a recruiter
     * @param _recruiter Address of the recruiter
     * @return List of job IDs
     */
    function getRecruiterJobs(address _recruiter) public view returns (uint256[] memory) {
        return recruiterJobs[_recruiter];
    }
    
    /**
     * @dev Get all jobs applied for by an applicant
     * @param _applicant Address of the applicant
     * @return List of job IDs
     */
    function getApplicantApplications(address _applicant) public view returns (uint256[] memory) {
        return applicantApplications[_applicant];
    }
    
    /**
     * @dev Check if an applicant is verified for a job
     * @param _jobId The ID of the job
     * @param _applicant Address of the applicant
     * @return Whether the applicant is verified
     */
    function verifyApplicant(uint256 _jobId, address _applicant) public view jobExists(_jobId) returns (bool) {
        for (uint256 i = 0; i < applications[_jobId].length; i++) {
            if (applications[_jobId][i].applicant == _applicant) {
                return applications[_jobId][i].isVerified;
            }
        }
        
        return false;
    }
    
    /**
     * @dev Get application details
     * @param _jobId The ID of the job
     * @param _applicant Address of the applicant
     * @return qualifications List of applicant qualifications
     * @return isVerified Whether the application is verified
     * @return isPaid Whether the reward is paid
     * @return appliedAt Timestamp when the application was submitted
     * @return matchScore Percentage score of the match
     */
    function getApplicationDetails(uint256 _jobId, address _applicant) 
        public 
        view 
        jobExists(_jobId) 
        returns (
            string[] memory qualifications,
            bool isVerified,
            bool isPaid,
            uint256 appliedAt,
            uint256 matchScore
        ) 
    {
        for (uint256 i = 0; i < applications[_jobId].length; i++) {
            if (applications[_jobId][i].applicant == _applicant) {
                Application storage app = applications[_jobId][i];
                return (
                    app.qualifications,
                    app.isVerified,
                    app.isPaid,
                    app.appliedAt,
                    app.matchScore
                );
            }
        }
        
        revert("Applicant not found");
    }
    
    /**
     * @dev Get contract balance
     * @return Contract balance
     */
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
    
    /**
     * @dev Withdraw remaining funds (can only be done by the recruiter)
     * @param _jobId The ID of the job
     */
    function withdrawRemainingFunds(uint256 _jobId) public jobExists(_jobId) onlyRecruiter(_jobId) {
        Job storage job = jobs[_jobId];
        require(!job.isActive, "Job must be closed before withdrawing funds");
        
        // Calculate remaining funds
        uint256 paidRewards = 0;
        for (uint256 i = 0; i < applications[_jobId].length; i++) {
            if (applications[_jobId][i].isPaid) {
                paidRewards += job.reward;
            }
        }
        
        uint256 remainingFunds = job.reward - paidRewards;
        require(remainingFunds > 0, "No funds to withdraw");
        
        // Transfer remaining funds to recruiter
        (bool success, ) = job.recruiter.call{value: remainingFunds}("");
        require(success, "Withdrawal failed");
    }
    
    // Allow the contract to receive funds
    receive() external payable {}
}
