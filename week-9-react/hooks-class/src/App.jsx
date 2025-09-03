
import {  createContext, useEffect, useState, useContext } from "react";

const BulbContext = createContext(); // createContext // similar to initializing new user define type 
const countContext = createContext() ;

function CountProvider({ children }){
    const [count, setCount] = useState(0);

    return <countContext.Provider value={{count:count, setCount:setCount}}>
      {children}
    </countContext.Provider>
}

// fucntion that wrap the global state 
function BulbProvider({ children }) {
  const [bulbOn, setBulbon]= useState(true);


  return (
    <BulbContext.Provider value={{ bulbOn: bulbOn, setBulbon: setBulbon}} >
      {children}
    </BulbContext.Provider>
  )
}

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



     {/* This is prop drilling in react passing state or data to children using middle component and it's ugly way to write code */}

     {/* <Light bulbOn={bulbOn} setBulbon={setBulbon} /> */}
     <BulbProvider>
     <Light/>
     </BulbProvider>

     <CountProvider>
      <Value/>
      <Increase />
      <Decrease />
     </CountProvider>
    </div>
  )
}

function Decrease() {
  let setCount = useContext(countContext).setCount;

  function dec() {
    setCount(c => c - 1);
  }
  return (
    <div>
      <button onClick={dec}>Decrease</button>
    </div>
  )
}

function Increase() {

  let setCount = useContext(countContext).setCount;

  function inc() {
    setCount(c => c + 1);
  }

  return(
    <div>
      <button onClick={inc}>Increase</button>
    </div>
  )
}

function Value () {
  let count = useContext(countContext).count;

  return (
    <div>
      <h1>{count}</h1>
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

// function Light({ bulbOn,setBulbon }) {

function Light() {
  return (
    <div>
      {/* <LigthBulb bulbon={bulbOn}/>
      <LightSwitch setBulbon={setBulbon}/> */}

      <LigthBulb/>
      <LightSwitch/>
    </div>
  )
}

// function LightSwitch({ setBulbon }){
function LightSwitch() {

  const { setBulbon } = useContext(BulbContext);
  
  function changeBulbstate() {
    setBulbon( c=> !c);
  }

  return (
    <div>
      <button onClick={changeBulbstate}>Switch</button>
    </div>
  )
}

// function LigthBulb({bulbon}) {
function LigthBulb() {

  const bulbon = useContext(BulbContext).bulbOn;
  return (
    <div>
      { bulbon ? <p> Bulb is on</p>: <p> Bulb is Off</p> }
    </div>
  )
}

export default App
