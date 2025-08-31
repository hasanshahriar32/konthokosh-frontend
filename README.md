# Kontho Kosh - Bengali Cultural Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.9-38B2AC)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Authentication-6C47FF)](https://clerk.com/)
[![ElevenLabs](https://img.shields.io/badge/ElevenLabs-TTS-000000)](https://elevenlabs.io/)

Kontho Kosh is a modern Bengali cultural platform built with cutting-edge web technologies, designed for writers, poets, and literature enthusiasts. The platform leverages blockchain technology for content ownership protection and implements AI-powered Text-to-Speech (TTS) functionality to convert written content into audiobooks.

## 🚀 Core Features

### 📝 Content Creation & Publishing

- **Real-time MDX Editor**: Advanced editor with markdown support and rich text formatting
- **Tag-based Categorization**: Comprehensive tagging system for content classification (Poetry, Stories, Essays, History, etc.)
- **AI Cover Generation**: Automated cover image generation using AI models
- **Blockchain Integration**: IPFS storage with on-chain metadata for immutable content ownership

### 🎧 Audiobook System

- **ElevenLabs TTS Integration**: High-quality Bengali voice synthesis with customizable parameters
- **Advanced Audio Player**: Full-featured player with playback controls, shuffle, repeat, and volume management
- **Synchronized Playback**: Line-by-line text synchronization with audio playback
- **Caching System**: Intelligent audio caching for improved performance and offline capability

### 👥 Community & Interaction

- **Feed System**: Dynamic content feed with pagination and real-time updates
- **Comment System**: Threaded discussions and community engagement
- **Advanced Search**: Full-text search with tag filtering and keyword highlighting
- **User Dashboard**: Personal content management and analytics

### 🔐 Security & Privacy

- **Clerk Authentication**: Secure user authentication with social login integration
- **Plagiarism Protection**: Blockchain-based content verification and ownership tracking
- **Data Encryption**: End-to-end encryption for sensitive user data
- **Access Control**: Role-based permissions and content moderation

### 🎨 UI/UX Architecture

- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Theme System**: Dark/Light mode with system preference detection
- **Bengali Typography**: Optimized font stack for Bengali script rendering
- **Component Library**: ShadCN/UI based design system with accessibility compliance

## 🛠️ Technology Stack

### Frontend Framework

- **Next.js 15.2.4**: App Router with Server Components and API Routes
- **React 19**: Latest React with concurrent features and hooks
- **TypeScript 5**: Strict type checking with advanced language features

### Styling & UI

- **Tailwind CSS 4.1.9**: Utility-first CSS framework with custom design system
- **Radix UI**: Unstyled, accessible UI primitives
- **ShadCN/UI**: High-quality React components built on Radix UI
- **Framer Motion**: Declarative animations and transitions

### State Management & Data

- **React Context API**: Client-side state management with custom hooks
- **React Hook Form**: Performant forms with validation
- **Zod**: TypeScript-first schema validation
- **SWR**: React hooks for data fetching with caching

### External Integrations

- **Clerk**: Authentication and user management
- **ElevenLabs API**: Text-to-speech synthesis
- **IPFS**: Decentralized file storage
- **Blockchain**: Smart contract integration for content ownership

### Development Tools

- **ESLint**: Code linting with Next.js configuration
- **PostCSS**: CSS processing with Tailwind integration
- **pnpm**: Fast, disk-efficient package manager

## � Installation & Setup

### Prerequisites

- Node.js 18.0 or higher
- pnpm package manager
- Git

### Environment Configuration

Create `.env.local` file with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_secret_key_here

# Backend API
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000

# ElevenLabs TTS
NEXT_PUBLIC_ELEVENLABS_KEY=elevenlabs_api_key_here
NEXT_PUBLIC_ELEVENLABS_VOICE=iP95p4xoKVk53GoZ742B
NEXT_PUBLIC_ELEVENLABS_MODEL=eleven_monolingual_v1
```

### Installation Steps

1. **Clone Repository**

   ```bash
   git clone https://github.com/hasanshahriar32/konthokosh-frontend.git
   cd konthokosh-frontend
   ```

2. **Install Dependencies**

   ```bash
   pnpm install
   ```

3. **Configure Environment**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

4. **Start Development Server**

   ```bash
   pnpm dev
   ```

5. **Build for Production**
   ```bash
   pnpm build
   pnpm start
   ```

## 🏗️ Project Architecture

```
konthokosh-frontend/
├── app/                          # Next.js App Router
│   ├── api/                      # Server-side API routes
│   │   ├── generate-audio/       # TTS generation endpoint
│   │   └── tts/                  # Additional TTS endpoints
│   ├── (auth)/                   # Authentication pages
│   ├── dashboard/                # User dashboard
│   ├── feed/                     # Content feed and post pages
│   │   ├── [id]/                 # Dynamic post pages
│   │   ├── me/                   # User's posts
│   │   └── new/                  # Post creation
│   ├── audiobook/                # Audiobook player interface
│   └── layout.tsx                # Root layout with providers
├── components/                   # Reusable React components
│   ├── ui/                       # ShadCN/UI component library
│   ├── auth/                     # Authentication components
│   ├── common/                   # Shared utilities
│   ├── feed/                     # Feed-specific components
│   ├── landing/                  # Landing page sections
│   └── post/                     # Post-related components
├── lib/                          # Core business logic
│   ├── audio-player.ts           # Audio playback engine
│   ├── elevenlabs-service.ts     # TTS service integration
│   ├── queue-manager.ts          # Audio queue management
│   └── posts-data.ts             # Post data utilities
├── types/                        # TypeScript definitions
│   ├── post.ts                   # Post-related types
│   ├── user.ts                   # User-related types
│   └── index.ts                  # Type exports
├── utils/                        # Utility functions
│   ├── api-client.ts             # API client configuration
│   └── konthokosh-api.ts         # Backend API integration
├── constants/                    # Application constants
├── context/                      # React context providers
├── styles/                       # Global styles and CSS
└── public/                       # Static assets
```

## � API Integration

### Text-to-Speech API

```typescript
POST /api/generate-audio
Content-Type: application/json

interface GenerateAudioRequest {
  text: string;
  postId: string;
}

interface AudioGenerationResponse {
  audioUrl: string;
  duration: number;
}
```

### Backend API Client

```typescript
// API client configuration
const apiClient = {
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

// Post creation
const createPost = async (data: CreatePostRequest) => {
  return apiClient.post("/posts", data);
};

// Blockchain submission
const submitToBlockchain = async (postId: string) => {
  return apiClient.post(`/posts/${postId}/blockchain`);
};
```

## 🎯 Key Workflows

### Content Creation Pipeline

1. **Authentication**: User login via Clerk
2. **Content Creation**: MDX editor with real-time preview
3. **Tag Assignment**: Category and tag selection
4. **Cover Generation**: AI-powered image generation
5. **IPFS Storage**: Decentralized file storage
6. **Blockchain Registration**: Smart contract interaction
7. **Publication**: Content goes live on platform

### Audiobook Generation

1. **Text Processing**: Content parsing and segmentation
2. **TTS Request**: ElevenLabs API integration
3. **Audio Caching**: Local storage optimization
4. **Synchronization**: Text-audio alignment
5. **Playback**: Advanced audio controls

## 🔧 Development Guidelines

### Code Quality

- **TypeScript Strict Mode**: No `any` types, comprehensive type coverage
- **ESLint Configuration**: Next.js recommended rules with custom extensions
- **Component Architecture**: Functional components with custom hooks
- **Error Boundaries**: Graceful error handling and user feedback

### Performance Optimization

- **Code Splitting**: Route-based and component-based splitting
- **Image Optimization**: Next.js Image component with WebP support
- **Caching Strategy**: SWR for API responses, localStorage for user preferences
- **Bundle Analysis**: Webpack bundle analyzer integration

### Testing Strategy

- **Unit Tests**: Jest with React Testing Library
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Playwright for critical user flows
- **Performance Testing**: Lighthouse CI integration

## 🔒 Security Considerations

### Authentication

- JWT token management with secure storage
- CSRF protection on API endpoints
- Rate limiting on authentication routes

### Content Security

- Input sanitization and validation
- XSS protection with Content Security Policy
- Secure file upload with type validation

### Data Protection

- End-to-end encryption for sensitive data
- GDPR compliance for user data handling
- Regular security audits and dependency updates

## 📈 Deployment & CI/CD

### Build Configuration

```javascript
// next.config.mjs
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["api.elevenlabs.io", "ipfs.io"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
```

### Environment Setup

- **Development**: Local development with hot reload
- **Staging**: Automated deployment for testing
- **Production**: Optimized build with CDN integration

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Kontho Kosh** - Revolutionizing Bengali literature through technology, making creative expression secure, accessible, and innovative.
