import { useDeleteCommentMutation, useGetAllMoviesQuery } from '../../redux/api/movies'
import { toast } from 'react-toastify'

const AllComments = () => {
    const {data:movie, refetch} = useGetAllMoviesQuery()

    const [deleteComment] = useDeleteCommentMutation()

  return <div>
    {movie?.map((m)=>{
        <section key={m._id} className="flex flex-col justify-center items-center">
           {m?.reviwes.map((review) => {
                <div 
                 key={review._id}
                 className="bg-[#1A1A1A] p-4 rounded-lg w-[50%] m-[2rem]"
                >
                    <div className="flex justify-between">
                        <strong className="text-[#B0B0B0]">{review.name}</strong>
                        <p className="text-[#B0B0B0]">{review.createdAt.substring(0, 10)}</p>
                    </div>
                    <p classNam="my-4">{review.comment}</p>
                </div>
           })} 
        </section>
    })}
  </div>
}

export default AllComments