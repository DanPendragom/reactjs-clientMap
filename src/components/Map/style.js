import styled from 'styled-components'

const MenuLateral = styled.div`
    display: flex;
    flex-direction:column;
    width: 100%;
    box-shadow:-5px 0px 20px 0px rgba(0,0,0,0.5);
    z-index: 999;
    header{
        display: flex;
        align-items: center;
        background: #38449b;
        width: 100%;
        height: 80px;
        color: #FFF;
        padding-left: 45px;
    }
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    padding: 45px;
    select{
        border-radius: 5px;
        height: 45px;
        outline: none;
    }
`;
export { MenuLateral, Form }