import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const buscarTodosPlanos = async (req, res) => {
  try {
    const todosPlanos = await prisma.plano.findMany({
      select: {
        id: true,
        descricao: true,
      },
      orderBy: { id: "asc" },
    });

    res.status(200).json(todosPlanos);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const buscarPlano = async (req, res) => {
  try {
    const plano = await prisma.plano.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    res.status(200).json(plano);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const criarPlano = async (req, res) => {
  const { descricao, observacao } = req.body;

  try {
    const planoCriado = await prisma.plano.create({
      data: {
        descricao,
        observacao,
      },
    });

    res.status(200).json(planoCriado);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const atualizarPlano = async (req, res) => {
  const { descricao, observacao } = req.body;
  try {
    const planoAtualizado = await prisma.plano.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        descricao,
        observacao,
        updatedAt: new Date(),
      },
    });

    res.status(200).json(planoAtualizado);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deletarPlano = async (req, res) => {
  try {
    await prisma.plano.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res.status(200).json({ message: "Plano deletado com sucesso!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
