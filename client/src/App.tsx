import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
 
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

function App() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsText(file)
    })
    
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}
    style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50px',
              width: '300px',
              border: '1px dotted',
              backgroundColor:'lightgray' ,
            }}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  )
}


export default App
