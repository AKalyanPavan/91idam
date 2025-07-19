import Image from 'next/image';

const Fold4 = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-base mb-4" style={{ color: 'rgb(103, 119, 136)', fontFamily: 'Mongolian Baiti', textTransform: 'uppercase' }}>
            Do you have land for sale?
          </p>
          <h2 className="font-semibold text-3xl lg:text-4xl mb-4" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Montserrat' }}>
            List Your Land for Sale on 91 IDAM
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center lg:justify-items-end">
          {/* Left Content */}
          <div className="bg-white rounded-lg shadow-lg p-8 lg:w-fit max-lg:mx-auto">
            <div className="mb-8">
              <p className="text-base mb-4" style={{ color: 'rgb(103, 119, 136)', fontFamily: 'Mongolian Baiti', textTransform: 'uppercase' }}>
                Add Your Property
              </p>
              <h3 className="font-semibold text-xl mb-4" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Montserrat' }}>
                Want to Find Land Buyers?
              </h3>
              <p className="text-base mb-8" style={{ color: 'rgb(103, 119, 136)', fontFamily: 'Mongolian Baiti' }}>
                Sell out your property—fast & easy
              </p>
              
              <button 
                className="px-8 py-3 rounded-md font-semibold text-white text-base"
                style={{ backgroundColor: 'rgb(23, 89, 115)', fontFamily: 'Montserrat' }}
              >
                List Your Property Free
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <Image 
              src="https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/3920cf718b6b33916c6db37b337df8dfe33265d1.png"
              alt="Property showcase"
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fold4;