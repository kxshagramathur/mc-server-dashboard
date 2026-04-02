declare module "craftping" {
  export class QueryClient {
    queryBasic(host: string, port: number, signal?: AbortSignal): Promise<any>;
    queryFull(host: string, port: number, signal?: AbortSignal): Promise<any>;
    close(): Promise<void>;
  }

  export class JavaPingClient {
    ping(host: string, port: number, options?: { signal?: AbortSignal }): Promise<any>;
  }

  export class BedrockPingClient {
    ping(host: string, port: number, signal?: AbortSignal): Promise<any>;
    close(): Promise<void>;
  }
}
