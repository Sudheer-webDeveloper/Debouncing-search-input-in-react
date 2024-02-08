import "./App.css";

import React, { useEffect, useState } from "react";
import Cards from "./Cards";

const App = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoadiung] = useState(false);

  const debouncedFetchData = async (searchValue) => {
    setLoadiung(true);
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${searchValue}`
    );
    const data = await response.json();
    setData(data.products);
    setLoadiung(false);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  useEffect(() => {
    let timerId = setTimeout(() => {
      debouncedFetchData(value);
    }, 500);

    return () => clearTimeout(timerId);
  }, [value]);

  return (
    <section className="app">
      <h1>Debouncing In react</h1>
      <div className="input">
      <input
        type="text"
        placeholder="search here"
        value={value}
        onChange={handleChange}
      />

      </div>
      
      <Cards data={data} />
    </section>
  );
};

export default App;

/*

In the provided code, there are a few issues related to debouncing that need to be addressed. Let's go through them one by one and make the necessary changes:

1. **Move the fetching logic inside the debounced function:** In the `useEffect` hook, the logic for fetching data should be moved inside the debounced function to ensure that it's executed after the delay.

2. **Define the debounced function:** We need to define a debounced function that encapsulates the fetching logic and handles the debouncing.

3. **UseEffect dependency array:** The `useEffect` hook should have `[value]` in its dependency array to trigger the effect whenever the `value` state changes.

4. **Cleanup function:** Also, the cleanup function returned by `useEffect` should clear the timeout to avoid memory leaks.


Explanation of changes:

- **Moved fetching logic inside the debounced function:** The `debouncedFetchData` function now encapsulates the logic for fetching data from the API. It takes the `searchValue` as an argument and is called inside the `setTimeout` function in the `useEffect` hook.

- **Defined the debounced function:** The `debouncedFetchData` function is defined outside the `useEffect` hook to prevent unnecessary re-creation on each render.

- **Used useEffect dependency array:** The `useEffect` hook now has `[value]` in its dependency array, ensuring that the effect is triggered whenever the `value` state changes.

- **Added cleanup function:** The cleanup function returned by `useEffect` clears the timeout (`timerId`) to prevent memory leaks when the component unmounts or when `value` changes before the timeout expires.

*/
