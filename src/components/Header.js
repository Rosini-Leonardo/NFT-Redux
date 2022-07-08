import React from "react";
import { ReactComponent as Logo } from "../images/logo.svg";
import { ReactComponent as CartIcon } from "../images/cart.svg";
import { Link } from "react-router-dom";
import { Container, Stack, Box, Button } from "./styled";

const Header = () => {
  return (
    <React.Fragment>
      <Container size='fullWidth' position='fixed' background='grey.800' zIndex={999} >
        <Stack direction="column" align='center'>
          <Container>
            
            {/* Container that center content */}
            <Stack 
            height={['64px','72px']} // media query (mob-desk)
            justify='space-between' 
            align='center' 
            width='100%'
            >

              <Link to='/' style={{textDecoration:'none'}}>
                <Logo/> 
              </Link>

              <Link to='/checkout'>
                <Button variant='text'>
                  <CartIcon/>
                </Button>
              </Link>

            </Stack>
          </Container>
        </Stack>
      </Container>
      
      <Box height={['64px','72px']} width='100%'/>
    </React.Fragment>
  );
};

export default Header;
