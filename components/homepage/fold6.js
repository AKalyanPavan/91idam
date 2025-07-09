const Fold6 = () => {
  const cities = [
    {
      id: 1,
      name: "Delhi",
      properties: "15,000+ Properties",
      image: "https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/7e47f3ecffd0d65076e64a6b1f1f12ca0a3c936d.png"
    },
    {
      id: 2,
      name: "Mumbai", 
      properties: "15,000+ Properties",
      image: "https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/dcae0469056a0c4d221aaaf4e520de25d84a7f31.png"
    },
    {
      id: 3,
      name: "Bangalore",
      properties: "15,000+ Properties", 
      image: "https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/c93c67184ff554ca37fb7cd91f6cd073d22e33e2.png"
    },
    {
      id: 4,
      name: "Hyderabad",
      properties: "15,000+ Properties",
      image: "https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/a75dff7e5e33730f25de81b8cbc09716356220c5.png"
    },
    {
      id: 5,
      name: "Chennai", 
      properties: "15,000+ Properties",
      image: "https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/9e077fcb22a2ee4dcd958780ac07a35f86284c44.png"
    },
    {
      id: 6,
      name: "Pune",
      properties: "15,000+ Properties",
      image: "https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/3c8da4da6576b1c86a577e46e4b20a6b5165fb4b.png"
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-base mb-4" style={{ color: 'rgb(103, 119, 136)', fontFamily: 'Mongolian Baiti', textTransform: 'uppercase' }}>
            Cities You&apos;ll Love
          </p>
          <h2 className="font-semibold text-3xl lg:text-4xl mb-4" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Montserrat' }}>
            Choose Plots in India&apos;s Most Popular Cities
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map(city => (
            <CityCard key={city.id} {...city} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CityCard = ({ name, properties, image }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-60 object-cover rounded-t-lg"
        />
      </div>
      
      <div className="p-6">
        <h3 className="font-semibold text-xl mb-2" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Montserrat' }}>
          {name}
        </h3>
        <p className="text-base" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Mongolian Baiti' }}>
          {properties}
        </p>
      </div>
    </div>
  );
};

export default Fold6;