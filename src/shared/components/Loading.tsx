import { FaSpinner } from 'react-icons/fa'


export const Loading = () => {
    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent:'center', 
            alignItems:'center',
            gap: 3
        }}>
            <FaSpinner className="loader" />
            <p>Cargando</p>
        </div>
    )
}
