import React, { useRef, useState } from 'react';
import Tesseract, { createWorker } from 'tesseract.js';

const CarteDIdentite = () => {
  const [extractedText, setExtractedText] = useState('');
  const inputRef = useRef();

  const handleImageCapture = () => {
    const image = inputRef.current.files[0];

    Tesseract.recognize(
      image,
      'eng',
    //   { logger: (info) => console.log(info) }
    ).then(({ data: { text } }) => {
    //   setExtractedText(text);
    console.log(text)
    });
  };

//   Tesseract.recognize(
//     'https://tesseract.projectnaptha.com/img/eng_bw.png',
//     'eng',
//     // { logger: m => console.log(m) }
//   ).then(({ data: { text } }) => {
//     console.log(text);
//   })


//   const worker = createWorker({
//     logger: m => console.log(m)
//   });
   
//   (async () => {
//     const image = inputRef.current.files[0];
//     await worker.load();
//     await worker.loadLanguage('eng');
//     await worker.initialize('eng');
//     const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
//     console.log(text);
//     await worker.terminate();
//   })();

  return (
    <div>
      <input type="file" accept="image/*" ref={inputRef} />
      <button onClick={handleImageCapture}>Extract Text</button>
      <div>
        <h2>Extracted Text:</h2>
        <p>{extractedText}</p>
      </div>
    </div>
  );
};

export default CarteDIdentite;
