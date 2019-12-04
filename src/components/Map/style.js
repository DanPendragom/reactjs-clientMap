import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    height: 100vh; 
    width: 100vw;
`;

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

const Form = styled.form.attrs(props => ({
    autoComplete: 'off'
}))`
    display: flex;
    flex-direction: column;
    padding: 45px;
    height: 45vh;
    select{
        background:#ecececf0;
        height: 40px;
        padding: 5px;
        border: none;
        border-radius: 5px;
        outline: none;
    }
    label{
        font-size: 18px;
        margin-bottom: 5px;
        font-weight: bold;
        color: #696969;;
    }
    button{
        margin-top: 20px;
        background-color: #38449b;
        outline: none;
        border: none;
        border-radius: 5px;
        height: 40px;
        color: #FFF;
        font-weight: bold;
        cursor: pointer;
    }
`;
const Agrupamento = styled.div`
    display: flex;
    flex-direction:column;
    margin-top: 15px;
    input{
        margin-right: 5px;
    }
`;
export {Container, MenuLateral, Form, Agrupamento }