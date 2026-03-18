import Link from 'next/link'
import Image from 'next/image'
import { type HeroBanner } from '@/lib/contentful'

type Props = { banner: HeroBanner }

export default function HeroBanner({ banner }: Props) {
    const imageUrl = banner.image

    return (
        <section className="relative w-full h-[500px] flex items-center">
            <div className="absolute inset-0 z-0">
                <Image
                    src={imageUrl}              // antes: "/hero.png"
                    alt={banner.title}          // antes: "Athlete background"
                    fill
                    className="object-cover brightness-[0.3]"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
            </div>

            <div className="container mx-auto px-4 z-10 relative text-white text-center flex flex-col items-center">
                <div className="max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6 leading-[0.9] uppercase">
                        {banner.title}            {/* antes: "shorts deportivos..." */}
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-300 mb-12 font-medium text-lg md:text-xl leading-relaxed">
                        {banner.subtitle}         {/* antes: "Tecnología avanzada..." */}
                    </p>
                    <div className="flex flex-wrap justify-center gap-6">
                        <Link href={banner.ctaPrimaryUrl} className="btn-premium bg-white text-black hover:bg-gray-100">
                            {banner.ctaPrimaryLabel}     {/* antes: "Comprar Ahora" */}
                        </Link>
                        <Link href={banner.ctaSecondaryUrl} className="btn-outline-premium">
                            {banner.ctaSecondaryLabel}   {/* antes: "Mis Pedidos" */}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}