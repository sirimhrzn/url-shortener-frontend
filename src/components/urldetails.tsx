import { getCountryByAlias, setError } from '@/app/redux/reducers/countryCountbyAlias';
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
import { AiOutlinePound } from 'react-icons/ai';
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
  const [countryList, setCountryList] = useState([])

  useEffect(() => {
    //sort in descending
    try {
      let countriesArray = Object.entries(api.data).sort((a, b) => {
        return b[1] - a[1];
      });
      const dataArray = Object.entries(api.data).map(([country, count]) => ({
        country,
        count,
      }));
      setCountryList(dataArray)
      if (countriesArray.length >= 5) {
        countriesArray = countriesArray.slice(0, 5)
      }
      console.log(countryList)
      const key = countriesArray.map(([key]) => key)
      const value = countriesArray.map(([, value]) => value)
      setLabels(key)
      setVal(value)
    } catch (e) {
      dispatch(setError())
      console.log(e)
    }
  }, [api.data])

  useEffect(() => {
    //@ts-ignore
    dispatch(getCountryByAlias(""))
  }, [])

  return (
    <>
      <div className="bg-white w-full rounded-xl">
        <div className={`${api.loading ? 'h-[10rem]' : 'h-[20rem]'} w-full  p-4`}>
          {
            api.dataLoaded && !api.loading ?
              <>
                <div className="flex flex-row  w-full h-full space-x-2">
                  <div className="w-[50%]">
                    <Bar options={options} data={data} />
                  </div>
                  <div>
                    <div className="overflow-x-auto">
                      <table className="table">
                        {/* head */}
                        <thead>
                          <tr>
                            <th>Country Code</th>
                            <th>Clicks</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            countryList.map((value, index) => (
                              <tr key={index}>
                                <td>{value.country}</td>
                                <td>{value.count}</td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    </div>

                  </div>

                </div>
              </>
              :
              api.error ?
                <h1>
                  {api.errorMessage}
                </h1>
                :
                <>
                  <div className='w-full flex justify-center items-center '>
                    <span className="loading loading-spinner loading-lg"></span>
                    <h1>
                      Generating chart data
                    </h1>
                  </div>
                </>
          }
        </div>
      </div >
    </>
  )
}

export default URLDetail
