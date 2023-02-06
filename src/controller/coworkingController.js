import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const buscaTodosFormulariosCoworking = async (req, res) => {
  try {
    const formulariosBuscados = await prisma.Coworking.findMany();

    res.status(200).json(formulariosBuscados);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const buscaFormularioCoworkingId = async (req, res) => {
  try {
    const formularioPorId = await prisma.Coworking.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    res.status(200).json(formularioPorId);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const criarFormularioCoworking = async (req, res) => {
  const { nome, telefone, organizacao, data, planoId } = req.body;

  try {
    const formularioCoworkingCriado = await prisma.Coworking.create({
      data: {
        nome,
        telefone,
        organizacao,
        data,
        planoId,
      },
    });

    res.status(200).json(formularioCoworkingCriado);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const atualizaFormularioCoworking = async (req, res) => {
  const { nome, telefone, organizacao, data, planoId } = req.body;
  try {
    const formularioCoworkingAtualizado = await prisma.Coworking.update({
      where: { id: parseInt(req.params.id) },
      data: {
        nome,
        telefone,
        organizacao,
        data,
        planoId,
      },
    });

    res.status(200).json(formularioCoworkingAtualizado);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deletaFormularioCoworking = async (req, res) => {
  try {
    await prisma.Coworking.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    res
      .status(200)
      .send(`Formulario id: ${req.params.id} deletado com sucesso`);
  } catch (error) {
    res.status(400).send(error.message);
  }
};