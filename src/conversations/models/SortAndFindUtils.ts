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

const findConversationsAsync = (allConvos: Convo[] | undefined, searchTerms: string, delayTime = 150) => {
    return delay(delayTime).then(() => {
        return findConversations(allConvos, searchTerms, 0);
    })
}

const findConversations = (allConvos: Convo[] | undefined, searchTerms: string, delayTime = 150) => {
    const cleanedSearch = searchTerms.trim().toLowerCase();
    let start = performance.now();
    while(performance.now() - start < delayTime) {
        // do nothing
    }
    if (!allConvos || allConvos.length < 1) return undefined;
    return allConvos.filter(convo => convo.id.toLowerCase().includes(cleanedSearch) || convo.messages.find(msg => msg.message.toLowerCase().includes(cleanedSearch)));
}

const conversationArraysAreEqual = (convos1: Convo[] | undefined, convos2: Convo[] | undefined) => {
    if (convos1 === convos2) return true; // covers undefined
    if (!convos1 || !convos2) return false; // bail if any are still undefined
    if (convos1.length !== convos2.length) return false;
    return convos1.every((_, idx) => {
        return convos1[idx].id === convos2[idx].id && convos1[idx].messages?.length === convos2[idx].messages?.length
    })
}

export { sortMessages, findConversations, findConversationsAsync, conversationArraysAreEqual, delay }