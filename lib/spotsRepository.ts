"use client";

const updateSpotsLocalStorage = ({ spots }: { spots: [] }) => {
  localStorage.setItem("spots", JSON.stringify(spots));
};

export const addLocalStorageSpots = ({ spot }) => {
  const list = JSON.parse(localStorage.getItem("spots") || "[]");
  updateSpotsLocalStorage({ spots: [...list, spot] });
  return { response: "Success" };
};

export const deleteLocalStorageSpots = ({ guid }: { guid: string }) => {
  const listOld = JSON.parse(localStorage.getItem("spots") || "[]");
  const { list } = listOld.filter((item) => item.guid !== guid);
  updateSpotsLocalStorage({ spots: list });
  return { response: "Success" };
};
