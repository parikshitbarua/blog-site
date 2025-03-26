import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => {
    const { id } = useParams();
    const { data: blog, isPending, error } = useFetch(`http://localhost:8000/blogs/${id}`);
    const history = useHistory();

    const handleDelete = () => {
        fetch('http://localhost:8000/blogs/' + id, {
            method: "DELETE"
        }).then((data) => {
            console.log("deleted successfully");
            history.push('/');
        }).catch(error => console.log(error));
    }

    return (
        <div className="blog-details">
            { isPending && <div>Loading</div> }
            { error && <div>{ error }</div> }
            { blog &&
                <article>
                    <h2> { blog.title }</h2>
                    <p>Written by { blog.author }</p>
                    <br></br>
                    <div> { blog.body }</div>
                    <button onClick={handleDelete}>Delete</button>
                </article>
            }
        </div>
    )
}

export default BlogDetails;
