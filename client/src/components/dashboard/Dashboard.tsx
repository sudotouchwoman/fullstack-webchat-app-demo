import ChatSidebar from "../sidebar/Sidebar"

type DashboardProps = { id: string }

export default function Dashboard({ id }: DashboardProps) {
    return (
        <div className="d-flex" style={{ height: "100vh" }}>
            <ChatSidebar id={id} />
        </div>
    )
}
