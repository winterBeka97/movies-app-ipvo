import Header from "./Movies/Header";
import MoviesContainerPage from "./Movies/MoviesContainerPage";

const Home = () => { 
    return (
        <>
            <Header/>

            <section className="mt-[6rem]">
                <MoviesContainerPage />
            </section>
        </>
    );
};

export default Home;