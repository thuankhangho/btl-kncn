import { useLocation } from "react-router-dom";
import { FlashcardArray } from "react-quizlet-flashcard";
import { useEffect, useRef, useState } from "react";

// Adjust the component function definition to include the new prop
export default function Flashcard() {
  const location = useLocation();
  const data = location.state.data;
  const input = data.split("\n");
  const flashcardTextSize = location.state.textSize;
  const size = input.length;

  const res = input.map((element: string) => {
    var temp = element.split("：");
    return {
      frontHTML: temp[0],
      backHTML: temp[1],
    };
  });

  const [autoflip, setAutoflip] = useState(false);
  const [indexElement, setIndexElement] = useState(1);
  const currentCardFlipRef = useRef();
  const controlRef = useRef({});

  useEffect(() => {
    if (autoflip == false) return;

    currentCardFlipRef.current();
    const interval = setInterval(async () => {
      controlRef.current.nextCard();
      await delay(1000);
      currentCardFlipRef.current();
      if (indexElement === size) {
        controlRef.current.resetArray();
        setIndexElement(1);
      }
    }, 2000);

    return () => clearInterval(interval);
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="storyContainer">
        <FlashcardArray
          cards={res}
          frontContentStyle={{
            color: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: `${flashcardTextSize}rem`,
          }}
          backContentStyle={{
            color: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: `${flashcardTextSize}rem`,
          }}
          FlashcardArrayStyle={{
            color: "black",
            fontSize: `${flashcardTextSize}rem`,
          }}
          currentCardFlipRef={autoflip ? currentCardFlipRef : undefined}
          forwardRef={autoflip ? controlRef : undefined}
          onCardChange={(_id, index) => {
            setIndexElement(index);
          }}
        />
        <button
          style={{ color: "white" }}
          onClick={() => {
            setAutoflip(!autoflip);
          }}
        >
          Toggle Autoflip
        </button>
      </div>
    </div>
  );
}

function delay(ms: number | undefined) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
