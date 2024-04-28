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
    const [editValue, setEditValue] = useState('');

    const [editMode, setEditMode] = useState(null);

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
    }, [submitted, post]);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
    }
    const handleEditChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setEditValue(e.target.value);
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

    const handleDelete = async (postId) => {
        try {
            const response = await fetch(`/api/contents/${postId}`, {
                method: 'DELETE', // DELETE 메소드 사용
                credentials: 'include'
            });
            if (response.ok) {
                setPost(prevPosts => prevPosts.filter(post => post.id !== postId));
            } else {
                console.error('Failed to delete post');
            }
        } catch (e) {
            console.error('Error deleting post: ', e);
        }
    };

    const handleSave = async (postId) => {
        const data = {
            text: editValue,
        };
        try {
            const response = await fetch(`/api/contents/${postId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: 'include'
            });
            if (response.ok) {
                setEditMode(null); // 성공적으로 저장되면 수정 모드 종료
                setSubmitted(true); // 변경사항 적용 후 다시 데이터 불러오기
            } else {
                console.error('Failed to save post');
            }
        } catch (e) {
            console.error('Error saving post: ', e);
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
                {(Array.isArray(post) && post.length === 0) || post[0].id === "" ? (
                    <div className="mt-10">글이 없습니다.</div>
                ) : (<>
                    {post.map(({ id, text }) => (
                        <div className="flex items-center justify-between bg-amber-400 w-1/3 h-40 mt-10 p-4 mx-auto" key={id}>
                            <div className="text-left">
                                {editMode === id ? (
                                    <textarea
                                        className="w-full h-full"
                                        value={editValue}
                                        onChange={handleEditChange}
                                    />
                                ) : (
                                    text
                                )}
                            </div>
                            <div>
                                {editMode === id ? (
                                    <button onClick={() => handleSave(id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                                        저장
                                    </button>
                                ) : (
                                    <button onClick={() => setEditMode(id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                                        수정
                                    </button>
                                )}
                                <button onClick={() => handleDelete(id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    삭제
                                </button>
                            </div>
                        </div>
                        // </div>
                    ))}

                </>)}
            </div>
        </main >
    );
}