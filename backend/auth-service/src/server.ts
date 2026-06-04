import app from './app';

// Concorrência: I/O assíncrono do Node.js — cada await libera o event loop,
// permitindo que múltiplas requisições sejam processadas ao mesmo tempo sem bloqueio.

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`auth-service rodando na porta ${PORT}`));
