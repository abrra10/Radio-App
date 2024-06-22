import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
const { createContext, useState, useEffect } = require("react");

export const FavoriteContext = createContext({
  favorite: [],
  addToFavorite: () => {},
  removeFromFavorite: () => {},
  checkFavorite: () => {},
});

export default function FavoriteContextProvider({ children }) {
  const [favorite, setFavorite] = useState([]);
  const [firstFetchDone, setFirstFetchDone] = useState(false);
  const [dataHasChanged, setDataHasChanged] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      const docRef = doc(db, "favorites", "my-favorite");
      const docSnap = await getDoc(docRef);

      setFavorite(docSnap.data().favorite || []);
      setFirstFetchDone(true);
    };
    fetchFavorites();
  }, []);

  useEffect(() => {
    const updateDB = async () => {
      await setDoc(doc(db, "favorites", "my-favorite"), { favorite });
    };

    if (!firstFetchDone) {
      return;
    }

    if (dataHasChanged) {
      updateDB();
    }
  }, [favorite]);

  const addToFavorite = (station) => {
    setFavorite((prev) => [...prev, station]);
    setDataHasChanged(true);
  };

  const removeFromFavorite = (id) => {
    setFavorite((prev) => prev.filter((station) => station.id !== id));
    setDataHasChanged(true);
  };

  const checkFavorite = (id) => {
    return favorite?.some((station) => station.id === id);
  };

  const context = {
    favorite,
    addToFavorite,
    removeFromFavorite,
    checkFavorite,
  };

  return (
    <FavoriteContext.Provider value={context}>
      {children}
    </FavoriteContext.Provider>
  );
}
