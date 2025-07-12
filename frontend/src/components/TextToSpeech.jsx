import React, { useState } from "react";
import {toast} from 'react-toastify';
const TextToSpeech = ({data}) => {
  const [text, setText] = useState("");

  const handleSpeak = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      toast.error("Sorry, your browser does not support text-to-speech.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Text-to-Speech in React</h2>
      <textarea
        rows="5"
        cols="50"
        placeholder="Type something here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ marginBottom: "10px", padding: "10px" }}
      />
      <br />
      <button onClick={handleSpeak} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Speak
      </button>
    </div>
  );
};

export default TextToSpeech;
