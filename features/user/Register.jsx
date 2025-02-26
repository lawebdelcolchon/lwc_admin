import { useState } from 'react';
import { Link } from 'react-router-dom';
import LandingIntro from './LandingIntro';
import ErrorText from '../../components/Typography/ErrorText';
import InputText from '../../components/Input/InputText';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from './userSlice';
import { saveAuthToken } from '../../app/authUtils';

function Register() {
    const INITIAL_REGISTER_OBJ = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        id_number: '',
    };

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ);

    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.user);

    const submitForm = (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (registerObj.first_name.trim() === '') return setErrorMessage('El nombre es requerido!');
        if (registerObj.last_name.trim() === '') return setErrorMessage('El apellido es requerido!');
        if (registerObj.email.trim() === '') return setErrorMessage('El email es requerido!');
        if (registerObj.password.trim() === '') return setErrorMessage('La contraseña es requerida!');
        if (registerObj.id_number.trim() === '') return setErrorMessage('La cédula es requerida!');

        setLoading(true);
        dispatch(registerUser(registerObj)).then((response) => {
            if (response.error) {
                setErrorMessage(response.error.message);
                setLoading(false);
            } else {
                const token = response.payload.token;
                saveAuthToken(token);
                setLoading(false);
                window.location.href = '/login';
            }
        });
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage('');
        setRegisterObj({ ...registerObj, [updateType]: value });
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl shadow-xl">
                <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
                    <div className="">
                        <LandingIntro />
                    </div>
                    <div className="py-20 px-10">
                        <h2 className="text-2xl font-semibold mb-2 text-center">Registro</h2>
                        <form onSubmit={submitForm}>
                            <div className="mb-4">
                                <InputText
                                    defaultValue={registerObj.first_name}
                                    updateType="first_name"
                                    containerStyle="mt-2"
                                    labelTitle="Nombres"
                                    updateFormValue={updateFormValue}
                                />
                                <InputText
                                    defaultValue={registerObj.last_name}
                                    updateType="last_name"
                                    containerStyle="mt-2"
                                    labelTitle="Apellidos"
                                    updateFormValue={updateFormValue}
                                />
                                <InputText
                                    defaultValue={registerObj.email}
                                    updateType="email"
                                    containerStyle="mt-2"
                                    labelTitle="Email"
                                    updateFormValue={updateFormValue}
                                />
                                <InputText
                                    defaultValue={registerObj.password}
                                    type="password"
                                    updateType="password"
                                    containerStyle="mt-2"
                                    labelTitle="Password"
                                    updateFormValue={updateFormValue}
                                />
                                <InputText
                                    defaultValue={registerObj.id_number}
                                    updateType="id_number"
                                    containerStyle="mt-2"
                                    labelTitle="Número Identificación"
                                    updateFormValue={updateFormValue}
                                />
                            </div>
                            <ErrorText styleClass="mt-8">{errorMessage || error}</ErrorText>
                            <button type="submit" className={`btn mt-2 w-full btn-primary${loading ? ' loading' : ''}`}>
                                Registro
                            </button>
                            <div className="text-center mt-2">
                                Ya tiene una cuenta?{' '}
                                <Link to="/login">
                                    <span className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                                        Acceder
                                    </span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
