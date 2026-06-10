-- CreateEnum
CREATE TYPE "demand"."Categorias" AS ENUM ('ILUMINACAO_PUBLICA', 'MANUTENCAO_DE_VIAS', 'SANEAMENTO', 'COLETA_DE_LIXO', 'FISCALIZACAO', 'SEGURANCA', 'SINALIZACAO_DE_TRANSITO', 'OUTROS_EMPECILHOS');

-- CreateEnum
CREATE TYPE "demand"."Regioes" AS ENUM ('REGIAO_METROPOLITANA_DO_RECIFE', 'ZONA_DA_MATA', 'AGRESTE', 'SERTAO', 'OUTRA');

-- CreateEnum
CREATE TYPE "demand"."StatusDenuncia" AS ENUM ('ABERTA', 'EM_ANALISE', 'RESOLVIDA');

-- CreateEnum
CREATE TYPE "demand"."NivelPrioridade" AS ENUM ('ALTA', 'MEDIA', 'BAIXA');

-- CreateTable
CREATE TABLE "demand"."cidadaos" (
    "id_cidadao" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "cidadaos_pkey" PRIMARY KEY ("id_cidadao")
);

-- CreateTable
CREATE TABLE "demand"."gestores" (
    "id_gestor" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,

    CONSTRAINT "gestores_pkey" PRIMARY KEY ("id_gestor")
);

-- CreateTable
CREATE TABLE "demand"."denuncias" (
    "id_denuncia" SERIAL NOT NULL,
    "titulo" VARCHAR(50) NOT NULL,
    "categoria" "demand"."Categorias" NOT NULL,
    "regiao" "demand"."Regioes" NOT NULL,
    "descricao" TEXT NOT NULL,
    "status" "demand"."StatusDenuncia" NOT NULL DEFAULT 'ABERTA',
    "prioridade" "demand"."NivelPrioridade" NOT NULL DEFAULT 'MEDIA',
    "data_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endereco" TEXT NOT NULL,
    "cidadao_id" INTEGER NOT NULL,

    CONSTRAINT "denuncias_pkey" PRIMARY KEY ("id_denuncia")
);

-- CreateTable
CREATE TABLE "demand"."historicos" (
    "id_historico" SERIAL NOT NULL,
    "data_abertura" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_alteracao" TIMESTAMP(3) NOT NULL,
    "status" "demand"."StatusDenuncia" NOT NULL,
    "prioridade" "demand"."NivelPrioridade" NOT NULL,
    "denuncia_id" INTEGER NOT NULL,
    "gestor_id" INTEGER NOT NULL,

    CONSTRAINT "historicos_pkey" PRIMARY KEY ("id_historico")
);

-- CreateTable
CREATE TABLE "demand"."imagens" (
    "id_imagem" SERIAL NOT NULL,
    "caminho_file" TEXT NOT NULL,
    "data_upload" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "denuncia_id" INTEGER NOT NULL,

    CONSTRAINT "imagens_pkey" PRIMARY KEY ("id_imagem")
);

-- CreateIndex
CREATE UNIQUE INDEX "cidadaos_usuario_id_key" ON "demand"."cidadaos"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "gestores_usuario_id_key" ON "demand"."gestores"("usuario_id");

-- CreateIndex
CREATE INDEX "denuncias_categoria_idx" ON "demand"."denuncias"("categoria");

-- CreateIndex
CREATE INDEX "denuncias_status_idx" ON "demand"."denuncias"("status");

-- CreateIndex
CREATE INDEX "denuncias_prioridade_idx" ON "demand"."denuncias"("prioridade");

-- CreateIndex
CREATE INDEX "denuncias_regiao_idx" ON "demand"."denuncias"("regiao");

-- AddForeignKey
ALTER TABLE "demand"."denuncias" ADD CONSTRAINT "denuncias_cidadao_id_fkey" FOREIGN KEY ("cidadao_id") REFERENCES "demand"."cidadaos"("id_cidadao") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demand"."historicos" ADD CONSTRAINT "historicos_denuncia_id_fkey" FOREIGN KEY ("denuncia_id") REFERENCES "demand"."denuncias"("id_denuncia") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demand"."historicos" ADD CONSTRAINT "historicos_gestor_id_fkey" FOREIGN KEY ("gestor_id") REFERENCES "demand"."gestores"("id_gestor") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "demand"."imagens" ADD CONSTRAINT "imagens_denuncia_id_fkey" FOREIGN KEY ("denuncia_id") REFERENCES "demand"."denuncias"("id_denuncia") ON DELETE CASCADE ON UPDATE CASCADE;
