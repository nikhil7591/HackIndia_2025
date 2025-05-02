# Job Shield

A blockchain-powered platform that helps detect fake job postings and protects job seekers with smart contract verification and AI-based Trust Scores.

## Features

- **Blockchain Verification**: Smart contracts on Polygon Mumbai testnet verify applicant qualifications and handle token transfers
- **AI-Powered Trust Scores**: ML algorithm analyzes job postings to detect potential scams
- **Metamask Integration**: Connect your wallet to interact with the blockchain
- **Responsive UI**: Built with Next.js and Tailwind CSS

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, shadcn/ui
- **Blockchain**: Solidity, Hardhat, Ethers.js, Polygon Mumbai testnet
- **AI/ML**: Basic ML algorithm for fake job detection

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- MetaMask wallet

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/job-shield.git
   \`\`\`

2. Navigate to the project directory:
   \`\`\`bash
   cd job-shield
   \`\`\`

3. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

4. Create a `.env.local` file in the root directory with the following variables:
   \`\`\`
   # Smart Contract
   NEXT_PUBLIC_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000

   # RPC Provider (Mumbai Testnet)
   NEXT_PUBLIC_RPC_URL=https://rpc-mumbai.maticvigil.com

   # Optional: Analytics
   NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id

   # Optional: API Keys for enhanced AI features
   AI_API_KEY=your-ai-api-key
   \`\`\`

5. Run the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Smart Contract Deployment

1. Install Hardhat dependencies:
   \`\`\`bash
   npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle
   \`\`\`

2. Create a `.env` file for Hardhat with your private key:
   \`\`\`
   PRIVATE_KEY=your-wallet-private-key
   \`\`\`

3. Deploy the contract:
   \`\`\`bash
   npx hardhat run scripts/deploy.ts --network mumbai
   \`\`\`

4. Update your `.env.local` with the deployed contract address.

## Testing

1. Get testnet MATIC from the [Polygon Mumbai Faucet](https://faucet.polygon.technology/).

2. Generate mock data:
   \`\`\`bash
   npx hardhat run scripts/generate-mock-data.ts --network mumbai
   \`\`\`

3. Run the test suite:
   \`\`\`bash
   npm test
   \`\`\`

## Project Structure

\`\`\`
job-shield/
├── app/                  # Next.js App Router
├── components/           # React components
├── contracts/            # Solidity smart contracts
├── lib/                  # Utility functions
├── public/               # Static assets
├── scripts/              # Deployment and testing scripts
└── styles/               # Global styles
\`\`\`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- This project was created for a hackathon
- Thanks to the Polygon team for the Mumbai testnet
