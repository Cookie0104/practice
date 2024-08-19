import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import './firebase';

Message.propTypes = {
  author: PropTypes.string,
  time: PropTypes.string,
  // 可 render 的參數型別是 node
  children: PropTypes.node,
};

function Message({ author, time, children, handleDeleteMessage, message}) {

  return (
    <MessageContainer>
      <MessageHead>
        <MessageAuthor>{author}</MessageAuthor>
        <MessageTime>{time}</MessageTime>
      </MessageHead>
      <MessageDeleteButton
        onClick={() => {
          handleDeleteMessage(message.id);
        }}
      >
        刪除
      </MessageDeleteButton>
      <MessageBody>{children}</MessageBody>
    </MessageContainer>
  );
}

const API_ENDPOINT = "https://student-json-api.lidemy.me/comments";

function App() {
  const [messages, setMessages] = useState([]);
  const [messageMessageApiError, setMessageApiError] = useState(null);
  const [postMessageError, setPostMessageError] = useState(null);

  useEffect(() => {
    fetch(API_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((err) => {
        setMessageApiError(err.message);
      });
  }, []);

  const [value, setValue] = useState();

  const handleTextareaChange = (e) => {
    console.log(value);
    setValue(e.target.value);
  };

  const handleDeleteMessage = (id) => {
    fetch("https://student-json-api.lidemy.me/comments/" + id, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setMessages(messages.filter((message) => message.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFormSubmit = (e) => {
    console.log("submit");
    // 阻止預設的表單發送行為
    e.preventDefault();

    fetch("https://student-json-api.lidemy.me/comments", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        nickname: "Tester",
        body: value,
      }),
    })
      .then((res) => res.json())
      // 顯示留言
      .then((data) => {
        if (!data.ok) {
          // setPostMessageError(data.message);
          setPostMessageError(data.message);
          console.log("無值", postMessageError);
        }
        fetchMessages();
      });
  };

  const fetchMessages = () => {
    return fetch(API_ENDPOINT)
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((err) => {
        setMessageApiError(err.message);
        setMessages([]);  // 设置空数据以避免渲染错误
      });
  };

  const handleTextareaFocus = () => {
    setPostMessageError(null);
  };

 

  return (
    <Page>
      <Title>React 留言板</Title>
      <MessageForm onSubmit={handleFormSubmit}>
        <MessageLable>留言內容</MessageLable>
        <MessageTextArea
          value={value}
          onChange={handleTextareaChange}
          onFocus={handleTextareaFocus}
          rows={3}
        />
        <SubmitButton>送出</SubmitButton>
        {postMessageError && <ErrorMessage>{postMessageError}</ErrorMessage>}
      </MessageForm>
      {messageMessageApiError && (
        <ErrorMessage>
          {/* 直接 render object 會出錯，因此需轉成 string */}
          Something went wrong. {messageMessageApiError.toString()}
        </ErrorMessage>
      )}

      {messages && messages.length === 0 && <div>No Message</div>}

      <MessageList>
        {messages.map((message) => (
          <Message
            key={message.id}
            author={message.nickname}
            time={new Date(message.createdAt).toLocaleString()}
            handleDeleteMessage={handleDeleteMessage}
            message={message}
          >
            {message.body}
          </Message>
        ))}
      </MessageList>
    </Page>
  );
}

export default App;

const Page = styled.div`
  max-width: 800px;
  margin: 0 auto;
  font-family: "monospace", "微軟正黑體";
  box-shadow: 0px 0px 16px rgb(199, 197, 197);
  border-radius: 8px;
  padding: 12px 28px;
  color: #6c6c6c;
  box-sizing: border-box;
`;

const Title = styled.h1`
  text-align: center;
`;

// 表單區塊 form
const MessageForm = styled.form`
  margin-top: 16px;
  font-size: 18px;
`;
const MessageLable = styled.div``;

const MessageTextArea = styled.textarea`
  display: block;
  margin-top: 8px;
  width: 95%;
  border-color: rgba(0, 0, 0, 0.125);
`;

const SubmitButton = styled.button`
  margin-top: 8px;
  color: #ddd;
  background-color: #343a40;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 16px;
  padding: 6px 12px;
`;

// 顯示留言區塊
const MessageList = styled.div`
  margin-top: 16px;
  display: flex;
  gap: 16px;
  flex-direction: column;
`;
const MessageContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.125);
  padding: 16px;
  border-radius: 4px;
`;

const MessageHead = styled.div`
  display: flex;
`;

const MessageAuthor = styled.div`
  margin-right: 12px;
  color: #232323;
`;

const MessageTime = styled.div``;

const MessageBody = styled.div`
  margin-top: 8px;
  word-break: break-all;
  white-space: pre-line;
`;

const ErrorMessage = styled.div`
  font-size: 14px;
  color: red;
`;

const MessageDeleteButton = styled.div`
  margin-top: 8px;
  color: #ddd;
  background-color: #343a40;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 16px;
  padding: 6px 12px;
  width:fit-content;
`;
