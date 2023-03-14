import { useState, useEffect } from "react";
import axios from "axios";
import useSWR from 'swr'
// export const fetchUserByName = (username) => {
//   const [data, setData] = useState(undefined);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(username);
//       setData(response.data);
//     } catch (error) {
//       setError(error);
//       setLoading(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return { data, error, loading, fetchData };
// };



export const useUser = (url, id) => {
  const [requestData, setRequestData] = useState({});
  const { data, error, isLoading } = useSWR(`${url}${id}`)
  useEffect(() => {
    fetch(`https://api.github.com/rate_limit`)
      .then(response => response.json())
      .then(json => {
        setRequestData(json);
        console.log(json);
        // setRateLimit(json.resources.core);
        // if (json.resources.core.remaining < 1) {
        //     setError({ active: true, type: 403 });
        // }
      });

  }, [data])
  console.log(`hook now being call`)
  return {
    userSWR: data,
    isLoading,
    isError: error,
    request: requestData
  }

}

const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'blue',
  'cyan',
  'purple',
  'pink',
];

export const colours = [
  '#FC8181',
  '#F6AD55',
  '#D69E2E',
  '#68D391',
  '#4FD1C5',
  '#63B3ED',
  '#76E4F7',
  '#B794F4',
  '#F687B3',
  '#2F855A',
  '#285E61',
  '#2C5282',
  '#0987A0',
  '#805AD5',
  '#B83280',
  '#086F83',
];


export function pickChakraRandomColor(variant = '') {
  const color = colours[Math.floor(Math.random(2) * colors.length)];
  return color;
}

