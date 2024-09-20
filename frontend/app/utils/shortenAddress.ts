export const shortenAddress = (text: string = '') =>
  `${text.slice(0, 4)}...${text.slice(text.length - 4)}`;
