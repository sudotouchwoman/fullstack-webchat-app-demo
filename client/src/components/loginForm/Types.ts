// Generic type to support updates for form fields via updateFields attribute
// which should implement updates
export type ModifiableProps<Props> = Props & {
    updateFields: (fields: Partial<Props>) => void
}