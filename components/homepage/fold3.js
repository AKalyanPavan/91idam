import Image from 'next/image';

import fold3image1 from '@/images/homepage/fold3image1.svg'
import fold3image2 from '@/images/homepage/fold3image2.svg'
import fold3image3 from '@/images/homepage/fold3image3.svg'
import fold3image4 from '@/images/homepage/fold3image4.png'

export default function Fold3() {
  const sellerCategories = [
    {
      id: 1,
      title: "Dealer",
      properties: "3000+ Properties",
      image: fold3image1,
      alt: "Dealer icon"
    },
    {
      id: 2,
      title: "Owner",
      properties: "3000+ Properties",
      image: fold3image2,
      alt: "Owner icon"
    },
    {
      id: 3,
      title: "Builder",
      properties: "3000+ Properties",
      image: fold3image3,
      alt: "Builder icon"
    }
  ];

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
      <div className="flex max-xl:flex-col items-top justify-between relative">
        {/* Left Content */}
        <div className="space-y-8 pt-20 sm:min-w-xl">
          {/* Heading */}
          <div className="space-y-4 max-xl:text-center text-white bg-background/5 backdrop-blur-sm rounded-[10px] z-1 relative mx-4">
            <div className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Plots/Land Posted by
            </div>
            <br className="max-xl:hidden" />
            <div className="text-xl font-medium leading-tight font-['Mongolian_Baiti']">
              Browse by Seller Category
            </div>
          </div>

          <div className="bg-white rounded-sm shadow-xl p-4 sm:p-6 lg:p-8 z-1 relative">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Choose Who&apos;s Selling
              </h2>
              <p className="text-lg text-gray-600">
                Discover Listings You&apos;ll Like
              </p>
            </div>
            
            {/* Seller Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {sellerCategories.map((category) => (
                <div key={category.id} className="group cursor-pointer">
                  <div className="bg-gray-50 hover:bg-gray-100 transition-colors duration-200 rounded-lg p-6 sm:p-8 text-center border border-gray-200 hover:border-gray-300">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 relative">
                        <Image
                          src={category.image}
                          alt={category.alt}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {category.properties}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div> 
        </div>

        {/* Right Content - 3D House Visualization */}
        <div className="w-full flex xl:justify-end justify-center absolute">
          <div className="max-w-[558px]">
            <Image
              src={fold3image4}
              alt="3D House Visualization"
              width="auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}