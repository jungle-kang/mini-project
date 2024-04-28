import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { Link } from "react-router-dom";

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [roomTitle, setRoomTitle] = useState('');
  const [roomPeople, setRoomPeople] = useState('');
  const [roomList, setRoomList] = useState([
    {
      id: '',
      titles: '',
    }
  ]);
  const [deleted, setDeleted] = useState(false);
  const handleCreateRoom = (title, people) => {
    console.log('방 제목:', title);
    console.log('인원 수:', people);
    // TODO: 방 생성 로직 구현
    setModalOpen(false);
    setRoomTitle(title); // 방 제목 업데이트
    setRoomPeople(people); // 인원 수 업데이트
    setRoomList([{ title, people }, ...roomList]); // 새로운 방을 방 리스트의 맨 앞에 추가
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/rooms`, {
          method: 'GET',
          credentials: 'include'
        })
        const result = await response.json();
        setRoomList(result);
      } catch (e) {
        console.error('fetch error:', e);
      }
    };
    fetchData();

    console.log(roomList);
  }, [deleted]);

  const handleDelete = async (id:string)=>{
    setDeleted(false);
    try {
      const response = await fetch(`/api/rooms/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      if (response) {
        setDeleted(true);
      }
    }catch (e){
      console.error('delete Error: ',e);
    }
  }

  return (
    <main className="w-screen text-center">
      <div className="w-40">
        <button className={'modal-open-btn mt-3'} onClick={() => setModalOpen(true)}>
          방 만들기
        </button>
      </div>

      <div className="w-screen text-center">
        {roomList.map(({ id, titles }) => (
          <div className="flex h-12 pt-2 text-center mx-auto w-80 mt-4 bg-amber-200 rounded-xl hover:bg-amber-300" key={id}>
            <Link className="w-full" to={"/content/" + id}>
              <h4>{titles}</h4> {/* 방 제목 출력 */}
            </Link>
            <button onClick={()=>handleDelete(id)} className="rounded-3xl mb-2 text-center w-10 h-auto mr-2 flex items-center justify-center font-bold">X</button>
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreateRoom={handleCreateRoom}
      />
    </main>
  );
};

export default App;
