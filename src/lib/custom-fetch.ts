import { getSession } from 'next-auth/react';
import { BaseResponse } from './response';

export const customFetch = async <T>(
  input: string | Request | URL,
  init?: RequestInit | undefined,
): Promise<BaseResponse<T>> => {
  try {
    const session = await getSession();
    const response = await fetch(input, {
      headers: {
        Authorization: 'Bearer ' + session?.user.accessToken,
      },
      ...init,
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const result = await response.json();
    return result as BaseResponse<T>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error in fetch2:', error);

    return {
      success: false,
      message: error?.message || 'Unknown error',
    };
  }
};
