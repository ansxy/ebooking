import Image from "next/image";
import hotel from "../../../../public/image/hotel.jpg";
interface data {
  data: [
    {
      id: String;
      name: String;
      address: String;
      description: String;
      rooms: [
        {
          room_number: number;
          room_type: string;
        }
      ];
    }
  ];
}

const CardRoom: React.FC<data> = ({ data }: data) => {
  return (
    <>
      {data.map((room, index) => (
        <div
          tabIndex={index}
          key={index}
          className="collapse collapse-arrow flex flex-row card card-side bg-base-100 shadow-xl"
        >
          <figure className="w-1/2">
            <Image
              src={hotel}
              alt="hotel"
              style={{
                objectFit: "cover",
              }}
            />
          </figure>
          <div className="card-body">
            <h2 className="collapse-title card-title">{room.name}</h2>
            <p>{room.description}</p>
            {room.rooms.map((item) => (
              <>
                <a href="" className="collapse-content">
                  {item.room_type}
                </a>
              </>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default CardRoom;

{
  /* <div className="card card-side bg-base-100 shadow-xl">
  <figure><img src="/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie"/></figure>
  <div className="card-body">
    <h2 className="card-title">New movie is released!</h2>
    <p>Click the button to watch on Jetflix app.</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Watch</button>
    </div>
  </div>
</div> */
}
