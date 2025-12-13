const CART_MODEL = require("../model/cart.schema");
const ORDER_MODEL = require("../model/order.schema");
const RESTAURANT_MENU_MODEL = require("../model/restaurant-menu.schema");
const RESTAURANT_MODEL = require("../model/restaurant.schema");
const processLogger = require("../services/logger");
const { setResponseValue, MESSAGE_CODES } = require("../services/response.setter");

module.exports = {

  // GET Fetch All Order by Restaurant Owner
  FETCH_RESTAURANT_ORDER_LIST_CONTROLLER: async (request, response) => {
    try {
      const { user_id } = request.body;
      if (!user_id) {
        processLogger(MESSAGE_CODES.REQ_PARA_MIS);
        return setResponseValue(response, 400, MESSAGE_CODES.REQ_PARA_MIS);
      }

      const RES_OWN_USER = await RESTAURANT_MODEL.find({ ownerId: user_id, isApproved: true, isActive: true });
      if (!RES_OWN_USER) {
        processLogger(error.message);
        return setResponseValue(response, 500, MESSAGE_CODES.SERVER_ERROR);
      }

      const totalOrderList = [];

      for (let index = 0; index < RES_OWN_USER.length; index++) {
        const element = RES_OWN_USER[index];
        const order_list = await returnListOfOrders(element._id);
        totalOrderList = [...totalOrderList, ...order_list];
      }

    } catch (error) {
      processLogger(error.message);
      return setResponseValue(response, 500, MESSAGE_CODES.SERVER_ERROR);
    }
  },

  // PATCH Update Order Status by Restaurant Owner
  UPDATE_RESTAURANT_ORDER_LIST_CONTROLLER: async (request, response) => {
    try {
      const { user_id, order_status } = request.body;
      const order_id = request.params.orderId;
      if (!user_id || !order_id || !order_status) {
        processLogger(MESSAGE_CODES.REQ_PARA_MIS);
        return setResponseValue(response, 400, MESSAGE_CODES.REQ_PARA_MIS);
      }

      const ORDER = await ORDER_MODEL.findOne({ _id: order_id });
      if (!ORDER) {
        processLogger(MESSAGE_CODES.NO_ORDER);
        return setResponseValue(response, 500, MESSAGE_CODES.NO_ORDER);
      }
      ORDER.status = order_status;
      ORDER.save();
      processLogger(MESSAGE_CODES.ORDER_STATUS_UPDATE);
      return setResponseValue(response, 500, MESSAGE_CODES.ORDER_STATUS_UPDATE);
    } catch (error) {
      processLogger(error.message);
      return setResponseValue(response, 500, MESSAGE_CODES.SERVER_ERROR);
    }
  },

  // POST - Place new Order by the User 
  PLACE_NEW_ORDER: async (request, response) => {
    try {
      const { user_id } = request.body;
      if (!user_id) {
        processLogger(MESSAGE_CODES.REQ_PARA_MIS);
        return setResponseValue(response, 400, MESSAGE_CODES.REQ_PARA_MIS);
      }

      const USER_CART = await CART_MODEL.findOne({ userId: user_id });
      if (!USER_CART) {
        processLogger(MESSAGE_CODES.NO_ACTIVE_CART);
        return setResponseValue(response, 409, MESSAGE_CODES.NO_ACTIVE_CART);
      }

      const { order_items, order_total_amount } = await userOrderDetailsCalculation(USER_CART);

      const USER_ORDER = await ORDER_MODEL.create({
        userId: USER_CART.userId,
        restaurantId: USER_CART.restaurantId,
        items: order_items,
        totalAmount: order_total_amount,
        status: 'pending'
      });

      processLogger(MESSAGE_CODES.ORDER_PLACED_SUCCESS);
      return setResponseValue(response, 200, MESSAGE_CODES.ORDER_PLACED_SUCCESS, {
        order_details: USER_ORDER
      });

    } catch (error) {
      processLogger(error.message);
      return setResponseValue(response, 500, MESSAGE_CODES.SERVER_ERROR);
    }
  },

  // GET Retrun total Number Orders User has Placed
  FETCH_USER_ORDERS_LIST: async (request, response) => {
    try {
      const { user_id } = request.body;
      if (!user_id) {
        processLogger(MESSAGE_CODES.REQ_PARA_MIS);
        return setResponseValue(response, 400, MESSAGE_CODES.REQ_PARA_MIS);
      }

      const query_obj = { userId: user_id };
      const order_id = request.params.order_id;
      if (order_id) {
        query_obj._id = order_id;
      }

      const USER_ORDER = await ORDER_MODEL.find(query_obj);
      if (!USER_ORDER) {
        processLogger(MESSAGE_CODES.NO_ORDER);
        return setResponseValue(response, 500, MESSAGE_CODES.NO_ORDER);
      }

      processLogger(USER_ORDER);
      return setResponseValue(response, 500, MESSAGE_CODES.REQ_SUCCESS, { order_list: USER_ORDER }, true);

    } catch (error) {
      processLogger(error.message);
      return setResponseValue(response, 500, MESSAGE_CODES.SERVER_ERROR);
    }
  },
};

async function userOrderDetailsCalculation (USER_CART_DETAILS) {
  let order_total_amount = 0;
  let order_items = [];

  USER_CART_DETAILS.items.forEach(element => {
    const CART_ITEM = fetchMenuItemDetails(element.menuItemId);
    if (CART_ITEM) {
      order_items.push({
        order_items: CART_ITEM.name,
        quantity: element.quantity,
        priceSnapshot: CART_ITEM.price,
        menuItemId: element.menuItemId
      });

      order_total_amount += (CART_ITEM.price * element.quantity);
    }
  });
  return { order_items, order_total_amount };
}

async function fetchMenuItemDetails (menuId) {
  return await RESTAURANT_MENU_MODEL.findOne({ _id: menuId, isAvailable: true });
}

async function returnListOfOrders (params) {
  
}