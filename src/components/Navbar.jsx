import logo from '../assets/images/Logo.png';
import profile from '../assets/images/Profile.png';
function Navbar() {
  return (
    <div className="md:w-1/5 w-full order-1 flex md:flex-col justify-between md:p-4 p-2 bg-blacked">
        <div>
            <img src={logo} 
                 alt="spotify-logo" 
                 className='w-30 h-30'/>
        </div>
        <div>
            <img src={profile} 
                  alt="user-image" 
                  className='h-10 w-10 rounded-full'/>
        </div>
    </div>
  )
}

export default Navbar