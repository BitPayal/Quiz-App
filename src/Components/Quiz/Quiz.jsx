import React,{ useState,useRef } from 'react'
import './Quiz.css'
import {data} from '../../assets/data'



const Quiz = () => {
  let [index,setIndex]=useState(0);
let [question,setQuestion]=useState(data[index]);
let [lock,setLock]=useState(false);
let [score,setScore]=useState(0);
let [result,setResult]=useState(false);

let Option1=useRef(null);
let Option2=useRef(null);
let Option3=useRef(null);
let Option4=useRef(null);
let option_array=[Option1,Option2,Option3,Option4];

const reset=()=>{
  setScore(0);
  setIndex(0);
  setLock(false);
  setResult(false);
}
const nextfun=()=>{
  if(index==data.length-1){
       setResult(true);
        return 0;
    }
 if(lock===true){
  setIndex(++index);
  setLock(false);
  setQuestion(data[index]);
  option_array.map((option)=>{
    option.current.classList.remove("correct");
    option.current.classList.remove("wrong");
    return null;
  })
 }

}
const check=(e,ans)=>{
    if(lock===false){
      if(question.ans===ans){
        e.target.classList.add("correct");
        setLock(true);
        setScore(prev=>prev+1);
      }
      else{
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans-1].current.classList.add("correct");
      }
  
    }
  }
  return (
     <div className="container">
       <h1>Quizz</h1>
       <hr/>
       {!result?<><h2>{question.question}</h2>
       <ul>
        <li ref={Option1} onClick={(e)=>{check(e,1)}}>{question.option1}</li>
        <li ref={Option2} onClick={(e)=>{check(e,2)}}>{question.option2}</li>
        <li ref={Option3} onClick={(e)=>{check(e,3)}}>{question.option3}</li>
        <li ref={Option4} onClick={(e)=>{check(e,4)}}>{question.option4}</li>
       </ul>
       <button onClick={nextfun}>Next</button>
       <div className="index">{index+1} of {data.length} questions</div>
       </>:<> <h2>You have scored {score} out of {data.length} questions</h2>
       <button onClick={reset}>Reset</button></>}
       
       </div>
  )
}

export default Quiz