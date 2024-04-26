import React, { useState } from 'react';
import Modal from './Modal';

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [roomTitle, setRoomTitle] = useState('');
  const [roomPeople, setRoomPeople] = useState('');
  const [roomList, setRoomList] = useState([]);

  const handleCreateRoom = (title, people) => {
    console.log('방 제목:', title);
    console.log('인원 수:', people);
    // TODO: 방 생성 로직 구현
    setModalOpen(false);
    setRoomTitle(title); // 방 제목 업데이트
    setRoomPeople(people); // 인원 수 업데이트
    setRoomList([{ title, people }, ...roomList]); // 새로운 방을 방 리스트의 맨 앞에 추가
  };

  return (
    <>
      <div>
        <button className={'modal-open-btn'} onClick={() => setModalOpen(true)}>
          방 만들기
        </button>
      </div>
    
      <div className='roomList'>
        {roomList.map((room, index) => (
          <div key={index}>
            <h4>{room.title}</h4> {/* 방 제목 출력 */}
            <p>{room.people}명</p> {/* 인원 수 출력 */}
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
