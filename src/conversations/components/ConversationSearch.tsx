import './ChatApp.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Form, Row } from 'react-bootstrap';
import { useEffect, useMemo, useState, useTransition } from 'react';
import Convo from '../models/Convo';
import ConversationQueryResults from './ConversationQueryResults';
import { getAllConversations } from '../../chaptGptLib';
import { delay } from '../models/SortAndFindUtils';
import Msg from '../models/Msg';

const resolveMessagesAgainstConvos = (currentAllConvos: Convo[] | undefined, currentMsgList: Msg[] | undefined) => {
    //  add current convo, remove stale loaded version
    let nextConvos = currentAllConvos ?? new Array<Convo>();
    let currentConvo: Convo | undefined;
    if (currentMsgList !== undefined && currentMsgList.length > 0 && currentMsgList[0] !== undefined) {
        currentConvo = new Convo(currentMsgList[0].id, currentMsgList);
        let matchIdx = currentAllConvos?.findIndex(c => c.id == currentMsgList[0].conversationId);
        // remove it if present
        if (matchIdx) {
            nextConvos.splice(matchIdx, 1);
        }
    }
    // add current convo
    if (currentConvo) {
        nextConvos.push(currentConvo);
    }
    // return list
    return nextConvos;
};

function ConversationSearch(props: {reload: boolean, messageList: Msg[] | undefined}) {
    const {messageList, reload: reloadProp} = props;
    const [shouldReload, setShouldReload] = useState(reloadProp);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingError, setIsLoadingError] = useState(false);
    const [searchTerms, setSearchTerms] = useState("");
    const [allConvos, setAllConvos] = useState<Convo[] | undefined>(undefined);
    // const [isPending, startTransition] = useTransition();

    console.log(`isLoading: ${isLoading}, shouldReload: ${shouldReload}`);

    if (shouldReload) {
        console.log(`preparing the call to get convos...`);
        setIsLoading(true);
        setShouldReload(false);
        delay(1000)
            .then(getAllConversations)
            .then(convoResponse => {
                if (!(convoResponse instanceof Array<Convo>)) {
                    // error
                    setIsLoadingError(true);
                    throw new Error("loading error");
                } else {
                    return convoResponse as Array<Convo>;
                }
            })
            .then(convos => {
                setAllConvos(resolveMessagesAgainstConvos(convos, messageList));
            }).catch(e => {
                setIsLoadingError(true);
            }).finally(() => {
                setIsLoading(false);
            })
    };

    useMemo(() => {
        let result = resolveMessagesAgainstConvos(allConvos, messageList)
        if (result instanceof Error) {
            setIsLoadingError(true);
        } else {
            setAllConvos(result as Convo[])
        }
    }, [messageList, reloadProp]);

    return (
        <>
            <Form>
                <Row className="mb-3">
                    <Col sm="2">
                        <Form.Label >Message Search Terms</Form.Label>
                    </Col>
                    <Col sm="4">
                        <Form.Control type="text" value={searchTerms} onChange={(e) => setSearchTerms(e.target.value)}></Form.Control>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col sm="12">
                        { 
                            isLoading ? <>Loading...</>
                            : isLoadingError ? <>ERROR LOADING CONVERSATIONS</>
                            : <ConversationQueryResults query={searchTerms} allConvos={allConvos} />
                        }
                    </Col>                
                </Row>
            </Form>
        </>
    );
}

export default ConversationSearch;

