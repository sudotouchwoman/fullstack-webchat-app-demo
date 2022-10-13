// Generic type to support updates for form fields via updateFields attribute
// which should implement updates
export type FormStepProps<FormStepData> = FormStepData & {
    updateFields: (fields: Partial<FormStepData>) => void
}