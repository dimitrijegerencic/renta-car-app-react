import React from "react";
import UserCard from "../userCard/UserCard";
import Table from "../../table/Table";
import {listOfMovies} from "../../../constants/constants";
import {useAppData} from "../../../context/AppContext";

const SelectedUser = () => {
    const {selectedUser} = useAppData()
    const header = ['Id', 'Name', 'Year', 'Genre', 'Image', 'actors', 'userId']

    return <div>
        {selectedUser?.id ?
            <>
                <UserCard firstName={selectedUser?.firstName}
                          lastName={selectedUser?.lastName}
                          age={selectedUser?.age}
                          city={selectedUser?.city}
                          image={selectedUser?.image}/>
                <Table header={header} rows={selectedUser?.movies}/>
            </>
            :
            <div>No user selected!</div>
        }
    </div>
}

export default SelectedUser;