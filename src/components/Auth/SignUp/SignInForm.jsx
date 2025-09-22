import { useModal } from '../../../Context/Modal/ModalContext';
import { doLoginWithGoogle } from '../../../firebase/auth';
import GoogleSignUp from './GoogleSignIn';

const SignInForm = () => {

    const { closeModal } = useModal();

    const doUserLoginWithGoogle = () => {
        doLoginWithGoogle();
        closeModal();
    }

    return (
        <div className='my-10'>
            <GoogleSignUp doUserLoginWithGoogle={doUserLoginWithGoogle} />
        </div>
    );
}

export default SignInForm;
