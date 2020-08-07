import * as React from "react";
import "./styles.css";
import axios from "axios";
import data from "./userData.json";
import { useQuery } from "react-query";

type ProcessEnv = {
  [key: string]: string | undefined;
};

const useApi = () => {
  const [feed, setFeed] = React.useState<any>({});
  const [loading, setLoading] = React.useState<any>(false);

  const handleErrors = (res: any) => {
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res;
  };

  React.useEffect(() => {
    const postApi = async () => {
      await axios({
        method: "POST",
        url: `https://sandbox-api.stuart.com/v2/jobs`,
        responseType: "json",
        data: data,
        headers: {
          Authorization: process.env["REACT_APP_BEARER_TOKEN"],
          "content-type": "application/json"
        }
      })
        .then((res: object | any) => {
          setFeed(res.data);
        })
        .catch((err: string) => {
          err = "Big Error"
          console.log(err);
        });
    };
    postApi();
  }, []);

  return { feed, loading };
};

const App = () => {
  const { feed, loading } = useApi();

  console.log(feed);
  return (
    <div className="App">
      <h1>Stuart API</h1>
      <p>
        {`Order Status: ${feed.status
          .charAt(0)
          .toUpperCase()}${feed.status.slice(1)}`}
      </p>
      <p>Distance: {feed.distance}m</p>
      <hr />
      {feed.deliveries.map((e: any) => (
        <div key={e.id}>
          <p>Pickup Status: {e.status}</p>
          <button>Track Order</button>
        </div>
      ))}
    </div>
  );
};
export default App;
