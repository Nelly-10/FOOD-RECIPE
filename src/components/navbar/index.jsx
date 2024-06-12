import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context";

export default function Navbar() {
    const {searchParams, setSearchParams, handleSubmit} = useContext(GlobalContext);

    console.log(searchParams)

  return (
    <nav className="flex justify-between item-center py-8 container mx-auto flex-col lg:flex-row gap lg:gap-0">
      <h2 className="text-2xl font-semibold">Food Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="search"
          value={searchParams}
          onChange={(event)=> setSearchParams(event.target.value)}
          placeholder="Enter Items..."
          className="bg-white/75 p-3 px-8 rounded-full outline-none lg:w-96 shadow-lg shadow-red-100 focus:shadow-red-200"
        />
      </form>
      <ul className="flex gap-5">
        <li>
          <NavLink
            to={"/"}
            className="text-black hover:text-gray-700 duration-300"
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to={"/favorites"}
            className="text-black hover:text-gray-700 duration-300"
          >
            Favorite
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
