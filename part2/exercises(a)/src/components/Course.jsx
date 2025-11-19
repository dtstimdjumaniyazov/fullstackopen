const Course = ({course}) => {
    const header = <h1>Web development curriculum</h1>
    // const courseParts = course.parts.map(part => {
    //     // console.log(part)
    //     return (
    //         <div key={part.id}>
    //             <p>
    //                 {part.name} {part.exercises}
    //             </p>
    //         </div>
    //     )
    // })
    // const exercisesArray = course.parts.map(part => part.exercises);
    // // console.log(exercisesArray);
    // const sum = exercisesArray.reduce((acc, val) => acc + val)
    // // console.log(sum);
    

    const coursesObject = course.map((c) => {
        // console.log(c);
        // console.log('Exercises: ', c.parts)
        const exercisesArray = c?.parts.map(part => part?.exercises)
        // console.log(exercisesArray)
        const sum = exercisesArray.reduce((acc, val) => acc + val)
        // console.log(sum)
        return (
            <div key={c.id}>
                <h1>{c.name}</h1>
                {c.parts.map(part => {
                    return (
                        <div key={part.id}>
                            <p>{part.name} {part.exercises}</p>
                        </div>
                    )
                })}
                <p><strong>total of {sum} exercises</strong></p>
            </div>
        )
    })

    
    return (
        <>
            {header}
            {/* {courseParts}
            <p><strong>total of {sum} exercises</strong></p> */}
            {coursesObject}
        </>
    )
}

export default Course;