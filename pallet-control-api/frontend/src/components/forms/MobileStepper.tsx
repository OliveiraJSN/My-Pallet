// components/forms/MobileStepper.tsx
"use client";

import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

interface MobileStepperProps {
  steps: string[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

export default function MobileStepper({ steps, currentStep, onStepChange }: MobileStepperProps) {
  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <button
          onClick={() => onStepChange(currentStep - 1)}
          disabled={currentStep === 0}
          className="p-2 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed touch-manipulation"
          aria-label="Voltar"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div className="flex-1 px-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <button
                  onClick={() => onStepChange(index)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 touch-manipulation ${
                    index === currentStep
                      ? 'bg-primary-500 text-white border-2 border-primary-500'
                      : index < currentStep
                      ? 'bg-green-100 text-green-600 border-2 border-green-300'
                      : 'bg-gray-100 text-gray-400 border-2 border-gray-300'
                  }`}
                  aria-label={`Ir para passo ${index + 1}: ${step}`}
                >
                  {index < currentStep ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="font-semibold">{index + 1}</span>
                  )}
                </button>
                <span className={`text-xs text-center ${
                  index === currentStep
                    ? 'font-semibold text-primary-600'
                    : index < currentStep
                    ? 'text-green-600'
                    : 'text-gray-500'
                }`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <button
          onClick={() => onStepChange(currentStep + 1)}
          disabled={currentStep === steps.length - 1}
          className="p-2 text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed touch-manipulation"
          aria-label="Avançar"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}