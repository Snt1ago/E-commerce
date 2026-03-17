import { createClient } from 'contentful'
import { Document } from '@contentful/rich-text-types'

export const contentfulClient = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
})

export const contentfulPreviewClient = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!,
    host: 'preview.contentful.com',
})

export type HeroBanner = {
    title: string
    subtitle: string
    ctaPrimaryLabel: string
    ctaPrimaryUrl: string
    ctaSecondaryLabel: string
    ctaSecondaryUrl: string
    image: { fields: { file: { url: string; details: { image: { width: number; height: number } } } } }
}

// Tipo alineado con los campos que usa el template
export type Product = {
    id: string
    name: string
    slug: string
    price: number
    brand: string
    sport: string
    gender: string
    images: string[] // URLs ya procesadas con https:
}


export type ProductDetail = {
    id: string
    name: string
    slug: string
    price: number
    brand: string
    sport: string
    gender: string
    images: string[]
    sizes: string[]
    colors: string[]
    rating: number
    description: Document
}

type Filters = {
    q?: string
    brand?: string
    sport?: string
}

export async function getProducts(filters: Filters = {}): Promise<Product[]> {
    const query: Record<string, string> = {
        content_type: 'product',
    }


    // Filtros nativos de Contentful API
    if (filters.brand) query['fields.brand'] = filters.brand
    if (filters.sport) query['fields.sport'] = filters.sport
    if (filters.q) query['query'] = filters.q

    const res = await contentfulClient.getEntries(query)

    return res.items.map((item: any) => ({
        id: item.sys.id,
        name: item.fields.name,
        slug: item.fields.slug,
        price: item.fields.price,
        brand: item.fields.brand ?? '',
        sport: item.fields.sport ?? '',
        gender: item.fields.gender ?? '',
        images: (item.fields.images ?? [])
            .map((img: any) => img?.fields?.file?.url ? `https:${img.fields.file.url}` : null)
            .filter(Boolean) as string[],
    }))
}

export async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
    const query: Record<string, any> = {
        content_type: 'product',
        'fields.slug': slug,
        limit: 1,
    }
    const res = await contentfulClient.getEntries(query)
    if (!res.items.length) return null
    const item = res.items[0] as any
    return {
        id: item.sys.id,
        name: item.fields.name,
        slug: item.fields.slug,
        price: item.fields.price,
        brand: item.fields.brand ?? '',
        sport: item.fields.sport ?? '',
        gender: item.fields.gender ?? '',
        images: (item.fields.images ?? [])
            .map((img: any) => img?.fields?.file?.url ? `https:${img.fields.file.url}` : null)
            .filter(Boolean) as string[],
        sizes: item.fields.sizes ?? [],
        colors: item.fields.colors ?? [],
        rating: item.fields.rating ?? 4.5,
        description: item.fields.description ?? null,
    } as ProductDetail
}

export async function getHeroBanner(): Promise<HeroBanner | null> {
    const res = await contentfulClient.getEntries<{ contentTypeId: 'heroBanner'; fields: HeroBanner }>({
        content_type: 'heroBanner',
        limit: 1,
    })
    if (!res.items.length) return null
    return res.items[0].fields
}