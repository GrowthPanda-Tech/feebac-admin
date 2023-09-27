// import React, { useState } from "react";

// function WordLimitTextarea() {
//     const [text, setText] = useState("");
//     const [wordLimit, setWordLimit] = useState(60);

//     const handleChange = (event) => {
//         const inputValue = event.target.value;
//         const words = inputValue.split(" ");

//         if (words.length <= wordLimit) {
//             setText(inputValue);
//         }
//     };

//     return (
//         <>
//             <div>
//                 <textarea
//                     value={text}
//                     onChange={handleChange}
//                     placeholder={`Please Add Description (Word limit: ${wordLimit})`}
//                     rows="4"
//                     cols="50"
//                 ></textarea>

//                 <p>
//                     Word count: {text.split(" ").length}/{wordLimit}
//                 </p>
//             </div>
//         </>
//     );
// }

// export default WordLimitTextarea;
