import React from 'react';
import { Heading } from "@chakra-ui/react";
import { LandingButton, Layout } from '../components';

export const LandingPage: React.FC<any> = (props: any)=>{

    return (
        <Layout>
            <Heading padding='30px' textAlign="center">THECHEESECAKECONNECT</ Heading>
            <LandingButton />
        </Layout>
    );
}

