interface data {
  room_type: String;
  price_per_night: String;
  room_number: number;
}

const DetailRoom: React.FC<data> = ({
  room_number,
  price_per_night,
  room_type,
}: data) => {
  console.log(room_number);
  return <></>;
};

export default DetailRoom;
