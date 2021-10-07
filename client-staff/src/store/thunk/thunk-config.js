const API_URL = "http://localhost:8000/api/";

//  table
const GET_ALL_TABLE = "table/";
const POST_ADD_TABLE = "table/";
const DELETE_TABLE = "table/:id";

// menu
const GET_ALL_MEMU = "menu/";
const POST_ADD_MEMU = "menu/";
const PUT_UPDATE_MENU = "menu/:id";
const PUT_UPDATE_IMAGE_MENU = "menu/image/:id";
const DELETE_MENU = "menu/:id";

// account
const GET_ALL_ACCOUNT = "account/";
const POST_ADD_ACCOUNT = "account/";
const PUT_UPDATE_ACCOUNT = "account/:id";
const PUT_RESET_PASS_ACCOUNT = "account/pass/:id";
const POST_CHECK_OLD_PASS = "account/pass/:id";
const DELETE_ACCOUNT = "account/:id";

export {
    API_URL,

    // table
    GET_ALL_TABLE,
    POST_ADD_TABLE,
    DELETE_TABLE,

    // menu
    GET_ALL_MEMU,
    POST_ADD_MEMU,
    PUT_UPDATE_MENU,
    PUT_UPDATE_IMAGE_MENU,
    DELETE_MENU,

    // account
    GET_ALL_ACCOUNT,
    POST_ADD_ACCOUNT,
    PUT_UPDATE_ACCOUNT,
    PUT_RESET_PASS_ACCOUNT,
    POST_CHECK_OLD_PASS,
    DELETE_ACCOUNT,
}