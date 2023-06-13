import Layout from "@/layouts/layout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import FailSearch from "../components/fail.search";
import ResultSearch from "../components/result.search";

interface Props {
  data: any;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const res = await fetch(
    `http://localhost:3001/flights/flight/search-flight?from=${context.query.from}&to=${context.query.to}&date=${context.query.date}`
  );
  const data: Props[] = await res.json();
  return {
    props: {
      data: data,
    },
  };
};

const Search: React.FC<any> = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      {data.status === "fail" ? (
        <FailSearch></FailSearch>
      ) : (
        <ResultSearch data={data.data}></ResultSearch>
      )}
    </Layout>
  );
};

export default Search;
