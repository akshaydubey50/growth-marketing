export const DOMAIN_URL = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL_DEV
    : process.env.NEXT_PUBLIC_API_URL_PROD;
};

export const isProductBookmarked = (productId: string, bookmarkList: any) => {
  if (bookmarkList?.length > 0) {
    return bookmarkList?.some((bookmarkID: any) => bookmarkID === productId);
  }
  return false;
};

export const isProductUpvoted = (productId: string, upvoteList: any) => {
  if (upvoteList?.length > 0) {
    return upvoteList?.find(
      (upvotedId: any) => upvotedId?.productId === productId
    );
  }
  return false;
};

export const capitalizeWords = (str: string) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

export const toKebabCase = (str: string) => {
  return str?.toLowerCase().trim().replace(/\s/g, "-");
};
