import { useLocation } from 'react-router-dom';
import { FlashcardArray } from "react-quizlet-flashcard";
import { useEffect, useRef, useState } from 'react';

export default function Flashcard() {
  const location = useLocation();
  const data = location.state?.data;
  const input = data.split("\n");

  const res = input.map((element: String) => {
    var temp = element.split(':');
    return {
      frontHTML: temp[0],
      backHTML: temp[1]
    }
  })

  const [autoflip, setAutoflip] = useState(false);
  const currentCardFlipRef = useRef();
  const controlRef = useRef({});

  useEffect(() => {
    if (autoflip == false)
      return;
    //Implementing the setInterval method 
    currentCardFlipRef.current()
    const interval = setInterval(async () => {
        controlRef.current.nextCard()
        await delay(100)
        currentCardFlipRef.current()
      }, 2000)

    //Clearing the interval 
    return () => clearInterval(interval); 
}); 
  

  // var idx = 1;
  // for (var x of input) {
  //   var temp = x.split(':');
  //   res.push({
  //     id: idx,
  //     frontHTML: temp[0],
  //     backHTML: temp[1]
  //   })
  //   idx = idx + 1;
  // }
  // console.log(res);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div className="storyContainer">
      <FlashcardArray
      // cycle={true}
        cards={res}
        frontContentStyle={{
          color: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        backContentStyle={{
          color: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        FlashcardArrayStyle={{
          color: "black"
        }}
        currentCardFlipRef={
          currentCardFlipRef
        }
        forwardRef={
          controlRef
        }
      />
    </div>
    <button onClick={() => {
      setAutoflip(!autoflip)
      }}>Flip</button>
    </div>
  );
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
