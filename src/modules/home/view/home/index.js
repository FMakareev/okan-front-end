import React from 'react';
import { Banner, Heading } from 'rebass';
import ButtonDefault from "../../../../components/ButtonDefault/ButtonDefault";
import Logout from './logout.multicolor.svg';

export const HomePage = () => (
  <Banner
    color="white"
    bg="darken"
    backgroundImage="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20">
    <Heading f={[4, 5, 6, 7]}>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque eius et, eum facere illo obcaecati quibusdam
      sunt! Alias sed, veritatis? Deleniti ducimus enim fuga iste officiis possimus ratione similique voluptatem.
      <br/>
      <Logout/>
      <br/>

      <ButtonDefault variant='primary'>
        ButtonDefault
      </ButtonDefault>
      <br/>
      <ButtonDefault variant='variant.buttons.primary'>
        ButtonDefault
      </ButtonDefault>
      <br/>
      <ButtonDefault variant='buttons.primary'>
        ButtonDefault
      </ButtonDefault>
    </Heading>
  </Banner>
);

export default HomePage;
