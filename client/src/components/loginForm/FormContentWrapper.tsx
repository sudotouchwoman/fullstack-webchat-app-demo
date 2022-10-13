import { ReactNode } from 'react'

type FormWrapperProps = {
    title: string
    children: ReactNode
}

function FormContentWrapper({ title, children }: FormWrapperProps) {
    return (
        <>
            <h2 style={{ textAlign: "center", margin: 0, marginBottom: "2rem" }}>
                {title}
            </h2>
            <div style={{
                display: "grid",
                gap: "1re, .5rem",
                justifyContent: "flex-start",
                gridTemplateColumns: "auto minmax(auto, 400px)"
            }}>{children}</div>
        </>
    )
}

export default FormContentWrapper