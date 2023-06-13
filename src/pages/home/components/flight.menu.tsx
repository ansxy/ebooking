import { Listbox, Transition } from "@headlessui/react";
import { MdFlightTakeoff, MdFlightLand, MdSearch } from "react-icons/md";
import Datepicker from "react-tailwindcss-datepicker";
import { Fragment, useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";

interface Props {
  data: [
    {
      id: any;
      destination: String;
      from: String;
    }
  ];
}

const FlightMenu: React.FC<Props> = ({ data }: Props) => {
  const router = useRouter();
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
      `/flight/search?from=${fromTo.from}&to=${fromTo.to}&date=${value?.startDate}`
    );
  };

  return (
    <>
      <section className=" flex flex-row gap-10">
        <div>
          <label htmlFor="">From</label>
          <div className="relative border-2 p-2 rounded-lg border-gray-500 items-center w-[20rem] ">
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
                <MdFlightTakeoff size={30} color={"black"} />
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
                  {data.map((flight) => (
                    <Listbox.Option
                      key={flight.id}
                      value={flight.from}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                    >
                      {flight.from}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </div>
        </div>
        <div>
          <label htmlFor="">To</label>
          <div className="border-2 p-2 rounded-lg border-gray-500 relative items-center w-[20rem]">
            <Listbox
              value={fromTo.to}
              onChange={(e) =>
                setFromTo({
                  ...fromTo,
                  to: e,
                })
              }
            >
              <span className="flex flex-row">
                <MdFlightLand size={30} color={"black"} />
                <Listbox.Button className={`text-black ml-5`}>
                  {fromTo.to ? fromTo.to : "Select Your Destination"}
                </Listbox.Button>
              </span>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-30 mt-4 mx-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {data.map((flight) => (
                    <Listbox.Option
                      key={flight.id}
                      value={flight.destination}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                    >
                      {flight.destination}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </Listbox>
          </div>
        </div>
      </section>
      <section className="w-full">
        <div className="w-1/2">
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

export default FlightMenu;
