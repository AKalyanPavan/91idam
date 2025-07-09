'use client'
import Image from 'next/image'
import fold1image1 from '@/images/homepage/fold1image1.png'
import PropertySearch from '@/components/homepage/property-search.js'

export default function Fold1() {

  return (
    <section className="relative bg-[#1759730d]">
      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="flex max-xl:flex-col items-top justify-between relative">
          
          {/* Left Content */}
          <div className="space-y-8 pt-20 sm:min-w-xl">
            {/* Heading */}
            <div className="space-y-4 text-center bg-background/5 backdrop-blur-sm rounded-[10px] z-1 relative mx-4">
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1E2022] leading-tight">
                Land you&apos;ll love.
              </span>
              <br className="max-xl:hidden" />
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold sm:text-[#B59327] text-white leading-tight">
                A place to start.
              </span>
            </div>
            <PropertySearch />
          </div>

          {/* Right Content - 3D House Visualization */}
          <div className="w-full flex xl:justify-end justify-center absolute">
            <div className="max-w-[558px]">
              <Image
                src={fold1image1}
                alt="3D House Visualization"
                width="auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}