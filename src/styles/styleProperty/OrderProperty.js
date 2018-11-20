export const OrderProperty = ({ theme, order }) => {
  if (order) {
    if (Array.isArray(order)) {
      let style = ``;
      order.forEach((item, index) => {
        if (index === 0) {
          style += `order: ${item};`;
        } else {
          style += `@media(min-width: ${theme.breakpoints[index]}){
		      order: ${item};
		    }`;
        }
      });
      return style;
    } else if (order) {
      return `order: ${order};`;
    }
  }
};

export default OrderProperty;
