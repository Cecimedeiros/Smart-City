/*
  Warnings:

  - Added the required column `email_solicitante` to the `denuncias` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "demand"."denuncias" ADD COLUMN     "email_solicitante" TEXT NOT NULL;
