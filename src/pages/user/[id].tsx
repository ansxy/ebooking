import Layout from "@/layouts/layout";
import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Card from "./components/card.transaction";
import NullData from "./components/null";

interface Props {
  data: any;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const res = await fetch(
    `http://localhost:3000/api/user/transaction/${context.query.id}`
  );
  const data: Props[] = await res.json();
  return {
    props: {
      data: data,
    },
  };
};

const Index: React.FC<any> = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      {data.data !== null ? <NullData></NullData> : <Card></Card>}
    </Layout>
  );
};

export default Index;
