import Button from 'react-bootstrap/Button';
import { Col, Form, Row } from 'react-bootstrap';
import { ArrowRepeat } from 'react-bootstrap-icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import Msg from '../models/Msg';
import { getConvoMessages } from '../../chaptGptLib';

export function ConversationController(props: {editable: boolean, setConvoId: (newConvoId: string) => void, setMessagesList: (msgs: Msg[]) => void, convoId: string}) {
  const {editable, convoId, setMessagesList, setConvoId} = props;
  const [isEditable, setIsEditable] = useState(editable);

  const getAllConvoMessages = (queryConvoId: string) => {
    setIsEditable(false);
    getConvoMessages(queryConvoId)
    .then((msgs) => {
      console.log(msgs);
      if (msgs?.length > 0)
      {
        setMessagesList(msgs);
        if (queryConvoId != convoId)
        {
          setConvoId(queryConvoId);
        }
      }
    })
    .catch(er => console.log(er))
    .finally(() => {
      setIsEditable(true);
    });
  };

  useEffect(() => {
    if (convoId)
    {
      getAllConvoMessages(convoId);
    }
  }, [convoId]);

  return (
  <>
    <Form.Group as={Row} className="mb-2">
      <Form.Label  column sm="12" style={{paddingLeft: "1rem"}} className="text-secondary"><strong>Conversation ID:</strong> {convoId}</Form.Label>
    </Form.Group>
  </>
  );
}
