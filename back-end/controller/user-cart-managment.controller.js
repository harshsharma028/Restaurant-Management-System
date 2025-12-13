const CART_MODEL = require("../model/cart.schema");
const RESTAURANT_MENU_MODEL = require("../model/restaurant-menu.schema");
const processLogger = require("../services/logger");
const { setResponseValue, MESSAGE_CODES } = require("../services/response.setter");

module.exports = {
  // =============================================================
  // DELETE - Clear User Cart Details
  CLEAR_USER_CART_DETAIL_CONTROLLER: async (request, response) => {
    try {
      const { user_id } = request.body.user_id;
      if (!user_id) {
        processLogger(MESSAGE_CODES.UN_AUTH_USER);
        return setResponseValue(response, 401, MESSAGE_CODES.UN_AUTH_USER);
      }

      const USER_CART = await CART_MODEL.findOneAndDelete({ userId: user_id });
      if (!USER_CART) {
        processLogger(MESSAGE_CODES.NO_ACTIVE_CART);
        return setResponseValue(response, 409, MESSAGE_CODES.NO_ACTIVE_CART);
      }

      processLogger(MESSAGE_CODES.CART_DELETED_SUCCESS);
      return setResponseValue(response, 200, MESSAGE_CODES.CART_DELETED_SUCCESS);

    } catch (error) {
      processLogger(`CLEAR_USER_CART_DETAIL_CONTROLLER -> catch() -> ${error.message}\n`);
      return setResponseValue(response, 500, MESSAGE_CODES.SERVER_ERROR);
    }
  },
  // =============================================================



  // =============================================================
  // =============================================================
  // PATCH - Update User Cart Details
  UPDATE_USER_CART_DETAIL_CONTROLLER: async (request, response) => {
    try {
      const cart_id = request.params.itemId;
      if (!cart_id) {
        processLogger(MESSAGE_CODES.CART_ID_MISSING);
        return setResponseValue(response, 400, MESSAGE_CODES.CART_ID_MISSING);
      }

      const USER_CART = await CART_MODEL.findById({ _id: cart_id });
      if (!USER_CART) {
        processLogger(MESSAGE_CODES.NOT_VALID_CART_ID);
        return setResponseValue(response, 409, MESSAGE_CODES.NOT_VALID_CART_ID);
      }

      // Check Menu Existing 
      const MENU_ITEM = await RESTAURANT_MENU_MODEL.findOne({ _id: menu_item_id });
      if (!MENU_ITEM) {
        processLogger(MESSAGE_CODES.NO_MENU);
        return setResponseValue(response, 409, MESSAGE_CODES.NO_MENU);
      }

      // Menu Avalibility
      if (!MENU_ITEM.isisAvailable) {
        processLogger(MESSAGE_CODES.ITEM_NO_AVELEABLE);
        return setResponseValue(response, 200, MESSAGE_CODES.ITEM_NO_AVELEABLE);
      }

      let isItemFound = false;
      for (let index = 0; index < USER_CART.items.length; index++) {
        const element = USER_CART.items[index];
        if (element.menuItemId == menu_item_id) {
          isItemFound = true;
          if (!menu_item_quantity) {
            USER_CART.items.splice(index, 1);
          } else {
            element.quantity = menu_item_quantity;
          }
          break;
        }
      }
      if (!isItemFound) {
        USER_CART.items.push({ menuItemId: menu_item_id, quantity: menu_item_quantity });
      }

      await USER_CART.save();
      processLogger(MESSAGE_CODES.CART_UPDATED_SUCCESS);
      return setResponseValue(response, 200, MESSAGE_CODES.CART_UPDATED_SUCCESS, { cart_details: USER_CART });
    } catch (error) {
      processLogger(`UPDATE_USER_CART_DETAIL_CONTROLLER -> catch() -> ${error.message}\n`);
      return setResponseValue(response, 500, MESSAGE_CODES.SERVER_ERROR);
    }
  },
  // =============================================================



  // =============================================================
  // POST - Create User Cart
  ADD_USER_CART_DETAIL_CONTROLLER: async (request, response) => {
    try {
      // Params Check
      const { user_id, menu_item_id, menu_item_quantity } = request.body;
      if (!user_id || !menu_item_id || !menu_item_quantity) {
        processLogger(MESSAGE_CODES.UN_AUTH_USER);
        return setResponseValue(response, 401, MESSAGE_CODES.UN_AUTH_USER);
      }

      // Check Menu Existing 
      const MENU_ITEM = await RESTAURANT_MENU_MODEL.findOne({ _id: menu_item_id });
      if (!MENU_ITEM) {
        processLogger(MESSAGE_CODES.NO_MENU);
        return setResponseValue(response, 409, MESSAGE_CODES.NO_MENU);
      }

      // Menu Avalibility
      if (!MENU_ITEM.isisAvailable) {
        processLogger(MESSAGE_CODES.ITEM_NO_AVELEABLE);
        return setResponseValue(response, 200, MESSAGE_CODES.ITEM_NO_AVELEABLE);
      }

      const USER_CART = await CART_MODEL.findOne({ userId: user_id });
      // Check User Cart Exist
      if (!USER_CART) {
        processLogger(MESSAGE_CODES.NO_ACTIVE_CART);

        const USER_CART = await CART_MODEL.create({
          userId: user_id,
          restaurantId: MENU_ITEM.restaurantId,
          items: [{
            menuItemId: menu_item_id,
            quantity: menu_item_quantity
          }]
        });
        processLogger(MESSAGE_CODES.CART_CREATED_SUCCESS);
        return setResponseValue(response, 200, MESSAGE_CODES.CART_CREATED_SUCCESS, { cart_details: USER_CART });
      }

      // Check Same Restaurant Origin
      if (USER_CART.restaurantId != MENU_ITEM.restaurantId) {
        processLogger(MESSAGE_CODES.CART_ITEM_DIFF_RES);
        return setResponseValue(response, 409, MESSAGE_CODES.CART_ITEM_DIFF_RES);
      }

      // If Cart Have Existing Items
      if (USER_CART.items && USER_CART.items.length > 0) {
        let isItemFound = false;
        for (let index = 0; index < USER_CART.items.length; index++) {
          const element = USER_CART.items[index];
          if (element.menuItemId == menu_item_id) {
            element.quantity += menu_item_quantity;
            isItemFound = true;
            break;
          }
        }
        if (!isItemFound) {
          USER_CART.items.push({ menuItemId: menu_item_id, quantity: menu_item_quantity });
        }
      }

      // Update Cart Value
      USER_CART.items = [{ menuItemId: menu_item_id, quantity: menu_item_quantity }];
      await USER_CART.save();

      processLogger(MESSAGE_CODES.REQ_SUCCESS);
      return setResponseValue(response, 200, MESSAGE_CODES.REQ_SUCCESS, USER_CART.lean(), true);

    } catch (error) {
      processLogger(`ADD_USER_CART_DETAIL_CONTROLLER -> catch() -> ${error.message}\n`);
      return setResponseValue(response, 500, MESSAGE_CODES.SERVER_ERROR);
    }
  },
  // =============================================================


  // =============================================================
  // GET - User Cart Details
  FETCH_USER_CART_DETAIL_CONTROLLER: async (request, response) => {
    try {
      const user_id = request.body.user_id;
      if (!user_id) {
        processLogger(MESSAGE_CODES.UN_AUTH_USER);
        return setResponseValue(response, 401, MESSAGE_CODES.UN_AUTH_USER);
      }
      const USER_CART = await CART_MODEL.findOne({ userId: user_id });
      if (!USER_CART) {
        processLogger(MESSAGE_CODES.NO_ACTIVE_CART);
        return setResponseValue(response, 200, MESSAGE_CODES.NO_ACTIVE_CART);
      }
      processLogger(USER_CART);
      return setResponseValue(response, 200, MESSAGE_CODES.REQ_SUCCESS, { cart_details: USER_CART });
    } catch (error) {
      processLogger(`FETCH_USER_CART_DETAIL_CONTROLLER -> catch() -> ${error.message}\n`);
      return setResponseValue(response, 500, MESSAGE_CODES.SERVER_ERROR);
    }
  },
  // =============================================================

};
