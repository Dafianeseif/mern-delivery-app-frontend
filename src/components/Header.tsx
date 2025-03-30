import { Link } from 'react-router-dom'
import MobileNav from './MobileNav'
import MainNav from './MainNav'

export default function Header() {
  return (
    <div className='border-b-3 border-b-green-700'>
    <div className='container mx-auto bg-green-700 text-white flex justify-between items-center '>
        <Link 
        to="/" 
        className='text-3xl font-bold tracking-tight '>
        RS.Delivery
        </Link>
        <div className='md:hidden'>
        <MobileNav/>        
        </div>
        <div className='hidden md:block'>
          <MainNav></MainNav>
        </div>
    </div>
    </div>
  )
}
