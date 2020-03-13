export const getData = ({
  midX,
  midY,
  WIDTH,
  HEIGHT,
}) => {

  return [
    [0, 0],

    [0, midY - midX * 0.5],

    [midX * 0.75 < 20 ? 0 : midX * 0.75, midY - midX * 0.25],

    [midX, midY],

    [midX * 0.75 < 20 ? 0 : midX * 0.75, midY + midX * 0.25],

    [0, midY + midX * 0.5],

    [0, HEIGHT],
  ];
};


export const getReverseData = ({
  midX,
  midY,
  WIDTH,
  HEIGHT,
}) => {

  return [
    [WIDTH, 0],

    [WIDTH, midY - midX * 0.5],

    [WIDTH - midX * 0.75 < 20 ? 0 : (HEIGHT - midX * 0.75), midY - midX * 0.25],

    [WIDTH - midX, midY],

    [WIDTH - midX * 0.75 < 20 ? 0 : (HEIGHT - midX * 0.75), midY + midX * 0.25],

    [WIDTH, midY + midX * 0.5],

    [WIDTH, HEIGHT],
  ];
};


export const getSVGPath = ({
  d3,
  data,
}) => {
  const d = d3.line()
    .x(function(d) { return d[0] })
    .y(function(d) { return d[1] })
    .curve(d3.curveBundle)(data);

  return d;
};