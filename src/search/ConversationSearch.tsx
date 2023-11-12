import '../styling/ChatAppStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Form, Row, Stack } from 'react-bootstrap';
import { useDeferredValue, useEffect, useState, useTransition } from 'react';
import { Convo } from '../conversations';
import { Msg, delay, getAllConversations } from '../common';
import { RenderOption } from './RenderOptions';
import ConversationQueryResults from './ConversationQueryResults';
import StyleClassNames from '../styling';

const resolveMessagesAgainstConvos = (currentAllConvos: Convo[] | undefined, currentMsgList: Msg[] | undefined) => {
    //  add current convo, remove stale loaded version
    let nextConvos = currentAllConvos ?? new Array<Convo>();
    let currentConvo: Convo | undefined;
    if (currentMsgList !== undefined && currentMsgList.length > 0 && currentMsgList[0] !== undefined) {
        currentConvo = new Convo(currentMsgList[0].id, currentMsgList);
        let matchIdx = currentAllConvos?.findIndex(c => c.id === currentMsgList[0].conversationId);
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

function ConversationSearch(props: {messageList: Msg[] | undefined, renderOption: RenderOption}) {
    const {messageList, renderOption} = props;
    const [shouldReload, setShouldReload] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingError, setIsLoadingError] = useState(false);
    const [searchTerms, setSearchTerms] = useState("");
    const [allConvos, setAllConvos] = useState<Convo[] | undefined>(undefined);
    const deferredSearch = useDeferredValue(searchTerms);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        if (shouldReload && !isLoading) {
            setIsLoading(true);
            setShouldReload(false);
            delay(3000)
                .then(getAllConversations)
                .then(convoResponse => {
                    if (!(convoResponse instanceof Array)) {
                        throw new Error("loading error");
                    }
                    return convoResponse as Array<Convo>;
                })
                .then(convos => {
                    setAllConvos(resolveMessagesAgainstConvos(convos, messageList));
                }).catch(e => {
                    console.debug(e);
                    setIsLoadingError(true);
                }).finally(() => {
                    setIsLoading(false);
                })
        }
    }, [shouldReload, isLoading, messageList])

    useEffect(() => {
        setAllConvos(resolveMessagesAgainstConvos(allConvos, messageList));
    }, [messageList, allConvos])

    const updateSearchTerms = (newSearchTerms: string) => {
        if (renderOption === 'transition') {
            startTransition(() => {
                setSearchTerms(newSearchTerms);
            })
        } else {
            setSearchTerms(newSearchTerms);
        }
    };

    return (
        <>
            <Form>
                <Row className={StyleClassNames.insetRowStylesAll}>
                    <Col sm="12">
                        <Row className={StyleClassNames.rowStandard}>
                            <Stack direction="vertical" gap={1}>
                                <Form.Label>Search for a Conversation:</Form.Label>
                                <Form.Control as="textarea" rows={2} onChange={(e) => updateSearchTerms(e.target.value)}></Form.Control>
                            </Stack>
                        </Row>
                    </Col>
                </Row>
                
                <Row className={StyleClassNames.rowStandard}>
                    <Col sm="12">
                        { 
                            isLoading ? <h3 className={StyleClassNames.textWarning}>Loading...</h3>
                            : isLoadingError ? <h3 className={StyleClassNames.textDanger}>Error Loading Conversations</h3>
                            : <>
                                {isPending ? <h4>useTransition: Rendering Batched...</h4> : null}
                                <ConversationQueryResults query={renderOption === 'deferred' ? deferredSearch : searchTerms} allConvos={allConvos} />
                            </>
                        }
                    </Col>                
                </Row>
            </Form>
        </>
    );
}

export default ConversationSearch;

