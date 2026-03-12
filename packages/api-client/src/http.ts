export type HttpError = {
  message: string;
  status?: number;
  details?: unknown;
};

export type ApiClientOptions = {
  /** e.g. http://127.0.0.1:3001 */
  baseUrl: string;
  /** If present, will be sent as `Authorization: Bearer <token>` */
  devToken?: string | null;
  /** Optional fetch impl for tests/node */
  fetchFn?: typeof fetch;
  /** Optional additional headers applied to every request */
  defaultHeaders?: Record<string, string>;
};

function trimSlash(s: string) {
  return s.replace(/\/$/, '');
}

function joinUrl(baseUrl: string, path: string) {
  const base = trimSlash(baseUrl);
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${base}${p}`;
}

async function readErrorDetails(res: Response): Promise<unknown> {
  const contentType = res.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    try {
      return await res.json();
    } catch {
      return undefined;
    }
  }

  try {
    const text = await res.text();
    return text.length ? text : undefined;
  } catch {
    return undefined;
  }
}

export function createApiClient(opts: ApiClientOptions) {
  const fetchFn = opts.fetchFn ?? fetch;

  async function getJson<T>(path: string, init?: RequestInit): Promise<T> {
    const url = joinUrl(opts.baseUrl, path);

    const headers: Record<string, string> = {
      Accept: 'application/json',
      ...(opts.defaultHeaders ?? {}),
      ...(init?.headers as Record<string, string> | undefined),
    };

    const token = opts.devToken?.trim();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetchFn(url, {
      ...init,
      method: 'GET',
      headers,
    });

    if (!res.ok) {
      const details = await readErrorDetails(res);
      const err: HttpError = {
        message: `HTTP ${res.status} al llamar ${url}`,
        status: res.status,
        details,
      };
      throw err;
    }

    return (await res.json()) as T;
  }

  return {
    getJson,
  };
}
