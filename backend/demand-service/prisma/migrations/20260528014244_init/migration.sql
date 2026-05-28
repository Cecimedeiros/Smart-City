-- CreateEnum
CREATE TYPE "Categorias" AS ENUM ('ILUMINACAO_PUBLICA', 'MANUTENCAO_DE_VIAS', 'SANEAMENTO', 'COLETA_DE_LIXO', 'FISCALIZACAO', 'SEGURANCA', 'SINALIZACAO_DE_TRANSITO', 'OUTROS_EMPECILHOS');

-- CreateEnum
CREATE TYPE "Regioes" AS ENUM ('REGIAO_METROPOLITANA_DO_RECIFE', 'ZONA_DA_MATA', 'AGRESTE', 'SERTAO', 'OUTRA');

-- CreateEnum
CREATE TYPE "StatusDenuncia" AS ENUM ('ABERTA', 'EM_ANALISE', 'RESOLVIDA');

-- CreateEnum
CREATE TYPE "NivelPrioridade" AS ENUM ('ALTA', 'MEDIA', 'BAIXA');

-- CreateTable
CREATE TABLE "cidadaos" (
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "cidadaos_pkey" PRIMARY KEY ("usuario_id")
);

-- CreateTable
CREATE TABLE "gestores" (
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "gestores_pkey" PRIMARY KEY ("usuario_id")
);

-- CreateTable
CREATE TABLE "denuncias" (
    "id_denuncia" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "categoria" "Categorias" NOT NULL,
    "regiao" "Regioes" NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" "StatusDenuncia" NOT NULL DEFAULT 'ABERTA',
    "prioridade" "NivelPrioridade" NOT NULL DEFAULT 'MEDIA',
    "data_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "numero" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "cidadao_id" INTEGER NOT NULL,

    CONSTRAINT "denuncias_pkey" PRIMARY KEY ("id_denuncia")
);

-- CreateTable
CREATE TABLE "historicos" (
    "id_historico" SERIAL NOT NULL,
    "data_abertura" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_alteracao" TIMESTAMP(3) NOT NULL,
    "status" "StatusDenuncia" NOT NULL,
    "prioridade" "NivelPrioridade" NOT NULL,
    "denuncia_id" INTEGER NOT NULL,
    "gestor_id" INTEGER NOT NULL,

    CONSTRAINT "historicos_pkey" PRIMARY KEY ("id_historico")
);

-- CreateTable
CREATE TABLE "imagens" (
    "id_imagem" SERIAL NOT NULL,
    "legenda" VARCHAR(35) NOT NULL,
    "caminho_file" VARCHAR(100) NOT NULL,
    "data_upload" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "denuncia_id" INTEGER NOT NULL,

    CONSTRAINT "imagens_pkey" PRIMARY KEY ("id_imagem")
);

-- CreateIndex
CREATE INDEX "denuncias_categoria_idx" ON "denuncias"("categoria");

-- CreateIndex
CREATE INDEX "denuncias_status_idx" ON "denuncias"("status");

-- CreateIndex
CREATE INDEX "denuncias_prioridade_idx" ON "denuncias"("prioridade");

-- CreateIndex
CREATE INDEX "denuncias_regiao_idx" ON "denuncias"("regiao");

-- AddForeignKey
ALTER TABLE "denuncias" ADD CONSTRAINT "denuncias_cidadao_id_fkey" FOREIGN KEY ("cidadao_id") REFERENCES "cidadaos"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historicos" ADD CONSTRAINT "historicos_denuncia_id_fkey" FOREIGN KEY ("denuncia_id") REFERENCES "denuncias"("id_denuncia") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historicos" ADD CONSTRAINT "historicos_gestor_id_fkey" FOREIGN KEY ("gestor_id") REFERENCES "gestores"("usuario_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "imagens" ADD CONSTRAINT "imagens_denuncia_id_fkey" FOREIGN KEY ("denuncia_id") REFERENCES "denuncias"("id_denuncia") ON DELETE CASCADE ON UPDATE CASCADE;
