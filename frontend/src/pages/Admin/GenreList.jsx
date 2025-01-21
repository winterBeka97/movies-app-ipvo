import { useState } from "react";
import { 
    useCreateGenreMutation,
    useListGenresGenresQuery,
    useRemoveGenreMutation,
    useUpdateGenreMutation,
} from '../../redux/api/genre';

import { toast } from "react-toastify";
import GenreForm from "../../component/GenreForm";
import Modal from "../../component/Modal";

const GenreList = () => {
    const {data: genres, refetch} = useListGenresGenresQuery();
    const [name, setName] = useState('');
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [updatingName, setUpdatingName] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const [createGenre] = useCreateGenreMutation();
    const [updateGenre] = useUpdateGenreMutation();
    const [removeGenre] = useRemoveGenreMutation();

    const handleCreateGenre = async (e) => {
        e.preventDefault();

        if (!name) {
            toast.error("Genre name is required");
            return;
        }

        try {
            const result = await createGenre({name}).unwrap();

            if (result.error) {
                toast.error(result.error);
            } else {
                setName("");
                toast.success(`${result.name} genre is created`);
                refetch();
            }
        } catch (error) {
            console.error(error);
            toast.error("Creating the genre has failed. Please try again.")
        }
    };

    const handleUpdateGenre = async (e) => {
        e.preventDefault()

        if (!updatingName) {
            toast.error("Genre name is needed.");
            return;
        }

        try {
            const result = await updateGenre({
                id: selectedGenre._id,
                updateGenre: {
                    name: updatingName,
                }
            }).unwrap();

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(`${result.name} is updated`);
                refetch();
                setSelectedGenre(null);
                setUpdatingName("");
                setModalVisible(false);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveGenre = async () => {
        try {
            const result = await removeGenre(selectedGenre._id).unwrap();

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success(`${result.name} has been deleted.`);
                refetch();
                setSelectedGenre(null);
                setModalVisible(false);
            }
        } catch (error) {
            console.error(error);
            toast.error("Genre deletion has failed. Try again.");
        }
    };
    return <div className="ml-[10rem] flex flex-col md:flex-row">
        <div className="md:w-3/4 p-3">
            <h1 className="h-12">Manage Genres</h1>
            <GenreForm value={name} setValue={setName} handleSubmit={handleCreateGenre} />

            <br />

            <div className="flex flex-wrap">
                {genres?.map((genre) => (
                    <div key={genre._id}>
                        <button className="bg-white border border-teal-500 text-teal-500 py-2 
                        px-4 rounded-lg m-3 hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 f
                        ocus:ring-teal-500 focus:ring-opacity-50" onClick={() => {
                            {
                                setModalVisible(true);
                                setSelectedGenre(genre);
                                setUpdatingName(genre.name);

                            }
                        }}>{genre.name}</button>
                    </div>
                ))}
            </div>
            
            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                <GenreForm
                    value={updatingName}
                    setValue={(value) => setUpdatingName(value)}
                    handleSubmit={handleUpdateGenre}
                    buttonText="Update"
                    handleRemove={handleRemoveGenre}
                />
            </Modal>
        </div>
    </div>;
};

export default GenreList;