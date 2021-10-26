const API_URL = "http://192.168.1.39:8000/api/";

//  Table
const GET_ALL_TABLE = "table/";

// Menu
const GET_ALL_MEMU = "menu/";
const GET_ALL_MEMU_BY_TYPE = "menu/type/:type_id";

// Food Type
const GET_ALL_FOOD_TYPE = "type/";
const GET_ALL_FOOD_TYPE_BY_ID = "/type/:id";

// Turn
const GET_ALL_TURN_BY_ID_TABLE = "turn/table/:id";

export {
    API_URL,

    // Table
    GET_ALL_TABLE,

    // Menu
    GET_ALL_MEMU,
    GET_ALL_MEMU_BY_TYPE,

    // Food Type
    GET_ALL_FOOD_TYPE,
    GET_ALL_FOOD_TYPE_BY_ID,

    // Turn
    GET_ALL_TURN_BY_ID_TABLE
}