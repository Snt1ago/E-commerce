import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const secret = req.headers.get('x-contentful-webhook-secret')

    if (secret !== process.env.CONTENTFUL_WEBHOOK_SECRET) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const contentType = body?.sys?.contentType?.sys?.id as string

    const pathMap: Record<string, string[]> = {
        product: ['/products', '/producto'],
        heroBanner: ['/'],
        category: ['/products'],
    }

    const paths = pathMap[contentType] ?? ['/']
    paths.forEach(path => revalidatePath(path))

    return NextResponse.json({ revalidated: true, paths })
}