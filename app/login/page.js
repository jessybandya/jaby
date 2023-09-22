'use client'
import { auth } from '@components/firebase'
import { updateAuthId, updatetest } from '@redux/dataSlice'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import Swal from 'sweetalert2'
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
  Input,
} from "@material-tailwind/react";
import Reset from './Reset'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useRouter()
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);




    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if(user){
          const idTokenResult = await user.getIdTokenResult()
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              email: user.email,
              token: idTokenResult.token,
              
            }
          })
          dispatch(updateAuthId(`${user?.uid}`))
  
        }
      })
      return () => unsubscribe()
    }, [])

    const login = () =>{
        setLoading(true)
       if(!email){
        toast.error('Email is required!',{
            position: "top-center",
        })
        setLoading(false)
       }else if(!password){
        toast.error('Password is required!',{
            position: "top-center",
        })
        setLoading(false)
    }else{
        setLoading(true)
        auth.signInWithEmailAndPassword(email,password)
        .then((auth) =>{
          setLoading(false)
            history.push('/')
          Swal.fire({
            icon: 'success',
            title: 'Logged in successfully!',
            text: 'Welcome Back!',            
          })
        })
        .catch((e) =>{
                toast.error(e.message, {
                  position: toast.POSITION.TOP_CENTER
              })      
              setLoading(false)     
        })
    }
    }

    const pageTitle = "Login Page | Jaby";
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
    <section className="bg-gray-50 dark:bg-gray-900" style={{paddingTop:30}}>
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Link href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
      <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-10 App-logo" alt="Jaby Logo" />
      </Link>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign In to Your Account
              </h1>
              <div className="space-y-4 md:space-y-6">
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input 
                      value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input 
                      value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div className="flex items-center justify-between">
                      <span  onClick={() => setOpen(true)} style={{cursor:'pointer'}} className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</span>
                  </div>
                  <button onClick={login} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{loading ? "Signin In..." : "Sign In"}</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <Link href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                  </p>
              </div>
          </div>
      </div>
  </div>
</section>

<Dialog
size="xs"
open={open}
handler={() => setOpen(false)}
className="bg-transparent shadow-none"
style={{zIndex:9999}}
>
<ToastContainer/>

<Card className="mx-auto w-full max-w-[24rem]">
  <CardHeader
    variant="gradient"
    color="blue"
    className="mb-4 grid h-28 place-items-center"
  >
    <Typography variant="h3" color="white">
      Password Reset
    </Typography>
  </CardHeader>
   <Reset setOpen={setOpen}/>
</Card>
</Dialog>
</>
  )
}

export default Login