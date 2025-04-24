// File: app/api/login/route.ts
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const tokenSecret = process.env.TOKEN_SECRET || 'super-tajny-klucz-do-zmiany';
const tokenExpiration = 60 * 15; // 15 minutes
const refreshTokenExpiration = 60 * 60 * 24 * 7; // 7 days

interface User {
  id: string;
  login: string;
  password: string; 
  email: string;
  name: string;
  role: string;
}

const users: User[] = [
  {
    id: '1',
    login: 'admin',
    password: 'admin123',
    email: 'admin@example.com',
    name: 'admin',
    role: 'admin'
  },
  {
    id: '2',
    login: 'user',
    password: 'user123',
    email: 'user@example.com',
    name: 'user',
    role: 'user'
  }
];

let refreshTokens: { [userId: string]: string } = {};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { login, password } = body;
    
    if (!login || !password) {
      return NextResponse.json(
        { message: 'Login i hasło są wymagane' }, 
        { status: 400 }
      );
    }
    
    const user = users.find(u => u.login === login && u.password === password);
    
    if (!user) {
      return NextResponse.json(
        { message: 'Niepoprawny login lub hasło' }, 
        { status: 401 }
      );
    }
    
    const token = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user.id);
    
    refreshTokens[user.id] = refreshToken;
    
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      token,
      refreshToken,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

function generateAccessToken(user: User) {
  const payload = {
    id: user.id,
    login: user.login,
    role: user.role
  };
  
  return jwt.sign(payload, tokenSecret, { 
    expiresIn: tokenExpiration,
    algorithm: 'HS256'
  });
}

function generateRefreshToken(userId: string) {
  const payload = {
    userId,
    tokenId: uuidv4()
  };
  
  return jwt.sign(payload, tokenSecret, { 
    expiresIn: refreshTokenExpiration,
    algorithm: 'HS256'
  });
}