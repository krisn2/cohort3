
import { useEffect, useState } from "react";
function App() {

  const [count, setcount] = useState(0);

  let [countervisiable, setcountervisiable] = useState(true);

  // useEffect( () => {
  //   setInterval( () => {
  //     setcountervisiable( c => !c);
  //   },3000);
  // },[])

  useEffect( () => {
    setInterval( () => {
      setcountervisiable(c => !c);
    },5000);

    let interval = setInterval( () => {
      setcount(c => c + 1);
    }, 1000)

    return () => {
      clearInterval(interval);
    }
  },[])

  return (
    <div >
      <b>
        hi there
      </b>
     {countervisiable && <Counter count={count}/>}
    </div>
  )
}


function Counter(props) {

  // const [count,setcount] = useState(0);

  // function increaseCount() {
  //   setcount(count + 1);
  // }

  // console.log("inside the counter component");

  // useEffect( () => {
  //   console.log("inside the useEffect");

  //   let clock = setInterval( () => {
  //     console.log("tick");
  //     setcount(c => c + 1 );
  //   },1000);

  //   return () => {
  //     console.log("clean up");
  //     clearInterval(clock);

  //   }
  // },[])

  
  // function decreaseCount() {
  //   setcount(count - 1 );
  // }

  return (
    <div>
      <h1>{props.count}</h1>
    </div>
  )
}

export default App
