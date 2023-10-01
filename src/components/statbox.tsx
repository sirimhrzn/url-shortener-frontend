
import { useEffect, useState } from "react";
import { HiOutlineCursorClick } from "react-icons/hi"
const StatBox = () => {

  const [fetchError, setFetchError] = useState<boolean>(false)
  const [fetchLoading, setFetchLoading] = useState<boolean>(true)
  const [data, setData] = useState()

  const fetchStatbox = async () => {
    try {
      const response = await fetch("http://localhost:9000/v1/s/stats");
      const data = await response.json();
      setData(data)
      setFetchLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error);
      setFetchError(true)
    }
  }
  useEffect(() => {
    fetchStatbox()
  }, [])
  return (
    <>
      <div className="stats shadow mx-4 mb-4 rounded-lg">
        <div className="stat">
          <div className="stat-figure text-[2em] text-secondary">
            <HiOutlineCursorClick />
          </div>
          <div className="stat-title">Total Clicks</div>
          {fetchLoading ? <h1>Loading</h1> :
            <div className="stat-value">{data.total_count}</div>
          }
          {
            fetchError ? <h1>Error</h1> : <></>
          }
          {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
          </div>
          <div className="stat-title">Recent Clicks</div>
          {fetchLoading ? <h1>Loading</h1> :
            <div className="stat-value">{data.last_hour}</div>
          }
          {
            fetchError ? <h1>Error</h1> : <></>
          }

          <div className="stat-desc">↗︎ Last Hour</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
          </div>
          <div className="stat-title">N/A</div>
          <div className="stat-value">N/A</div>
          <div className="stat-desc">N/A</div>
        </div>

      </div>
    </>
  )
}

export default StatBox
