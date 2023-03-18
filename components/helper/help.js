import { useState, useEffect } from "react";
import useSWR, { useSWRConfig } from 'swr'

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
  return {
    userSWR: data,
    isLoading,
    isError: error,
    request: requestData,
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
  const color = colours[Math.floor(Math.random(1) * colors.length)];
  return color;
}

