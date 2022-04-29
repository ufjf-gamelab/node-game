import React from "react";

import { Container, TextButton } from "./styles";

export default function ({ name, onPress, style }) {
  return (
    <Container style={{ ...style }} onClick={() => onPress()}>
      <TextButton>{name}</TextButton>
    </Container>
  );
}
