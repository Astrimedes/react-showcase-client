import Msg from "./Msg";

const sortDescendingFn = (a: Msg, b: Msg) => b.time - a.time;
const sortAscendingFn = (a: Msg, b: Msg) => a.time - b.time;

const sortMessages = (messages: Msg[], sortDescending = true) => {
    return [...messages].sort(sortDescending ? sortDescendingFn : sortAscendingFn);
}

export default sortMessages;