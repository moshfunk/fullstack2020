import React from 'react'

const Header = ({text}) => {
    return (
        <h2>{text}</h2>
    )
}

const Total = ({parts}) => {
    // now this is ugly but neat!
    return (
        <p><b>total of {parts.map(part => part.exercises).reduce((s, v) => s + v)} exercises</b></p> 
    )
}

const Content = ({ id, parts }) => {
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}

const Part = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header text={course.name} />
            <Content id={course.id} parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course