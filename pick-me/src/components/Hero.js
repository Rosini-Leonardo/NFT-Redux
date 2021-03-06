import React from "react";
import styled from "styled-components";
import NftImage from "../images/nft-img.png";
import { ReactComponent as RightIcon } from "../images/right-arrow.svg";
import { Container, Button, Stack, Box } from "../components/styled";

// Take the Button component and style from itself
const CustomButton = styled(Button)`
  padding-left:0px;
  svg{
    margin-left:16px;
    & > *{
      fill:#f31caa;
    } 
  }
`;

// Custom the Stack component
const CustomStack = styled(Stack)`
  @media screen and (max-width:767px) {
    flex-direction: column;
    
    & > *{
      margin-left: 0px;
      margin-top: 24px;
    }
  }
`;

// main component 
const Hero = () => {
  return(
    <React.Fragment>
      <Container mt={['24px','72px']}>
        <CustomStack spacing='118px'>
          <Stack direction="column" align={"start"} spacing="48px" flex='1 1 auto'>
            
            {/* Title */}
            <Box>
              <h1> The easiest way to buy Photos as NFT. </h1>
            </Box>

            <CustomButton 
            variant='text' 
            size={['lg','xl']} // media query 
            rightIcon={<RightIcon/>}
            >Start now
            </CustomButton>

          </Stack>

          {/* NFT image container */}
          <Box
          width='100%'
          height='356px'
          position='relative'
          borderRadius='16px'
          overflow='hidden'
          display='flex'
          style={{
            transform:"translateZ(0)",
          }}
          > <img 
          src={NftImage} 
          alt='text' 
          style={{ 
            position:'absolute', 
            width:'100%', 
            height:'100%' 
          }}
          />
          </Box>
        </CustomStack>
      </Container>
    </React.Fragment>
);
};

export default Hero;
