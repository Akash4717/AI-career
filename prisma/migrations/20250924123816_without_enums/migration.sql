/*
  Warnings:

  - The `demandLevel` column on the `IndustryInsight` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `marketOutlook` column on the `IndustryInsight` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "IndustryInsight" DROP COLUMN "demandLevel",
ADD COLUMN     "demandLevel" TEXT[],
DROP COLUMN "marketOutlook",
ADD COLUMN     "marketOutlook" TEXT[];
