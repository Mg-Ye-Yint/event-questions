import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById } from "../api/event";
import { getQuesByEId, getQuesByOwnerId } from "../api/question";
import { Ievent } from "../interface/Ievent";
import { IQuestion } from "../interface/IQuestion";
import useStore from "../store";
import HostEvent from "./HostEvent";
import EventDetails from "./EventDetails";
import Loading from "../components/Loading";

interface IData {
    refresh: number;
    handleRefresh: () => void;
}

export default function EventRoom(props: IData) {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("user") || "null");
    const { eventId, isHost } = useParams();
    const [eventData, setEventData] = useState<Ievent>();
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [myQuestions, setMyQuestions] = useState<IQuestion[]>([]);
    const [openLoading, setOpenLoading] = useState(false);
    const {
        todos,
        addTodo,
        setReset,
        liveblocks: { enterRoom, leaveRoom, isStorageLoading },
    } = useStore();

    const fetchQuestion = async () => {
        setOpenLoading(true);
        const data = (await getQuesByEId(eventId ?? "")) as IQuestion[];
        if (data) {
            setQuestions(data);
        }
    };

    useEffect(() => {
        enterRoom("zustand-todo-app");
        return () => {
            leaveRoom();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [enterRoom, leaveRoom]);

    useEffect(() => {
        const fetch = async () => {
            const data = await getEventById(eventId ?? "");
            if (data) {
                setEventData(data);
            } else {
                navigate("/");
            }
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        fetchQuestion();
        setOpenLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.refresh, todos]);
    useEffect(() => {
        const fetch = async () => {
            const data = (await getQuesByOwnerId(
                userInfo.userId ?? ""
            )) as IQuestion[];
            setMyQuestions(data);
        };
        if (userInfo !== undefined) {
            fetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.refresh, todos]);

    const handleLoading = () => {
        setOpenLoading(true);
    };

    if (isStorageLoading) {
        return (
            <>
                <Loading openLoading={isStorageLoading} />
            </>
        );
    }

    return (
        <>
            <Loading openLoading={openLoading} />
            {eventData !== undefined &&
                (isHost !== "host" ? (
                    <EventDetails
                        refresh={todos.length}
                        handleRefresh={addTodo}
                        questions={questions}
                        myQuestions={myQuestions}
                        handleLoading={handleLoading}
                    />
                ) : (
                    <HostEvent
                        refresh={todos.length}
                        handleRefresh={addTodo}
                        questions={questions}
                        setReset={setReset}
                        openLoading={openLoading}
                        handleLoading={handleLoading}
                    />
                ))}
        </>
    );
}
