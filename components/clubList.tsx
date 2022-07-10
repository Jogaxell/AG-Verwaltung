import {Divider, Menu, Spoiler, Table} from "@mantine/core";
import {Copy, Pencil, Trash} from "tabler-icons-react";
import {Club} from "../models/club";
import DateFormatter from "./dateFormatter";

// @ts-ignore
export default function ClubList({clubs, menu = true}: { clubs: Club[], menu?: boolean }) {
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
            <td>{element.teacher}</td>
            <td>{element.talentPromotion ? "Ja" : "Nein"}</td>
            <td>
                {menu && <>
                    <Menu>
                        <Menu.Item onClick={() => console.log('Hello please edit haheh')}
                                   icon={<Pencil size={14}/>}>Bearbeiten</Menu.Item>

                        <Divider/>

                        <Menu.Item icon={<Copy size={14}/>}>Kopieren</Menu.Item>
                        <Menu.Item color="red" icon={<Trash size={14}/>}>Löschen</Menu.Item>
                    </Menu>
                </>}
            </td>
        </tr>
    ));
    return (
        <>
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