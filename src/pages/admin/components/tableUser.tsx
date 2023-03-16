import axios from "axios";
import { useState, useEffect } from "react";
interface Props {
  data: [
    {
      id: string;
      email: string;
      role: string;
      name: string;
    }
  ];
}

const TableUser: React.FC<Props> = ({ data }: Props) => {
  const [user, setUser] = useState<any>(data);
  const deleteUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUser(data.filter((item) => item.email !== e.currentTarget.value));
    await axios.delete("http://localhost:3000/api/user", {
      data: {
        email: e.currentTarget.value,
      },
    });
  };

  return (
    <div className="">
      <table className="table table-compact w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Balance</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {user?.map((item: any, i: any) => (
            <tr key={i}>
              <th>{i}</th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.balance === null ? 0 : item.balance}</td>
              <td>{item.role}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={deleteUser}
                  value={item.email}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th colSpan={2}>
              <div className="btn-group">
                <button className="btn">1</button>
                <button className="btn btn-active">2</button>
                <button className="btn">3</button>
                <button className="btn">4</button>
              </div>
            </th>
            <th></th>
            <th colSpan={2}>
              <div className="btn-group grid grid-cols-2">
                <button className="btn btn-outline">Previous page</button>
                <button className="btn btn-outline">Next</button>
              </div>
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TableUser;
