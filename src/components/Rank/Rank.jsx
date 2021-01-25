import React from 'react'

const Rank = ({ entries, name }) => {
    return (
        <div className="tc pa">
            <div className="white f3 pa1">
                {`${name} your current entry count is...`}
            </div>
            <div className="white f1 pa1">
                {entries}
            </div>
        </div>
    )
}

export default Rank;