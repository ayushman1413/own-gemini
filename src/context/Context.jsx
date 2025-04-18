import { createContext, useState, useEffect, useRef } from "react";
export const Context = createContext();
import { runChat } from "../config/gemini";


const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [history, setHistory] = useState([]);
  const timeoutRefs = useRef([]);




  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(clearTimeout);
    };
  }, []);

  const delayPara = (index, nextWord) => {
    const timeoutId = setTimeout(() => {
      setResultData(prev => prev + nextWord);
    }, 75 * index);
    timeoutRefs.current.push(timeoutId);
  };

  const onSent = async () => {
    if (!input.trim()) return;

    try {
      setResultData("");
      setLoading(true);
      setShowResult(true);
      setRecentPrompt(input);
      
      const response = await runChat(input);
      let responseArray = response.split("**");
      let newResponse = "";
      
      for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newResponse += responseArray[i];
        } else {
          newResponse += "<b>" + responseArray[i] + "</b>";
        }
      }

      let newResponse2 = newResponse.split("*").join("<br/>");
      let newResponseArray = newResponse2.split(" ");
      
      timeoutRefs.current = []; 
      for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord + " ");
      }

      setHistory((prevHistory) => [...prevHistory, { prompt: input, response }]);
    } catch (err) {
      console.error("Error in onSent:", err);
      setResultData("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    history,
    setHistory,
  };

  async function onSend(userInput) {
    const response = await runChat(userInput);
    console.log("Gemini Response:", response);
  }

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
