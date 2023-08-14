import { Navigate } from 'react-router-dom';
import { loginUser } from '../Features/User/userSlice';
import { auth } from '../Firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

export const createUser = async (username, password) => {
    let valid = false;
    await createUserWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            valid = true;
        }).catch((error) => {
            valid = false;

        })
    return valid;
}

export const validateUser = async (username, password) => {
    let valid = false;
    await signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            valid = true;
        })
        .catch((error) => {
            // Navigate('/cart')
            valid = false;

        });
    return valid;
}