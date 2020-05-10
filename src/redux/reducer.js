const initialState = {
  count: 1,
};

const todo = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: initialState.count + 1,
      };
    case 'DECREMENT':
      return {
        count: initialState.count - 1,
      };
    case 'hello':
      console.log('hello in reducer');
      return state;
    default:
      return state;
  }
};

export default todo;
