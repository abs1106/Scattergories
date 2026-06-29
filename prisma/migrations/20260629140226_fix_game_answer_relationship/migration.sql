-- CreateTable
CREATE TABLE "Answers" (
    "answer_id" UUID NOT NULL,
    "game_id" UUID NOT NULL,
    "username" TEXT,
    "answer" TEXT,

    CONSTRAINT "Answers_pkey" PRIMARY KEY ("answer_id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" UUID NOT NULL,
    "room_code" TEXT,
    "letter" CHAR,
    "topic" TEXT,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "fk_answer_id" FOREIGN KEY ("game_id") REFERENCES "Game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
