export default function Logo() {
  return (
    <svg 
      width="100%"   
      height="100%"  
      viewBox="0 0 550 270" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>LostDesk logo</title>
      <desc>Logo de LostDesk: lupa con llave de hotel en el interior</desc>

      {/* Lupa exterior (Cuerpo y borde dorado) */}
      <circle cx="150" cy="135" r="72" style={{fill: '#1a2744'}}/>
      <circle cx="150" cy="135" r="72" style={{fill: 'none', stroke: '#c9a84c', strokeWidth: 14}}/>
      <line x1="204" y1="189" x2="248" y2="233" style={{stroke: '#c9a84c', strokeWidth: 14, strokeLinecap: 'round'}}/>

      {/* Llave interna (Cabeza y dientes) */}
      <circle cx="150" cy="126" r="22" style={{fill: 'none', stroke: '#c9a84c', strokeWidth: 5}}/>
      <rect x="168" y="120" width="28" height="10" rx="3" style={{fill: '#c9a84c'}}/>
      <rect x="190" y="130" width="8" height="7" rx="2" style={{fill: '#c9a84c'}}/>
      <rect x="182" y="130" width="6" height="5" rx="1" style={{fill: '#c9a84c'}}/>

      {/* Textos de la marca */}
      <text x="290" y="160" style={{fontFamily: 'Georgia, serif', fontSize: '52px', fontWeight: 700, fill: '#ffffff', letterSpacing: '2px'}}>Lost</text>
      <text x="420" y="160" style={{fontFamily: 'Georgia, serif', fontSize: '52px', fontWeight: 400, fill: '#c9a84c', letterSpacing: '2px'}}>Desk</text>

      <text x="291" y="195" style={{fontFamily: 'Arial, sans-serif', fontSize: '13px', fill: '#8a9bb5', letterSpacing: '5px'}}>HOTEL LOST &amp; FOUND</text>
    </svg>
  )
}