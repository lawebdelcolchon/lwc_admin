// src/features/user/Login.js
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './userSlice';
import LandingIntro from './LandingIntro';
import ErrorText from '../../components/Typography/ErrorText';
import InputText from '../../components/Input/InputText';
import { saveAuthToken } from '../../app/authUtils';

function Login() {
    const INITIAL_LOGIN_OBJ = {
        email: '',
        password: '',
    };

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.user);

    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        setErrorMessage('');
    
        if (loginObj.email.trim() === '') {
            return setErrorMessage('El email es requerido!');
        }
        if (loginObj.password.trim() === '') {
            return setErrorMessage('La contraseña es requerida!');
        }
    
        setLoading(true);
        try {
            const response = await dispatch(loginUser(loginObj)).unwrap(); // unwrap to handle rejected and fulfilled actions
            if (response?.token) {
                saveAuthToken(response.token);
                setLoading(false);
                navigate('/');
            } else {
                setErrorMessage('Login falló. Por favor, revisa tus credenciales.');
            }
        } catch (e) {
            if (e.message === "Cannot read properties of undefined (reading 'data')") {
                setErrorMessage("Error de conexión, contacte al administrador")
            }
            else {
                setErrorMessage(e.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage('');  // Clear the error message when user starts editing
        setLoginObj({ ...loginObj, [updateType]: value });
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl shadow-xl">
                <div className='w-full sm:hidden'>
                    <img 
                        src="/Login-01.png" 
                        alt="logo" 
                        className="object-cover w-full" 
                    />
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
                    <div>
                        <LandingIntro />
                    </div>
                    <div className="py-12 px-10 my-auto">
                        <h2 className="text-2xl font-semibold mb-2 text-center">Acceso</h2>
                        <form onSubmit={submitForm}>
                            <div className="mb-4">
                                <InputText
                                    defaultValue={loginObj.email}
                                    inputType="email"
                                    updateType="email"
                                    containerStyle="mt-4"
                                    labelTitle="Email"
                                    updateFormValue={updateFormValue}
                                />
                                <InputText
                                    defaultValue={loginObj.password}
                                    inputType="password"
                                    updateType="password"
                                    containerStyle="mt-4"
                                    labelTitle="Contraseña"
                                    updateFormValue={updateFormValue}
                                />
                            </div>
                            <div className="text-right text-primary">
                                <Link to="/forgot-password">
                                    <span className="text-sm inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                                        Olvidó la contraseña?
                                    </span>
                                </Link>
                            </div>
                            <ErrorText styleClass="mt-8">{errorMessage || error?.message}</ErrorText>
                            <button type="submit" className={`btn mt-2 w-full btn-primary${loading ? ' loading' : ''}`}>
                                Acceder
                            </button>
                            <div className="text-center mt-4">
                                No tiene una cuenta aún?{' '}
                                <Link to="/register">
                                    <span className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                                        Registrar
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

export default Login;
