export const getPixelaUsername = (id: string) => `hyok-${id}`;
export const getPixelaToken = (id: string) => `token:hyok-${id}`;
export const getPixelaProfileUrl = (id: string) =>
  `https://pixe.la/@${getPixelaUsername(id)}`;
export const getPixelaGraphUrl = (id: string) =>
  `https://pixe.la/v1/users/${getPixelaUsername(id)}/graphs/hayaoki-graph.html`;
