import Image from "next/image";
import ticket from "../../../../public/image/ticket.png";
const Card: React.FC = () => {
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl image-full">
        <figure>
          <Image src={ticket} alt="ticket" />
        </figure>
        <div className="card-body flex justify-center items-center">
          <h2 className="card-title">Baliikpapapn Jakarta</h2>
          <p>lorem ipsum</p>
        </div>
      </div>
    </>
  );
};

export default Card;
