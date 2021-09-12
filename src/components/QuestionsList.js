import React, { Component } from "react";
import PropTypes from "prop-types";
import QuestionsListItem from "./QuestionsListItem.js";

class QuestionsList extends Component {
    render() {
        const { questions } = this.props;
        return (
            <div>{questions.map((question) => <QuestionsListItem key={question.id} question={question} />)} </div>
        );
    }
}

QuestionsList.propTypes = {
    questions: PropTypes.array.isRequired,
};

export default QuestionsList;
