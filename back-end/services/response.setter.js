// 200 -> API Success,
// 201 -> API Data Creation Success ,
// 204 -> No Data to Return, 
// 400 -> Bad Request Missing Params, 
// 401 -> Unauthorized, 
// 403 -> Forbidden, 
// 404 -> User Not found , 
// 409 -> Conflict, 
// 422 -> Unprocessable Entity - Validation Failed of Imput, 
// 429 -> Too many Requests, 
// 500 -> Server Error.

const MESSAGE_CODES = {
  SERVER_ERROR: 'Server Error Occurred!',
  REQ_SUCCESS: 'Request Fullflied Successfully!',
  CRED_INVALID: 'Please Enter Valid Email & Password!',
  REQ_PARA_MIS: 'Some the Require Params are missing!',
  REQ_PAYLOAD: 'Request Missing the Payload',
  SOMETHING_WRONG: 'Something went wrong while fulfilling the Request, Please try agin!',
  USER_EXIST: 'User Already Exist',
  ADMIN_409: 'Not authorized to create Admin User!',
  NEW_USER: 'User created Successfully!',
  LOGIN_SUC: 'User Login Successfully!',
  UN_AUTH_USER: 'User Authentication Failed, Please Login agin!',
  TOKEN_MIS: 'User Authentication token is Missing! ',
  USER_ROLE_MIS: 'Missing User role in Request Params',
  NOT_AUTH_ACTION: 'User role not Authorized to Perfome this action! ',
  AUTH_ROLE_ACTION: 'Role Authorized for action!',
  NEW_RES_ADD: 'New Restaurant added Successfully!',
  NO_RES_FOUND: 'No Restaurant found for this User',
  RES_FOUND: 'Restaurant Found Successfully',
  RES_ID_MIS: 'Restaurant Id is Missing!',
  MENU_ID_MIS: 'Restaurant Menu id is Missing!',
  RES_ID_WRONG: 'Restaurant not found, Please Enter valid Restaurant Id!',
  ENTER_VALID_RES_ID: 'Please give valid Restaurant ID!',
  RESTAURANT_UPDATED: 'Restaurant Details Updated Successfully',
  NO_UNAPPROVED_RESTAURANT: 'No Restaurant fount for Apprved Status False!',
  MENU_ADDED: "New Menu added to the Restaurant!",
  NOT_AUTH_TO_ADD_MANU: 'You are not owner of this Restaurant, you can not add/update menu',
  NO_MENU: 'No Menu found for this restaurant!',
  NOT_APPROVED: 'Restaurant is not Approved by Admin!',
  MENU_DELETED: 'Restaurant Menu Deleted Successfully',
  MENU_UPDATED: 'Restaurant Menu Updated Successfully',
  NO_ACTIVE_CART: 'No Active Cart Found For this User',
  ITEM_NO_AVELEABLE: 'Menu Item is no avalable at time in Restaurant',
  CART_ITEM_DIFF_RES: 'Item from Diffrent Restaurnt can be add in cart ',
  CART_CREATED_SUCCESS: 'Item/s Added into cart Successfully!',
  CART_UPDATED_SUCCESS: 'Item/s Updated into cart Successfully!',
  CART_ID_MISSING: 'Order Cart ID Is Missing',
  NOT_VALID_CART_ID: 'No Such Cart Found Please Enter Valid Cart ID',
  NO_ORDER: 'User have no Order',
  ORDER_STATUS_UPDATE: 'Order updated Successfully!'
};

const setResponseValue = (response, statusCode, messageCode, responseData = {}, status = false) => {
  return response.status(statusCode).send({
    message: messageCode,
    status: status,
    data: responseData
  });
};

module.exports = { setResponseValue, MESSAGE_CODES };