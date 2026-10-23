import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';

interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: 'client' | 'agent' | 'admin';
  status: 'active' | 'pending' | 'inactive';
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: 'client' | 'agent' | 'admin';
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: 'client' | 'agent' | 'admin';
    status: 'active' | 'pending' | 'inactive';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'client' | 'agent' | 'admin';
    status: 'active' | 'pending' | 'inactive';
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        // TODO: Replace with actual database lookup
        // This is a mock implementation for demonstration
        const users: User[] = [
          {
            id: '1',
            email: 'demo@example.com',
            name: 'Demo User',
            password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/RK.PZvO.S', // 'password123'
            role: 'client',
            status: 'active',
          },
        ];

        const user = users.find((u) => u.email === credentials.email);

        if (!user) {
          throw new Error('Invalid email or password');
        }

        if (user.status !== 'active') {
          throw new Error('Account is not active. Please contact support.');
        }

        const isValid = await compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error('Invalid email or password');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.status = 'active';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};