import styled from 'styled-components'
const NotesById = ({note}) => {
    const Content = styled.div`
    padding:4rem 3rem 3rem 3rem;
    display:flex;
    align-item:center;
    justify-content:center;
    `
    return ( 
    <Content>
     <h3>{note.content}</h3>
    </Content>
    )
} 

export default NotesById;