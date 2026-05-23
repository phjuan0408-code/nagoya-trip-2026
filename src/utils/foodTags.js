export const foodTagIcons = {
  全部: "🍴",
  麵食: "🍜",
  拉麵: "🍥",
  主食: "🍚",
  甜點: "🍡",
  點心: "🍘",
  冰品: "🍦",
  水果: "🍓",
  飲品: "🥤",
};

export function getFoodTagIcon(tag) {
  return foodTagIcons[tag] || "🍴";
}
