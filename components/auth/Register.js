import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { toast } from 'react-toastify'
import ButtonLoader from '../layout/ButtonLoader'

import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearErrors } from '../../redux/actions/userActions'

const Register = () => {

    const dispatch = useDispatch()
    const router = useRouter();

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const { name, email, password } = user

    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');

    const { success, error, loading } = useSelector(state => state.auth)

    useEffect(() => {
        if (!avatar) {
            const reader = new FileReader();
            reader.onload = () => {
                // Display the image or perform further actions
                if (reader.readyState === 2) {
                    setAvatar(reader.result);
                    setAvatarPreview(reader.result);
                }
            };

            reader.onerror = () => {
                // Error occurred while loading the image
                // Handle the error or perform fallback actions
                console.log('Error occurred while loading the image');
            };

            // Set the default image source
            const defaultImageSrc = '/images/default_avatar.jpg';

            fetch(defaultImageSrc)
                .then(response => response.blob())
                .then(blob => {
                    // Create a new File object
                    const file = new File([blob], 'image.jpg', { type: blob.type });
                    reader.readAsDataURL(file);
                    // Use the 'file' object for further processing
                    console.log('File created:', file);
                })
                .catch(error => {
                    console.log('Error fetching or creating the file:', error);
                });

        }

    }, [])

    useEffect(() => {

        if (success) {
            router.push('/login')
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, success, error])

    const onChange = (e) => {

        if (e.target.name === 'avatar') {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatar(reader.result);
                    setAvatarPreview(reader.result);
                }
            }

            reader.readAsDataURL(e.target.files[0])

        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }

    }

    const submitHandler = (e) => {
        e.preventDefault();
        const userData = {
            name, email, password, avatar
        }

        dispatch(registerUser(userData))

    }


    return (
        <div className="container container-fluid">
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Join Us</h1>

                        <div className="form-group">
                            <label htmlFor="name_field">Full Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name='password'
                                value={password}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='image'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept='images/*'
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>


                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            {loading ? <ButtonLoader /> : 'REGISTER'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register