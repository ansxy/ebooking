import React from "react";
import { useState, useContext } from "react";
import { MdAirplanemodeActive, MdHotel } from "react-icons/md";
import FlightMenu from "./components/flight.menu";
import { GetStaticProps } from "next";
import axios from "axios";
import HotelMenu from "./components/hotel.menu";

interface Props {
  data: [
    {
      id: any;
      destination: String;
      from: String;
    }
  ];
  data2: [
    {
      id: any;
      name: String;
      city: String;
    }
  ];
  error?: String;
}
const Index: React.FC<any> = ({ data, data2, error }: Props) => {
  console.log(data2);
  const [isOpen, setIsOpen] = useState<Boolean | null>(false);
  const [toggle, setToggle] = useState<Boolean | null>(true);

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <section className="h-96 w-full bg-gradient-to-b from-blue-500 to-blue-300 relative">
          {/* <Splash /> */}
        </section>
        <section className="w-[55%] relative" onClick={() => setIsOpen(true)}>
          <div className="w-full flex flex-row  h-[25rem] bg-white absolute -top-14 z-40 drop-shadow-lg rounded-md">
            <div className="w-[20%] p-5 h-full flex flex-col justify-between">
              <div className="bg-black h-[50%] flex justify-center items-center hover:invert">
                <MdAirplanemodeActive
                  size={70}
                  className="text-white"
                  onClick={() => setToggle(true)}
                />
              </div>
              <div className="bg-gray-500 h-[50%] flex justify-center items-center hover:invert">
                <MdHotel
                  size={70}
                  className="text-white"
                  onClick={() => setToggle(false)}
                />
              </div>
            </div>
            <div className="divider divider-horizontal"></div>
            {toggle ? (
              <div className="flex grow p-5 flex-col gap-10">
                <FlightMenu data={data} />
              </div>
            ) : (
              <div className="flex grow p-5 flex-col gap-10">
                <HotelMenu data={data2} />
              </div>
            )}
          </div>
        </section>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  try {
    const response = await axios.get("http://localhost:3001/flights");
    const hotelResponse = await axios.get("http://localhost:3002/hotels");
    return {
      props: {
        data: response.data.data,
        data2: hotelResponse.data.data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: [],
        data2: [],
      },
    };
  }
};

export default Index;
