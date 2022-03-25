import React from 'react';
import { Flex, Heading, Image, Button } from "@chakra-ui/react";
import { FaInstagram } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import { LandingButton, Layout } from '../components';

export const LandingPage: React.FC<any> = (props: any)=>{

    return (
        <Layout>
            <Heading padding='30px' textAlign="center">THECHEESECAKECONNECT</ Heading>
            <LandingButton />
        </Layout>
    );
}

