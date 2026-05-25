-- CreateIndex
CREATE INDEX "denuncias_categoria_idx" ON "denuncias"("categoria");

-- CreateIndex
CREATE INDEX "denuncias_status_idx" ON "denuncias"("status");

-- CreateIndex
CREATE INDEX "denuncias_prioridade_idx" ON "denuncias"("prioridade");

-- CreateIndex
CREATE INDEX "denuncias_regiao_idx" ON "denuncias"("regiao");
