import * as React from "react";
import "./styles.css";
import axios from "axios";
import data from "./userData.json";
import { useQuery } from "react-query";

type ProcessEnv = {
  [key: string]: string | undefined;
};

const useApi = () => {
  const [feed, setFeed] = React.useState<object | any>({});

  React.useEffect(() => {
    const postApi = async () => {
      try {
        return await axios.get("https://sandbox-api.stuart.com/v2/jobs", {
          data: data,
          headers: {
            Authorization: process.env["REACT_APP_BEARER_TOKEN"],
            "content-type": "application/json"
          }
        });
      } catch (e) {
        console.log(e);
      }
    };
    const twain = async () => {
      const i = await postApi()
      setFeed(i?.data)
    }
    twain()
  }, []);

  return { feed };
};

const App = () => {
  const { feed } = useApi();
              
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    window.open(feed.map((e: any) => e.deliveries.tracking_url)
  }
                
  const { isLoading, error, data } = useQuery('data', feed)

  if(isLoading) {
    return <span>Loading...</span>
  }
      
  if(error) {
    return <span>Error: `${error?.message}`</span>
  }
      
  console.log(data);
      
  return (
    <div className="App">
      <h1>Stuart API</h1>
      {data.map((e: any) => (
        <div key={e.id}>
          <p>{'Order Status: ' + e.status}</p>
          <p>Distance: {e.distance}m</p>
          <hr />
          <p>Pickup Status: {e.status}</p>
          <button onClick={onClick}>Track Order</button>
        </div>
      ))}
    </div>
  );
};
export default App;
