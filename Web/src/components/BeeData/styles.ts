import styled from "styled-components";

export const Container = styled.main`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    max-width: 1012px;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem 1rem 2rem 1rem;
    border-radius: 4px;
    background: ${props => props.theme.colors.color_white_opack};
`;

export const NewBeeForm = styled.form`
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: opacity 0.3s ease-in-out;
    opacity: 0;
    &.visible {
        opacity: 1;
    }
    label {
        display: inline-block;
        white-space: nowrap;
        margin-bottom: 8px;
    }
`;
