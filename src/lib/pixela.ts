import {getPixelaToken, getPixelaUsername} from '@/utils';

// Userの存在チェック
export async function findPixelaUser(id: string) {
  try {
    const response = await fetch(`https://pixe.la/@${getPixelaUsername(id)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Userの追加
export async function createPixelaUser(id: string): Promise<any> {
  const response = await fetch(`https://pixe.la/v1/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: getPixelaToken(id),
      username: getPixelaUsername(id),
      agreeTermsOfService: 'yes',
      notMinor: 'yes',
    }),
  });

  const data = await response.json();
  if (!data.isSuccess) {
    throw new Error(data.message);
  }

  return data;
}

// Userの更新
export async function updatePixelaUser(id: string) {
  const response = await fetch(`https://pixe.la/@${getPixelaUsername(id)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-USER-TOKEN': getPixelaToken(id),
    },
    body: JSON.stringify({
      pinnedGraphID: 'hayaoki-graph',
    }),
  });

  return await response.json();
}

// Graphの追加
export async function createPixelaGraph(id: string) {
  const response = await fetch(
    `https://pixe.la/v1/users/${getPixelaUsername(id)}/graphs`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-USER-TOKEN': getPixelaToken(id),
      },
      body: JSON.stringify({
        id: 'hayaoki-graph',
        name: 'hayaoki',
        type: 'int',
        unit: 'point',
        color: 'shibafu',
      }),
    }
  );

  return await response.json();
}

// Graphの更新
export async function updatePixelaGraph(id: string) {
  const response = await fetch(
    `https://pixe.la/v1/users/${getPixelaUsername(id)}/graphs/hayaoki-graph`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-USER-TOKEN': getPixelaToken(id),
      },
      body: JSON.stringify({
        name: 'hayaoki',
        type: 'int',
        unit: 'point',
        color: 'shibafu',
        timezone: 'UTC',
      }),
    }
  );

  const data = await response.json();

  console.log(data);

  return await response.json();
}

// Graphの取得
export async function getPixelaGraph(id: string) {
  const response = await fetch(
    `https://pixe.la/v1/users/${getPixelaUsername(id)}/graphs`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-USER-TOKEN': getPixelaToken(id),
      },
    }
  );

  const data = await response.json();

  console.log(data);

  return await response.json();
}

// Userの削除
export async function deletePixelaUser(id: string) {
  const response = await fetch(
    `https://pixe.la/v1/users/${getPixelaUsername(id)}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-USER-TOKEN': getPixelaToken(id),
      },
    }
  );

  return await response.json();
}
