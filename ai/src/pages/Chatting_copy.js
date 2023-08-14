import React, { useState } from "react";
import axios from "axios";
import { styled } from "styled-components";


const Chatting_copy = () => {
  const [keywords1, setKeywords1] = useState("");
  const [keywords2, setKeywords2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const formattedMessage = responseMessage.replace(/\\n/g, "\n");
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  const handleChange1 = (event) => {
    setKeywords1(event.target.value);
  };
  const handleChange2 = (event) => {
    setKeywords2(event.target.value);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    const messages = [
      {
        role: "system",
        content:
          "롤 게임 관해서 질문 할 것 입니다. 당신은 최고의 롤 변호사입니다. 두 가지 선택지가 주어지면 중립적인 문구없이 첫번째 선택지를 변호해주세요. 답을 선택한 이유를 말해주세요. 그리고 비유를 사용하여 설명해주세요.",
      },
      {
        role: "user",
        content: keywords1 + keywords2 + "에 대하여 정확한 판결을 내려줘",
      },
    ];

    const data = {
      model: "gpt-3.5-turbo",
      temperature: 0.5,
      n: 1,
      messages: messages,
    };

    axios
      .post("https://api.openai.com/v1/chat/completions", data, {
        headers: {
          Authorization: "Bearer " + apiKey,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setIsLoading(false);
        setResponseMessage(response.data.choices[0].message.content);
      })
      .catch((error) => {
        setIsLoading(false);
        setError("하루 이용량이 초과 됐습니다.");
      });
  };

  return (
    <Background>
      <Title>롤 판결 AI</Title>
      <Wrapper>
        <></>
        <div>1번 주장</div>
        <Input
          type="text"
          value={keywords1}
          onChange={handleChange1}
          required
        />

        <div>2번 주장</div>
        <Input
          type="text"
          value={keywords2}
          onChange={handleChange2}
          required
        />
        <AskAi onClick={handleSubmit}>입력</AskAi>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {isLoading && (
          <Loading>
            <img
              src="https://studentrights.sen.go.kr/images/common/loading.gif"
              alt="로딩"
            />
          </Loading>
        )}

        {responseMessage && !isLoading && (
          <ApiResponse>
            <ApiResponseTitle>AI 응답:</ApiResponseTitle>
            <ApiResponseAnswer>{formattedMessage}</ApiResponseAnswer>
          </ApiResponse>
        )}
      </Wrapper>
    </Background>
  );
};

export default Chatting_copy;

const Background = styled.div`
  background-color: black;
  width: 100%;
  height: 100vh;
`;

const Wrapper = styled.div`
  max-width: 400px;
  height: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* margin-top: 40px; */
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 20px;
  color: #333;
`;

const Input = styled.textarea`
  min-width: 90%;
  max-width: 90%;
  min-height: 100px;
  max-height: 100%;
  padding: 10px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: auto;
  margin-bottom: 10px;
`;

const AskAi = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: #ff0000;
  margin-bottom: 10px;
`;

const ApiResponse = styled.div`
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 20px;
`;

const ApiResponseTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
`;

const ApiResponseAnswer = styled.div`
  font-size: 14px;
  width: 100%;
  font-family: "Arial", sans-serif;
  color: #333;
  line-height: 1.6;
  text-align: justify;
  white-space: pre-wrap;
`;

const Loading = styled.p`
  color: #007bff;
  font-size: 18px;
  margin-top: 10px;
`;
