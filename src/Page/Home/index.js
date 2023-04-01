import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { GrUserWorker } from "react-icons/gr";
import { AiFillRobot } from "react-icons/ai";
import axios from "axios";
import TypeAnimation from "../../Component/TypeAnimation";

function Home() {
  const [inputText, setInputText] = useState("");
  const [prompt, setPrompt] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPrompt(inputText);
    setChatLog([
      ...chatLog,
      {
        type: "user",
        message: inputText,
      },
    ]);
    const data = {
      prompt: inputText,
    };
    axios
      .post("http://localhost:8080/api/openai/post", data)
      .then((response) => {
        const answere = response.data.bot;
        setChatLog([
          ...chatLog,
          {
            type: "user",
            message: inputText,
          },
          {
            type: "bot",
            message: answere,
          },
        ]);

        setInputText("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          placeholder="Enter Text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <Button type="submit" style={{ marginTop: 5 }}>
          submit
        </Button>
      </Form>
      {chatLog.length > 0 &&
        chatLog.map((value, index) => {
          return (
            <Row style={{ textAlign: "left", marginTop: 10 }} key={index}>
              <Col sm={1}>
                {value.type === "user" ? (
                  <GrUserWorker style={{ fontSize: 20 }} />
                ) : (
                  <AiFillRobot style={{ fontSize: 20 }} />
                )}
              </Col>
              <Col sm={11} style={{ fontSize: 20 }}>
                {value.type === "bot" ? (
                  index === chatLog.length - 1 ? (
                    <>
                      <span>Saya Pikir : </span>
                      <TypeAnimation text={value.message} />
                    </>
                  ) : (
                    value.message
                  )
                ) : (
                  value.message
                )}
              </Col>
            </Row>
          );
        })}
    </div>
  );
}

export default Home;
