import React from "react";

export default function Container({ children, selected }) {

    return <div style={{ padding: 5, borderRadius: 10, backgroundColor: selected ? 'lightskyblue' : "#fff", }}>

        {children}
    </div>
}