import styled from 'styled-components';

export const ToolbarButton = styled.button`
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px 12px;
  margin: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #e0e0e0;
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #007bff;
  }

  &.is-active {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
  }

  &:disabled {
    background-color: #f0f0f0;
    color: #b5b5b5;
    cursor: not-allowed;
    border-color: #ddd;
  }
`;
