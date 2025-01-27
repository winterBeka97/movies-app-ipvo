import { useGetNewMovieQuery } from '../../redux/api/movies';
import { Link } from 'react-router-dom';
import SliderUtil from '../../component/SliderUtil';

const Header = () => {
    const { data } = useGetNewMovieQuery();

    return (
    <div className='flex flex-col mt-[2rem] ml-[2rem] md:flex-row items-center md:items-start'>
        <nav className='w-full md:w-[10rem] ml-0 md:ml-2 mb-4 md:mb-0'>
            <Link to={'/'} className='transition duration-300 ease-in-out hover:bg-teal-200  block pl-6 p-2 rounded mb-1 md:mb-2 text-lg w-[60%]'>
                Home
            </Link>
            <Link to={'/movies'} className='transition duration-300 ease-in-out hover:bg-teal-200  block pl-5 p-2 rounded mb-1 md:mb-2 text-lg w-[60%]'>
                Movies
            </Link>
        </nav>

        <div className='w-full md:w-[80%] mr-0 pl-[0.5rem] md:mr-2'>
            <SliderUtil data={data} />
        </div>
    </div>
    
  );
};

export default Header;