interface Props {}

const SearchBarUser: React.FC<Props> = () => {
  return (
    <div className="flex gap-8 flex-col">
      <div className="text-black">
        <h1 className="text-5xl font-bold">Users</h1>
        <p>A list of users retrieved from a Postgresql database </p>
      </div>
      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search…"
            className="input input-bordered"
          />
          <button className="btn btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBarUser;
