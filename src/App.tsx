import * as React from "react";
import "./styles.css";
import axios from "axios";
import data from "./userData.json";
import { useQuery } from "react-query";

const useApi = () => {
  const [feed, setFeed] = React.useState<any>({});
  const [loading, setLoading] = React.useState<any>(false);

  React.useEffect(() => {
    const postApi = async () => {
      await axios({
        method: "POST",
        url: `https://sandbox-api.stuart.com/v2/jobs`,
        responseType: "json",
        data: data,
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJFUzI1NiJ9.eyJpc3MiOiJzdHVhcnQtYXBpIiwiaWF0IjoxNTk2NzQ2NTk1LCJqdGkiOiJmZWU1MjhjMS1lMzQ0LTRlNjMtYTg1OS04Zjk3OWJmOTUxMGQiLCJzcnQ6ZW52aXJvbm1lbnRzIjpbInNhbmRib3giXX0.Gzp41_EbSnlXu03iBDK1JNPK_4fwFUYL028WHOWyMYolBn7L7lYHGMyCU6XCltjEYPsQxgC63b75VQiXkNxYSw",
          "content-type": "application/json"
        }
      })
        .then((res: any) => {
          setFeed(res.data);
          // setLoading(true);
        })
        .catch((err: any) => {
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
