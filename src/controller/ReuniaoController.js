import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const buscarTodasReunioes = async (req, res) => {
  try {
    const todasReunioes = await prisma.reuniao.findMany({
      select: {
        id: true,
        categoria: {
          select: {
            descricao: true,
          },
        },
        visita: true,
        data: true,
        local: true,
        duracao: true,
        assunto: true,
      },
      orderBy: { id: "asc" },
    });

    res.status(200).json(todasReunioes);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const buscarReuniao = async (req, res) => {
  try {
    const reuniao = await prisma.reuniao.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    res.status(200).json(reuniao);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const criarReuniao = async (req, res) => {
  const { visita, data, local, categoriaId, duracao, assunto } = req.body;

  try {
    const reuniaoCriada = await prisma.reuniao.create({
      data: {
        visita,
        data,
        local,
        categoriaId,
        duracao,
        assunto,
      },
    });

    res.status(200).json(reuniaoCriada);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const atualizarReuniao = async (req, res) => {
  const { visita, data, local, duracao, categoriaId, assunto } = req.body;

  try {
    const reuniaoAtualizada = await prisma.reuniao.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        visita,
        data,
        local,
        categoriaId,
        duracao,
        assunto,
        updatedAt: new Date(),
      },
    });

    res.status(200).json(reuniaoAtualizada);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deletarReuniao = async (req, res) => {
  try {
    await prisma.reuniao.delete({
      where: { id: parseInt(req.params.id) },
    });

    res.status(200).json({ message: "Reunião deletada com sucesso!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
