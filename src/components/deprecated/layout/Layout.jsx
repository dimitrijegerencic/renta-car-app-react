import React from "react";
import SelectedUser from "../selectedUser/SelectedUser";
import TableOfUsers from "../tableOfUsers/TableOfUsers";
import SearchField from "../../search/Search";

const Layout = () => {

    return <div style={{display: "flex"}}>
        <div style={{width: "60vw", borderRight: "1px solid", height: "100vh"}}>
            <SearchField/>
            <TableOfUsers/>
        </div>
        <div style={{width: "40vw", height: "100vh"}}>
            <SelectedUser/>
        </div>
    </div>
}

export default Layout;