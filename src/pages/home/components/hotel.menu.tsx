import { Listbox, Transition } from "@headlessui/react";
import { MdOutlineBedroomChild, MdFlightLand, MdSearch } from "react-icons/md";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import Datepicker from "react-tailwindcss-datepicker";
import { Fragment, useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";

interface Props {
  data: [
    {
      id: any;
      name: String;
      city: String;
    }
  ];
}

const HotelMenu: React.FC<Props> = ({ data }: Props) => {
  const router = useRouter();
  const [day, setDay] = useState<number>(1);
  const [value, setValue] = useState({
    startDate: "",
    endDate: "",
  });
  const [fromTo, setFromTo] = useState({
    from: null,
    to: null,
  });

  const date = dayjs();
  const handleDateChange = (e: any) => {
    setValue(e);
  };

  const handleSearch = (e: any) => {
    router.push(
      `/room/search?city=${fromTo.from}&date=${value?.startDate}&duration=${day}`
    );
  };

  const increment = (e: any) => {
    setDay(function (day) {
      return (day += 1);
    });
  };

  const decrement = (e: any) => {
    setDay(function (day) {
      if (day > 0) {
        return (day -= 1);
      } else {
        return (day = 0);
      }
    });
  };

  return (
    <>
      <section className=" flex flex-row gap-10">
        <div className="w-full">
          <label htmlFor="">City</label>
          <div className="relative border-2 p-2 rounded-lg border-gray-500 items-center w-full ">
            <Listbox
              value={fromTo.from}
              onChange={(e) =>
                setFromTo({
                  ...fromTo,
                  from: e,
                })
              }
            >
              <span className="flex flex-row">
                <MdOutlineBedroomChild size={30} color={"black"} />
                <Listbox.Button className={`text-black ml-5`}>
                  {fromTo.from ? fromTo.from : "Select Your City"}
                </Listbox.Button>
              </span>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-30 mt-4 mx-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {data.map((hotel) => (
                    <Listbox.Option
                      key={hotel.id}
                      value={hotel.city}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                    >
                      {hotel.city}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </div>
        </div>
      </section>
      <section className="w-full grid grid-cols-3 gap-4 ">
        <div className="">
          <label htmlFor="datapicker">Check-In</label>
          <Datepicker
            minDate={new Date()}
            maxDate={date.add(14, "day").toDate()}
            displayFormat={"DD/MM/YYYY"}
            placeholder={"Pilih Tanggal"}
            toggleClassName="dark:bg-gray-500 rounded-r-lg"
            inputClassName=" border-2 border-gray-500 dark:text-black"
            primaryColor={"teal"}
            asSingle={true}
            value={value}
            onChange={handleDateChange}
          />
        </div>
        {/* On It */}
        <div className="">
          <div className="form-control h-full ">
            <label htmlFor="duration">Duration</label>
            <label className="input-group flex flex-row ">
              <CgMathMinus
                onClick={decrement}
                size={42}
                className="bg-gray-600 cursor-pointer"
              ></CgMathMinus>
              <input
                type="number"
                placeholder="10"
                value={day}
                className="input input-bordere h-full w-[4rem] text-white"
              />
              <CgMathPlus
                onClick={increment}
                size={42}
                className="bg-gray-600 cursor-pointer"
              ></CgMathPlus>
            </label>
          </div>
          {/* <div className="relative border-2 rounded-lg border-gray-500 items-center flex flex-row justify-between">
            <CgMathMinus onClick={decrement} ></CgMathMinus>
            <h1>{day}</h1>
            <CgMathPlus onClick={increment}></CgMathPlus>
          </div> */}
        </div>
        <div className="">
          <label htmlFor="checkout">Check-Out</label>
          <h1 className="">Fri,19 May 2023</h1>
        </div>
      </section>
      <section className="w-full">
        <div className="flex flex-row-reverse">
          <button className="btn" onClick={handleSearch}>
            <MdSearch size={30} />
            <p>Search Flight</p>
          </button>
        </div>
      </section>
    </>
  );
};

export default HotelMenu;
