import React from "react";
import Layout from "../components/layout";

import { Box, Container, InputWrapper, Skeleton, Stack , Button} from '../components/styled';
import Hero from '../components/Hero';
import HomeBody from "../components/HomeBody";

const HomePage = () => {
  return (
    <Layout>
      <Container size='fullWidth'>
        <Hero/>
        <HomeBody/>
      </Container>
    </Layout>
  );
};

export default HomePage;
