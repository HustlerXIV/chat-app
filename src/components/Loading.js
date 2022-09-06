import React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const Loading = ({ title }) => (
  <Section className="bg-mainColor bg-opacity-50">
    <Article>
      <ReactLoading type="spinningBubbles" color="#fff" />
      <Topic style={{ color: "#fff", marginTop: "20px" }}>{title}</Topic>
    </Article>
  </Section>
);

const Topic = styled.div`
  font-size: 30px;
  color: #fff;
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  background-color: #02457a;
  opacity: 30%;
`;

const Article = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Loading;
