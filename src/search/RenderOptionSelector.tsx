import { Col, Container, Form, Row } from "react-bootstrap";
import { RenderOption } from "./RenderOptions";


const RenderOptionSelector = (props: {renderMode: RenderOption, setRenderMode: React.Dispatch<React.SetStateAction<RenderOption>>}) =>
{ 
    const {renderMode: renderState, setRenderMode: setRenderState} = props;
    return (
        <Row just>
            <Col md="auto">
                <Container>
                    <Form.Label>Render Mode:</Form.Label>
                </Container>
            </Col>
            <Col md="auto">
                <Form.Select aria-label={`Render Mode: ${renderState}`} onChange={e => setRenderState(e.currentTarget.value as RenderOption)}>
                    <option value="standard">Standard (no deferred/transitions)</option>
                    <option value="deferred">Deferred (useDeferredValue)</option>
                    <option value="transition">Transition (useTransition)</option>
                </Form.Select>
            </Col>
        </Row>
        
    )
};

export default RenderOptionSelector;