import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Parikshit');
    const [isPending, setIsPending] = useState(false);

    const history = useHistory();

    const handleSubmit = (e) => {
        setIsPending(true);
        e.preventDefault();
        const blog = { title, body, author };

        fetch('http://localhost:8000/blogs',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(blog)
            })
            .then(() => {
                setIsPending(false);
                console.log("New Blog Added");
                history.push('/');
            });
    }

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label> Blog Title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label> Blog Body:</label>
                <textarea
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>

                <label> Blog Author:</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="Parikshit">Parikshit</option>
                    <option value="Kristy">Kristy</option>
                </select>
                { !isPending &&<button>Add Blog</button> }
                { isPending && <button disabled> Saving...</button>}
            </form>
        </div>
    )
};

export default Create;
