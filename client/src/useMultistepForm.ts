import React, { ReactElement, useState } from 'react'

export default function useMultistepForm(steps: ReactElement[]) {
    const [currentStepIndex, setCurrentStepIndex] = useState(0)
    const numSteps = steps.length - 1

    const next = () => setCurrentStepIndex(i => i < numSteps ? i + 1 : i)
    const back = () => setCurrentStepIndex(i => i > 0 ? i - 1 : i)
    const goTo = (idx: number) => setCurrentStepIndex(idx)

    return {
        currentStepIndex,
        step: steps[currentStepIndex],
        steps,
        isFirstStep: currentStepIndex === 0,
        isLastStep: currentStepIndex === numSteps,
        next,
        back,
        goTo
    }
}