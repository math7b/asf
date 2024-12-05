import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { PaperPlaneTilt, Plus, Trash } from 'phosphor-react';
import { BeeInterface } from '../../interfaces';
import { CustonInput } from '../../styles/global';
import { BeeIten, Container, DeleteButton, Loading, Margin, Menu, NewBeeForm } from './styles';
import api from '../../services/api';
import { useBee } from '../../context/BeeContext';

export function Bee() {
    const { bee } = useBee();
    const [beeName, setBeeName] = useState('');
    const [binomialNomenclature, setBinomialNomenclature] = useState('');
    const [isNewBeeVisible, setIsNewBeeVisible] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const userId = JSON.parse(localStorage.getItem("LoggedUserId") || "null");
    const token = JSON.parse(localStorage.getItem("Token") || "null");

    const validateForm = () => {
        if (beeName.trim().length > 1 && binomialNomenclature.trim().length > 1) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };

    const handleNewBeeCreate = async (event: FormEvent) => {
        event.preventDefault();
        if (isFormValid) {
            try {
                await api.post('/bee', { name: beeName, binomialNomenclature });
                setBeeName('');
                setBinomialNomenclature('');
                setIsNewBeeVisible(false);
                setIsFormValid(false);
            } catch (error: any) {
                alert(error.response.data.message);
            }
        }
    };

    const handleBeeDelete = async (event: React.MouseEvent, beeId: string) => {
        event.preventDefault();
        try {
            await api.delete(`/bee/${beeId}`, { params: { userId, token } });
        } catch (error) {
            console.error('Error deleting bee:', error);
        }
    };


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
                        <button onClick={handleNewBeeCreate} disabled={!isFormValid}>
                            <PaperPlaneTilt size={34} color={isFormValid ? 'green' : 'gray'} />
                        </button>
                    ) : (
                        <Plus size={34} onClick={handlePlusClick} />
                    )}
                </div>
            </Menu>
            {bee.length === 0 ? (
                <Loading>Carregando as postagens aguarde...</Loading>
            ) : (
                bee.map((beeItem: BeeInterface) => (
                    <BeeIten key={beeItem.id}>
                        <Link to={`/bee/${beeItem.id}`}>
                            <strong>Nome:</strong>
                            <p>{beeItem.name}</p>
                            <Margin>nome científico:</Margin>
                            <p>{beeItem.binomialNomenclature}</p>
                        </Link>
                        <DeleteButton onClick={(e) => handleBeeDelete(e, beeItem.id)}>
                            <Trash size={16} />
                        </DeleteButton>
                    </BeeIten>
                ))
            )}
        </Container>
    );
}
