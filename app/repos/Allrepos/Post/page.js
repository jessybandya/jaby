import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
  } from "@material-tailwind/react";
  import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
  import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useDispatch } from 'react-redux';
import { addToCart } from '@redux/dataSlice';
import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';

function Post({ repo }) {
    const [size, setSize] = React.useState(null);
    const dispatch = useDispatch();
    const date = new Date(repo.created_at);

    // Format the date as a local date and time string
    const localTimeString = date.toLocaleString();

 
    const handleOpen = (value) => setSize(value);
    const handleAddToCart = () => {

      const itemToAdd = {
        id: repo.id,
        name: repo.name,
        price: 12000,
        image: repo.owner.avatar_url,
        quantity: 1,
      };
      
      dispatch(addToCart(itemToAdd));
      toast.success(`"${repo.name}" has been added to your cart!`,{
        position: "top-center",
      }); // Show toast notification
    };


    const EmailProduct= () => {
      const recipientEmail = 'jessy.bandya5@gmail.com'
      const subject = encodeURIComponent(`I want to buy this repo: ${repo.name}`);
      const body = encodeURIComponent(`I found this amazing repo!\n\nName: ${repo.name}\nPrice: 12000`);
  
      const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
      
      window.open(mailtoLink, '_blank');
    }

    const WhatsAppProduct= () => {
      const phoneNumber = '+254746749307';
      const productTitle = repo?.name;
      const initialPrice = 12000;
      const formattedPrice = parseFloat(initialPrice).toLocaleString('en-US', { style: 'currency', currency: 'KES' });  
      
      const productMessage = `I want to buy this product:\n\n*Name:* ${productTitle}\n*Price:* ${formattedPrice}`;
      
      const message = encodeURIComponent(productMessage);
      
      const whatsAppLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
      
      window.open(whatsAppLink, '_blank');
    }
    
  return (
    <Card className="w-full max-w-[26rem] shadow-lg">
    <Link href={`/product-view/${repo.id}`}>
    <CardBody>
      <div className="mb-3 flex items-center justify-between">
        <Typography variant="h5" color="blue-gray" className="font-medium">
          Ksh 12,000
        </Typography>
        <Typography
          color="blue-gray"
          className="flex items-center gap-1.5 font-normal"
        >
          {repo.visibility}
        </Typography>
      </div>
      <Typography color="gray">
      {repo.name}
    </Typography>
    </CardBody>
    </Link>
    <CardFooter style={{display:'flex',alignItems:'center', justifyContent:'space-between', bottom:0}} className="pt-0">
       <span style={{cursor:'pointer'}} onClick={handleAddToCart}><AddShoppingCartIcon /></span>
       <span style={{cursor:'pointer'}} onClick={() => handleOpen("lg")}><RemoveRedEyeIcon /></span>
    </CardFooter>

    <Dialog
        open={
          size === "lg"
        }
        size={size || "md"}
        handler={handleOpen}
      >
        <DialogHeader>Modal</DialogHeader>
        <DialogBody divider>
        <ToastContainer/>
        <div className="bg-gray-100">
          <div className="bg-white overflow-hidden shadow-xl rounded-lg">
            <div className="p-4 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-20 w-20 rounded-full"
                    src={repo.owner.avatar_url}
                    alt="Product Image"
                  />
                </div>
                <div className="ml-4">
                  <h1 className="text-3xl font-semibold text-gray-900">
                    {repo.name}
                  </h1>
                  <p className="text-gray-500">{repo.owner.login}</p>
                  <p className="text-gray-500">Created: {localTimeString}</p>
                  <p className="text-green-600 font-semibold mt-2">Ksh12,000</p>
                </div>
              </div>
  
              <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  {repo.visibility}
                </h2>
                <p className="mt-2 text-gray-600">
                  <Link target="__blank" href={`${repo.html_url}`}>
                  <Button
                  variant="outlined"
                  color="blue"
                  size="regular"
                  type="button"
                  ripple="light"
                  fullWidth={true}
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
        </DialogBody>
        <DialogFooter>
          <Button
            variant="gradient"
            color="green"
            onClick={() => handleOpen(null)}
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
  </Card>
  )
}

export default Post