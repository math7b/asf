import { PaperPlaneTilt, Plus, Trash } from "phosphor-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BeeInterface } from "../../interfaces";
import api from "../../services/api";
import { CustonInput } from "../../styles/global";
import { BeeIten, Container, DeleteButton, Loading, Margin, Menu, NewBeeForm } from "./styles";

export function Bee() {
    const userId = JSON.parse(localStorage.getItem("LoggedUserId") || "null");
    const token = JSON.parse(localStorage.getItem("Token") || "null");

    const [bee, setBee] = useState<BeeInterface[]>([])
    const [beeName, setBeeName] = useState('')
    const [binomialNomenclature, setBinomialNomenclature] = useState('')
    const [loading, setLoading] = useState<boolean>(true);
    const [isNewBeeVisible, setIsNewBeeVisible] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const fetchBee = async () => {
        setLoading(true);
        try {
            const responseBee = await api.get<BeeInterface[]>('/bee');
            setBee(responseBee.data);
        } catch (error) {
            console.log('Failed to fetch posts.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBee();
    }, []);

    const validateForm = () => {

        if (beeName.trim().length > 1 && binomialNomenclature.trim().length > 1) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };

    async function handleNewBeeCreate(event: FormEvent) {
        event.preventDefault();
        if (isFormValid) {
            try {
                await api.post('/bee', { name: beeName, binomialNomenclature });
                setBeeName('');
                setBinomialNomenclature('');
                setIsNewBeeVisible(false);
                setIsFormValid(false)
            } catch (error: any) {
                alert(error.response.data.message);
            }
        }
    };

    async function handleBeeDelete(event: React.MouseEvent, beeId: string) {
        event.preventDefault();
        try {
            await api.delete(`/bee/${beeId}`, { params: { userId, token } });
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    }

    const handlePlusClick = () => {
        setIsNewBeeVisible(!isNewBeeVisible);
    };

    const handleNewBeeName = (event: ChangeEvent<HTMLInputElement>) => {
        setBeeName(event.target.value);
        validateForm();

    };

    const handleNewBinomialNomenclature = (event: ChangeEvent<HTMLInputElement>) => {
        setBinomialNomenclature(event.target.value);
        validateForm();
    };

    return (
        <Container>
            <Menu>
                <p>Abelhas</p>
                <div>
                    {isNewBeeVisible && (
                        <NewBeeForm onSubmit={handleNewBeeCreate} className={isNewBeeVisible ? 'visible' : ''}>
                            <label htmlFor="BeeName">Nome</label>
                            <CustonInput
                                type="text"
                                id="BeeName"
                                value={beeName}
                                onChange={handleNewBeeName}
                                required
                            />
                            <label htmlFor="binomialNomenclature">Nome Científico</label>
                            <CustonInput
                                type="text"
                                id="binomialNomenclature"
                                value={binomialNomenclature}
                                onChange={handleNewBinomialNomenclature}
                                required
                            />
                        </NewBeeForm>
                    )}
                    {isFormValid ? (
                        <button
                            onClick={handleNewBeeCreate}
                            disabled={!isFormValid}
                        >
                            <PaperPlaneTilt size={34} color={isFormValid ? 'green' : 'gray'} />
                        </button>
                    ) : <Plus size={34} onClick={handlePlusClick} />
                    }
                </div>
            </Menu>
            {loading ? <Loading>Carregando as postagens aguarde...</Loading> : null}
            {bee.map((bee: BeeInterface) => (
                <BeeIten>
                    <Link key={bee.id} to={`/bee/${bee.id}`}>
                        <strong>Nome:</strong>
                        <p>{bee.name}</p>
                        <Margin>nome científico:</Margin>
                        <p>{bee.binomialNomenclature}</p>
                    </Link>
                    <DeleteButton onClick={(e) => {handleBeeDelete(e, bee.id)}}>
                        <Trash size={16} />
                    </DeleteButton>
                </BeeIten>
            ))}
        </Container>
    );
}