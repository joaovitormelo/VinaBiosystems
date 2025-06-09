import React from "react";
import { HeaderProps } from "./types";
import { Container, Text, Title, Subtitle, Button } from "./styles";

function Header({ title, subtitle, buttonName, showButton = false, actionButton }: HeaderProps) {
  return (
    <Container>
        <Text>
          <Title>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </Text>

        {showButton && (
          <Button onClick={actionButton}>
            {buttonName}
          </Button>
        )}
    </Container>
  );
};

export default Header;
