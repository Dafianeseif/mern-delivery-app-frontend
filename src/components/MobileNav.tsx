import { CircleUserRound, Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui/sheet'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { useAuth0 } from '@auth0/auth0-react'
import MobileNavLinks from './MobileNavLinks'

export default function MobileNav() {
    
    const {isAuthenticated,loginWithRedirect,user} = useAuth0();

  return (
    <Sheet>
     <SheetTrigger>
        <Menu className='text-green-500 '/>   
     </SheetTrigger> 
     <SheetContent className='space-y-3'>
        <SheetTitle>
            {isAuthenticated ? ( <span className='flex items-center font-bold gap-2'>
                <CircleUserRound className='text-green-500' />
                {user?.name}
            </span>) :
             (<span>Welcome to RS Delivry!</span>)}   
        </SheetTitle>
        <Separator>
            <SheetDescription className='flex flex-col gap-4'>
                {isAuthenticated ? (
                    <MobileNavLinks/>
                ):(  
                <Button 
                    onClick={() => loginWithRedirect()}
                className='flex-1 font-bold bg-green-500'>Log In </Button>
                )}
            </SheetDescription>
        </Separator>
     </SheetContent>
    </Sheet>  );
};
