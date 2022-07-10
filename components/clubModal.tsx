import {Alert, Button, Checkbox, LoadingOverlay, Modal, MultiSelect, Textarea, TextInput} from "@mantine/core";
import {useState} from "react";
import {useForm} from "@mantine/form";
import {Club} from "../models/club";


//https://github.com/mantinedev/mantine/blob/v5/src/mantine-demos/src/shared/AuthenticationForm/AuthenticationForm.tsx
//https://mantine.dev/core/modal/
//https://github.com/mantinedev/mantine/tree/v5/src/mantine-demos/src

export default function ClubModal({club, buttonName}: { club?: Club, buttonName: string }) {
    const [opened, setOpened] = useState(false);

    const [loading, setLoading] = useState(false);
    // @ts-ignore
    const [error, setError] = useState<string>(null);

    //jahrgang selector
    // @ts-ignore
    const [grade, setGrade] = useState<string[]>(null);
    //datum selector
    // @ts-ignore
    const [date, setDate] = useState<string[]>(null);

    const [active, setActive] = useState(club ? club.active : true);

    const [talentPromotion, setTalentPromotion] = useState(club ? club.talentPromotion : false)

    const form = useForm({
        initialValues: {
            titel: club?.name || "",
            description: club?.description || "",
            grade: club?.grade || [""],
            date: club?.date || [""],
            lesson: club?.lesson || "",
            room: club?.room || "",
            teacher: club?.teacher || "",
            talentPromotion: talentPromotion,
            active: active,
        },
    })

    const handleSubmit = async () => {
        setLoading(true);

        console.log(form.values);

        await fetch("api/clubs", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form.values)
        }).then(res => {
            if (res.status === 200) {
                setOpened(false);
                setLoading(false);
            } else {
                res.json().then(data => {
                    setError(data.error.message);
                })
                setLoading(false);
            }
        });
    };

    return (
        <>

            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Neue AG erstellen"
                size="lg"
            >
                {
                    <form onSubmit={form.onSubmit(handleSubmit)} >
                        <LoadingOverlay visible={loading}/>

                        <TextInput
                            required
                            data-autofocus
                            label="Titel"
                            variant="filled"
                            placeholder="Titel"
                            mt="md"
                            {...form.getInputProps('titel')}
                        />

                        <Textarea
                            required
                            label="Beschreibung"
                            variant="filled"
                            placeholder="Beschreibung"
                            autosize
                            minRows={2}
                            maxRows={7}
                            mt="md"
                            {...form.getInputProps("description")}
                        />

                        <MultiSelect
                            required
                            data={
                                [...Array(8).keys()].map(j => j + 5).map(i => {
                                    return {
                                        value: `${i}`,
                                        label: `${i}`,
                                    }
                                })
                            }
                            label="Jahrgang"
                            placeholder="5, 6, 7, 8, 9, 10, 11, 12"
                            variant="filled"
                            value={form.getInputProps('grade') || grade}
                            onChange={
                                (value) => {
                                    setGrade(value.sort((a, b) => Number.parseInt(a) - Number.parseInt(b)))
                                }}
                            mt="md"
                        />

                        <MultiSelect
                            required
                            data={[
                                {label: "Montag", value: "1"},
                                {label: "Dienstag", value: "2"},
                                {label: "Mittwoch", value: "3"},
                                {label: "Donnerstag", value: "4"},
                                {label: "Freitag", value: "5"},
                                {label: "14-tägig", value: "8"},
                                {label: "nach Vereinbarung", value: "9"}]}
                            label="Datum"
                            variant="filled"
                            value={form.getInputProps('date') || date}
                            onChange={(value) => {
                                setDate(value.sort())
                            }}
                            placeholder="Dienstag, 14-tägig"
                            mt="md"
                        />

                        <TextInput
                            required
                            label="Stunde"
                            placeholder="8./9."
                            variant="filled"
                            mt="md"
                            {...form.getInputProps('lesson')}
                        />

                        <TextInput
                            required
                            label="Raum"
                            placeholder="A137"
                            variant="filled"
                            mt="md"
                            {...form.getInputProps('room')}
                        />

                        <TextInput
                            required
                            label="Lehrer"
                            description="Vorname Nachname"
                            placeholder="Volker Ovelgönne"
                            variant="filled"
                            mt="md"
                            {...form.getInputProps('teacher')}
                        />

                        <Checkbox
                            label="Begabungsförderung"
                            mt="md"
                            checked={talentPromotion}
                            onChange={(value) => {setTalentPromotion(!talentPromotion)}}
                        />

                        <Checkbox
                            label="Aktiv"
                            mt="md"
                            checked={active}
                            onChange={(value) => {setActive(!active)}}
                        />

                        <Button mt="md" color="blue" variant="outline" type="submit">
                            Erstellen
                        </Button>
                        {error && <Alert variant="filled" color="red" mt="sm" title="Fehler!">{error}</Alert>}
                    </form>
                }
            </Modal>


            <Button onClick={() => {
                setOpened(true);
            }} variant="outline" radius="md"
                    size="md">
                {buttonName}
            </Button>

        </>
    )
}