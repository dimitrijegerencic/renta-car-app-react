import React from "react";
import {useAppData} from "../../../context/AppContext";
import {listOfUsers} from "../../../constants/constants";
import Table from "../../table/Table";

const TableOfUsers = () => {
    const header = ['Id', 'First name', 'Last name', 'Age', 'City', 'Image']
    const {setSelectedUser} = useAppData()

    return <Table header={header} rows={listOfUsers} onRowClick={(e) => setSelectedUser(e)}/>
}

export default TableOfUsers;