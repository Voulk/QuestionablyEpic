import axios, { AxiosResponse } from 'axios';

interface GraphQLError {
  message: string;
  locations?: Array<{ line: number; column: number }>;
  path?: Array<string | number>;
  extensions?: Record<string, unknown>;
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

/**
 * Helper for querying V2 of the Warcraft logs API.
 * 
 * @template T The expected type structure of the returned `data` object.
 * @param query The GraphQL query template string.
 * @param variables Optional parameter object required by your query.
 * @returns A promise resolving to the pure data payload of type T.
 */
export const queryWarcraftLogs = async <T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T | null> => {
  try {
    const response: AxiosResponse<GraphQLResponse<T>> = await axios({
      url: "https://questionablyepic.com/qe_api/warcraftlogs",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      data: {
        query,
        variables
      }
    });

    // Handle GraphQL errors returned by Warcraft Logs
    if (response.data?.errors && response.data.errors.length > 0) {
      console.error("WCL GraphQL Errors:", response.data.errors);
      const primaryMessage = response.data.errors[0].message;
      throw new Error(`GraphQL Error: ${primaryMessage}`);
    }

    return response.data?.data || null;

  } catch (error) {
    console.error("QE API Proxy Network Error:", error);
    throw error;
  }
};
