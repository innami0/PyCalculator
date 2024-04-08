import { useState ,useEffect} from 'react'
import Button from "@mui/material/Button"
import Axios from 'axios';
import './App.css'

function App() {

  const [Num,setNum] = useState(0)

  const Nset = (n) =>{
    setNum(parseInt(Num.toString() + n.toString()))
  }

  const nums = [0,1,2,3,4,5,6,7,8,9]
  const sisoku = ["+","-","×","÷","="]

  const sendInt = (num,kig) =>{
    Axios.post("http://localhost:5000/int",{
      Num: num,
      Kig:kig
    })
    .then(e =>{
      setNum(e.data)
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }
  // send()
  const bs = nums.map((o,i) =>{
    return <Button
      key = {o}
      onClick={() =>{
        Nset(o)
      }}
    >{o}</Button>
  })

  const sisokub = sisoku.map((o,i) =>{
    return <Button
    key = {o}
    onClick={() =>{
      sendInt(Num,o)
      setNum(0)
    }}
    >{o}</Button>
  })

  bs.push(sisokub)


  return (
    <>
    <p>{Num}</p>
      <div style = {{
        display:"flex",
        flexWrap:"wrap",
        width:"20%",
        margin:"0 auto"
      }}>
        {bs}
      </div>
    </>
  )
}

export default App
