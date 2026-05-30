import { useContext } from 'react'
import { RoleContext } from './RoleContext'
import Logo from './Logo'

function Header({ totalObjetos }) { 
  const { rol, logOut } = useContext(RoleContext)

  // Mapeo dinámico con clases nativas de Tailwind (adiós estilos en línea)
  const estilosRoles = {
    recepcion: 'border-blue-500 text-blue-400',
    housekeeping: 'border-emerald-500 text-emerald-400',
    management: 'border-amber-500 text-amber-400'
  }

  const estiloRolActual = estilosRoles[rol?.toLowerCase()] || 'border-white/30 text-white'

  return (
    <>
      
      <header className="w-full flex flex-col md:flex-row justify-between items-center bg-red-500 py-5 px-10 text-white shadow-lg box-border gap-4 md:gap-0">
        
       
        <div className="w-[240px] h-16 flex items-center justify-center">
          <Logo />
        </div>
        
      
        <h1 className="m-0 text-[1.8rem] font-serif text-white tracking-[2px] uppercase">
          The Palace Hotel
        </h1>
        
      
        <div className="flex flex-col items-center">
          <span className="bg-[#f59e0b] text-white py-1 px-[15px] rounded-[20px] text-[0.75rem] font-bold shadow-md border border-white/20">
            {totalObjetos} {totalObjetos === 1 ? 'Objeto' : 'Objetos'} Registrados
          </span>
        </div>
        

        <div className="flex items-center gap-[15px]">
          
        
          <span className={`bg-white/10 py-2 px-[15px] rounded-[5px] font-bold uppercase text-[0.8rem] border transition-colors ${estiloRolActual}`}>
            {rol}
          </span>
          
          
          <button 
            className="bg-transparent border border-white/40 text-white py-2 px-4 rounded-[6px] cursor-pointer font-bold uppercase text-[0.75rem] transition-all duration-200 ease-in-out hover:bg-white/10 hover:border-[#f59e0b] hover:text-[#f59e0b] hover:-translate-y-[1px]"
            onClick={logOut}
          >
            Logout
          </button>
          
        </div>
      </header>
    </>
  )
}

export default Header;