module.exports = {
  succeed,
  fail,
  repair,
  get,
};

function succeed(item) {
  const enhancement =
    item.enhancement < 20 ? item.enhancement + 1 : item.enhancement;
  return {
    ...item,
    enhancement,
  };
}

function fail(item) {
  const enhancement =
    item.enhancement > 16 ? item.enhancement - 1 : item.enhancement;
  const durability =
    item.enhancement >= 15 ? item.durability - 10 : item.durability - 5;
  return { ...item, enhancement, durability };
}

function repair(item) {
  return { ...item, durability: 100 };
}

function get(item) {
  // Should durability and enhancement be reset?
  const name =
    item.enhancement > 0 ? `[+${item.enhancement}] ${item.name}` : item.name;
  return { ...item, name };
}
