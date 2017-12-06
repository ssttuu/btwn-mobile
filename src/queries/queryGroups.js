import gql from 'graphql-tag';


export default gql`
query ListGroups($phoneNumber: String!) {
  groups(phone_number: $phoneNumber) {
    id,
    members {
        phone_number,
        first_name,
        last_name
    }
  }
}
`;