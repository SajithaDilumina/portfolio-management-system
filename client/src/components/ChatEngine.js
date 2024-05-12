import React from "react";
import "./styles/ChatEngine.css";
import { ChatEngineWrapper, Socket, ChatFeed } from "react-chat-engine";

const ChatEngine = (props) => {
  return (
    <div
      className="transition-5"
      style={{
        height: props.visible ? "100%" : "0",
        zIndex: props.visible ? "100%" : "0",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      {props.visible && (
        <ChatEngineWrapper>
          <Socket
            projectID={"4dfb4a76-10e9-409e-8f3e-5c2a02295faf"}
            userName={props.user.email}
            userSecret={props.user.email}
          />

          <ChatFeed activeChat={props.chat.id} />
        </ChatEngineWrapper>
      )}
    </div>
  );
};

export default ChatEngine;
