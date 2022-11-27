import React from "react";

const Name = ({
                  currentUser,
                  firstName,
                  lastName,
                  age = null,
                  city = null
}) => {

    return(<table style={{
        backgroundColor: "wheat",
        border: "1px solid",
        padding: '16px'}}>
        {/*<tr>*/}
        {/*    <td>Current user</td>*/}
        {/*    <td>{currentUser}</td>*/}
        {/*</tr>*/}
        <tr>
            <td>First name</td>
            <td>{firstName}</td>
        </tr>
        <tr>
            <td>Last name</td>
            <td>{lastName}</td>
        </tr>
        <tr>
             <td>Age</td>
             <td>{age ? age : "No data"}</td>
        </tr>
        {
            city &&
            <tr>
                <td>City</td>
                <td>{city}</td>
            </tr>
        }
    </table>)
}

export default Name;