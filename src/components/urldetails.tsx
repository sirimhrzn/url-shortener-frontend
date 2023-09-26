

import { getCountryByAlias } from '@/app/redux/reducers/countryCountbyAlias';
import { RootState } from '@/app/redux/store';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';



ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const URLDetail = () => {
  const dispatch = useDispatch()
  const api = useSelector((state: RootState) => state.countryByAlias)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Count of alias',
      },
    },
  };

  //const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  type Label = {
    [key: string]: number;
  }
  const [labels, setLabels] = useState<string[]>()
  const [val, setVal] = useState<number[]>()
  const data = {
    labels,
    datasets: [
      {
        label: 'Clicks',
        data: val,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  useEffect(() => {
    //sort in descending
    const countriesArray = Object.entries(api.data).sort((a, b) => {
      return b[1] - a[1];
    });
    const key = countriesArray.map(([key]) => key)
    const value = countriesArray.map(([, value]) => value)
    setLabels(key)
    setVal(value)
  }, [api.data])

  useEffect(() => {
    //@ts-ignore
    dispatch(getCountryByAlias("meow"))
  }, [])

  return (
    <>
      <div className="bg-white w-full rounded-xl">
        <div className="h-[20rem] w-[50%] max-w-3xl p-4">
          {
            api.dataLoaded ?
              <Bar options={options} data={data} />
              :
              <h1> Generating bar chart data </h1>
          }
        </div>
      </div>
    </>
  )
}

export default URLDetail
