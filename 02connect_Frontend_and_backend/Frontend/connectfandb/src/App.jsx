import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  // const [count, setCount] = useState(0)
  const [joke, setjoke] = useState([]);

  useEffect(() => {
    axios
      .get("/api/jokes") //if serving on some other url thats why we dont give api full url but use proxy
      .then((response) => {
        setjoke(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {/* <h1> {joke}</h1> */}
      <h1>Chai and code</h1>
      {/* {joke.map((jokes) => {
        // <h1>{jokes.title}</h1>;   //This giv error becouse in curly braces we have to return statemnt but in parenthesis we dont have to  
        <div key={jokes.id}>
          <h3>{jokes.title}</h3>
          <p>{jokes.content}</p>
        </div>;
      })} */}
      {/* <h2>{joke.length}</h2> */}

      {joke.map((jokes) => (
        // <h1>{jokes.title}</h1>;   //This giv error becouse in curly braces we have to return statemnt but in parenthesis we dont have to
        <div key={jokes.id}>
          <h3>{jokes.title}</h3>
          <p>{jokes.content}</p>
        </div>
      ))}
    </>
  );
}

export default App;
