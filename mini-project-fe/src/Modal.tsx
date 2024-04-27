import React, { useState, useRef } from 'react';
import {useNavigate} from "react-router-dom";

interface ModalParam {
  isOpen: boolean;
  onClose: boolean;
  onCreateRoom: boolean;
}

// const Modal = ({ isOpen, onClose, onCreateRoom }) => {
  const Modal = ({ isOpen, onClose, onCreateRoom } : ModalParam) => {
  const modalBackground = useRef(null);
  const [title, setTitle] = useState('');
  const [people, setPeople] = useState('');
  const navigate = useNavigate();
  const handleCreateRoom = async () => {
    // 방 생성 전 유효성 검사
    const parsedPeople = parseInt(people);
    if (isNaN(parsedPeople) || parsedPeople < 0 || parsedPeople > 8) {
      alert('인원 수는 0 이상 8 이하의 값을 입력해주세요.');
      return;
    }
    // 방 생성 로직을 실행합니다.
    const response = await fetch(`/api/rooms`,{
      method:'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titles:title,
      }),
      credentials: 'include'
    })
    const result = await response.json();
    if(result.id !== null){
      navigate(`/content/${result.id}`);
    }
  };

  return (
    <>
      {isOpen &&
        <div className={'modal-container'} ref={modalBackground} onClick={e => {
          if (modalBackground.current && e.target === modalBackground.current) {
            onClose();
          }
        }}>
          <div className={'modal-content'}>
            <div>
              <b>글 쓰기 창</b>
            </div>
            <div>
              <p>방 제목</p>
              <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <p>인원 수</p>
              <input type='number' value={people} onChange={(e) => setPeople(e.target.value)} />
            </div>
            <br/>
            <div>
              <button className={'modal-close-btn'} onClick={onClose}>
                닫기
              </button>
              <button className='modal-create-btn' onClick={handleCreateRoom}>생성</button>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Modal;
