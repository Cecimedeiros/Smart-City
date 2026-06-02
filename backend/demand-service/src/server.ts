import app from './app';

/*
 * Concorrência — Node.js event loop
 *
 * O servidor lida com múltiplas requisições simultâneas sem bloquear.
 * Cada `await` no código cede o controle ao event loop, permitindo que
 * outras requisições sejam processadas enquanto o banco responde.
 *
 * Mecanismo: I/O assíncrono não-bloqueante (Node.js runtime)
 * Componente: demand-service inteiro
 * Ganho: alta throughput com thread única — sem concorrência manual de threads
 */

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`demand-service rodando na porta ${PORT}`));
