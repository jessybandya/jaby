"use client"

import React, {Fragment, useState} from "react";
import {
  Navbar,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Drawer,
  IconButton,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Badge } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Cart";
import { clearCart, updateAuthId } from "@redux/dataSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { auth, db } from "@components/firebase";
import { useEffect } from "react";

function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [open, setOpen] = useState(false)
  const cart = useSelector(state => state.cart);
  const total = useSelector(state => state.total);
  const dispatch = useDispatch();
  const authId = useSelector(state => state.authId);
  const history = useRouter();
  const [currentUser, setCurrentUser] = React.useState(null);


  React.useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      unsub();
      if (user) {
        db.collection('users').doc(`${user?.uid}`).onSnapshot((doc) => {
          setCurrentUser(doc.data());
        });
      } else {
        // not logged in
      }
    });
  }, []);

  const clearAllCartItems = () => {
    dispatch(clearCart());
    toast.warn(`Your cart has been cleared!`,{
      position: "top-center",
    })
  }

  const logout = async() => {
    try {
      await auth.signOut();
      Swal.fire({
        icon: 'success',
        title: 'Logged out successfully!',
        text: 'You have been logged out successfully!',
        showConfirmButton: false,
        timer: 3000
      })
      dispatch(updateAuthId(''));
      history.push('/login')
    } catch (error) {
      console.error('Error signing out:', error.message);
    }


  }


  return (
    <>
    <Navbar style={{zIndex:100}} className="mx-auto max-w-screen-xl p-2 lg:rounded-full fixed top-0 left-0 right-0">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Link href="/" className="flex items-center">
          <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-8 App-logo" alt="Jaby Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white"><i>Jaby</i></span>
        </Link>
         <div className="ml-auto mr-2">
         <Link href="/repos" style={{ fontWeight: 'bold', marginRight: '5px' }} className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-1 lg:px-1 py-2 lg:py-2.5 mr-1 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Repos</Link>
         <Badge onClick={() => setOpen(true)} color="primary" style={{ fontWeight: 'bold', marginRight: '15px', cursor: 'pointer' }} badgeContent={cart.length}>
           <span>
             <ShoppingCartIcon />
           </span>
         </Badge>
         </div>
         <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <div>
        {authId ?(
          <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          >
            <Avatar
              variant="circular"
              size="sm"
              alt={currentUser?.name}
              className="border border-gray-900 p-0.5"
              src={currentUser?.profilePhoto}
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        ):(
        <div>
        <Link href="/login" style={{ fontWeight: 'bold', marginRight: '5px' }} className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-1 lg:px-1 py-2 lg:py-2.5 mr-1 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Login</Link>
        <Link href="/register" style={{ fontWeight: 'bold', marginRight: '5px' }} className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-1 lg:px-1 py-2 lg:py-2.5 mr-1 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Register</Link>
        </div>
        )}

        </div>
  
         <MenuList className="p-1">
         <MenuItem
         onClick={logout}
         style={{display:'flex', alignItems:'center'}}
       >
       <span>
       <PowerIcon className='h-4 w-4 text-red-500'/> 
       </span>
         <Typography
           as="span"
           variant="small"
           className="font-normal"
           color='red'
           style={{marginLeft:'5px'}}
         >
           Sign Out
         </Typography>
       </MenuItem>
         </MenuList>
       </Menu>
      </div>
    </Navbar>

    <Transition.Root show={open} as={Fragment}>
    <Dialog style={{zIndex:101}} as="div" className="relative z-10" onClose={setOpen}>
      <Transition.Child
        as={Fragment}
        enter="ease-in-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in-out duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setOpen(false)}
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div  className="flow-root">
                        <Cart />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div style={{alignItems:'center'}} className="flex justify-between text-base font-medium text-gray-900">
                      <p>      
                      <Button
                      size="lg"
                      variant="outlined"
                      color="light-blue"
                      className="overflow-hidden"
                      onClick={clearAllCartItems}
                    >
                      Clear
                    </Button></p>
                      <p>Subtotal: Ksh.{numberWithCommas(parseFloat(total).toFixed(2))}</p>
                    </div>
                    {cart.length > 0 &&(
                      <div className="mt-6">
                      <Link
                        href="/checkout"
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Checkout
                      </Link>
                    </div>
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
    </>
  );
}
