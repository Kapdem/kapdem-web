import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

// Timeout for backend requests (30 seconds)
const REQUEST_TIMEOUT = 30000;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    if (!body.message || typeof body.message !== 'string' || body.message.trim().length === 0) {
      return NextResponse.json(
        { 
          message: 'Message is required and must be a non-empty string',
          sessionId: body.sessionId || null
        },
        { status: 400 }
      );
    }

    // Limit message length
    if (body.message.length > 1000) {
      return NextResponse.json(
        { 
          message: 'Message is too long. Maximum 1000 characters allowed.',
          sessionId: body.sessionId || null
        },
        { status: 400 }
      );
    }

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
    
    try {
      // Backend'e isteği ilet
      const response = await fetch(`${BACKEND_URL}/chatbot/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          message: body.message.trim(),
          lang: body.lang || 'tr',
          sessionId: body.sessionId || null,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = await response.text();
        }
        
        console.error('Backend error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });

        // Return user-friendly error messages
        let errorMessage = 'Bir hata oluştu. Lütfen tekrar deneyin.';
        
        if (response.status === 404) {
          errorMessage = 'Chatbot servisi bulunamadı. Lütfen daha sonra tekrar deneyin.';
        } else if (response.status === 429) {
          errorMessage = 'Çok fazla istek gönderdiniz. Lütfen birkaç saniye bekleyin.';
        } else if (response.status >= 500) {
          errorMessage = 'Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.';
        } else if (errorData?.message) {
          errorMessage = errorData.message;
        }

        return NextResponse.json(
          { 
            message: errorMessage,
            sessionId: body.sessionId || null,
            error: process.env.NODE_ENV === 'development' ? errorData : undefined
          },
          { status: response.status }
        );
      }

      const data = await response.json();
      
      // Validate response structure
      if (!data.message || !data.sessionId) {
        console.error('Invalid response structure:', data);
        return NextResponse.json(
          { 
            message: 'Geçersiz yanıt alındı. Lütfen tekrar deneyin.',
            sessionId: body.sessionId || null
          },
          { status: 500 }
        );
      }

      return NextResponse.json(data);
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      
      if (fetchError.name === 'AbortError') {
        return NextResponse.json(
          { 
            message: 'İstek zaman aşımına uğradı. Lütfen tekrar deneyin.',
            sessionId: body.sessionId || null
          },
          { status: 504 }
        );
      }
      
      throw fetchError;
    }
  } catch (error: any) {
    console.error('Proxy error:', error);
    
    // Network errors
    if (error.message?.includes('fetch') || error.code === 'ECONNREFUSED') {
      return NextResponse.json(
        { 
          message: 'Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.',
          sessionId: null
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Bir hata oluştu. Lütfen tekrar deneyin.',
        sessionId: null,
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

