import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const secret = searchParams.get('secret')
    const slug = searchParams.get('slug')

    if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    if (!slug) {
        return NextResponse.json({ message: 'Missing slug' }, { status: 400 })
    }

    const draft = await draftMode()
    draft.enable()

    const baseUrl = req.headers.get('x-forwarded-host')
        ? `https://${req.headers.get('x-forwarded-host')}`
        : 'http://localhost:3000'

    if (slug === 'hero-banner') {
        return NextResponse.redirect(`${baseUrl}/`)
    }

    return NextResponse.redirect(`${baseUrl}/producto/${slug}`)
}