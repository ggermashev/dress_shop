import React, {useState} from "react";

export function Logout() {
    localStorage.removeItem('mim_key')
    window.location.href = '/'
    return (
        <div>
        </div>
    )
}