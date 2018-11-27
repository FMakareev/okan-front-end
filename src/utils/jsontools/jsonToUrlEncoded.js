export const jsonToUrlEncoded = (element, key, list = []) => {
  if (typeof element === 'object') {
    for (const idx in element) {
      jsonToUrlEncoded(element[idx], key ? `${key}[${idx}]` : idx, list);
    }
  } else {
    list.push(`${key}=${encodeURIComponent(element)}`);
  }
  return list.join('&');
};

export default jsonToUrlEncoded;
