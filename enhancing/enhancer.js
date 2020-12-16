module.exports = {
  success,
  fail,
  repair,
  get,
};

function success(item) {
  const { enhancement } = item
  if(enhancement >= 20) {
    return {...item}
  } else {
    return { ...item, enhancement:item.enhancement + 1}
  }
}

function fail(item) {
  const { enhancement, durability} = item
  if(durability <= 0) {
    return {...item, durability: 0}
  }
  if(enhancement < 15) {
    return {...item, durability: durability - 5}
  } else if (enhancement >= 15) {
    if (enhancement > 16) {
      return {...item, durability: durability - 10, enhancement:enhancement -1}
    } else {
      return {...item, durability: durability - 10}
    }
  }
  return { ...item };
}

function repair(item) {

  return {...item, durability:100};
}

function get(item) {
  return { ...item };
}
