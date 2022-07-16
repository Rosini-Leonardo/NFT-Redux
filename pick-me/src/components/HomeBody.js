import React, { useState, useEffect, useCallback } from "react";
import { Box, Button, Container, InputWrapper, Stack } from "./styled";
import { ReactComponent as SearchIcon } from "../images/search-media.svg";
import PhotoSection from "./Photo-Section";
import Paginator from "./Paginator";
import { useDispatch,useSelector } from "react-redux";
import { rowalizer } from '../utils/helpers';

import instance from '../api';
import axios from "axios";
import { catchError, fetchData, saveQuery, updatePage } from "../redux/reducers/api-reducer";

const HomeBody = () => {
  // Utility
  const dispatch = useDispatch();
  const{ 
    photos,
    error,
    loading,
    rate_limit,
    query:lastSearch 
  } = useSelector((state) => state.photos);
  
  // Hooks
  const[ itemPerPage,setItemPerPage ] = useState(lastSearch.itemPerPage || 12);
  const[query,setQuery] = useState(lastSearch.query || ''); // save default query

  // Fetch photos
  const fetchPhotos = (type = "popular",page = 1) =>{
    let apiURL = null; // default unknown

    if(type === "search"){  // Check the matched type
      if(query && query.length > 1 && query !== ""){
        apiURL = `search/photos?query=${query}&`;
      }else{ // if empty send error message
        dispatch(catchError(['Please leave at least one character']));
        return;
      }
    }else{ // default "fallback"
      apiURL = 'photos?';
  };

    dispatch(updatePage(page)); // update current page

    dispatch(fetchData(`${apiURL}per_page=${itemPerPage}&page=${page}`)); // update API
    
    dispatch(saveQuery({
      path:`${apiURL} `.trim(),
      itemPerPage,
      type,
      query
    }));
  };

  // Search the required photo with fetchPhotos function
  const searchPhoto = (page = 1) => {
    fetchPhotos("search",page);
  };
  
  // Call the fetchPhotos 
  useEffect(()=>{
    if(!lastSearch.query){
      fetchPhotos();
    }else{
      fetchPhotos(lastSearch.type);
    }
  },[itemPerPage]);

  return (
    <React.Fragment>
      <Container size='fullWidth'>
        <Container mt='96px'>
          <Stack justify={'space-between'} align='end'>
            
            <h4>search your photos</h4>
            <p style={{ color:'var(--grey-700)' }}> 
              {
                rate_limit.remaining != (null && '' && undefined ) &&
                (rate_limit.total != (null && '' && undefined ))?
                (
                  `Requests: ${rate_limit.remaining} / ${rate_limit.total}`
                ):(
                  `Requests: 50 / 50`
                )
              }
            </p>

          </Stack>
          <Box mt='24px'>
            <Stack
            width='fit-content'
            bg='grey.900'
            borderRadius='100px'
            border='1px solid'
            borderColor={ error?.status ? 'error' : 'grey.700' }
            px='18px'
            style={{
              overflowX:'hidden'
            }}>
              
              {/* Search bar */}
              <InputWrapper 
              pl='0px' 
              border='none'
              value={query}
              placeholder="Search photo" 
              onChange={(e) => { setQuery(e.target.value) }} 
              />
              
              {/* Search bar' icon */}
              <Button 
              variant={'text'}
              disabled={false} 
              isLoading={false} 
              onClick={()=> searchPhoto()}
              // icon 
              iconColor='grey.700'
              rightIcon={<SearchIcon/>} 
              bg='grey.900'
              />
            </Stack>
          </Box>

          {/* Content loading */}
          <Container mt='72px'>
            <Stack // Column photos 
            direction="column"
            spacing='118px'
            >
              
              {!loading &&
              !error.status &&
              (photos?.length > 0 || photos?.results?.length > 0) ? (
                rowalizer(photos?.results ? photos.results : photos).map(
                  (row, index) => <PhotoSection row={row} key={index} />
                )
              ) : !loading && error.status ? (
                <h3>
                  {
                    error?.message && error.message.length > 0?
                    (error.message.join(" ")
                    ):(
                    "Sorry, there was an Error. Try Again"
                  )
                  }
                </h3>
              ):(
                <h3>Loading...</h3>
              )}

              <Stack justify='flex-end'>
                <p style={{ color: 'var(--grey-700)' }} >
                  Item per page 
                  <select 
                  value={itemPerPage} 
                  onChange={(e) => setItemPerPage(e.target.value)} 
                  >  
                  { 
                    Array.from({ length:7 }, (_,index) =>{
                      return (index + 1) * 3; 
                    }).map((el) => {
                      return(
                        <option 
                        value={el} 
                        key={el} 
                        >{el}</option>
                      );
                      })
                    }
                  </select>
                </p>
                </Stack>
              </Stack>
            </Container>
          <Paginator/>
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default HomeBody;