import React from "react";

import { Container, TextButton } from "./styles";

const Button = ({ name, onPress }) => {
  return (
    <Container>
      <TextButton onClick={() => onPress()}>{name}</TextButton>
    </Container>
  );
};

export default Button;
