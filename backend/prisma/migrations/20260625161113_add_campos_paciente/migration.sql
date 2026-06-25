/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `paciente` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "paciente" ADD COLUMN     "cartao_sus" VARCHAR(20),
ADD COLUMN     "conta_ativada" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cpf" VARCHAR(11),
ADD COLUMN     "tipo_paciente" VARCHAR(50),
ALTER COLUMN "senha" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "paciente_cpf_key" ON "paciente"("cpf");
