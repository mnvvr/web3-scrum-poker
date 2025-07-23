# Web3 Scrum Poker 🃏

A lightweight, transparent and accessible planning poker experience built with Web3 in mind. Users can join with a crypto wallet or as a guest, enabling frictionless onboarding while maintaining decentralization principles.

## ✨ Features

- **🔐 Web3 Integration**: Connect with MetaMask, WalletConnect, or continue as a guest
- **🎴 Multiple Card Types**: Fibonacci, T-shirt sizes, and custom number scales
- **👥 Real-time Collaboration**: Join rooms with shareable codes
- **📊 Vote Analytics**: See vote distribution, averages, and variance
- **💬 Comments & Feedback**: Share rationale and discuss estimates
- **🎨 Modern UI**: Beautiful, responsive design with smooth animations
- **⚡ No Gas Fees**: Lightweight Web3 experience without transaction costs
- **🔒 Transparent Voting**: All votes recorded for auditability
- **📱 Mobile Optimized**: Fully responsive design for all devices
- **🎯 Complete UX Flow**: All 9 steps from landing to session end

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/web3-scrum-poker.git
   cd web3-scrum-poker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Mode

The application includes a fully functional demo mode that showcases all features:

- **Landing Page**: [http://localhost:3000](http://localhost:3000)
- **Interactive Demo**: [http://localhost:3000/demo](http://localhost:3000/demo)

The demo includes sample data and allows you to experience the complete planning poker workflow without Web3 integration.

## 🎯 How It Works

### 1. **Landing Page**
- Hero section with clear value proposition
- Two primary CTAs: "Connect Wallet" or "Continue as Guest"
- "How It Works" section explaining the process
- Web3 benefits without complexity

### 2. **Authentication**
- **Wallet Sign-in**: Connect with MetaMask, WalletConnect, etc.
- **Guest Access**: Join with a custom nickname or auto-generated name
- ENS resolution for wallet users

### 3. **Room Management**
- **Create Room**: Set name, card type, participant limit
- **Join Room**: Enter 6-character room code
- Shareable room links for easy access

### 4. **Planning Poker Session**
- **Vote**: Select from Fibonacci, T-shirt sizes, or custom scales
- **Reveal**: Simultaneously show all votes
- **Analyze**: View vote distribution and statistics
- **Discuss**: High variance triggers re-vote suggestions

### 5. **Session Management**
- Real-time participant status
- Vote progress tracking
- Comments and feedback system
- Session summary and export options
- End session with multiple action options

## 🎴 Card Types

### Fibonacci Sequence
- Values: 0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ?
- Perfect for story point estimation
- Classic agile methodology

### T-Shirt Sizes
- Values: XS, S, M, L, XL, XXL, ?
- Quick relative estimation
- Great for high-level planning

### Custom Scale
- Values: 1-10, ?
- Simple and straightforward
- Ideal for teams new to estimation

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth interactions
- **UI Components**: Lucide React icons
- **State Management**: React hooks with TypeScript
- **Notifications**: React Hot Toast
- **Utilities**: Nanoid for ID generation
- **Web3 Ready**: Foundation set up for wallet integration

## 📁 Project Structure

```
web3-scrum-poker/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── poker/            # Planning poker components
│   ├── providers/        # Web3 providers
│   └── room/             # Room management components
├── types/                # TypeScript type definitions
├── plans/                # Project documentation
└── public/               # Static assets
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# WalletConnect Project ID (get from https://cloud.walletconnect.com/)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here

# Optional: Custom RPC endpoints
NEXT_PUBLIC_RPC_URL=https://eth-mainnet.alchemyapi.io/v2/your_key
```

### Supported Networks

- Ethereum Mainnet
- Polygon
- Optimism
- Arbitrum
- Local development networks

## 🎨 Customization

### Styling

The app uses Tailwind CSS with custom design tokens. Key customization points:

- **Colors**: Defined in `tailwind.config.js`
- **Animations**: Custom keyframes in `globals.css`
- **Components**: Reusable classes in `globals.css`

### Card Types

Add new card types in `types/index.ts`:

```typescript
export const CARD_TYPES: Record<CardType, CardTypeConfig> = {
  // ... existing types
  custom: {
    name: 'Your Custom Type',
    values: [1, 2, 3, 4, 5, '?'],
    description: 'Your custom description'
  }
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow Conventional Commits for commit messages
- Use TypeScript for all new code
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Web3Modal](https://web3modal.com/) for wallet connection
- [Wagmi](https://wagmi.sh/) for React hooks for Ethereum
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📞 Support

- 📧 Email: support@web3scrumpoker.com
- 💬 Discord: [Join our community](https://discord.gg/web3scrumpoker)
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/web3-scrum-poker/issues)
- 📖 Documentation: [Wiki](https://github.com/your-username/web3-scrum-poker/wiki)

---

Built with ❤️ for the Web3 community 