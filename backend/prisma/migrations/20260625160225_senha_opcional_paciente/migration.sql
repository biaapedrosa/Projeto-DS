-- AlterTable
ALTER TABLE "alimento" ADD COLUMN     "alimento_taco_id" INTEGER;

-- AddForeignKey
ALTER TABLE "alimento" ADD CONSTRAINT "alimento_alimento_taco_id_fkey" FOREIGN KEY ("alimento_taco_id") REFERENCES "alimento_taco"("id") ON DELETE SET NULL ON UPDATE CASCADE;
