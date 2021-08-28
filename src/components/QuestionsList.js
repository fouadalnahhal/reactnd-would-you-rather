import React, { Component } from "react";
import PropTypes from "prop-types";
import QuestionsListItem from "./QuestionsListItem.js";

class QuestionsList extends Component {
    render() {
        const { questions } = this.props;
        return (
            <div className="questions-list">
                {questions.length > 0 ? (
                    questions.map((question) => <QuestionsListItem key={question.id} question={question} />)
                ) : (
                    <p id="no-questions">No Questions Here, Check The Other Tab</p>
                )}
            </div>
        );
    }
}

QuestionsList.propTypes = {
    questions: PropTypes.array.isRequired,
};

export default QuestionsList;
