const createRows = (data) => Object.entries(data).map(([key, value]) => ({ key, ...value }));

export default createRows;
