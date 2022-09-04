import {Club} from "../models/club";

export default function PrintedDetail({club}: { club: Club }) {
    return (
        <>
            <p>{club.name}</p>
        </>
    )
}

