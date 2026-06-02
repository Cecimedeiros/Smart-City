export function httpError(mensagem: string, status: number): Error & { status: number } {
  const err = new Error(mensagem) as Error & { status: number };
  err.status = status;
  return err;
}
