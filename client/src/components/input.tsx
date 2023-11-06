// import { useCallback } from 'react';
// import { useDropzone } from 'react-dropzone';
 
// function App() {
//   const [isOver, setIsOver] = useState(false);
//   const [files, setFiles] = useState<File[]>([]);
 
//   // Define the event handlers
//   const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     setIsOver(true);
//   };
 
//   const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     setIsOver(false);
//   };
 
//   const handleDrop = (event: DragEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     setIsOver(false);
 
//     // Fetch the files
//     const droppedFiles = Array.from(event.dataTransfer.files);
//     setFiles(droppedFiles);
 
//     // Use FileReader to read file content
//     files.forEach((file) => {
//       const reader = new FileReader();
 
//       reader.onloadend = () => {
//         console.log(reader.result);
//       };
 
//       reader.onerror = () => {
//         console.error('There was an issue reading the file.');
//       };
 
//       reader.readAsDataURL(file);
//       return reader;
//     });
//   };
 
//   return (
//     <div
//       onDragOver={handleDragOver}
//       onDragLeave={handleDragLeave}
//       onDrop={handleDrop}
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '50px',
//         width: '300px',
//         border: '1px dotted',
//         backgroundColor: isOver ? 'lightgray' : 'white',
//       }}
//     >
//       Drag and drop some files here
//     </div>
//   );
// }

// function App() {
//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     acceptedFiles.forEach((file: File) => {
//       const reader = new FileReader()

//       reader.onabort = () => console.log('file reading was aborted')
//       reader.onerror = () => console.log('file reading has failed')
//       reader.onload = () => {
//       // Do whatever you want with the file contents
//         const binaryStr = reader.result
//         console.log(binaryStr)
//       }
//       reader.readAsText(file)
//     })
    
//   }, [])
//   const {fileRejections,getRootProps, getInputProps} = useDropzone({accept: {'text/*': ['txt'],},onDrop})

//   return (
//     <div {...getRootProps()}
//     style={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               height: '50px',
//               width: '300px',
//               border: '1px dotted',
//               backgroundColor:'lightgray' ,
//             }}>
//       <input {...getInputProps()} />
//       <p>Drag 'n' drop some files here, or click to select files (.txt only)</p>
//     </div>
//   )
// }
import React, { useState, useEffect, useCallback } from 'react';
import { Button, TextField, Tab, Tabs, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

const Input: React.FC = () => {
  const [input, setInput] = useState('');
  const [flashcards, setFlashcards] = useState<string[]>([]);
  const [newFlashcards, setnewFlashcards] = useState<string[]>([]);
  const [currentKanji, setCurrentKanji] = useState<string>('');
  const [myTimeout, setMyTimeout] = useState<number>(0);
  const [tabValue, setTabValue] = useState<number>(0);


  // useEffect(() => {
  //   return () => {
  //     clearInterval(myTimeout);
  //   };
  // }, [myTimeout]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log('name');
  }

  function Accept(props) {
    const {
      acceptedFiles,
      fileRejections,
      getRootProps,
      getInputProps
    } = useDropzone({
      accept: {
        'text/plain': []
      }
    });
  
    const acceptedFileItems = acceptedFiles.map(file => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));
  
    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
        <ul>
          {errors.map(e => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
    ));
  
    return (
      <section className="container">
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
          <em>(Only *.jpeg and *.png images will be accepted)</em>
        </div>
        <aside>
          <h4>Accepted files</h4>
          <ul>{acceptedFileItems}</ul>
          <h4>Rejected files</h4>
          <ul>{fileRejectionItems}</ul>
        </aside>
      </section>
    );
  }

  // const handleSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   setFlashcards(input.split('\n'));
  //   setCurrentKanji(newFlashcards[Math.floor(Math.random() * newFlashcards.length)]);
  //   mainloop();
  // };

  // const mainloop = () => {
  //   const timeoutId = window.setInterval(() => {
  //     displayCards();
  //   }, 1000 /* Card time */);
  //   setMyTimeout(timeoutId);
  // };

  // const displayCards = () => {
  //   const randomIndex = Math.floor(Math.random() * flashcards.length);
  //   setCurrentKanji(flashcards[randomIndex]);
  // };

  // const pause = () => {
  //   // console.log('Paused');
  //   clearInterval(myTimeout);
  // };

  // const resume = () => {
  //   // console.log('Resumed');
  //   mainloop();
  // };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} style={{ width: '600px', padding: '24px', borderRadius: '12px' }}>
        <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} centered>
          <Tab label="Flashcard" />
          <Tab label="Upload file" />
          <Tab label="Cài đặt" />
        </Tabs>
        {tabValue === 0 && (
          <form style={{ marginTop: '24px' }}>
            <TextField
              id="kanjiinput"
              label="Nhập vào chuỗi các Hán Tự cách nhau bởi ・"
              variant="outlined"
              multiline
              fullWidth
              margin="normal"
              sx={{ mb: 2, '& .MuiInputBase-input': { fontSize: '1.5rem',height: '100px' } }} 
              onChange={(e) => setInput(e.target.value)}
            />
            <Button variant="contained" color="primary" style={{ marginTop: '16px' }}>
             <Link to="flashcard" state={{data: input}} style={{color: 'white'}}>Bắt đầu</Link>
            </Button>
          </form>
        )}
        {tabValue === 1 && (
           <form onSubmit={handleSubmit}>
          <Accept />
          <Button variant="contained" color="primary" type='submit' style={{ marginTop: '16px' }}>
            Bắt đầu
          </Button>
          </form>
        )}
        {tabValue === 2 && (
          <div>
            {/* Settings content goes here */}
            <Typography variant="h4" style={{ marginTop: '24px' }}>
              Settings content will be here.
            </Typography>
          </div>
        )}
      </Paper>
    </div>
  );
};

export default Input;