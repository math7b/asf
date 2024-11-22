import styled from "styled-components";

export const Container = styled.main`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-bottom: 64px;
    font-size: 0.875rem;
    img {
        background: ${props => props.theme.colors.color_300};
        border-radius: 50px;
        width: 70px;
        height: 70px;
        margin-top: 32px;
        /* margin-bottom: 16px; */
    }
    form {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        background: ${props => props.theme.colors.color_300};
        border-radius: 4px;
        padding: 24px;
        border: 1px solid ${props => props.theme.colors.color_800};
        margin-top: 16px;
        max-width: 1400px;
        label {
        }
        button {
            margin-right: 0;
        }
    }
`;

export const Content = styled.div`
    &:not(:last-child) {
        margin-bottom: 12px;
    }
`;

export const CustomisedInput = styled.input`
    border-radius: 4px;
    border: 1px solid ${props => props.theme.colors.color_600};
    display: inline;
    padding: 6px 0px;
    width: 40vw;
    max-width: 100%;
    margin-right: 8px;
`;

export const IsApicultor = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 4px 0px;
`;

export const IsApicultorCheckBox = styled.input`
    margin: 0px 16px;
`;