import Image from "next/image";
import splash from "../../../../public/image/splash1.jpg";

const Splash: React.FC = () => {
  return (
    <>
      <Image
        src={splash}
        alt="Splash1"
        fill
        style={{
          objectFit: "cover",
        }}
      />
    </>
  );
};

export default Splash;
