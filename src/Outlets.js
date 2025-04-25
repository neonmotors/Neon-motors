import React from 'react';

const outletData = [
  {
    name: 'CHANDA NAGAR',
    image: 'https://lh3.googleusercontent.com/p/AF1QipPbzMZ8k_OmNX6oUMYYD2azBNQayd1e3FeRu4wF=w426-h240-k-no',
    mapUrl:
      'https://www.google.com/maps?q=1st+Floor,+Survey+No.384,+Anri+Prime,+above+Ratnadeep+Supermarket,+Gangaram,+Serilingampally+Mandal+Chanda+Nagar+Hyderabad+Telangana+17.49480+78.32857&z=16',
  },
  {
    name: 'CHANDA NAGAR',
    image: 'https://lh3.googleusercontent.com/p/AF1QipPbzMZ8k_OmNX6oUMYYD2azBNQayd1e3FeRu4wF=w426-h240-k-no',
    mapUrl:
      'https://www.google.com/maps?q=1st+Floor,+Survey+No.384,+Anri+Prime,+above+Ratnadeep+Supermarket,+Gangaram,+Serilingampally+Mandal+Chanda+Nagar+Hyderabad+Telangana+17.49480+78.32857&z=16',
  },

  {
    name: 'CHANDA NAGAR',
    image: 'https://lh3.googleusercontent.com/p/AF1QipPbzMZ8k_OmNX6oUMYYD2azBNQayd1e3FeRu4wF=w426-h240-k-no',
    mapUrl:
      'https://www.google.com/maps?q=1st+Floor,+Survey+No.384,+Anri+Prime,+above+Ratnadeep+Supermarket,+Gangaram,+Serilingampally+Mandal+Chanda+Nagar+Hyderabad+Telangana+17.49480+78.32857&z=16',
  },



];

const Outlets = () => {
  return (
    <>
    <section className="container px-5 pt-10 pb-2 mx-auto">
      <div className="text-4xl md:text-5xl lg:px-0"> NeonMahindra-OUTLETS</div>

      <div className="grid grid-cols-1 gap-4 mt-5 mb-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 xl:gap-16">
        {outletData.map((outlet, index) => (
          <div
            key={index}
            className="w-full px-4 text-left py-6 hover:text-white shadow-xl shadow-[#b0b0b0] group duration-500 border-t rounded-3xl relative overflow-hidden"
          >
            <div className="bg-black h-32 w-36 duration-500 group-hover:h-[200%] group-hover:w-[200%] group-hover:-top-56 group-hover:-right-56 rounded-full absolute -top-20 -right-20 -z-10"></div>

            <div className="mb-4 text-xl font-medium uppercase sm:text-2xl lg:text-3xl">
              {outlet.name}
            </div>

            <a
              href={outlet.mapUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${outlet.name} Showroom`}
            >
              <div
                className="flex justify-center duration-500 bg-center h-52 lg:h-60 group-hover:saturate-200 rounded-3xl grayscale group-hover:grayscale-0"
                style={{
                  backgroundImage: `url("${outlet.image}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              ></div>
            </a>
          </div>
        ))}
      </div>
    </section>
    <section className="container px-5 pt-10 pb-2 mx-auto">
    <div className="text-4xl md:text-5xl lg:px-0"> NeonHyundai-OUTLETS</div>

    <div className="grid grid-cols-1 gap-4 mt-5 mb-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 xl:gap-16">
      {outletData.map((outlet, index) => (
        <div
          key={index}
          className="w-full px-4 text-left py-6 hover:text-white shadow-xl shadow-[#b0b0b0] group duration-500 border-t rounded-3xl relative overflow-hidden"
        >
          <div className="bg-black h-32 w-36 duration-500 group-hover:h-[200%] group-hover:w-[200%] group-hover:-top-56 group-hover:-right-56 rounded-full absolute -top-20 -right-20 -z-10"></div>

          <div className="mb-4 text-xl font-medium uppercase sm:text-2xl lg:text-3xl">
            {outlet.name}
          </div>

          <a
            href={outlet.mapUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${outlet.name} Showroom`}
          >
            <div
              className="flex justify-center duration-500 bg-center h-52 lg:h-60 group-hover:saturate-200 rounded-3xl grayscale group-hover:grayscale-0"
              style={{
                backgroundImage: `url("${outlet.image}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
          </a>
        </div>
      ))}
    </div>
  </section>
  </>
  );
};

export default Outlets;



