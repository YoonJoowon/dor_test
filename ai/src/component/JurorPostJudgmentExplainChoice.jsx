import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled, { css } from "styled-components";
import { votedChampState } from "../store/Recoil";

const JurorPostJudgmentExplainChoice = ({
  judgedMyChamp,
  judgedMyChampImg,
  judgedMyChampClicked,
  judgedYourChamp,
  judgedYourChampImg,
  judgedYourChampClicked,
  judgedContentID,
}) => {
  const [isMyVoteBtnClicked, setMyIsvoteBtnClicked] = useState(false);
  const [isYourVoteBtnClicked, setYourIsvoteBtnClicked] = useState(false);
  const [myVoteBtnColor, setMyVoteBtnColor] = useState(false);
  const [yourVoteBtnColor, setYourVoteBtnColor] = useState(false);
  const [voteChamp, setVoteChamp] = useRecoilState(votedChampState);

  useEffect(() => {
    axios
      .post("http://localhost:8080/votedChamp", voteChamp)
      .catch((error) => console.log(error));
  }, [voteChamp]);

  const myVoteBtnClick = () => {
    setMyIsvoteBtnClicked(true);
    setYourIsvoteBtnClicked(true);
    setMyVoteBtnColor(true);
    setYourVoteBtnColor(false);
    alert("투표가 완료되었습니다!");
    setVoteChamp((prevState) => ({
      ...prevState,
      _id: judgedContentID,
      votedMyChamp: 1,
      votedYourChamp: 0,
    }));
  };

  const yourVoteBtnClick = () => {
    setYourIsvoteBtnClicked(true);
    setMyIsvoteBtnClicked(true);
    setYourVoteBtnColor(true);
    setMyVoteBtnColor(false);
    alert("투표가 완료되었습니다!");
    setVoteChamp((prevState) => ({
      ...prevState,
      _id: judgedContentID,
      votedMyChamp: 0,
      votedYourChamp: 1,
    }));
  };

  return (
    <JurorPostJudgmentStyle>
      <JurorPostJudgmentChampName>
        <JurorPostJudgmentMyRate
          onClick={myVoteBtnClick}
          disabled={isMyVoteBtnClicked}
          myVoteBtnColor={myVoteBtnColor}
        >
          {judgedMyChampClicked}
        </JurorPostJudgmentMyRate>
        <JurorPostJudgementImg>
          <img src={judgedMyChampImg} alt="judgedMyChampImg" />
          <p> {judgedMyChamp}</p>
        </JurorPostJudgementImg>
      </JurorPostJudgmentChampName>
      vs
      <JurorPostJudgmentChampName>
        <JurorPostJudgmentYourRate
          onClick={yourVoteBtnClick}
          disabled={isYourVoteBtnClicked}
          yourVoteBtnColor={yourVoteBtnColor}
        >
          {judgedYourChampClicked}
        </JurorPostJudgmentYourRate>
        <JurorPostJudgementImg>
          <img src={judgedYourChampImg} alt="judgedYourChampImg" />
          <p>{judgedYourChamp}</p>
        </JurorPostJudgementImg>
      </JurorPostJudgmentChampName>
    </JurorPostJudgmentStyle>
  );
};

export default JurorPostJudgmentExplainChoice;

const JurorPostJudgmentStyle = styled.div`
  color: white;
  display: flex;
  width: 240px;
  right: 0;
  justify-content: flex-end;
  align-items: center;
  margin: auto;

  @media (max-width: 767px) {
    justify-content: center;
  }
`;

const JurorPostJudgmentMyRate = styled.button`
  color: white;
  width: 70px;
  height: 70px;
  border: solid 2px #0ac8b897;
  border-radius: 40px;
  margin: 0px 15px 0px 15px;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background-color: #0ac8b897;
  }
  ${(props) =>
    props.myVoteBtnColor &&
    css`
      background-color: #0ac8b897; /* Set the disabled background color */
      border-color: #0ac8b897; /* Set the disabled border color */
      cursor: not-allowed; /* Change cursor to "not allowed" */
    `}
  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed; /* Change cursor to "not allowed" */
    `}
`;

const JurorPostJudgmentYourRate = styled.button`
  color: white;
  width: 70px;
  height: 70px;
  border: solid 2px #0ac8b897;
  border-radius: 40px;
  margin: 0px 15px 0px 15px;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background-color: #0ac8b897;
  }
  ${(props) =>
    props.yourVoteBtnColor &&
    css`
      background-color: #0ac8b897; /* Set the disabled background color */
      border-color: #0ac8b897; /* Set the disabled border color */
      cursor: not-allowed; /* Change cursor to "not allowed" */
    `}
  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed; /* Change cursor to "not allowed" */
    `}
`;

const JurorPostJudgmentChampName = styled.div`
  p {
    font-size: 12px;
    text-align: center;
  }
`;

const JurorPostJudgementImg = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 5px;
  img {
    width: 25px;
    border-radius: 100%;
    border: solid 1px #0ac8b897;
  }
`;
