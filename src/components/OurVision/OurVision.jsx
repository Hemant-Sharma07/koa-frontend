import { FaStore, FaGlobe, FaBoxOpen, FaStar } from "react-icons/fa";
import { Button, TransparentBtn } from "../Atoms/AllButtons";

const OurVision = () => {
  const stats = [
    {
      id: 1,
      icon: <FaStore className="text-4xl text-orange-300" />,
      number: "200+",
      label: "Number of stores",
    },
    {
      id: 2,
      icon: <FaGlobe className="text-4xl text-orange-300" />,
      number: "2",
      label: "Countries",
    },
    {
      id: 3,
      icon: <FaBoxOpen className="text-4xl text-orange-300" />,
      number: "5000+",
      label: "Products",
    },
    {
      id: 4,
      icon: <FaStar className="text-4xl text-orange-300" />,
      number: "50",
      label: "Varieties of Premium dates",
    },
  ];
  return (
    <>
      <div className=" bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white p-4 md:px-10 md:py-10 mx-auto rounded-md">
        <div className="px-4 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-xl md:text-3xl font-bold leading-tight">
                  Our Vision: A Legacy of Quality and Excellence
                </h1>
              </div>

              <div className="space-y-6 text-md md:text-lg leading-relaxed text-orange-100">
                <p className="">
                  KOA Dry fruits and spices envisions becoming a leading global
                  choice regarding premium quality dry fruits and spices,
                  catering to the diverse needs of customers worldwide. KOA’s
                  main vision lies with finest quality, customer satisfaction
                  and sustainable growth.
                </p>
                <p>
                  KOA source finest quality of dry fruits and spices from origin
                  where they are grown in natural conditions like India, Iran,
                  Afghanistan and United States of America. The best quality
                  saffron from Pampore valley(Kashmir) is offered to our
                  customers in India.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button title="Shop Now" variant="white" />
                <TransparentBtn />
              </div>
            </div>

            {/* Right Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex justify-center mb-4">{item.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold text-orange-200 mb-2">
                    {item.number}
                  </div>
                  <div className="text-sm md:text-base text-orange-100">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurVision;
