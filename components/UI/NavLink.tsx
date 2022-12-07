import { Button, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'

interface Props {
      route: { name: string, url: string }
}

function NavLink({ route }: Props) {

      const router = useRouter()
      function navigate() {
            router.push(route.url)
      }

      return (
            <Button onClick={navigate} variant='text' sx={{
                  '&:hover': {
                        backgroundColor: 'white'
                  },
                  mr: 2,
                  px: 1.5
            }} >
                  <Typography fontWeight='600' color='black'>{route.name}</Typography>
            </Button>
      )
}

export default NavLink