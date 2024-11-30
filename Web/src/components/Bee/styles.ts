import styled from "styled-components";

export const Container = styled.main`
    width: 100%;
    max-width: 1012px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 4px;
    background: ${props => props.theme.colors.color_white_opack};
    p, time, span, label {
        margin: 0;
        padding: 0;
    }
    a {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: start;
    }
    a:hover {
        text-decoration: underline;
        p {
            margin-left: 4px;
        }
        background: ${props => props.theme.colors.color_200};
        border-radius: 4px;
    }
`;

export const Menu = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    background: ${props => props.theme.colors.color_400};
    border-radius: 4px;
    div {
        display: flex;
        flex-direction: row;
        justify-content: end;
        width: 100%;
    }
    button {
        padding: 0;
        margin: 0;
        line-height: 0;
    }
`;

export const Loading = styled.div`
    padding: 1rem;
`;

export const Margin = styled.strong`
    margin-left: 8px;
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
        margin: 8px;
    }
`;

export const BeeIten = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
`;

export const DeleteButton = styled.span<{ disabled?: boolean }>`
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    transition: opacity 0.2s ease;
    line-height: 0;
    padding: 3px;
    margin-left: 2px;
    &:hover svg {
            color: ${props => props.theme.colors.color_600};
    }
    &:hover {
        border-radius: 4px;
        background: ${props => props.theme.colors.color_200};
    }
`;
