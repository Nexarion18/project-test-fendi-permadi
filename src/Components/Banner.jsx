import { useEffect, useState } from "react";

const Banner = ({ title, subtitle }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => setOffsetY(window.scrollY);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // disini saya melakukan Simulasi seolah API selalu gagal karena api untuk banner belum ada
    const fetchImage = async () => {
      setImageUrl(null);
    };

    fetchImage();
  }, []);

  const finalImage = imageUrl || `https://placehold.co/1200x600/E0E0E0/333333?text=No+Image`;

  return (
    <section className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-cover transition-transform duration-200"
        style={{
          backgroundImage: `url(${finalImage})`,
          clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 100%)",
          transform: `translateY(${offsetY * 0.3}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gray-400 bg-opacity-40" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-white h-full text-center px-4">
        <h1
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{
            transform: `translateX(${offsetY * 0.5}px)`,
            transition: "transform 0.2s ease-out",
          }}
        >
          {title}
        </h1>
        <p
          className="text-base md:text-lg"
          style={{
            transform: `translateX(-${offsetY * 0.5}px)`,
            transition: "transform 0.2s ease-out",
          }}
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default Banner;
