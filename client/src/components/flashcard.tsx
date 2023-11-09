import { useLocation } from 'react-router-dom';
import { FlashcardArray } from "react-quizlet-flashcard";

export default function Flashcard() {
  const location = useLocation();
  const data = location.state?.data;
  const input = data.split('\n')

  const res = new Array<Object>;
  var idx = 1;
  for (var x of input) {
    var temp = x.split(':');
    res.push({
      id: idx,
      frontHTML: temp[0],
      backHTML: temp[1]
    })
    idx++;
  }
  console.log(res);

  return (
    <div className="storyContainer">
      <FlashcardArray
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
      />
    </div>
  );
}