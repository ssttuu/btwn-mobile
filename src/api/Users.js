const HOST = 'http://10.0.2.2:10000/v1/';

export const sendVerificationCode = ({phoneNumber}) => {
    return fetch(`${HOST}users/verification`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phone_number: phoneNumber,
        })
    }).catch(error => {
        console.error(error);
    });
};

export const login = ({phoneNumber, code}) => {
    return fetch(`${HOST}users/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            phone_number: phoneNumber,
            code: code,
        })
    }).catch(error => {
        console.error(error);
    });
};
