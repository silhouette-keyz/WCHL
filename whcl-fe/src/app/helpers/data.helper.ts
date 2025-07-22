export function isJson(str: any) {
  let extract: any;
  try {
    extract = JSON.parse(str);
  } catch (e) {
    return false;
  }
  return extract ? true : false;
}
