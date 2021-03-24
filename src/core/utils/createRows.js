const createRows = (data) => Object.entries(data).map(([key, { p1, p2, manaCost }]) => ({ key, p1, p2, manaCost }));

export default createRows;
