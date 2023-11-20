import { useLocation } from 'react-router-dom';
import { FlashcardArray } from "react-quizlet-flashcard";
import { useEffect, useRef, useState } from 'react';

export default function Flashcard() {
  const location = useLocation();
  const data = location.state.data;
  const input = data.split("\n");
  const size = input.length;

  const res = input.map((element: string) => {
    var temp = element.split('：');
    return {
      frontHTML: temp[0],
      backHTML: temp[1]
    }
  })

  const [autoflip, setAutoflip] = useState(false);
  const [indexElement, setIndexElement] = useState(1);
  const currentCardFlipRef = useRef();
  const controlRef = useRef({});

  useEffect(() => {
    if (autoflip == false) return;
    //Implementing the setInterval method 
    currentCardFlipRef.current()
    const interval = setInterval(async () => {
        controlRef.current.nextCard()
        await delay(1000)
        currentCardFlipRef.current()
        if (indexElement === size) {
          controlRef.current.resetArray();
          setIndexElement(1)
        }
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
        currentCardFlipRef = {
          autoflip? currentCardFlipRef : undefined
        }
        forwardRef = {
          autoflip? controlRef : undefined
        }
        onCardChange={(_id,index) =>{
          setIndexElement(index);
        }  
        }
      />
    <button style={{ color: "white" }} onClick={() => {
      setAutoflip(!autoflip)
      }}>Toggle Autoflip</button>
    </div>
    </div>
  );
}

function delay(ms: number | undefined) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
