module.exports = {
  succeed,
  fail,
  repair,
  get,
};

function succeed(item) {
  if (typeof item !== 'object' || item == null || Array.isArray(item))
    return undefined;
  const enhancement =
    item.enhancement < 20 ? item.enhancement + 1 : item.enhancement;
  return {
    ...item,
    enhancement,
  };
}

function fail(item) {
  if (typeof item !== 'object' || item == null || Array.isArray(item))
    return undefined;
  const enhancement =
    item.enhancement > 16 ? item.enhancement - 1 : item.enhancement;
  const durability =
    item.enhancement >= 15 ? item.durability - 10 : item.durability - 5;
  return { ...item, enhancement, durability };
}

function repair(item) {
  if (typeof item !== 'object' || item == null || Array.isArray(item))
    return undefined;
  return { ...item, durability: 100 };
}

function get(item) {
  if (typeof item !== 'object' || item == null || Array.isArray(item))
    return undefined;
  // Should durability and enhancement be reset?
  const name =
    item.enhancement > 0 ? `[+${item.enhancement}] ${item.name}` : item.name;
  return { ...item, name };
}
