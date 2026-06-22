const consultaRepository = require('../repositories/consultaRepository');
const pacienteRepository = require('../repositories/pacienteRepository');

// Cria uma consulta completa dentro de uma transaction, contemplando os 3 tipos de ficha: Adulto/Idoso, Gestante, Desportista.
const criar = async (dados) => {
  const {
    paciente_id,
    nutricionista_id,
    data_consulta,
    objetivo_historia,
    antropometria,
    historia_clinica,
    estilo_vida,
    estilo_vida_complemento,
    funcao_intestinal,
    exames,
    dados_gestante,
  } = dados;

  // Verifica se o paciente existe e obtém o tipo de ficha
  const paciente = await pacienteRepository.findById(paciente_id);
  if (!paciente) throw new Error('Paciente não encontrado!');

  const tipoPaciente = paciente.tipo_paciente || 'Adulto_Idoso';

  return await prisma.$transaction(async (tx) => {
    // 1. Consulta principal
    const consulta = await tx.consulta.create({
      data: {
        paciente_id: Number(paciente_id),
        nutricionista_id: Number(nutricionista_id),
        data_consulta: new Date(data_consulta),
        objetivo_historia: objetivo_historia || null,
      },
    });

    const consulta_id = consulta.id;

    // 2. Antropometria
    if (antropometria) {
      await tx.antropometria.create({
        data: { consulta_id, ...sanitizarFloat(antropometria) },
      });
    }

    // 3. História Clínica
    if (historia_clinica) {
      await tx.historiaClinica.create({
        data: { consulta_id, ...historia_clinica },
      });
    }

    // 4. Estilo de Vida + Complemento (2ª atividade, refeições, dificuldade dieta)
    if (estilo_vida) {
      const estiloVidaCriado = await tx.estiloVida.create({
        data: { consulta_id, ...estilo_vida },
      });

      if (estilo_vida_complemento) {
        await tx.estiloVidaComplemento.create({
          data: {
            estilo_vida_id: estiloVidaCriado.id,
            ...estilo_vida_complemento,
          },
        });
      }
    }

    // 5. Função Intestinal / Urinária
    if (funcao_intestinal) {
      await tx.funcaoIntestinalUrinaria.create({
        data: { consulta_id, ...funcao_intestinal },
      });
    }

    // 6. Exames Bioquímicos (array — pode haver mais de um)
    if (exames && exames.length > 0) {
      await tx.exameBioquimico.createMany({
        data: exames.map((e) => ({
          consulta_id,
          ...sanitizarFloat(e),
        })),
      });
    }

    // 7. Dados exclusivos da Gestante
    if (tipoPaciente === 'Gestante' && dados_gestante) {
      await tx.dadosGestante.create({
        data: {
          consulta_id,
          peso_pre_gestacional: toFloat(dados_gestante.peso_pre_gestacional),
          imc_pre_gestacional: toFloat(dados_gestante.imc_pre_gestacional),
          dum: dados_gestante.dum ? new Date(dados_gestante.dum) : null,
          id_gestacional_atual: dados_gestante.id_gestacional_atual || null,
          ganho_peso: toFloat(dados_gestante.ganho_peso),
        },
      });
    }

    return consulta;
  });
};

// Busca uma consulta com todos os dados relacionados.
const buscarPorId = async (id) => {
  const consulta = await consultaRepository.findById(id);
  if (!consulta) throw new Error('Consulta não encontrada!');
  return consulta;
};

// Lista todas as consultas de um paciente.
const listarPorPaciente = async (paciente_id) => {
  const paciente = await pacienteRepository.findById(paciente_id);
  if (!paciente) throw new Error('Paciente não encontrado!');
  return consultaRepository.findByPacienteId(paciente_id);
};

// Helpers

const toFloat = (v) => (v !== undefined && v !== null && v !== '' ? parseFloat(v) : null);

const sanitizarFloat = (obj) => {
  const result = {};
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === 'string' && v.trim() === '') {
      result[k] = null;
    } else {
      result[k] = v;
    }
  }
  return result;
};

module.exports = { criar, buscarPorId, listarPorPaciente };