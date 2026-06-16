-- CreateEnum
CREATE TYPE "Sexo" AS ENUM ('M', 'F');

-- CreateEnum
CREATE TYPE "VinculoUFPE" AS ENUM ('Servidor', 'Estudante', 'Externo');

-- CreateEnum
CREATE TYPE "FrequenciaBebida" AS ENUM ('Nunca', '1x_mes', '1_2x_mes', '3_4x_mes', 'Diariamente');

-- CreateEnum
CREATE TYPE "FrequenciaFumo" AS ENUM ('Nunca', 'Diariamente', 'Raramente');

-- CreateEnum
CREATE TYPE "HabitoIntestinal" AS ENUM ('Diario', 'Dias_alternados', 'Mais_2_dias');

-- CreateEnum
CREATE TYPE "CorUrina" AS ENUM ('Escura', 'Clara', 'Transparente');

-- CreateEnum
CREATE TYPE "RoleNutricionista" AS ENUM ('nutricionista', 'admin');

-- CreateTable
CREATE TABLE "nutricionista" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "telefone" VARCHAR(20) NOT NULL,
    "crn" VARCHAR(12),
    "senha" VARCHAR(255) NOT NULL,
    "role" "RoleNutricionista" NOT NULL DEFAULT 'nutricionista',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nutricionista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paciente" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "senha" VARCHAR(255) NOT NULL,
    "sexo" "Sexo",
    "data_nascimento" DATE,
    "idade" INTEGER,
    "telefone_whatsapp" VARCHAR(20),
    "ocupacao" VARCHAR(255),
    "vinculo_ufpe" "VinculoUFPE",
    "objetivo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plano_refeicao" (
    "id" SERIAL NOT NULL,
    "patient_id" INTEGER NOT NULL,
    "nutritionist_id" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "plano_refeicao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refeicao" (
    "id" SERIAL NOT NULL,
    "meal_plan_id" INTEGER NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" VARCHAR(255),
    "horario" INTEGER,
    "observacao" VARCHAR(100),

    CONSTRAINT "refeicao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "opcao" (
    "id" SERIAL NOT NULL,
    "refection_id" INTEGER NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "observacao" VARCHAR(255),

    CONSTRAINT "opcao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alimento" (
    "id" SERIAL NOT NULL,
    "option_id" INTEGER NOT NULL,
    "nome" VARCHAR(100) NOT NULL,

    CONSTRAINT "alimento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alimento_taco" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(500),
    "energia_kcal" DECIMAL(10,2),
    "energia_kj" DECIMAL(10,2),
    "proteina_g" DECIMAL(10,2),
    "lipideos_g" DECIMAL(10,2),
    "carboidratos_g" DECIMAL(10,2),
    "calcio_mg" DECIMAL(10,2),
    "ferro_mg" DECIMAL(10,2),
    "retinol_mcg" DECIMAL(10,2),
    "vitamina_c_mg" DECIMAL(10,2),
    "sodio_mg" DECIMAL(10,2),
    "restricoes" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "alimento_taco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consulta" (
    "id" SERIAL NOT NULL,
    "paciente_id" INTEGER NOT NULL,
    "nutricionista_id" INTEGER NOT NULL,
    "data_consulta" DATE NOT NULL,
    "objetivo_historia" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "consulta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "antropometria" (
    "id" SERIAL NOT NULL,
    "consulta_id" INTEGER NOT NULL,
    "pa" VARCHAR(20),
    "altura" DOUBLE PRECISION,
    "imc" DOUBLE PRECISION,
    "cb" DOUBLE PRECISION,
    "cc_ca" DOUBLE PRECISION,
    "cpant" DOUBLE PRECISION,
    "cpesc" DOUBLE PRECISION,
    "ph" DOUBLE PRECISION,
    "pp" DOUBLE PRECISION,
    "tempo_perda" VARCHAR(100),
    "perc_pp" DOUBLE PRECISION,
    "perda_intencional" BOOLEAN,
    "dctr" DOUBLE PRECISION,
    "dcse" DOUBLE PRECISION,
    "dcto" DOUBLE PRECISION,
    "dcax" DOUBLE PRECISION,
    "dcabd" DOUBLE PRECISION,
    "dcsi" DOUBLE PRECISION,
    "dccc" DOUBLE PRECISION,
    "outras_medidas" TEXT,
    "exame_fisico" TEXT,
    "classificacao" TEXT,

    CONSTRAINT "antropometria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historia_clinica" (
    "id" SERIAL NOT NULL,
    "consulta_id" INTEGER NOT NULL,
    "hist_familiar_dm" BOOLEAN NOT NULL DEFAULT false,
    "hist_familiar_has" BOOLEAN NOT NULL DEFAULT false,
    "hist_familiar_dvc" BOOLEAN NOT NULL DEFAULT false,
    "hist_familiar_cancer" BOOLEAN NOT NULL DEFAULT false,
    "hist_familiar_outras" TEXT,
    "tem_diagnostico" BOOLEAN,
    "diagnosticos" TEXT,

    CONSTRAINT "historia_clinica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estilo_vida" (
    "id" SERIAL NOT NULL,
    "consulta_id" INTEGER NOT NULL,
    "bebida_alcoolica" "FrequenciaBebida",
    "fuma" "FrequenciaFumo",
    "atividade_fisica" TEXT,
    "ativ_horario" VARCHAR(100),
    "ativ_frequencia" VARCHAR(100),
    "ativ_tempo" VARCHAR(100),
    "horas_sono" DOUBLE PRECISION,
    "horario_mais_fome" VARCHAR(10),
    "fez_dieta_antes" BOOLEAN,

    CONSTRAINT "estilo_vida_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "funcao_intestinal_urinaria" (
    "id" SERIAL NOT NULL,
    "consulta_id" INTEGER NOT NULL,
    "habito_intestinal" "HabitoIntestinal",
    "escala_bristol" INTEGER,
    "agua_dia" DOUBLE PRECISION,
    "cor_urina" "CorUrina",
    "queixa_constipacao" BOOLEAN NOT NULL DEFAULT false,
    "queixa_dores" BOOLEAN NOT NULL DEFAULT false,
    "queixa_azia_refluxo" BOOLEAN NOT NULL DEFAULT false,
    "queixa_flatulencia" BOOLEAN NOT NULL DEFAULT false,
    "queixa_outras" TEXT,
    "alergia_intolerancia" TEXT,
    "suplementos_medicamentos" TEXT,

    CONSTRAINT "funcao_intestinal_urinaria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exame_bioquimico" (
    "id" SERIAL NOT NULL,
    "consulta_id" INTEGER NOT NULL,
    "data_exame" DATE,
    "hb" DOUBLE PRECISION,
    "ht" DOUBLE PRECISION,
    "vcm" DOUBLE PRECISION,
    "hcm" DOUBLE PRECISION,
    "chcm" DOUBLE PRECISION,
    "rdw" DOUBLE PRECISION,
    "hba1c" DOUBLE PRECISION,
    "tgc" DOUBLE PRECISION,
    "tgo" DOUBLE PRECISION,
    "tgp" DOUBLE PRECISION,
    "ur" DOUBLE PRECISION,
    "cr" DOUBLE PRECISION,
    "ac_ur" DOUBLE PRECISION,
    "vit_d" DOUBLE PRECISION,
    "ct" DOUBLE PRECISION,
    "hdl" DOUBLE PRECISION,
    "ldl" DOUBLE PRECISION,
    "vldl" DOUBLE PRECISION,
    "gj" DOUBLE PRECISION,
    "vit_b12" DOUBLE PRECISION,

    CONSTRAINT "exame_bioquimico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "noticia" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "conteudo" TEXT NOT NULL,
    "data_publicacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "noticia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nutricionista_cpf_key" ON "nutricionista"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "nutricionista_email_key" ON "nutricionista"("email");

-- CreateIndex
CREATE UNIQUE INDEX "nutricionista_telefone_key" ON "nutricionista"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "nutricionista_crn_key" ON "nutricionista"("crn");

-- CreateIndex
CREATE UNIQUE INDEX "paciente_email_key" ON "paciente"("email");

-- CreateIndex
CREATE UNIQUE INDEX "antropometria_consulta_id_key" ON "antropometria"("consulta_id");

-- CreateIndex
CREATE UNIQUE INDEX "historia_clinica_consulta_id_key" ON "historia_clinica"("consulta_id");

-- CreateIndex
CREATE UNIQUE INDEX "estilo_vida_consulta_id_key" ON "estilo_vida"("consulta_id");

-- CreateIndex
CREATE UNIQUE INDEX "funcao_intestinal_urinaria_consulta_id_key" ON "funcao_intestinal_urinaria"("consulta_id");

-- AddForeignKey
ALTER TABLE "plano_refeicao" ADD CONSTRAINT "plano_refeicao_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "plano_refeicao" ADD CONSTRAINT "plano_refeicao_nutritionist_id_fkey" FOREIGN KEY ("nutritionist_id") REFERENCES "nutricionista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refeicao" ADD CONSTRAINT "refeicao_meal_plan_id_fkey" FOREIGN KEY ("meal_plan_id") REFERENCES "plano_refeicao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opcao" ADD CONSTRAINT "opcao_refection_id_fkey" FOREIGN KEY ("refection_id") REFERENCES "refeicao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alimento" ADD CONSTRAINT "alimento_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "opcao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consulta" ADD CONSTRAINT "consulta_paciente_id_fkey" FOREIGN KEY ("paciente_id") REFERENCES "paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consulta" ADD CONSTRAINT "consulta_nutricionista_id_fkey" FOREIGN KEY ("nutricionista_id") REFERENCES "nutricionista"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "antropometria" ADD CONSTRAINT "antropometria_consulta_id_fkey" FOREIGN KEY ("consulta_id") REFERENCES "consulta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historia_clinica" ADD CONSTRAINT "historia_clinica_consulta_id_fkey" FOREIGN KEY ("consulta_id") REFERENCES "consulta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "estilo_vida" ADD CONSTRAINT "estilo_vida_consulta_id_fkey" FOREIGN KEY ("consulta_id") REFERENCES "consulta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "funcao_intestinal_urinaria" ADD CONSTRAINT "funcao_intestinal_urinaria_consulta_id_fkey" FOREIGN KEY ("consulta_id") REFERENCES "consulta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exame_bioquimico" ADD CONSTRAINT "exame_bioquimico_consulta_id_fkey" FOREIGN KEY ("consulta_id") REFERENCES "consulta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
