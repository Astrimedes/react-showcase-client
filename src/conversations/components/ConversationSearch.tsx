import './ChatApp.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Form, Row, Stack } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Convo from '../models/Convo';
import ConversationQueryResultsRenderDeferred from './ConversationQueryResultsRenderDeferred';
import { getAllConversations } from '../../chaptGptLib';
import { delay } from '../models/SortAndFindUtils';
import Msg from '../models/Msg';
import { RenderOption } from '../models/RenderOptions';
import ConversationQueryResultsNoDeferred from './ConversationQueryResultsRenderStandard';
import ConversationQueryResultsRenderTransition from './ConversationQueryResultsRenderTransition';

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

    useEffect(() => {
        if (shouldReload && !isLoading) {
            setIsLoading(true);
            setShouldReload(false);
            delay(3000)
                .then(getAllConversations)
                .then(convoResponse => {
                    if (!(convoResponse instanceof Array<Convo>)) {
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
    }, [shouldReload])

    useEffect(() => {
        setAllConvos(resolveMessagesAgainstConvos(allConvos, messageList));
    }, [messageList])

    return (
        <>
            <Form>
                <Row className="mb-3 inset-children">
                    <Col sm="12">
                        <Row className="mb-3">
                            <Stack direction="vertical" gap={1}>
                                <Form.Label>Search for a Conversation:</Form.Label>
                                <Form.Control as="textarea" rows={2} value={searchTerms} onChange={(e) => setSearchTerms(e.target.value)}></Form.Control>
                            </Stack>
                        </Row>
                    </Col>
                </Row>
                
                <Row className="mb-3">
                    <Col sm="12">
                        { 
                            isLoading ? <h3 className="text-warning">Loading...</h3>
                            : isLoadingError ? <h3 className="text-danger">Error Loading Conversations</h3>
                            : renderOption === 'standard' ? <ConversationQueryResultsNoDeferred query={searchTerms} allConvos={allConvos} /> 
                            : renderOption === 'deferred' ? <ConversationQueryResultsRenderDeferred query={searchTerms} allConvos={allConvos} />
                            : renderOption === 'transition' ? <ConversationQueryResultsRenderTransition query={searchTerms} allConvos={allConvos} />
                            : ''
                        }
                    </Col>                
                </Row>
            </Form>
        </>
    );
}

export default ConversationSearch;

