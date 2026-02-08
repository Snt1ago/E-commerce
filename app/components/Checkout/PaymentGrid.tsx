"use client";

export type PaymentMethodType = 'card' | 'bank' | 'offline' | 'mercadopago';

export interface PaymentMethod {
  id: string;
  name: string;
  type: PaymentMethodType;
  logo: string;
  provider: string;
}

const paymentMethods: PaymentMethod[] = [
  // Tarjetas
  { id: 'visa', name: 'Visa (débito y crédito)', type: 'card', provider: 'Transbank', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Visa_2021.svg' },
  { id: 'mastercard', name: 'Mastercard', type: 'card', provider: 'Transbank', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' },
  { id: 'oca', name: 'OCA', type: 'card', provider: 'OCA', logo: 'https://www.oca.com.uy/images/logo-oca.png' },
  { id: 'passcard', name: 'Passcard', type: 'card', provider: 'Passcard', logo: '' },
  { id: 'cabal', name: 'Cabal', type: 'card', provider: 'Cabal', logo: '' },
  
  // Mercadopago
  { id: 'mercadopago', name: 'Mercadopago', type: 'mercadopago', provider: 'Mercadopago', logo: '' },

  // Bancos (e-Banking)
  { id: 'bandes', name: 'Bandes', type: 'bank', provider: 'Bandes', logo: '' },
  { id: 'bbva', name: 'BBVA Net', type: 'bank', provider: 'BBVA', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/BBVA_logo.svg' },
  { id: 'ebrou', name: 'e-BROU', type: 'bank', provider: 'BROU', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Logo_BROU.svg' },
  { id: 'heritage', name: 'Heritage', type: 'bank', provider: 'Heritage', logo: '' },
  { id: 'santander', name: 'Santander Supernet', type: 'bank', provider: 'Santander', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Santander_Logotipo.svg' },
  { id: 'scotiabank', name: 'Scotiabank', type: 'bank', provider: 'Scotiabank', logo: '' },

  // Redes de cobranza
  { id: 'abitab', name: 'Abitab', type: 'offline', provider: 'Abitab', logo: 'https://www.abitab.com.uy/images/logo_abitab.png' },
  { id: 'redpagos', name: 'Redpagos', type: 'offline', provider: 'Redpagos', logo: 'https://www.redpagos.com.uy/img/logo.png' },
];

interface PaymentGridProps {
  selectedId: string | null;
  onSelect: (method: PaymentMethod) => void;
}

export default function PaymentGrid({ selectedId, onSelect }: PaymentGridProps) {
  return (
    <div className="flex flex-col border border-neutral-100 rounded-[2rem] overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 bg-white">
      {paymentMethods.map((method, index) => (
        <button
          key={method.id}
          onClick={() => onSelect(method)}
          className={`
            relative p-6 transition-all flex items-center gap-6 text-left hover:bg-neutral-50
            ${index !== paymentMethods.length - 1 ? 'border-b border-neutral-50' : ''}
            ${selectedId === method.id ? "bg-neutral-50" : ""}
          `}
        >
          <div className="w-16 h-8 relative flex items-center justify-center flex-shrink-0">
             {method.logo ? (
               <img src={method.logo} alt={method.name} className="max-h-full max-w-full object-contain grayscale opacity-60" />
             ) : (
               <div className="bg-neutral-100 px-2 py-1 rounded text-[8px] font-black uppercase text-neutral-400 border border-neutral-200">
                 {method.id}
               </div>
             )}
          </div>
          
          <div className="flex-1">
            <span className={`text-sm font-black tracking-tight ${selectedId === method.id ? 'text-black' : 'text-neutral-500'}`}>
              {method.name}
            </span>
          </div>

          <div className={`
            w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
            ${selectedId === method.id ? 'border-black bg-black' : 'border-neutral-200'}
          `}>
             {selectedId === method.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
          </div>
        </button>
      ))}
    </div>
  );
}
