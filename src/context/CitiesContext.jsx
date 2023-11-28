/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";
const CitiesProvider = createContext();
const BASE_URL = "http://localhost:8000";

function reducer(state, action) {
  switch (action.type) {
    case "cities/loaded":
      return { ...state, cities: action.payload };
    case "finally":
      return { ...state, loading: false };
    case "loading":
      return { ...state, loading: true };
    case "currentCity/view":
      return { ...state, currentCity: action.payload };
    case "currentCity/add":
      return {
        ...state,
        cities: [...state.cities, action.payload],
      };
    case "currentCity/delete":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
  }
}

const initialState = {
  cities: [],
  loading: false,
  currentCity: {},
};

function CitiesContext({ children }) {
  const [{ cities, loading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function getCountry() {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities`);
      const data = await res.json();
      dispatch({ type: "cities/loaded", payload: data });
    } catch (error) {
      alert("There is some error fetcing data");
    } finally {
      dispatch({ type: "finally" });
    }
  }

  useEffect(() => {
    getCountry();
  }, []);

  async function getCurrentCity(id) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      // setCurrentCity(data);
      dispatch({ type: "currentCity/view", payload: data });
    } catch (error) {
      alert("There is some error fetcing data");
    } finally {
      dispatch({ type: "finally" });
    }
  }

  async function createnewCity(newCity) {
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Sorry da thambhi");
      const data = await res.json();

      // setCities((city) => [...city, data]);
      dispatch({ type: "currentCity/add", payload: data });
    } catch (error) {
      console.log(error.message);
    }
  }

  async function deleteCity(id) {
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Spmething went wrong");
      console.log(res);
      // setCities((cities) => cities.filter((city) => city.id !== id));

      dispatch({ type: "currentCity/delete", payload: id });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <CitiesProvider.Provider
      value={{
        cities,
        loading,
        currentCity,
        getCurrentCity,
        createnewCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesProvider.Provider>
  );
}

export function useCitiesContext() {
  const context = useContext(CitiesProvider);

  return context;
}

export default CitiesContext;
