'use client';

import {createNotionUser, findNotionUserByDiscordId} from '@/lib/notion';
import {
  createPixelaGraph,
  createPixelaUser,
  deletePixelaUser,
  findPixelaUser,
} from '@/lib/pixela';
import {useState} from 'react';
import {getPixelaGraphUrl, getPixelaProfileUrl} from '@/utils';

export default function Home() {
  const [message, setMessage] = useState('');
  const [verified, setVerified] = useState(false);
  const [name, setName] = useState('');
  const [discordId, setDiscordId] = useState('');
  const [isUnder18, setIsUnder18] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const disabled = !name || !discordId || !isUnder18 || !isAgreed;

  const handleSubmit = async () => {
    try {
      const existNotionUser = await findNotionUserByDiscordId(discordId);
      const existPixelaUser = await findPixelaUser(discordId);

      if (existNotionUser && existPixelaUser) {
      } else if (existNotionUser) {
        await createPixelaUser(discordId);
        await createPixelaGraph(discordId);
      } else if (existPixelaUser) {
        await createNotionUser({name, discordId});
      } else {
        await createPixelaUser(discordId);
        await createPixelaGraph(discordId);
        await createNotionUser({name, discordId});
      }

      setMessage('');
      setVerified(true);
      setName('');
      setDiscordId('');
    } catch (error) {
      setMessage('ユーザの作成に失敗しました');
      setVerified(true);
    }
  };

  return (
    <div className='p-8'>
      <h1 className='text-xl font-bold'>Hayaoki</h1>
      <div className='space-y-2'>
        <h2>＊Sign up Form＊</h2>
        <input
          type='text'
          className='border border-gray-400 p-2 rounded text-black'
          placeholder='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          type='text'
          className='border border-gray-400 p-2 rounded text-black'
          placeholder='Discord ID'
          value={discordId}
          onChange={(e) => setDiscordId(e.target.value)}
        />
        <br />
        <label className='block cursor-pointer space-x-2'>
          <input
            type='checkbox'
            checked={isUnder18}
            onChange={(e) => setIsUnder18(e.target.checked)}
          />
          <span>18歳未満ではないです</span>
        </label>
        <label className='block cursor-pointer space-x-2'>
          <input
            type='checkbox'
            checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
          />
          <span>利用規約に同意しました</span>
          <a
            className='text-blue-500 hover:underline'
            href='https://github.com/a-know/Pixela/wiki/%E5%88%A9%E7%94%A8%E8%A6%8F%E7%B4%84%EF%BC%88Terms-of-Service-Japanese-Version%EF%BC%89'
            target='_blank'
            rel='noopener noreferrer'
          >
            （pixela利用規約）
          </a>
        </label>
        <div className='space-x-2'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed'
            onClick={handleSubmit}
            disabled={disabled}
          >
            Submit
          </button>
          <button
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => deletePixelaUser(discordId)}
          >
            Delete
          </button>
        </div>
      </div>

      {verified && (
        <div>
          <hr className='my-4' />
          <h2 className='font-bold text-green-400 text-xl'>Succeeded ✅</h2>
          <p>あなたのURLはこちらです。</p>
          <p>
            Profile:{' '}
            <a
              className='text-blue-500 hover:underline'
              href={getPixelaProfileUrl(discordId)}
            >
              {getPixelaProfileUrl(discordId)}
            </a>
          </p>
          <p>
            Graph:{' '}
            <a
              className='text-blue-500 hover:underline'
              href={getPixelaGraphUrl(discordId)}
            >
              {getPixelaGraphUrl(discordId)}
            </a>
          </p>
        </div>
      )}
      {message && (
        <div>
          <hr className='my-4' />
          <h2 className='font-bold text-red-500 text-xl'>Error 🚫</h2>
          <p className='text-red-500'>{message}</p>
        </div>
      )}
    </div>
  );
}
