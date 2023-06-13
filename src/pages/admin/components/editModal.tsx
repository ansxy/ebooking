import { useState } from "react";
import axios from "axios";
interface User {
  id: String;
  email: String;
  role: String;
  name: String;
  amount: any;
  balance: any;
}

const EditModal: React.FC<User> = ({
  id,
  email,
  role,
  name,
  amount,
  balance,
}: User) => {
  const saveUser = async (e: React.MouseEvent<HTMLLabelElement>) => {
    await axios.put("http://localhost:3000/api/user/balance/editBalance", {
      id: id,
      amount: amount,
    });
  };
  return (
    <>
      <input type="checkbox" id="edit-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <div className="form-control">
            <label className="input-group">
              <span>Email</span>
              <input
                type="text"
                onChange={(e) => {
                  e.preventDefault();
                  email = e.currentTarget.value;
                }}
                placeholder="Enter New Email"
                className="input input-bordered"
                defaultValue={email.toString()}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="input-group">
              <span>Name</span>
              <input
                type="text"
                placeholder="Enter New Name"
                className="input input-bordered"
                onChange={(e) => {
                  e.preventDefault();
                  name = e.currentTarget.value;
                }}
                defaultValue={name.toString()}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="input-group">
              <span>Balance</span>
              <input
                type="text"
                disabled
                placeholder={`${amount === undefined ? "0" : amount}`}
                className="input input-bordered"
                defaultValue={balance}
              />
            </label>
          </div>

          <div className="form-control">
            <label className="input-group">
              <span>Amount</span>
              <input
                type="number"
                placeholder="Add Balance"
                className="input input-bordered"
                defaultValue="0"
                onChange={(e) => {
                  e.preventDefault();
                  amount = e.currentTarget.value;
                }}
              />
            </label>
          </div>
          <div className="modal-action">
            <label
              htmlFor="edit-modal"
              className="btn btn-success"
              onClick={saveUser}
            >
              Save
            </label>
            <label htmlFor="edit-modal" className="btn btn-error">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditModal;
