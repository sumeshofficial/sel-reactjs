import { doLoginWithGoogle } from '../../../firebase/auth';
import GoogleSignUp from './GoogleSignIn';

const SignInForm = () => {

    const doUserLoginWithGoogle = () => {
        doLoginWithGoogle()
    }

    return (
        <div className='my-10'>
            <GoogleSignUp doUserLoginWithGoogle={doUserLoginWithGoogle} />
        </div>
    );
}

export default SignInForm;
