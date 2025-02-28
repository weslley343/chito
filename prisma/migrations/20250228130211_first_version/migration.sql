-- CreateEnum
CREATE TYPE "gender_enum" AS ENUM ('male', 'female', 'unspecified');

-- CreateTable
CREATE TABLE "answers" (
    "id" SERIAL NOT NULL,
    "avaliation_fk" INTEGER NOT NULL,
    "question_fk" INTEGER NOT NULL,
    "item_fk" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avaliations" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "notes" VARCHAR(255),
    "client_fk" UUID NOT NULL,
    "professional_fk" UUID NOT NULL,
    "scale_fk" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "avaliations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_professional" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "client_fk" UUID NOT NULL,
    "professional_fk" UUID NOT NULL,
    "archived" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_professional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_responsible" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "client_fk" UUID NOT NULL,
    "responsible_fk" UUID NOT NULL,
    "archived" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_responsible_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "image_url" VARCHAR(100),
    "identifier" VARCHAR(30) NOT NULL,
    "code" VARCHAR(7),
    "full_name" VARCHAR NOT NULL,
    "birthdate" DATE,
    "gender" "gender_enum",
    "description" VARCHAR(100),
    "creator_fk" UUID,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "itens" (
    "id" SERIAL NOT NULL,
    "item_order" INTEGER NOT NULL,
    "content" VARCHAR NOT NULL,
    "score" DECIMAL(3,1),
    "question_fk" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "itens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professionals" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "identifier" VARCHAR(30) NOT NULL,
    "full_name" VARCHAR NOT NULL,
    "image_url" VARCHAR,
    "password" VARCHAR NOT NULL,
    "description" VARCHAR(100),
    "email" VARCHAR NOT NULL,
    "specialty" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "professionals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" SERIAL NOT NULL,
    "item_order" INTEGER NOT NULL,
    "content" VARCHAR NOT NULL,
    "scale_fk" INTEGER NOT NULL,
    "domain" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "responsibles" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v1(),
    "identifier" VARCHAR(30) NOT NULL,
    "full_name" VARCHAR NOT NULL,
    "image_url" VARCHAR,
    "password" VARCHAR NOT NULL,
    "description" VARCHAR(100),
    "email" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "responsibles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "scales" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "image_url" VARCHAR,
    "description" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "scales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_identifier_key" ON "clients"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "professionals_identifier_key" ON "professionals"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "professionals_email_key" ON "professionals"("email");

-- CreateIndex
CREATE UNIQUE INDEX "responsibles_identifier_key" ON "responsibles"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "responsibles_email_key" ON "responsibles"("email");

-- CreateIndex
CREATE UNIQUE INDEX "scales_name_key" ON "scales"("name");

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_avaliation_fk_fkey" FOREIGN KEY ("avaliation_fk") REFERENCES "avaliations"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_item_fk_fkey" FOREIGN KEY ("item_fk") REFERENCES "itens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_question_fk_fkey" FOREIGN KEY ("question_fk") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "avaliations" ADD CONSTRAINT "avaliations_client_fk_fkey" FOREIGN KEY ("client_fk") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "avaliations" ADD CONSTRAINT "avaliations_professional_fk_fkey" FOREIGN KEY ("professional_fk") REFERENCES "professionals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "avaliations" ADD CONSTRAINT "avaliations_scale_fk_fkey" FOREIGN KEY ("scale_fk") REFERENCES "scales"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client_professional" ADD CONSTRAINT "client_professional_client_fk_fkey" FOREIGN KEY ("client_fk") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client_professional" ADD CONSTRAINT "client_professional_professional_fk_fkey" FOREIGN KEY ("professional_fk") REFERENCES "professionals"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client_responsible" ADD CONSTRAINT "client_responsible_client_fk_fkey" FOREIGN KEY ("client_fk") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "client_responsible" ADD CONSTRAINT "client_responsible_responsible_fk_fkey" FOREIGN KEY ("responsible_fk") REFERENCES "responsibles"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_creator_fk_fkey" FOREIGN KEY ("creator_fk") REFERENCES "responsibles"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "itens" ADD CONSTRAINT "itens_question_fk_fkey" FOREIGN KEY ("question_fk") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_scale_fk_fkey" FOREIGN KEY ("scale_fk") REFERENCES "scales"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
