# FakeiPhoneCalls.com - iPhone Call Simulator

## Overview

This is a React/Express web application that simulates realistic iPhone incoming calls. The app allows users to create fake iPhone calls as a polite way to exit uncomfortable situations. It features a full-stack architecture with a React frontend using modern UI components and an Express backend with PostgreSQL database support via Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state, React hooks for local state
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom iOS-themed variables
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Session Management**: PostgreSQL session store via connect-pg-simple
- **API**: RESTful API structure with `/api` prefix

### Key Components

1. **Call Simulator Component** (`client/src/components/call-simulator.tsx`)
   - Main application feature that simulates iPhone call interface
   - Manages call states: setup, incoming, active
   - Includes realistic iPhone UI elements and animations

2. **Database Schema** (`shared/schema.ts`)
   - User management system with username/password authentication
   - Drizzle ORM integration with Zod validation schemas

3. **Storage Layer** (`server/storage.ts`)
   - Abstracted storage interface supporting both memory and database storage
   - Currently implements in-memory storage with plans for PostgreSQL integration

4. **API Routes** (`server/routes.ts`)
   - Express route handlers for application endpoints
   - Placeholder structure ready for user authentication and call history features

## Data Flow

1. **Client Request Flow**:
   - React components make API calls via TanStack Query
   - Custom query client handles authentication and error states
   - RESTful API endpoints process requests and return JSON responses

2. **Database Operations**:
   - Drizzle ORM provides type-safe database queries
   - Schema definitions shared between client and server via TypeScript types
   - Migration system managed through drizzle-kit

3. **Authentication Flow**:
   - User credentials stored securely with hashed passwords
   - Session management through PostgreSQL-backed sessions
   - Protected routes and API endpoints (to be implemented)

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework

### Development Tools
- **vite**: Build tool and development server
- **tsx**: TypeScript execution for development
- **esbuild**: Production build bundling

## Deployment Strategy

### Development Environment
- **Platform**: Replit with Node.js 20, web, and PostgreSQL 16 modules
- **Build Command**: `npm run build` - Vite builds client, esbuild bundles server
- **Start Command**: `npm run start` - Runs production server
- **Dev Command**: `npm run dev` - Concurrent development with hot reload

### Production Configuration
- **Port**: 5000 (internal) mapped to 80 (external)
- **Deployment Target**: Autoscale deployment on Replit
- **Static Assets**: Served from `dist/public` directory
- **Environment Variables**: DATABASE_URL for PostgreSQL connection

### Database Management
- **Migrations**: `npm run db:push` applies schema changes
- **Connection**: Environment-based DATABASE_URL configuration
- **Backup Strategy**: Relies on hosting provider's database backup systems

## Changelog

Changelog:
- June 24, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.