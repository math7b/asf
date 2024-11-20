import { FormEvent, MouseEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Content, CustomisedInput, IsApicultor, IsApicultorCheckBox } from "./styles";
import logoLight from '../../assets/logo-light.png';
import api from "../../services/api";
import { LoggonApi, NewUserRegister } from "../../interfaces";

export function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [RG, setRG] = useState("");
    const [CPF, setCPF] = useState("");
    const [userId, setUserId] = useState("");

    const [step, setStep] = useState(0);
    const [isAUser, setIsAUser] = useState(false)
    const [status, setStatus] = useState(0)
    const [isApicultor, setIsApicultor] = useState(false);

    const navigate = useNavigate();

    console.log({
        isAUser: isAUser,
        step: step,
        status: status
    })

    async function handleNextStep(event: MouseEvent<HTMLButtonElement>, content: string | boolean) {
        event.preventDefault();
        if (step === 1 && content) {
            try {
                const response = await api.post<LoggonApi>('/logon', { email, password });
                setStatus(response.status)
                setUserId(response.data.Data.id)
                setIsAUser(true);
                setStep(prevStep => prevStep + 3);
            } catch (error: any) {
                console.log({
                    Error: error.response.data.message, Or: "user not found"
                })
                setStatus(error.response.status)
                setStep(prevStep => prevStep + 1);
            }
        }
        if (step === 4 && !isApicultor && status !== 201) {
            handleSubmit(event);
        }
        if (step === 4 && !isApicultor && status === 201) {
            navigate('../login')
        }
        if (content && step !== 1) {
            setStep(prevStep => prevStep + 1);
        }
        return;
    };

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (!isApicultor) {
            try {
                console.log(name, email, password, state)
                await api.post<LoggonApi>('/user', { name, email, password, state });
                alert("Usuario criado com sucesso!")
                navigate('../login')
            } catch (error) {
                console.log(error)
            }
        }
        if (isApicultor && status !== 201) {
            try {
                const userId = await api.post<NewUserRegister>('/user', { name, email, password, state });
                await api.post('/beekeeper', { city, phoneNumber, RG, CPF, userId })
                alert("Apicultor criado com sucesso!")
                navigate('../login')
            } catch (error) {
                console.log(error)
            }
        }
        console.log(city, phoneNumber, RG, CPF, userId)
        if (isApicultor && status === 201) {
            try {
                await api.post('/beekeeper', { city, phoneNumber, RG, CPF, userId })
                alert("Apicultor criado com sucesso!")
                navigate('../login')
            } catch (error) {
                console.log(error)
            }
        }
    };

    return (
        <Container>
            <Link to={"/home"}>
                <img src={logoLight} alt="Logo" />
            </Link>

            <form onSubmit={handleSubmit}>
                {step >= 0 && (<>
                    <Content>
                        <p>Bem vindo a comunidade!</p>
                        <p>Vamos começar nossa aventura</p>
                    </Content>
                    <Content>
                        <label htmlFor="femail">Digite seu email</label>
                        <div>
                            <CustomisedInput
                                type="email"
                                id="femail"
                                name="femail"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <button onClick={e => handleNextStep(e, email)}>Continue</button>
                        </div>
                    </Content>
                </>)}
                {step >= 1 && (<>
                    <Content>
                        <label htmlFor="fpassword">Digite sua senha</label>
                        <div>
                            <CustomisedInput
                                type="password"
                                id="fpassword"
                                name="fpassword"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                            <button onClick={e => handleNextStep(e, password)}>Continue</button>
                        </div>
                    </Content>
                </>)}
                {isAUser === true ?
                    <p>É bom ter você de volta!</p> : (
                        <>{step >= 2 && (<>
                            <Content>
                                <label htmlFor="fname">Digite seu nome</label>
                                <div>
                                    <CustomisedInput
                                        type="text"
                                        id="fname"
                                        name="fname"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        required
                                    />
                                    <button onClick={e => handleNextStep(e, name)}>Continue</button>
                                </div>
                            </Content>
                        </>)}
                            {step >= 3 && (<>
                                <Content>
                                    <label htmlFor="fstate">Digite o seu estado</label>
                                    <div>
                                        <CustomisedInput
                                            type="text"
                                            id="fstate"
                                            name="fstate"
                                            value={state}
                                            onChange={e => setState(e.target.value)}
                                            required
                                        />
                                        <button onClick={e => handleNextStep(e, state)}>Continue</button>
                                    </div>
                                </Content>
                            </>)}</>
                    )
                }
                {step >= 4 && (<>
                    <IsApicultor>
                        <div>
                            <label htmlFor="fpassword">
                                {isAUser === true ?
                                    "Você quer atualizar para apicultor?" :
                                    "Você é um Apicultor?"}
                            </label>
                            <IsApicultorCheckBox
                                type="checkbox"
                                id="fIsApicultor"
                                name="fIsApicultor"
                                checked={isApicultor}
                                onChange={e => setIsApicultor(e.target.checked)}
                                required
                            />
                        </div>
                        <button onClick={e => handleNextStep(e, isApicultor)}>
                            {isApicultor ? "Continue" : status === 201 ? "Ir ao login" : "Enviar"}
                        </button>
                    </IsApicultor>
                </>)}
                {step >= 5 && (<>
                    <Content>
                        <label htmlFor="fcity">Digite sua cidade</label>
                        <div>
                            <CustomisedInput
                                type="text"
                                id="fcity"
                                name="fcity"
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                required
                            />
                            <button onClick={e => handleNextStep(e, city)}>Continue</button>
                        </div>
                    </Content>
                </>)}
                {step >= 6 && (<>
                    <Content>
                        <label htmlFor="fPhoneNumber">Digite seu numero de celular</label>
                        <div>
                            <CustomisedInput
                                type="text"
                                id="fPhoneNumber"
                                name="fPhoneNumber"
                                value={phoneNumber}
                                onChange={e => setPhoneNumber(e.target.value)}
                                required
                            />
                            <button onClick={e => handleNextStep(e, phoneNumber)}>Continue</button>
                        </div>
                    </Content>
                </>)}
                {step >= 7 && (<>
                    <Content>
                        <label htmlFor="fRG">Digite seu RG</label>
                        <div>
                            <CustomisedInput
                                type="text"
                                id="fRG"
                                name="fRG"
                                value={RG}
                                onChange={e => setRG(e.target.value)}
                                required
                            />
                            <button onClick={e => handleNextStep(e, RG)}>Continue</button>
                        </div>
                    </Content>
                </>)}
                {step >= 8 && (<>
                    <Content>
                        <label htmlFor="fCPF">Digite seu CPF</label>
                        <div>
                            <CustomisedInput
                                type="text"
                                id="fCPF"
                                name="fCPF"
                                value={CPF}
                                onChange={e => setCPF(e.target.value)}
                                required
                            />
                            <button onClick={e => handleNextStep(e, CPF)}>Continue</button>
                        </div>
                    </Content>
                    <button type="submit">Finalizar cadastro</button>
                </>)}
            </form>
        </Container >
    );
}