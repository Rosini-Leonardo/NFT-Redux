import React from "react";
import { ReactComponent as Logo } from "../images/logo-footer.svg";
import { Container, Stack, Box } from "./styled";

const Footer = () => {
  return(
    <Container size='fullWidth' mt={['36px','96px']} pb='72px'>

      <Container>
        <Stack width='100%' justify={'flex-start'}>
          <Stack align={'start'} spacing='20px'>
            <Box>
              <Logo/>
            </Box>
            <Stack 
            direction="column" 
            spacing={'20px'}
            align={'start'} 
            height='100%' 
            >
              <Box>Pick me</Box>
              <Box color="grey.600" >Lorem ipsum dolor sit.</Box>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Container>
  );
};

export default Footer;
