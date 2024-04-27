import React, {useEffect, useState} from 'react';
import Modal from './Modal';
import {Link} from "react-router-dom";

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [roomTitle, setRoomTitle] = useState('');
  const [roomPeople, setRoomPeople] = useState('');
  const [roomList, setRoomList] = useState([
      {
          id :'',
          titles:'',
      }
  ]);

  const handleCreateRoom = (title, people) => {
    console.log('방 제목:', title);
    console.log('인원 수:', people);
    // TODO: 방 생성 로직 구현
    setModalOpen(false);
    setRoomTitle(title); // 방 제목 업데이트
    setRoomPeople(people); // 인원 수 업데이트
    setRoomList([{ title, people }, ...roomList]); // 새로운 방을 방 리스트의 맨 앞에 추가
  };
  useEffect(()=>{
      async function fetchData() {
          try{
              const response = await fetch(`/api/room-create/all`,{
                  method:'GET',
                  credentials: 'include'
              })
              const result = await response.json();
              setRoomList(result.data);
          }catch (e){
              console.error('fetch error:',e);
          }
      };
      fetchData();
  },[]);

  return (
    <>
      <div>
        <button className={'modal-open-btn'} onClick={() => setModalOpen(true)}>
          방 만들기
        </button>
      </div>
    
      <div className=''>
        {roomList.map(({id, titles}) => (
          <div className="h-12 pt-2 text-center w-40 mt-4 bg-amber-500" key={id}>
            <Link to={"/content/"+id}>
                <h4>{titles}</h4> {/* 방 제목 출력 */}
            </Link>
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreateRoom={handleCreateRoom}
      />
    </>
  );
};

export default App;
