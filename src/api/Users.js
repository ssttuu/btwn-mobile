import {HOST} from "./constants";
import * as _ from "lodash";
const PN = require("google-libphonenumber");

const phoneUtil = PN.PhoneNumberUtil.getInstance();

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

export const uploadContacts = ({jwt, userId, contacts}) => {
    const filteredContacts = _.filter(contacts, (contact) => {
        const mobilePhone = _.find(contact.phoneNumbers, ['label', 'mobile']);
        if (mobilePhone === undefined) {
            return false;
        }
        const phoneNumberParsed = phoneUtil.parse(mobilePhone.number, 'US');
        return phoneUtil.isValidNumber(phoneNumberParsed);
    });

    const formattedContacts = _.map(filteredContacts, (contact) => {
        const mobilePhone = _.find(contact.phoneNumbers, ['label', 'mobile']);
        const phoneNumberParsed = phoneUtil.parse(mobilePhone.number, 'US');
        const phoneNumber = phoneUtil.format(phoneNumberParsed, PN.PhoneNumberFormat.E164);

        const homeEmail = _.find(contact.emailAddresses, ['label', 'home']);
        return {
            first_name: contact.givenName,
            last_name: contact.familyName,
            phone_number: phoneNumber,
            email: homeEmail ? homeEmail.email : null,
        };
    });

    console.log(formattedContacts);
    console.log(`${HOST}users/${userId}/contacts/upload`);

    return fetch(`${HOST}users/${userId}/contacts/upload`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify({
            contacts: formattedContacts,
        })
    }).catch(error => {
        console.error(error);
    });
};

export const getContacts = ({jwt, userId}) => {
    return fetch(`${HOST}users/${userId}/contacts`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    }).catch(error => {
        console.error(error);
    });
};
