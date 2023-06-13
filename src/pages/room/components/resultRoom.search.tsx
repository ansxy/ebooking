import CardRoom from "./roomCard.search";

interface data {
  data: [
    {
      id: String;
      name: String;
      address: String;
      description: String;
      rooms: any;
    }
  ];
}

const ResultRoom: React.FC<data> = ({ data }: data) => {
  return (
    <div className="grid grid-rows-4 mt-[10rem] gap-5">
      <div>
        <CardRoom data={data}></CardRoom>
      </div>
      {/* <div>
        <CardRoom data={data}></CardRoom>
      </div> */}
      {/* {data.map((room) => (
                
            ))} */}
    </div>
  );
};

export default ResultRoom;
