import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const tokenSecret = process.env.TOKEN_SECRET || 'super-tajny-klucz-do-zmiany';
const tokenExpiration = 60 * 15; // 15 minutes
const refreshTokenExpiration = 60 * 60 * 24 * 7; // 7 days

const users = [
  {
    id: '1',
    login: 'admin',
    password: 'admin123',
    email: 'admin@example.com',
    name: 'Administrator',
    role: 'admin'
  },
  {
    id: '2',
    login: 'user',
    password: 'user123',
    email: 'user@example.com',
    name: 'Zwykły Użytkownik',
    role: 'user'
  }
];

let refreshTokens: { [userId: string]: string } = {};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { refreshToken } = body;
    
    if (!refreshToken) {
      return NextResponse.json(
        { message: 'Refresh token jest wymagany' }, 
        { status: 400 }
      );
    }
    
    try {
      const decoded = jwt.verify(refreshToken, tokenSecret) as jwt.JwtPayload;
      const userId = decoded.userId as string;
      
      if (!refreshTokens[userId] || refreshTokens[userId] !== refreshToken) {
        return NextResponse.json(
          { message: 'Nieprawidłowy refresh token' }, 
          { status: 403 }
        );
      }
      
      const user = users.find(u => u.id === userId);
      if (!user) {
        return NextResponse.json(
          { message: 'Użytkownik nie istnieje' }, 
          { status: 403 }
        );
      }
      
      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user.id);
      
      refreshTokens[userId] = newRefreshToken;
      
      return NextResponse.json({
        token: newAccessToken,
        refreshToken: newRefreshToken
      });
    } catch (error) {
      return NextResponse.json(
        { message: 'Nieprawidłowy refresh token' }, 
        { status: 403 }
      );
    }
  } catch (error) {
    console.error('Refresh token error:', error);
    return NextResponse.json(
      { message: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

function generateAccessToken(user: any) {
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