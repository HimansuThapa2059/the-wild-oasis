import styled from "styled-components";
import GlobalStyles from "@/styles/GlobalStyles";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import Heading from "@/ui/Heading";
import Row from "./ui/Row";

const StyledApp = styled.main`
  padding: 1rem;
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row>
          <Row type="horizontal">
            <Heading as="h1">The Wild Oasis</Heading>
            <div>
              <Heading as="h3">Your dream destination</Heading>
              <Button onClick={() => alert("You clicked the button")}>
                CheckIn
              </Button>
              <Button
                size="medium"
                variation="danger"
                onClick={() => alert("You clicked the button")}
              >
                CheckOut
              </Button>
            </div>
          </Row>
          <Row>
            <Heading as="h2">form</Heading>

            <div>
              <Input type="number" placeholder="Number of guests" />
              <Input type="number" placeholder="Number of groups" />
            </div>
          </Row>
        </Row>
      </StyledApp>
    </>
  );
};

export default App;
