import axios from "axios";
import { useState, useEffect } from "react";
import EditModal from "./editModal";
interface Props {
  data: [
    {
      id: string;
      email: string;
      role: string;
      name: string;
      amount: any;
      balance: BigInt;
    }
  ];
}

const TableUser: React.FC<Props> = ({ data }: Props) => {
  const [users, setUsers] = useState<any>(data);
  const [user, setUser] = useState<any>(data[0]);
  const deleteUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUsers(data.filter((item) => item.email !== e.currentTarget.value));
    await axios.delete("http://localhost:3000/api/user", {
      data: {
        email: e.currentTarget.value,
      },
    });
  };

  const temp = async (e: React.MouseEvent<HTMLLabelElement>) => {
    setUser(data[parseInt(e.currentTarget.id)]);
  };
  return (
    <>
      <EditModal
        id={user.id}
        email={user.email}
        role={user.role}
        name={user.name}
        amount={user.amount}
        balance={user.balanace}
      ></EditModal>
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
          {users?.map((item: any, i: any) => (
            <tr key={i}>
              <th>{i}</th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.balance === null ? 0 : item.balance.amount}</td>
              <td>{item.role}</td>
              <td className="flex w-full gap-10">
                <button
                  className="btn btn-warning"
                  onClick={deleteUser}
                  value={item.email}
                >
                  Hapus
                </button>
                <label
                  htmlFor="edit-modal"
                  onClick={temp}
                  className="btn btn-info"
                  id={i}
                >
                  Edit
                </label>
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
    </>
  );
};

export default TableUser;
