import React, { useState, useEffect } from 'react';
import { Button, TextField, Tab, Tabs, Typography, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function Flashcard() {
  const location = useLocation();
  const data = location.state?.data;
  const input = data.split('\n')
  console.log("Input" + data)
  return (
    <div>
      <h1>{data}</h1>
    </div>
  );
}

// const Flashcard: React.FC = () => {
//   const [flashcards, setFlashcards] = useState<string[]>([]);
//   const [currentKanji, setCurrentKanji] = useState<string>('');
//   const [myTimeout, setMyTimeout] = useState<number>(0);
//   const [tabValue, setTabValue] = useState<number>(0);


//   useEffect(() => {
//     return () => {
//       clearInterval(myTimeout);
//     };
//   }, [myTimeout]);

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     const newFlashcards = input.split('\n');
//     setFlashcards(newFlashcards);
//     setCurrentKanji(newFlashcards[Math.floor(Math.random() * newFlashcards.length)]);
//     mainloop();
//   };

//   const mainloop = () => {
//     const timeoutId = window.setInterval(() => {
//       displayCards();
//     }, 1000 /* Card time */);
//     setMyTimeout(timeoutId);
//   };

//   const displayCards = () => {
//     const randomIndex = Math.floor(Math.random() * flashcards.length);
//     setCurrentKanji(flashcards[randomIndex]);
//   };

//   const pause = () => {
//     // console.log('Paused');
//     clearInterval(myTimeout);
//   };

//   const resume = () => {
//     // console.log('Resumed');
//     mainloop();
//   };

//   function test() {
//     console.log()
//   }

//   return (
//     <div>Hello World</div>
//   )
//   // {flashcards.length > 0 && (
//   //   <Typography variant="h1" style={{ fontSize: '100px', marginTop: '24px' }}>
//   //     {currentKanji}
//   //   </Typography>
//   // )}
//   // {flashcards.length > 0 && (
//   //   <div style={{ marginTop: '24px' }}>
//   //     <Button variant="outlined" color="secondary" onClick={pause}>
//   //       Ngừng
//   //     </Button>
//   //     <Button variant="outlined" color="primary" onClick={resume} style={{ marginLeft: '12px' }}>
//   //       Tiếp tục
//   //     </Button>
//   //   </div>
//   // )}
// };

// export default Flashcard;