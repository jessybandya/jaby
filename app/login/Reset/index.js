import { Button, CardBody, CardFooter, Input } from '@material-tailwind/react'
import React from 'react'
import Swal from 'sweetalert2'

function Reset({setOpen}) {
  return (
    <div>
    <CardBody className="flex flex-col gap-4">
    <Input label="Email" size="lg" 

    />
  </CardBody>
  <CardFooter className="pt-0">
    <Button onClick={() => 
    Swal.fire({
        icon: 'info',
        title: 'Ooops!',
        text: 'This feature is not yet available!',
        customClass: {
            container: 'my-swal-container', // Add a custom CSS class name
        }
    })
    } variant="gradient" fullWidth>
        Reset Password
    </Button>
  </CardFooter>
    </div>
  )
}

export default Reset