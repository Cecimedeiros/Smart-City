-- CreateEnum
CREATE TYPE "Papel" AS ENUM ('CIDADAO', 'GESTOR');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(35) NOT NULL,
    "senha" VARCHAR(60) NOT NULL,
    "papel" "Papel" NOT NULL DEFAULT 'CIDADAO',

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
