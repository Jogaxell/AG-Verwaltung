import {useRouter} from "next/router";

// @ts-ignore
export default function AdminSidebarEntry({name, link, icon, addition}) {
    const router = useRouter()
    const style = {backgroundColor: router.route == link ? "#d1d5db" : ""}
    return (
        <>
            <div>
                <a href={link} style={style} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                    {icon}
                    <span className="ml-3">{name}</span>
                    {addition}
                </a>
            </div>
        </>
    )
}