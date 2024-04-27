import { Link, useParams } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function Content() {
    const { contentId } = useParams<{ contentId: string }>();
    const [post, setPost] = useState([{
        id: '',
        text: '',
        room_id: {
            id: '',
            titles: '',
        }
    }]);
    const [submitted, setSubmitted] = useState(false);
    const [inputValue, setInputValue] = useState('');
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`/api/contents/${contentId}`, {
                    method: 'GET',
                    credentials: 'include'
                })
                const data = await response.json();
                setPost(data);
            } catch (e) {
                console.error('Error fetching data: ', e);
            }
        }
        fetchData();
    }, [submitted]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(false);
        const data = {
            text: inputValue,
            roomId: contentId === undefined ? '' : contentId,
        }
        console.log(JSON.stringify(data));
        try {
            const response = await fetch(`/api/contents/${contentId}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })
            const result = await response.json();
            console.log(result);
            setSubmitted(true);
        } catch (e) {
            console.error('post error:', e);
        }
    };

    return (
        <main className="flex w-screen text-center">
            <Link to="/" className="w-20">
                <button>뒤로</button>
            </Link>
            <div className="w-full">
                <div className="text-5xl font-extrabold">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                        {post[0].room_id.titles}
                    </span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mt-10">
                        <textarea
                            value={inputValue}
                            onChange={handleChange}
                            className="mb-3 w-1/3 h-40 bg-amber-100">
                        </textarea>
                    </div>
                    <button type="submit" className="bg-blue-300 font-bold text-white">글 작성</button>
                </form>
                {(Array.isArray(post) && post.length === 0) || post[0].id === null ? (
                    <div className="mt-10">글이 없습니다.</div>
                ) : (<>
                    {post.map(({ id, text }) => (
                        <div className="bg-amber-400 w-1/3 h-40 mt-10 p-4 mx-auto" key={id}>
                            {text}
                        </div>
                    ))}
                </>)}
            </div>
        </main>
    );
}