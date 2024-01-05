import { v4 as uuidv4 } from "uuid";

export function initWithUUID(array) {
  return array.map((element) => ({
    element: element,
    uuid: uuidv4(),
  }));
}
