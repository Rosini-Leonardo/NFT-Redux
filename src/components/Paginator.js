import React from "react";
import { Button, Container, Stack } from "./styled";
import { ReactComponent as LeftIcon } from "../images/left-arrow.svg";
import { ReactComponent as RightIcon } from "../images/small-right-arrow.svg";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Paginator = () => {
  const { currentPage,hasPrevPage,hasNextPage } = useSelector((store) => store.photos.pagination)

  function paginationFLex(){
    if( !hasNextPage && hasPrevPage ){
      return 'flex-start';
    }else if( hasNextPage && !hasPrevPage ){
      return 'flex-end';
    }else{
      return 'space-between';
    }
  }

  return(
    <React.Fragment>
      <Container size='fullWidth' mt='118px' >
        <Container>
          <Stack justify={paginationFLex()} align='center' width='100%' >

            {
              // Check if has prev page
              hasPrevPage && (
                /* PREV BUTTON */
                <Link 
                to={ parseInt(currentPage,10) === 2 ? '/' : `/photo/${parseInt(currentPage, 10) - 1}`} 
                style={{ textDecoration:'none' }} 
                >
                  <Button 
                  size='md' 
                  variant='outlined'
                  leftIcon={<LeftIcon/>}
                  iconColor='purple.300'
                  >Prev</Button>
                </Link>
              )
            }

            {
              // Check if has next page
              hasNextPage && (
                /* NEXT BUTTON */
                <Link 
                to={`/photo/${parseInt(currentPage, 10) + 1}`}
                style={{ textDecoration:'none' }} 
                >
                  <Button 
                  size='md' 
                  variant='outlined'
                  rightIcon={<RightIcon/>}
                  iconColor='purple.300'
                  >Next</Button>
                </Link>

              )
            }
            
          </Stack>
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default Paginator;