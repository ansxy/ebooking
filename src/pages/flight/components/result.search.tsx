import Layout from "@/layouts/layout";
import FlightCard from "./card.search";
interface data {
  data: [
    {
      id: string;
      from: string;
      destination: string;
      delayed_time: string;
      deparature_time: Date;
    }
  ];
}

const ResultSearch: React.FC<data> = ({ data }: data) => {
  return (
    <Layout>
      <div className="flex flex-col gap-16">
        <section className="h-[5rem] bg-white w-full drop-shadow-md rounded-t-md mt-10"></section>
        <section className="flex bg-white rounded-t-md">
          {data.map((item) => (
            <div key={item.id}>
              <FlightCard>{item.id}</FlightCard>
            </div>
          ))}
        </section>
      </div>
    </Layout>
  );
};

export default ResultSearch;
