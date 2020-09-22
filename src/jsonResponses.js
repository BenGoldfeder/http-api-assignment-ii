const users = {};

const respondJSON = (request, response, status, object) => {

    const headers = {
        'Content-Type': 'application/json',
    };
    response.writeHead(status, headers);
    response.write(JSON.stringify(object));
    response.end();
};



//Head Request
const respondJSONMeta = (request, response, status) => {

    const headers = {
        'Content-Type': 'application/json',
    };
    response.writeHead(status, headers);
    response.end();
};



const getUsers = (request, response) => {

    const responseJSON = {
        users,
    };
    return respondJSON(request, response, 200, responseJSON);
};



const getUsersMeta = (request, response) => {

    return respondJSONMeta(request, response, 200);
};


/**
const updateUser = (request, response) => {

    const newUser = {
        createdAt: Date.now(),
    };
    users[newUser.createdAt] = newUser;
    return respondJSONMeta(request, response, 201, newUser);
};
**/



const addUser = (request, response, body) => {

    const responseJSON = {
        message: 'Name and age are both required',
    };

    if (!body.name || !body.age) { //no name or age
        responseJSON.id = 'missingParams'
        return respondJSON(request, response, 400, responseJSON);
    }

    let responseCode = 201;

    if (users[body.name]) {
        responseCode = 204; //updated
    } else {
        users[body.name] = {}
        users[body.name].name = body.name; //created
    }

    users[body.name].age = body.age;

    if (responseCode === 201) {
        responseJSON.message = 'Created Sucessfully';
        return respondJSON(request, response, responseCode, responseJSON);
    } 
    
    return respondJSONMeta(request, response, responseCode);

};



const notReal = (request, response) => {

    const responseJSON = {
        message: 'The user you are looking for was not found!',
        id: 'notFound'
    };
    return respondJSON(request, response, 404, responseJSON);
};



const notRealMeta = (request, response) => {

    return respondJSONMeta(request, response, 404);
};




const notFound = (request, response) => {

    const responseJSON = {
        message: 'The page you are looking for was not found!',
        id: 'notFound'
    };
    return respondJSON(request, response, 404, responseJSON);
};



const notFoundMeta = (request, response) => {

    return respondJSONMeta(request, response, 404);
};



module.exports = {
    getUsers,
    getUsersMeta,
    //updateUser,
    notFound,
    notFoundMeta,
    notReal,
    notRealMeta,
    addUser
};
