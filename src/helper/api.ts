const post = (url: string, body?: any, headers = {}) => {
  return fetch(url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    body: JSON.stringify(body)
  }).then(response => response.json());
};

const get = (url: string) => {
  return fetch(url).then(response => response.json());
};

//获取模型列表
export const getModelList = () => {
  return post("/getModelList");
};

//上传模型url
export const uploadFileUrl = () => {
  return "/bim/upload/xbin";
};
//移动模型
export const moveMode = (
  modelId: string,
  modelIds: string,
  isCopy: boolean
) => {
  return post("/bim/model/merge", {
    is_copy: isCopy,
    model_id: modelId,
    model_ids: [modelIds]
  });
};

//模型更新
export const updateModelName = (modelId: string, name: string) => {
  return post("/bim/model/update", {
    id: modelId,
    name: name
  });
};

//删除模型
export const deleteModel = (modelId: string) => {
  return post("/bim/model/delete", {
    id: modelId
  });
};
