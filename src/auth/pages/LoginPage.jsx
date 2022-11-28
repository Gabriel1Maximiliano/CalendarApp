import { useAuthStore } from '../../hooks/useAuthStore';
import { useForm } from '../../hooks/useForm';
import './LoginPage.css';

const loginFormFields ={
    loginPassword:'',
    loginEmail:''
};

const registerFormFields ={
    registerName:'',
    registerEmail:'',
    registerPassword1:'',
    registerPassword2:''
};

export const LoginPage = () => {

   const { loginPassword, loginEmail,  onInputChange:onLoginChange, } = useForm( loginFormFields );

   const {  registerName,registerEmail,registerPassword1,registerPassword2, onInputChange:onRegisterChange, } = useForm( registerFormFields );

   const { startLogin } =useAuthStore();
  
 const onLoginSubmit = ( event ) => {
    event.preventDefault();
    startLogin({email:loginEmail,password:loginPassword });
 };

 const onRegsiterSubmit = ( event ) => {
    event.preventDefault();
    console.log('en regidter');
 };

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ onLoginSubmit } >
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                value={ loginEmail }
                                onChange={ onLoginChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='loginPassword'
                                value={ loginPassword }
                                onChange={ onLoginChange }
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                              
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ onRegsiterSubmit } >
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='registerName'
                                value={ registerName }
                                onChange={ onRegisterChange } 
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registerEmail'
                                value={ registerEmail }
                                onChange={ onRegisterChange } 
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='registerPassword1'
                                value={ registerPassword1 }
                                onChange={ onRegisterChange }  
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name='registerPassword2'
                                value={ registerPassword2 }
                                onChange={ onRegisterChange }   
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}