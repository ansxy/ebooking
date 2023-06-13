import Layout from "@/layouts/layout";
import FailSearch from "@/pages/flight/components/fail.search";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import ResultRoom from "../components/resultRoom.search";

interface Props {
  data: any;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const res = await fetch(
    `http://localhost:3002/hotels/hotel/search-hotel?city=${context.query.city}&date=${context.query.date}`
  );
  const data: Props[] = await res.json();
  return {
    props: {
      data: data,
    },
  };
};

const SearchRoom: React.FC<any> = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      {data.status === "fail" ? (
        <>
          <FailSearch></FailSearch>
        </>
      ) : (
        <ResultRoom data={data.data}></ResultRoom>
      )}
    </Layout>
  );
};

export default SearchRoom;
