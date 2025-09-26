import { useState } from 'react';

export function useStep<T extends number>(initialStep: T, maxStep: T) {
  const [step, setStep] = useState<T>(initialStep);

  const handlePrev = () =>
    setStep(prev => (prev > 1 ? ((prev - 1) as T) : prev));

  const handleNext = () =>
    setStep(prev => (prev < maxStep ? ((prev + 1) as T) : prev));

  return { step, handlePrev, handleNext };
}
