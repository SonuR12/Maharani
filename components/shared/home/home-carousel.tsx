'use client'

import * as React from 'react'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { ICarousel } from '@/types'

export function HomeCarousel({ items }: { items: ICarousel[] }) {
  const pluginRef = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false }) // ✅ Changed stopOnInteraction to false
  )

  const t = useTranslations('Home')

  return (
    <Carousel
      dir="ltr"
      opts={{ loop: true }}
      plugins={[pluginRef.current]}
      className="w-full mx-auto mt-[3.3rem] md:-mt-1"
      onMouseEnter={() => pluginRef.current.stop()} // ✅ Stops autoplay on hover
      onMouseLeave={() => pluginRef.current.play()} // ✅ Resumes autoplay when mouse leaves
    >
      <CarouselContent>
        {items.map(item =>
          <CarouselItem
            key={item.title}
            className="mt-2 sm:aspect-auto w-screen"
          >
            <Link href={item.url}>
              <div
                className="flex aspect-[12/6] h-full lg:h-[65vh] w-full items-center justify-center p-6 relative bg-no-repeat bg-cover"
                style={{
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: 'cover' // ✅ Ensures the background image covers the entire container
                }}
              >
                {/* <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="!object-contain !w-full !h-full"
                  priority
                /> */}
                <div className="absolute w-1/3 left-7 sm:left-16 md:left-32 top-1/2 transform -translate-y-1/2">
                  <h2
                    className={cn(
                      'text-xl md:text-6xl font-bold mb-4 text-primary'
                    )}
                  >
                    {t(`${item.title}`)}
                  </h2>
                  <Button className="hidden md:block">
                    {t(`${item.buttonCaption}`)}
                  </Button>
                </div>
              </div>
            </Link>
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious className="left-0 md:left-12" />
      <CarouselNext className="right-0 md:right-12" />
    </Carousel>
  )
}
