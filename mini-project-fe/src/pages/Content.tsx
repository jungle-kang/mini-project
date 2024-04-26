import {useParams} from "react-router-dom";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";

export default function Content(){
    const { contentId } = useParams<{ contentId: string }>();
    const [post, setPost] = useState([{
        id: '',
        text: '',
    }]);
    const [inputValue, setInputValue] = useState('');
    useEffect(()=>{
        async function fetchData() {
            try{
                const response = await fetch(`/api/contents/${contentId}`,{
                    method: 'GET',
                    credentials: 'include'
                })
                const data = await response.json();
                setPost(data);
            }catch(e){
                console.error('Error fetching data: ',e);
            }
        }
        fetchData();
    },[]);

    const handleChange = (e:ChangeEvent<HTMLTextAreaElement>)=>{
        setInputValue(e.target.value);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const response = await fetch(`/api/contents/${contentId}`,{
                method:'POST'
            })
        }catch(e){
            console.error('post error:',e);
        }
    };

    return(
        <main className="w-screen text-center">
            <div className="text-5xl font-extrabold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                @Room Contents
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
            {(Array.isArray(post)&& post.length === 0) || post[0].id === null ? (
                <div className="mt-10">글이 없습니다.</div>
            ):(<>
                {post.map(({id,text})=>(
                    <div className="bg-amber-400 w-1/3 h-40 mt-10 p-4 mx-auto" key={id}>
                        {text}
                    </div>
                    ))}
            </>)}
        </main>
    );
}