'use client'

import React from 'react'
import Form from './Form'
import Cart from '@components/Header/Cart'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '@redux/dataSlice'
import { useRouter } from 'next/navigation'
import { Button } from '@material-tailwind/react'
import { toast } from 'react-toastify'


function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

function Checkout() {
    const total = useSelector(state => state.total);
    const dispatch = useDispatch();
    const history = useRouter();


    const clearAllCartItems = () => {
        dispatch(clearCart());
        toast.warn(`Your cart has been cleared!`,{
          position: "top-center",
        })
        history.push('/repos')
      }

  return (
    <div className="flex flex-col lg:flex-row justify-between mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <div className="lg:w-1/2 pr-4">
      <Form />
    </div>
    <div className="lg:w-1/2 pl-4 mt-4 lg:mt-0">
      <Cart />
      <div className="mt-6">
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
      <Link
        href="/repos"
        className="flex mt-3 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
      >
        Go To Shopping
      </Link>
    </div>
    </div>
  </div>
  )
}

export default Checkout