import Layout from "@/layouts/layout";
import SearchBarUser from "./components/searchUser";
import TableUser from "./components/tableUser";
import { InferGetStaticPropsType, GetStaticProps } from "next";

interface Props {
  data: any;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/user", {
      method: "GET",
    });
    const data: Props[] = await res.json();
    return {
      props: {
        data: data,
      },
      revalidate: 10,
    };
  } catch (error) {
    return {
      props: {
        data: [],
      },
    };
  }
};

const Index: React.FC<any> = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(data);
  return (
    <Layout>
      <div className="flex flex-col gap-y-8">
        <title>Admin Dashboard</title>
        <SearchBarUser />
        <TableUser data={data.data} />
      </div>
    </Layout>
  );
};

export default Index;
