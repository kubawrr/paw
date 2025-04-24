import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { headers } from 'next/headers';

const tokenSecret = process.env.TOKEN_SECRET || 'super-tajny-klucz-do-zmiany';

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

export async function GET(request: Request) {
  try {
    const headersList = headers();
    const authorization = (await headersList).get('authorization');
    
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Wymagane uwierzytelnienie' }, 
        { status: 401 }
      );
    }
    
    const token = authorization.split(' ')[1];
    
    try {
      const decoded = jwt.verify(token, tokenSecret) as jwt.JwtPayload;
      const userId = decoded.id as string;
      
      const user = users.find(u => u.id === userId);
      
      if (!user) {
        return NextResponse.json(
          { message: 'Nie znaleziono użytkownika' }, 
          { status: 404 }
        );
      }
      
      const { password, ...userWithoutPassword } = user;
      return NextResponse.json(userWithoutPassword);
      
    } catch (error) {
      return NextResponse.json(
        { message: 'Token nieprawidłowy lub wygasł' }, 
        { status: 403 }
      );
    }
  } catch (error) {
    console.error('User endpoint error:', error);
    return NextResponse.json(
      { message: 'Internal server error' }, 
      { status: 500 }
    );
  }
}