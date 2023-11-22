import { useLocation } from "react-router-dom";
import { FlashcardArray } from "react-quizlet-flashcard";
import { useEffect, useRef, useState } from "react";

const FlashcardApp: React.FC = () => {
  const location = useLocation(); //lấy input từ đường link
  const data = location.state.data; //lấy dữ liệu flashcard
  const input = data.split("\n"); //tách chuỗi theo \n
  const flashcardTextSize = location.state.textSize; //lấy cỡ chữ của flashcard
  const size = input.length; //độ dài list flashcard

  // tách từng flashcard thành mặt trước & mặt sau theo ：
  const res = input.map((element: string) => {
    var temp = element.split("：");
    return {
      frontHTML: temp[0],
      backHTML: temp[1],
    };
  });

  const [autoflip, setAutoflip] = useState(false); // biến bool quản lý lật tự động
  const [indexElement, setIndexElement] = useState(1); // biến number quản lý index của flashcard
  const currentCardFlipRef = useRef(); // biến quản lý việc lật thẻ hiện tại
  const controlRef = useRef({}); // biến quản lý việc lật thẻ

  useEffect(() => {
    if (autoflip == false) return; //nếu không bật autoflip -> thoát hàm
    currentCardFlipRef.current(); //lật thẻ hiện tại
    const interval = setInterval(async () => {
      controlRef.current.nextCard(); //chuyển sang thẻ tiếp theo
      await delay(1000);
      currentCardFlipRef.current(); //lật thẻ hiện tại
      if (indexElement === size) {
        controlRef.current.resetArray(); //xóa array & sinh lại
        setIndexElement(1); //trở về thẻ đầu tiên
      }
    }, 2000);
    return () => clearInterval(interval); //xóa interval
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
          frontContentStyle={{ //mặt trước flashcard
            color: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: `${flashcardTextSize}rem`,
          }}
          backContentStyle={{ //mặt sau flashcard
            color: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: `${flashcardTextSize}rem`,
          }}
          FlashcardArrayStyle={{ //style cho flashcard array
            color: "black",
            fontSize: `${flashcardTextSize}rem`,
          }}
          currentCardFlipRef={autoflip ? currentCardFlipRef : undefined} //điều khiển thẻ hiện tại
          forwardRef={autoflip ? controlRef : undefined} //điều khiển di chuyển thẻ
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

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default FlashcardApp;