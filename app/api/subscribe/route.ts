import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { promises as fs } from 'fs'
import path from 'path'

const subscribeSchema = z.object({
  email: z.string().email('Invalid email address'),
  source: z.enum(['hero', 'program', 'footer']),
})

// Rate limiting: Store IPs with timestamps
const rateLimitMap = new Map<string, number>()
const RATE_LIMIT_DURATION = 5000 // 5 seconds

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const lastRequest = rateLimitMap.get(ip)
  
  if (lastRequest && now - lastRequest < RATE_LIMIT_DURATION) {
    return true
  }
  
  rateLimitMap.set(ip, now)
  return false
}

async function saveToCSV(email: string, source: string): Promise<void> {
  try {
    const dataDir = path.join(process.cwd(), 'data')
    const filePath = path.join(dataDir, 'signups.csv')
    
    // Ensure data directory exists
    try {
      await fs.mkdir(dataDir, { recursive: true })
    } catch (error) {
      // Directory might already exist
    }
    
    // Check if file exists, if not create with headers
    let fileExists = true
    try {
      await fs.access(filePath)
    } catch {
      fileExists = false
    }
    
    const timestamp = new Date().toISOString()
    const csvLine = `${email},${source},${timestamp}\n`
    
    if (!fileExists) {
      const headers = 'email,source,timestamp\n'
      await fs.writeFile(filePath, headers + csvLine)
    } else {
      await fs.appendFile(filePath, csvLine)
    }
  } catch (error) {
    console.error('Error saving to CSV:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'
    
    // Check rate limit
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: 'Rate limited. Please try again in a few seconds.' },
        { status: 429 }
      )
    }
    
    const body = await request.json()
    
    // Validate input
    const validatedData = subscribeSchema.parse(body)
    const { email, source } = validatedData
    
    // Save to CSV fallback
    await saveToCSV(email, source)
    
    // TODO: Add email service provider integration here
    // Example:
    // if (process.env.MAILCHIMP_API_KEY) {
    //   await addToMailchimp(email, source)
    // }
    
    return NextResponse.json({ ok: true })
    
  } catch (error) {
    console.error('Subscribe error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: error.errors[0].message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { ok: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
