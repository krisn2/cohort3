
import {  createContext, useEffect, useState, useContext } from "react";

const BulbContext = createContext();

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
