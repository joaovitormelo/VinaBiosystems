import React from "react";
import { HeaderProps } from "./types";
import { Container, Title, Subtitle, Button } from "./styles";

function Header({ title, subtitle, buttonName, showButton, actionButton }: HeaderProps) {
  return (
    <Container>
      <div>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </div>

      {showButton && (
        <Button onClick={actionButton}>
          {buttonName}
        </Button>
      )}
    </Container>
  );
};

export default Header;
