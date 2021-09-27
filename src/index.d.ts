
interface RequestArguments {
    method: string;
    params?: unknown[] | object;
  }
  
  type HandlerFunction = (args: string[]) => void;
  
  type Ethereum = {
    request<T>(arg: RequestArguments): Promise<T>;
    on(chainId: string, handler: HandlerFunction): void;
    off(chainId: string, handler: HandlerFunction): void;
  };
  
  export declare global {
    interface Window {
      ethereum: Ethereum;
    }
  }