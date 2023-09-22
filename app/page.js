'use client'
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@material-tailwind/react';

const page = () => {
  const pageTitle = "Welcome to Sample Repos Web";
  const pageDescription = "Discover a range of repositories";
  const imageUrl = "https://flowbite.com/docs/images/logo.svg";

  return (
    <div>
    <Helmet>
    <title>{pageTitle}</title>
    <meta name="description" content={pageDescription} />

    {/* Open Graph meta tags */}
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={pageDescription} />
    <meta property="og:image" content={imageUrl} />

    {/* Twitter Card meta tags */}
    <meta name="twitter:title" content={pageTitle} />
    <meta name="twitter:description" content={pageDescription} />
    <meta name="twitter:image" content={imageUrl} />
  </Helmet>
  <div
  className="bg-cover bg-center h-screen"
  style={{
    backgroundImage: "linear-gradient(to bottom, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.8)), url('https://androidkenya.com/wp-content/uploads/2023/02/safaricom_m-pesa_banner.jpg')",
    marginBottom:-70
  }}
>  <div className="flex flex-col justify-center items-center h-full text-white">
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-5xl font-extrabold mb-4"
    >
      Welcome to My Repo Store
    </motion.h1>
    <motion.p
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="text-lg text-center"
    >
      Buy and pay for repos easily via <span style={{fontWeight:'bold',color:'#2EFF2E'}}>M-Pesa</span> right within our platform.
      <center className='mt-10'>
      <Link href='/repos'>
      <Button color="blue">Shop My Repos</Button>
      </Link>
      </center>
    </motion.p>
  </div>
</div>
    </div>
  );
};

export default page;
