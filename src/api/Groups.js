import {HOST} from "./constants";

export const create = ({jwt, userId, memberIds}) => {
    console.log(`create: ${jwt} ${userId}, ${memberIds}`)
    return fetch(`${HOST}users/${userId}/groups`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify({
            member_ids: memberIds,
        })
    }).catch(error => {
        console.error(error);
    }).then(response => {
        console.log(response);
    })
};