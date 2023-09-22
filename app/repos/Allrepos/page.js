'use client'

import React, { useState } from 'react';
import Post from './Post/page';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Helmet } from 'react-helmet';

function Allrepos({ allData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Calculate the indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the data to display only the items for the current page
  const currentData = allData.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(allData.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  React.useEffect(() => {
     scrollTo(0, 0)
  }, [currentPage])
  

  const pageTitle = "Sample Repos Shopping";
  const pageDescription = "Discover a range of repositories";
  const imageUrl = "https://flowbite.com/docs/images/logo.svg";

  return (
    <>
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
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <center style={{ color: '#000' }}>
          <i style={{ fontSize: 20 }}>My Sample Repos</i>
        </center>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {currentData.map((repo) => (
            <Post key={repo.id} repo={repo} />
          ))}
        </div>

        <nav>
          <ul className="flex justify-center mt-8">
            <li>
              <a
              style={{cursor: 'pointer'}}
                className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
                aria-label="Previous"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
              <ArrowBackIosIcon className="material-icons text-sm"/>
              </a>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index}>
                <a
                  href="#"
                  className={`mx-1 flex h-9 w-9 items-center justify-center rounded-full ${
                    currentPage === index + 1
                      ? 'bg-pink-500 text-white shadow-md'
                      : 'border border-blue-gray-100 bg-transparent text-blue-gray-500 hover:bg-light-300'
                  } p-0 text-sm`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </a>
              </li>
            ))}
            <li>
              <a
              style={{cursor: 'pointer'}}
                className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
                aria-label="Next"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ArrowForwardIosIcon className="material-icons text-sm"/>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    </>
  );
}

export default Allrepos;
