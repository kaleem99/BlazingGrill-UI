import {
  INCREMENT_CART_AND_ADD_OBJECT,
  UPDATE_SELECTED_ITEM,
  UPDATE_SELECTED_ITEM_EXTRAS,
  VIEW_ITEM_STATE,
  UPDATE_FLAVOURS,
} from "../actions";

const defaultState = [];
const viewItemReducer = (state = defaultState, action) => {
  switch (action.type) {
    case VIEW_ITEM_STATE:
      const newObject = JSON.parse(JSON.stringify(action.payload));
      newObject.selected = true;
      return [newObject];
    case INCREMENT_CART_AND_ADD_OBJECT:
      return [...state, action.payload];
    case UPDATE_SELECTED_ITEM:
      const newState = state.map((item, i) =>
        action.payload === i
          ? { ...item, selected: true }
          : { ...item, selected: false }
      );
      return newState;
    case UPDATE_SELECTED_ITEM_EXTRAS:
      const { stateIndex, name, type, index } = action.payload;
      const newUpdatedStateExtras = JSON.parse(JSON.stringify(state));
      const newObj2 = { ...newUpdatedStateExtras[stateIndex] };
      newObj2.extras.map((data, i) => {
        if (i === index && type === "PLUS") {
          data.quantity += 1;
        } else if (i === index && type === "MINUS") {
          data.quantity -= 1;
        }
        return data;
      });
      newUpdatedStateExtras[stateIndex] = newObj2;

      return newUpdatedStateExtras;
    case UPDATE_FLAVOURS:
      const { objIndex, flavourIndex } = action.payload;
      const newUpdatedState = JSON.parse(JSON.stringify(state));
      const newObj = { ...newUpdatedState[objIndex] };
      newObj.flavours.map((data) => (data.selected = false));
      newObj.flavours[flavourIndex].selected = true;
      newUpdatedState[objIndex] = newObj;
      return newUpdatedState;
    default:
      return state;
  }
};

export default viewItemReducer;
