import { BounceLoader } from 'react-spinners'
const Loader = () => {
    return (
        <div className='absolute left-0 top-0 z-100 w-full h-full flex items-center justify-center'>
            <BounceLoader color='#5E35B1' />
        </div>
    )
}

export default Loader