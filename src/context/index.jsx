import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParams, setSearchParams] = useState("");
    const [loading, setLoading] = useState(false);
    const [recipeList, setRecipeList] = useState([]);
    const [recipeDetailsData, setRecipeDetailsData] = useState(null)
    const [favoritesList, setFavoritesList] = useState([])

    const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault();
    try {
        
      const res = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParams}`
      );
      const data = await res.json();
        if (data?.data?.recipes) {
          setRecipeList(data?.data?.recipes);
          setLoading(false);
          setSearchParams("");
          navigate("/")
        }
      console.log(data);
    } catch (e) {
      console.log(e);
        setLoading(false);
        setSearchParams("");
    }
  }

  function handleAddToFavorite(getCurrentItem) {
    let cpyFavoritesList = [...favoritesList];
    const index = cpyFavoritesList.findIndex(item=> item.id === getCurrentItem.id)

    if(index === -1) {
      cpyFavoritesList.push(getCurrentItem)
    } else {
      cpyFavoritesList.splice(index)
    }
    setFavoritesList(cpyFavoritesList)
  }

  return (
    <GlobalContext.Provider
      value={{ searchParams, setSearchParams, handleSubmit, loading, recipeList, recipeDetailsData, setRecipeDetailsData, handleAddToFavorite, favoritesList}}
    >
      {children}
    </GlobalContext.Provider>
  );
}
