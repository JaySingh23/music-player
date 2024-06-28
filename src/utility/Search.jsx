import { IoIosSearch } from "react-icons/io";
function Search({searchTerm, onSearchChange}) {
  return (
    <label className="relative block pl-4 mt-3">
        <span className="sr-only">Search</span>
        <div className="flex items-center bg-button-color rounded-md p-3 shadow-sm h-10 w-4/5 ">
        <input
          className="placeholder-italic placeholder-slate-300 block bg-transparent w-full focus:outline-none text-slate-100"
          placeholder="Search Song, Artist"
          type="text"
          name="search"
          value={searchTerm}
          onChange={onSearchChange}
        />
        <div className="p-2">
          <IoIosSearch className="h-6 w-6 text-slate-300" />
        </div>
      </div>
    </label>
  )
}

export default Search