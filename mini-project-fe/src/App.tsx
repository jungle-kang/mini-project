import React, { useState } from 'react';
import Modal from './Modal';

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreateRoom = (title, people) => {
    console.log('방 제목:', title);
    console.log('인원 수:', people);
    // TODO: 방 생성 로직 구현
    setModalOpen(false);
  };

  return (
    <>
      <div>
        <button className={'modal-open-btn'} onClick={() => setModalOpen(true)}>
          방 만들기
        </button>
      </div>
    
      <div className='roomList'>
        <h4>방이름</h4>
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
