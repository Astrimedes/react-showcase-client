import Conversation from "../components/Conversation";
import Convo from "./Convo";
import Msg from "./Msg";

const sortDescendingFn = (a: Msg, b: Msg) => b.time - a.time;
const sortAscendingFn = (a: Msg, b: Msg) => a.time - b.time;

const sortMessages = (messages: Msg[], sortDescending = true) => {
    return [...messages].sort(sortDescending ? sortDescendingFn : sortAscendingFn);
}

function delay(t: number) {
    return new Promise(resolve => setTimeout(resolve, t));
}

const findConversations = (allConvos: Convo[] | undefined, searchTerms: string) => {
    const cleanedSearch = searchTerms.trim().toLowerCase();
    return delay(500).then(() => {
        if (!allConvos || allConvos.length < 1) return undefined;
        const matches = allConvos.filter(convo => convo.id.toLowerCase().includes(cleanedSearch) || convo.messages.find(msg => msg.message.toLowerCase().includes(cleanedSearch)));
        return matches;
    });
}

const conversationArraysAreEqual = (convos1: Convo[] | undefined, convos2: Convo[] | undefined) => {
    console.log('checking convo arrays for equality...');
    if (convos1 === convos2) return true; // covers undefined
    if (!convos1 || !convos2) return false; // bail if any are still undefined
    if (convos1.length !== convos2.length) return false;
    return convos1.every((_, idx) => {
        return convos1[idx].id === convos2[idx].id && convos1[idx].messages?.length === convos2[idx].messages?.length
    })
}

export { sortMessages, findConversations as findConversation, conversationArraysAreEqual, delay }