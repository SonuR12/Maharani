'use client'

import { useState } from 'react'
import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
export default function ProductGallery({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState(0)
  return (
    <div className="flex gap-2">
      <div className="flex flex-col gap-2 mt-8 hidden sm:block">
        {images.map((image, index) =>
          <button
            key={index}
            onClick={() => {
              setSelectedImage(index)
            }}
            onMouseOver={() => {
              setSelectedImage(index)
            }}
            className={`bg-white rounded-lg overflow-hidden ${selectedImage ===
            index
              ? 'ring-2 ring-blue-500'
              : 'ring-1 ring-gray-300 '}`}
          >
            <Image src={image} alt={'product image'} width={48} height={48} />
          </button>
        )}
      </div>

      <div className="w-full my-10 flex flex-col items-center sm:inline-block">
        <Zoom>
          <div className="relative h-[400px] w-[42vw] sm: md:w-auto sm:h-[500px] flex items-center justify-center mx-auto">
            <Image
              src={images[selectedImage]}
              alt="product image"
              fill
              sizes="full"
              className="object-cover !h-full"
              priority
            />
          </div>
        </Zoom>

        {/* Thumbnail Navigation */}
        <div className="flex items-center justify-center gap-2 mt-8 block sm:hidden">
          {images.map((image, index) =>
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              onMouseOver={() => setSelectedImage(index)}
              className={`bg-white rounded-lg overflow-hidden ${selectedImage ===
              index
                ? 'ring-2 ring-blue-500 h-28'
                : 'ring-1 ring-gray-300 h-28'}`}
            >
              <Image
                src={image}
                className="!h-full object-cover py-1"
                alt="product image"
                width={48}
                height={48}
              />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
