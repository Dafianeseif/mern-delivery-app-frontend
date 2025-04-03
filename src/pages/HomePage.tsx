
import landingImage from '../assets/lod.jpg'; 
import appDownloadImage from '../assets/appDownload.png';
import SearchBar, { SearchForm } from '@/components/SearchBar';
import { useNavigate } from 'react-router-dom';
export default function HomePage() {
  const navigate = useNavigate();
  const handleSearchSumbit =(searchFormValues:SearchForm)=>{
    navigate({
      pathname:`/search/${searchFormValues.searchQuery}`,
    })
  }
  return (
    <div className='flex flex-col gap-12'>
        <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-6">
            <h1 className='text-5xl font-bold tracking-tight text-green-600'>Tuck into a take away today</h1>
            <span className="text-xl ">Food is just a click away!</span>
            <SearchBar placeHolder="Search by City or Town" onSubmit={handleSearchSumbit}/>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
            <img src={landingImage} />
            <div className="flex flex-col items-center justify-center gap-4 text-center">
                <span className='text-3xl font-bold tracking-tighter'>Order take away even faster!</span>
                <span>Download the RS Delivery App for faster ordering and personalised recommendations</span>
                <img src={appDownloadImage} />
            </div>
        </div>
    </div>

  )
}
