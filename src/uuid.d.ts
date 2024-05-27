declare module 'uuid' {
    export function v4(): string;
    export function v5(name: string, namespace: string): string;
  }
  