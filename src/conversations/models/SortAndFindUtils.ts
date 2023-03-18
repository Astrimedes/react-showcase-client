import Convo from "./Convo";
import Msg from "./Msg";

const sortDescendingFn = (a: Msg, b: Msg) => b.time - a.time;
const sortAscendingFn = (a: Msg, b: Msg) => a.time - b.time;

const sortMessages = (messages: Msg[], sortDescending = true) => {
    return [...messages].sort(sortDescending ? sortDescendingFn : sortAscendingFn);
}

const findConversation = (allConvos: Convo[] | undefined, searchTerms: string) => {
    if (!allConvos || allConvos.length < 1) return;
    const matches = allConvos.filter(convo => convo.messages.find(msg => msg.message.includes(searchTerms)));
    // insert artificial delay
    let startTime = performance.now();
    while(performance.now() - startTime < 100) {
        // do nothing
    }
    return matches;
}

const conversationArraysAreEqual = (convos1: Convo[] | undefined, convos2: Convo[] | undefined) => {
    console.log('checking convo arrays for equality...');
    if (convos1 == convos2) return true; // covers undefined
    if (!convos1 || !convos2) return false; // bail if any are still undefined
    if (convos1.length != convos2.length) return false;
    return convos1.every((_, idx) => {
        return convos1[idx].id == convos2[idx].id && convos1[idx].messages?.length == convos2[idx].messages?.length
    })
}

export { sortMessages, findConversation, conversationArraysAreEqual }