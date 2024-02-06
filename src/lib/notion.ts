'use server';
import 'server-only';

import {Client} from '@notionhq/client';
import {CreatePageResponse} from '@notionhq/client/build/src/api-endpoints';
import {getPixelaProfileUrl} from '@/utils';

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_INTERNAL_INTEGRATION_TOKEN,
});
const database_id = process.env.NOTION_DATABASE_ID!;

// Userの存在チェック
export async function findNotionUserByDiscordId(discordId: string) {
  const response = await notion.databases.query({
    database_id,
    filter: {
      property: 'discordId',
      rich_text: {
        equals: discordId,
      },
    },
  });

  return response.results.length > 0;
}

// Userの追加
export async function createNotionUser(
  params: CreateUserParams
): Promise<CreatePageResponse> {
  const {name, discordId} = params;
  const response = await notion.pages.create({
    parent: {
      database_id,
    },
    properties: {
      name: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
      discordId: {
        rich_text: [
          {
            text: {
              content: discordId,
            },
          },
        ],
      },
      pixelaUrl: {
        url: getPixelaProfileUrl(discordId),
      },
    },
  });

  return response;
}
