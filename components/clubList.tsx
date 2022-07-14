import {Checkbox, Divider, Menu, Spoiler, Table} from "@mantine/core";
import {Check, Copy, Pencil, Trash} from "tabler-icons-react";
import {Club} from "../models/club";
import DateFormatter from "./dateFormatter";
import Router from "next/router";
import {showNotification} from "@mantine/notifications";
import {useState} from "react";
import ClubModal from "./clubModal";

// @ts-ignore
export default function ClubList({clubs, menu = true}: { clubs: Club[], menu?: boolean }) {
    const [selectedClub, setSelectedClub] = useState<Club | null>(null);
    //sort alphabetically
    clubs = clubs.sort((a, b) => a.name.localeCompare(b.name))

    const rows = clubs.map((element) => (
        <tr key={element.name}>
            <td>{element.name}</td>
            <td><Spoiler maxHeight={50} hideLabel="Weniger" showLabel="Mehr anzeigen"
                         styles={{control: {fontSize: "14px"}}}>{element.description}</Spoiler></td>
            <td>{element.grade.join(", ")}</td>
            <td><DateFormatter date={element.date}/></td>
            <td>{element.lesson}</td>
            <td>{element.room}</td>
            <td>{element.teacher.join(", ")}</td>
            <td><Checkbox checked={element.talentPromotion}/></td>
            <td>
                {menu && <>
                    <Menu>
                        <Menu.Item icon={<Pencil size={14}/>} onClick={
                            () => {
                                setSelectedClub(element)
                            }
                        }>Bearbeiten</Menu.Item>
                        
                        <Divider/>

                        <Menu.Item onClick={async () => {
                            await fetch("api/clubs", {
                                method: "delete",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({id: element._id})
                            }).then(res => {
                                if (res.status === 200) {
                                    showNotification({
                                        color: 'teal',
                                        title: 'Erfolgreich',
                                        message: 'AG wurde erfolgreich gelöscht!',
                                        icon: <Check size={16} />,
                                    })
                                    Router.replace(Router.asPath)
                                }else {
                                    showNotification({
                                        color: 'red',
                                        title: 'Fehler',
                                        message: 'Es ist etwas schief gelaufen: ' + res.statusText,
                                    })
                                }
                            });
                        }} color="red" icon={<Trash size={14}/>}>Löschen</Menu.Item>
                    </Menu>
                </>}
            </td>
        </tr>
    ));
    return (
        <>
            {
                selectedClub && <ClubModal club={selectedClub} onClose={() => setSelectedClub(null)}/>
            }
            <Table highlightOnHover>
                <thead>
                <tr>
                    <th>Titel</th>
                    <th>Beschreibung</th>
                    <th>Jahrgang</th>
                    <th>Datum</th>
                    <th>Stunde</th>
                    <th>Raum</th>
                    <th>Lehrer</th>
                    <th>Begabungsförderung</th>
                    {menu && <th></th>}
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </>
    )
}