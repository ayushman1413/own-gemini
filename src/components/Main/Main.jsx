import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>MY Chatbot</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Ayushman.</span>
                <br />
                How can I help you?
              </p>
            </div>

            <div className="cards">
              <div className="card">
                <p>Suggest me something!</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Give me ideas!</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Let's talk!</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Write some code!</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>

            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                  
                  Loading...</div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }} />
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter your text here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img onClick={onSent} src={assets.send_icon} alt="" />
            </div>
          </div>

          <p className="bottom-info">
            Gemini is the third zodiac sign, represented by the twins Castor and
            Pollux, and is associated with the air element and ruled by Mercury.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
