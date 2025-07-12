import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Questions } from "../Data/Question";

const Quiz = () => {
    return (
        <div className='sm:w-10/12 w-full m-auto h-full sm:p-8 p-4'>
            <div className='flex gap-4 mb-4'>
                <Link to='/practitioner'><p className='font-bold text-md my-2 bg-white px-8 py-2 shadow-md w-fit rounded-full'>Files</p></Link>
                <p className='font-bold text-md my-2 bg-white px-8 py-2 shadow-md w-fit rounded-full'>Quiz</p>
            </div>

            {Questions.map((ele, ind) => (
                <div className='bg-white flex flex-col mb-8 rounded-xl' key={ind}>
                    <QuizSection ele={ele} ind={ind} />
                </div>
            ))}
        </div>
    );
}

export default Quiz;

const QuizSection = ({ ele, ind }) => {
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [showExplanation, setShowExplanation] = useState(false);

    const handleAnswerChange = (answer) => {
        setSelectedAnswer(answer);
    };

    const checkAnswerClass = (option) => {
        if (!selectedAnswer) return '';
        return ele.ans === option ? 'bg-green-200' : 'bg-gray-100';
    };

    return (
        <div className='border-[1px] border-r-gray-50 shadow-xl sm:p-8 p-4 rounded-xl'>
            <p className='mb-2 sm:text-base text-sm'>
                <span className='font-semibold'>Question {ind + 1}</span>: {ele.q}
            </p>

            <div className='sm:flex sm:gap-2 justify-between sm:my-2'>
                <div className={`sm:border-[1px] border-r-gray-50 sm:shadow-sm ${checkAnswerClass('op1')} sm:w-1/2 py-2 px-4 flex gap-2 sm:rounded-full`}>
                    <input
                        type="radio"
                        onChange={() => handleAnswerChange('op1')}
                        name={`question-${ind}`}
                        value="op1"
                        id={`op1-${ind}`}
                    />
                    <label htmlFor={`op1-${ind}`}>{ele.op1}</label>
                </div>

                <div className={`sm:border-[1px] border-r-gray-50 sm:shadow-sm ${checkAnswerClass('op2')} sm:w-1/2 py-2 px-4 flex gap-2 sm:rounded-full`}>
                    <input
                        type="radio"
                        onChange={() => handleAnswerChange('op2')}
                        name={`question-${ind}`}
                        value="op2"
                        id={`op2-${ind}`}
                    />
                    <label htmlFor={`op2-${ind}`}>{ele.op2}</label>
                </div>
            </div>

            <div className='sm:flex sm:gap-2 justify-between sm:my-2'>
                <div className={`sm:border-[1px] border-r-gray-50 sm:shadow-sm ${checkAnswerClass('op3')} sm:w-1/2 py-2 px-4 flex gap-2 sm:rounded-full`}>
                    <input
                        type="radio"
                        onChange={() => handleAnswerChange('op3')}
                        name={`question-${ind}`}
                        value="op3"
                        id={`op3-${ind}`}
                    />
                    <label htmlFor={`op3-${ind}`}>{ele.op3}</label>
                </div>

                <div className={`sm:border-[1px] border-r-gray-50 sm:shadow-sm ${checkAnswerClass('op4')} sm:w-1/2 py-2 px-4 flex gap-2 sm:rounded-full`}>
                    <input
                        type="radio"
                        onChange={() => handleAnswerChange('op4')}
                        name={`question-${ind}`}
                        value="op4"
                        id={`op4-${ind}`}
                    />
                    <label htmlFor={`op4-${ind}`}>{ele.op4}</label>
                </div>
            </div>
            
            {selectedAnswer && (
                <button
                    className='font-bold py-1 px-2 mt-2 text-green-700 underline'
                    onClick={() => setShowExplanation(!showExplanation)}
                >
                    Explanation
                </button>
            )}
            
            {showExplanation && (
                <p className='text-green-700 px-2'>
                    <hr className='my-2' />
                    {ele.exp}
                </p>
            )}
        </div>
    );
}
