import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { auth } from '../../firebase/firebase';
import { useDispatch } from 'react-redux';
import { currentUser, loading, userLoggedIn } from '../../redux/authSlice';

const useAuthListener = () => {
    const dispatch = useDispatch();

    useEffect( () => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userData = {
                    userId: user.uid,
                    fullname: user.displayName,
                    email: user.email,
                    userImg: user.photoURL,
                }
                dispatch(currentUser(userData));
                dispatch(userLoggedIn(true));
            }else {
                dispatch(currentUser(null));
                dispatch(userLoggedIn(false));
            }
            dispatch(loading(false));
        })

        return unsubscribe;

    }, [dispatch]);
}

export default useAuthListener;
