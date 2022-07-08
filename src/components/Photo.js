import React, { useState } from "react";
import { Box, Button, Skeleton, Stack } from "./styled";
import { ReactComponent as ColoredCart } from "../images/purple-cart.svg";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/reducers/cart-reducer";

const Card = styled(Box)`
  &:hover{
    .card-action{ // make card appear
      opacity: 1;
      visibility: visible;
      transform: rotateX(0deg);
      height: 100%!important;
    }
  }

  .card-action{
    opacity: 0;
    visibility: hidden;
    transition: all 125ms linear;
    transform: rotateX(-90deg);
    height: 0px;
    overflow: hidden;
  }
`;

const Photo = ({ alt_description, id, likes, urls:{full} }) => {

  const[load,setLoad] = useState(false);
  const dispatch = useDispatch();

  return(
    <React.Fragment>
      <Card
      maxWidth='367px'
      height='343px'
      width='calc(100%)'
      borderRadius='4px 4px 0px 0px'
      overflowX='hidden'
      position='relative'
      style={{ transform: "translateZ(0)" }}
      >
        <Box
        width='100%'
        height='100%'
        >
          <img // NFT images load
          src={full}
          width='100%'
          height='100%'
          alt={alt_description}
          onLoad={()=> setLoad(true)}
          style={{ display: load ? ("block") : ("none") }}
          />
          
          {/* When load is false turn on Skeleton */}
          <Skeleton
          width='100%'
          height='100%'
          style={{
            display: load ? ("none") : ("block")
          }}
          /> 
        </Box>

        {/* 'Money' render (they are like) */}
        <Box 
        bg='white'
        width='100%'
        bottom='0px'
        maxHeight='72px'
        position='absolute'
        className="card-action"
        >
          <Stack
          px='20px'
          width='100%'
          height='100%'
          align='center'
          justify={'space-between'}
          >
            <p style={{ color:'var(--grey-800)' }} 
            >{likes} €</p>

            <Button
            variant='text'
            onClick={()=>  dispatch(addItem({ id,url:full,likes })) }
            rightIcon={<ColoredCart/>}
            iconColor='purple.300'
            >
            </Button>
          </Stack>
        </Box>
      </Card>
    </React.Fragment>
  );
};

export default Photo;
