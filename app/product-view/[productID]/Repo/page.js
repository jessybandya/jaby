'use client'
import { addToCart } from '@redux/dataSlice';
import Link from 'next/link'
import React from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Helmet } from 'react-helmet';
import { Button } from '@material-tailwind/react';
import EmailIcon from '@mui/icons-material/Email';



function Repo({ allData }) {
    const dispatch = useDispatch();
    const date = new Date(allData.created_at);

    // Format the date as a local date and time string
    const localTimeString = date.toLocaleString();

    const handleAddToCart = () => {

        const itemToAdd = {
          id: allData.id,
          name: allData.name,
          price: 12000,
          image: allData.owner.avatar_url,
          quantity: 1,
        };
        
        dispatch(addToCart(itemToAdd));
        toast.success(`"${allData.name}" has been added to your cart!`,{
          position: "top-center",
        }); // Show toast notification
      };

    const WhatsAppProduct= () => {
        const phoneNumber = '+254746749307';
        const productTitle = allData?.name;
        const initialPrice = 12000;
        const formattedPrice = parseFloat(initialPrice).toLocaleString('en-US', { style: 'currency', currency: 'KES' });  
        
        const productMessage = `I want to buy this product:\n\n*Name:* ${productTitle}\n*Price:* ${formattedPrice}`;
        
        const message = encodeURIComponent(productMessage);
        
        const whatsAppLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
        
        window.open(whatsAppLink, '_blank');
      }

      const EmailProduct= () => {
        const recipientEmail = 'jessy.bandya5@gmail.com'
        const subject = encodeURIComponent(`I want to buy this repo: ${allData.name}`);
        const body = encodeURIComponent(`I found this amazing Repo!\n\nName: ${allData.name}\nPrice: 12000`);
    
        const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
        
        window.open(mailtoLink, '_blank');
      }
  return (
    <>
    <Helmet>
    <title>{`${allData?.name}  |  Jaby`}</title>
    <meta name="description" content={allData?.name.slice(0, 100)} />
    <meta property="twitter:image" content={allData?.owner?.avatar_url} />
    <meta property="og:image" content={allData?.owner?.avatar_url} />
    
    {/* Open Graph meta tags */}
    <meta property="og:title" content={allData?.title}  />
    <meta property="og:description" content={allData?.name.slice(0, 100)} />
    <meta property="og:image" content={allData?.owner?.avatar_url}  />

    {/* Twitter Card meta tags */}
    <meta name="twitter:title" content={allData?.name} />
    <meta name="twitter:description" content={allData?.name.slice(0, 100)} />
    <meta name="twitter:image" content={allData?.owner?.avatar_url}  />
  </Helmet>
    <div style={{marginTop:20}} className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-xl rounded-lg">
          <div className="p-4 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-20 w-20 rounded-full"
                  src={allData.owner.avatar_url}
                  alt="Product Image"
                />
              </div>
              <div className="ml-4">
                <h1 className="text-3xl font-semibold text-gray-900">
                  {allData.name}
                </h1>
                <p className="text-gray-500">{allData.owner.login}</p>
                <p className="text-gray-500">Created: {localTimeString}</p>
                <p className="text-green-600 font-semibold mt-2">Ksh12,000</p>
              </div>
            </div>

            <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {allData.visibility}
            </h2>
            <p className="mt-2 text-gray-600">
              <Link target="__blank" href={`${allData.html_url}`}>
              <Button
              variant="outlined"
              color="blue"
              size="regular"
              type="button"
              ripple="light"
              fullWidth={false}
              >
              View From Github
              </Button>
              </Link>
            </p>
          </div>

          <div className="flex space-x-4 mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            onClick={handleAddToCart}
          >
            Add to <span style={{marginLeft:5}}><AddShoppingCartIcon /></span>
          </button>
          <button
            style={{cursor:'pointer'}}
            onClick={WhatsAppProduct}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 flex items-center justify-center"
          >
            Buy Via <span style={{marginLeft:5}}><WhatsAppIcon /></span>
          </button>
          <button
            onClick={EmailProduct}
            style={{backgroundColor:'#EA4335',cursor: 'pointer'}} className="text-white px-4 py-2 rounded transition duration-300 flex items-center justify-center"
          >
            Buy Via <span style={{marginLeft:5}}><EmailIcon /></span>
          </button>
        </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Repo