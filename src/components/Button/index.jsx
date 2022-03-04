import React from "react";

import { Container, TextButton } from "./styles";

const Button: React.FC = ({ name, onPress }) => {
  return (
    <Container>
      <TextButton onClick={() => onPress()}>{name}</TextButton>
    </Container>
  );
};

export default Button;
