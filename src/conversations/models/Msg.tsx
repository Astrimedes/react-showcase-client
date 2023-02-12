class Msg {
    id: string = "";
    conversationId: string = "";
    message: string = "";
    parentMessageId: string = "";
    role: string = "";
    time: number = 0;

    public constructor(init?:Partial<Msg>) {
        Object.assign(this, init);
    }
};

export default Msg;