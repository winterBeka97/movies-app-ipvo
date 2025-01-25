import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";
import RealtimeCard from "./RealtimeCard";

import { useGetTopMovieQuery, useGetAllMoviesQuery } from "../../../../redux/api/movies";
import { useGetUsersQuery } from "../../../../redux/api/users";


const Main = () => {
    const {data: topMovies} = useGetTopMovieQuery();
    const {data: visitors} = useGetUsersQuery();
    const {data: allMovies} = useGetAllMoviesQuery();   

    const totalCommentsLength = allMovies?.map((m) => m.numReviews);
    const sumOfCommentsLength = totalCommentsLength?.reduce((acc, length) => acc + length, 0);

    return (
    <div>
        <section className="flex justify-around">
            <div className="ml-[14rem] mt-10">
                <div className="-translate-x-4 flex">
                    <SecondaryCard 
                        pill="Users"
                        content={visitors?.length}
                        info= "Info"
                        gradient="from-teal-500 to-lime-400"
                    />
                    <SecondaryCard 
                        pill="Comments"
                        content={sumOfCommentsLength}
                        info= "Info"
                        gradient="from-[#CCC514] to-[#CDCB8E]"
                    />
                    <SecondaryCard 
                        pill="Movies"
                        content={allMovies?.length}
                        info= "Info"
                        gradient="from-green-500 to-lime-400"
                    />
                </div>
                <div className="flex justify-between w-[90%] text-white mt-10 font-bold">
                    <p>Top Content</p>
                    <p>Comments</p>
                </div>

                {topMovies?.map((movie) => (
                    <VideoCard 
                        key={movie._id}
                        image={movie.image}
                        title={movie.name}
                        date={movie.year}
                        comments={movie.numReviews}
                    />
                ))}
            </div>

            <div>
                <RealtimeCard />
            </div>
        </section>
    </div>
  );
};

export default Main;