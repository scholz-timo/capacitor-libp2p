export interface P2PProviderPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
