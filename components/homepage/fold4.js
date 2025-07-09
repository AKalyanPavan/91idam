import { MapPin } from 'lucide-react';

const Fold4 = () => {
  const properties = [
    {
      id: 1,
      image: "https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/275a0daee60e09660ef4b047a9f00de52101fe0a.png",
      title: "Project 1"
    },
    {
      id: 2,
      image: "https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/610f374aa84820f15a2b30c0d21290a5815c4121.png",
      title: "Project 2"
    },
    {
      id: 3,
      image: "https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/b5239a76b6712c05e37b536b8c3bb8e5f3591146.png",
      title: "Project 3"
    },
    {
      id: 4,
      image: "https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/b5239a76b6712c05e37b536b8c3bb8e5f3591146.png",
      title: "Project 4"
    }
  ];

  return (
    <>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-semibold text-3xl lg:text-4xl mb-4" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Montserrat' }}>
              Trending Plot/Land Listings
            </h2>
            <p className="text-base" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Mongolian Baiti' }}>
              Discover Plots near you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {properties.map(property => (
              <PropertyCard
                key={property.id}
                image={property.image}
                title={property.title}
                type="project"
              />
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-semibold text-3xl lg:text-4xl mb-4" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Montserrat' }}>
              Recently added
            </h2>
            <p className="text-base" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Mongolian Baiti' }}>
              Handpicked Just for You
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {properties.map(property => (
              <PropertyCard
                key={property.id}
                image={property.image}
                type="land"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const PropertyCard = ({ image, title, type = "project" }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-60 object-cover rounded-t-lg"
        />
      </div>
      
      <div className="p-6">
        <h3 className="font-semibold text-lg mb-2" style={{ color: 'rgb(30, 32, 34)', fontFamily: 'Montserrat' }}>
          {type === "project" ? "Project name" : "Residential Land"}
        </h3>
        
        {type === "project" && (
          <div className="flex items-center font-semibold text-base mb-4" style={{ color: 'rgb(181, 147, 39)', fontFamily: 'Montserrat' }}>
            <MapPin className="w-4 h-4 mr-2" />
            <span>7.95L - 96.59L</span>
            <MapPin className="w-4 h-4 ml-4" />
          </div>
        )}
        
        {type === "land" && (
          <p className="text-base" style={{ color: 'rgb(103, 119, 136)', fontFamily: 'Mongolian Baiti' }}>
            City name
          </p>
        )}
      </div>
    </div>
  );
};

export default Fold4