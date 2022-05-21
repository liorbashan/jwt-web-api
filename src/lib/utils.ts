export function getOsEnv(key: string, defaultVal?: string): string {
  return process.env[key] || (defaultVal as string);
}

export function getOsEnvArray(
  key: string,
  delimiter = ',',
): string[] | boolean {
  return (process.env[key] && process.env[key]?.split(delimiter)) || false;
}

export function toNumber(value: string): number {
  return parseInt(value, 10);
}

export function toFloat(value: string): number {
  return parseFloat(value);
}

export function toBool(value: string): boolean {
  return value === 'true';
}

export function normalizePort(port: string): number | string | boolean {
  const parsedPort = parseInt(port, 10);
  if (isNaN(parsedPort)) {
    // named pipe
    return port;
  }
  if (parsedPort >= 0) {
    // port number
    return parsedPort;
  }
  return false;
}
