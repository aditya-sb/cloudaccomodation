import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/types/store';
import { closeModal } from '@/types/authModalSlice';
import Login from '../auth/Login';
import Register from '../auth/Register';

const AuthModal = () => {
  const dispatch = useDispatch();
  const { isOpen, activeModal } = useSelector((state: RootState) => state.authModal);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <button onClick={() => dispatch(closeModal())}>Close</button>
      {activeModal === 'login' ? <Login /> : <Register />}
    </div>
  );
};
