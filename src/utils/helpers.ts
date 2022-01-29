import { SearchUserParams } from "src/modules/users/interfaces";

export const searchFilters = (params: SearchUserParams) => {
    const { email, name, contactPhone } = params;
    let filters;
    if(email) {
        filters.email = { "email": /.*email.*/};
    }
    if(name) {
        filters.name = { "name": /.*name.*/};
    }
    if(contactPhone) {
        filters.contactPhone = { "contactPhone": /.*contactPhone.*/}
    }

    return filters;

}