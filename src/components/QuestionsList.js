import React, { Component } from "react";
import PropTypes from "prop-types";
import QuestionsListItem from "./QuestionsListItem.js";
import { Row, Col, CardGroup } from 'react-bootstrap';

class QuestionsList extends Component {
    render() {
        const { questions } = this.props;
        return (

            // <Row xs={1} md={2} className="g-4">
            //     {questions.map((question) => (
            //         <Col>
            //             <QuestionsListItem key={question.id} question={question} />
            //         </Col>
            //     ))}
            // </Row>
            <CardGroup>
                {questions.map((question) => (
                    <QuestionsListItem key={question.id} question={question} />
                ))}
            </CardGroup>
        );
    }
}

QuestionsList.propTypes = {
    questions: PropTypes.array.isRequired,
};

export default QuestionsList;
