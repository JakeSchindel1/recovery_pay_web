# RecoveryPay

RecoveryPay is a comprehensive management system for recovery houses, designed to streamline payment processing, resident management, and house administration.

## Features

- **User Authentication**: Secure login and signup with Supabase Auth
- **Dashboard**: Overview of key metrics and recent activities
- **Resident Management**: Track and manage residents
- **Payment Processing**: Record and track payments
- **House Management**: Manage multiple recovery houses
- **Settings**: Configure account, notification, and payment settings

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/recovery-pay.git
   cd recovery-pay
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up Supabase:
   - Create a Supabase account at [supabase.com](https://supabase.com)
   - Create a new project
   - Enable Email Auth in Authentication > Providers > Email
   - Copy your Supabase URL and anon key from Project Settings > API

4. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Authentication Flow

RecoveryPay uses Supabase Authentication for user management:

1. **Sign Up**: Users can create an account with email and password
2. **Email Verification**: Users receive an email to verify their account
3. **Sign In**: Users can sign in with their email and password
4. **Password Reset**: Users can reset their password if forgotten
5. **Protected Routes**: Dashboard and other pages are protected and require authentication

## Theme System

RecoveryPay includes a flexible theme system that allows for easy customization and theme switching:

### Features

- **Multiple Themes**: Light and dark themes included by default
- **CSS Variables**: All colors and styles are defined as CSS variables
- **Theme Context**: React context for managing theme state
- **Theme Toggle**: Easy switching between themes
- **System Preference**: Automatically detects and applies the user's system preference
- **Persistence**: Remembers the user's theme preference across sessions

### Customizing Themes

To customize the existing themes or add new ones:

1. Edit the theme definitions in `lib/themes.ts`
2. Add or modify color variables as needed
3. Use the theme variables in your components with CSS classes or inline styles

Example of using theme variables in a component:

```tsx
// Using theme variables in a component
<button className="bg-primary text-white hover:bg-primaryHover">
  Click Me
</button>
```

### Adding a New Theme

To add a new theme:

1. Define a new theme object in `lib/themes.ts`:

```typescript
export const customTheme: Theme = {
  name: 'custom',
  colors: {
    primary: '#8b5cf6', // Purple-500
    primaryHover: '#7c3aed', // Purple-600
    // ... other color definitions
  },
};
```

2. Update the `getTheme` function to include your new theme:

```typescript
export function getTheme(name: string): Theme {
  switch (name) {
    case 'dark':
      return darkTheme;
    case 'custom':
      return customTheme;
    case 'light':
    default:
      return lightTheme;
  }
}
```

## Deployment

The application can be deployed to Vercel, Netlify, or any other platform that supports Next.js applications.

1. Push your code to a GitHub repository
2. Connect your repository to Vercel or Netlify
3. Set the environment variables in the deployment platform
4. Deploy the application

## License

This project is licensed under the MIT License - see the LICENSE file for details.
