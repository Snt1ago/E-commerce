"use client";

import { Check } from "lucide-react";

interface StepperProps {
  currentStep: number;
}

const steps = [
  { id: 1, label: "DATOS DE FACTURACIÓN" },
  { id: 2, label: "DATOS DE ENVÍO" },
  { id: 3, label: "FORMA DE PAGO" },
];

export default function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="w-full bg-white border-b border-neutral-100 py-6 px-4 backdrop-blur-md bg-white/80 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between relative">
        {/* Connecting line */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-neutral-100 -translate-y-1/2 hidden sm:block" />
        
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 group">
              <div 
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-xs font-black transition-all duration-500
                  ${isCompleted 
                    ? "bg-black text-white" 
                    : isActive 
                      ? "bg-black text-white shadow-xl shadow-black/20 scale-110" 
                      : "bg-neutral-100 text-neutral-400"
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 animate-in zoom-in duration-300" strokeWidth={3} />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              
              <span className={`
                text-[10px] font-black tracking-[0.1em] uppercase transition-colors duration-500 hidden sm:block
                ${isActive || isCompleted ? "text-black" : "text-neutral-300"}
              `}>
                {step.label}
              </span>
              
              {/* Mobile label only for active */}
              {isActive && (
                <span className="text-[10px] font-black tracking-[0.1em] uppercase text-black block sm:hidden absolute -bottom-6 w-max">
                  {step.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
