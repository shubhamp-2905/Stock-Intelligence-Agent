# Overview

This is a modern AI-powered stock investment analysis platform that enables users to compare two stocks side-by-side and receive comprehensive investment recommendations. The application features a professional black-and-white UI design and leverages Google Gemini AI to provide real-time stock analysis, risk assessments, and portfolio allocation suggestions.

The platform is built as a full-stack web application with a React frontend and Express backend, designed to help investors make informed decisions through data-driven analysis and AI-powered insights.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using functional components and hooks
- **Styling**: Tailwind CSS with a professional black/white/gray color scheme using CSS variables for theming
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent design
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints with structured error handling
- **Validation**: Zod schemas for request/response validation
- **Stock Data**: Yahoo Finance API integration for real-time market data
- **AI Integration**: Google Gemini AI for investment analysis and recommendations

## Data Storage Solutions
- **Database**: PostgreSQL configured via Drizzle ORM with connection pooling
- **Connection**: Neon Database serverless PostgreSQL
- **Session Storage**: Connect-pg-simple for PostgreSQL session storage
- **Schema Management**: Drizzle migrations with TypeScript schema definitions
- **In-Memory Fallback**: MemStorage implementation for development/testing

## Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL storage
- **User Storage**: Minimal user schema supporting username/password authentication
- **API Security**: CORS enabled, JSON body parsing, request logging middleware

## Key Features and Design Patterns
- **Real-time Stock Analysis**: Fetches live market data including price, market cap, P/E ratio, dividend yield
- **AI-Powered Recommendations**: Uses Google Gemini to analyze stock fundamentals and provide investment advice
- **Responsive Design**: Mobile-first approach with Tailwind responsive utilities
- **Professional UI**: Glass morphism effects, smooth animations, and clean typography
- **Error Handling**: Comprehensive error boundaries and user-friendly error messages
- **Loading States**: Professional loading indicators with progress feedback
- **Type Safety**: End-to-end TypeScript with shared schemas between frontend and backend

## Development and Deployment
- **Development**: Hot module replacement with Vite, TypeScript checking, and error overlays
- **Production Build**: ESBuild for server bundling, Vite for client optimization
- **Asset Management**: Centralized asset handling with alias resolution
- **Environment Configuration**: Environment-based configuration for database and API keys

# External Dependencies

## Third-Party Services
- **Google Gemini AI**: AI analysis engine requiring API key for stock recommendations and investment insights
- **Yahoo Finance API**: Real-time stock market data source for price, fundamentals, and historical data
- **Neon Database**: Serverless PostgreSQL database hosting with connection pooling
- **Replit Integration**: Development environment plugins for runtime error handling and debugging

## Key Libraries and Frameworks
- **Frontend**: React, TanStack Query, Radix UI, Tailwind CSS, Wouter, Lucide Icons
- **Backend**: Express, Drizzle ORM, Zod validation, Axios for HTTP requests
- **Development**: Vite, TypeScript, ESBuild, PostCSS, Autoprefixer
- **UI Components**: Comprehensive shadcn/ui component library with form handling and toast notifications

## API Integrations
- **Stock Data API**: Yahoo Finance endpoints for market data, company information, and financial metrics
- **AI Analysis API**: Google Gemini API for natural language processing and investment analysis generation
- **Database API**: PostgreSQL connection via Drizzle ORM with type-safe queries and migrations