import { motion } from 'framer-motion';
import React from 'react';
import { Layout } from '../components';
import './styling.css';

export const Dev1: React.FC<any> = (props: any) => {
    const icon = {
        hidden: {
          opacity: 0,
          pathLength: 0,
          fill: "rgba(255, 255, 255, 0)"
        },
        visible: {
          opacity: 1,
          pathLength: 1,
          fill: "rgba(255, 255, 255, 1)"
        }
      };

    return (
        <Layout>
            <div className='body'>
                <div className='container'>
                    <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 100"
                    className="item"
                    >
                    <motion.path
                        d="M0 100V0l50 50 50-50v100L75 75l-25 25-25-25z"
                        variants={icon}
                        initial="hidden"
                        animate="visible"
                        transition={{
                        default: { duration: 2, ease: "easeInOut" },
                        fill: { duration: 2, ease: [1, 0, 0.8, 1] }
                        }}
                    />
                    </motion.svg>
                </div>
            </div>
        </Layout>
    );
}

export const Dev2: React.FC<any> = (props: any) => {
    

    return (
        <Layout>
        </Layout>
    );
}

export const Dev3: React.FC<any> = (props: any) => {
    

    return (
        <Layout>
        </Layout>
    );
}

export const Dev4: React.FC<any> = (props: any) => {
    const icon = {
        hidden: {
            pathLength: 0,
            fill: "rgba(255, 255, 255, 0)"
        },
        visible: {
            pathLength: 1,
            fill: "rgba(255, 255, 255, 1)"
        }
    };

    return (
        <Layout>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                >
                <motion.path
                    d="M0 100V0l50 50 50-50v100L75 75l-25 25-25-25z"
                    variants={icon}
                    initial="hidden"
                    animate="visible"
                />
            </svg>
        </Layout>
    );
}