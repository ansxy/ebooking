import { useState } from "react";

type Props = {};

const BackDrop: React.FC<Props> = () => {
  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50"></div>
    </>
  );
};
export default BackDrop;
