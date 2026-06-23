import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import fichaMedicaService from '../../services/fichaMedicaService';

const inputStyle = {
  width: '100%', padding: '10px 14px', border: '1px solid #e0e0e0',
  borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box',
};
const labelStyle = {
  display: 'block', marginBottom: '6px', fontSize: '14px',
  fontWeight: '500', color: '#333',
};
const cardStyle = {
  background: 'white', borderRadius: '12px', padding: '24px',
  boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: '20px',
};

export default function FichaMedica() {
  const { user } = useAuth();
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [salvando, setSalvando] = useState(false);

  const [form, setForm] = useState({
    paciente_id: '', data_consulta: '', objetivo_historia: '',
    // Antropometria
    pa: '', altura: '', imc: '', pp: '', exame_fisico: '',
    // História clínica
    hist_familiar_dm: false, hist_familiar_has: false, hist_familiar_dvc: false,
    hist_familiar_cancer: false, hist_familiar_outras: '',
    tem_diagnostico: false, diagnosticos: '',
    // Estilo de vida
    bebida_alcoolica: '', fuma: '', atividade_fisica: '', horas_sono: '', fez_dieta_antes: false,
    // Função intestinal / urinária
    habito_intestinal: '', agua_dia: '', cor_urina: '',
    alergia_intolerancia: '', suplementos_medicamentos: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const num = (v) => (v === '' || v === null ? null : Number(v));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(''); setSucesso(''); setSalvando(true);
    try {
      const payload = {
        paciente_id: Number(form.paciente_id),
        nutricionista_id: user?.id,
        data_consulta: form.data_consulta,
        objetivo_historia: form.objetivo_historia,
        antropometria: {
          pa: form.pa, altura: num(form.altura), imc: num(form.imc),
          pp: num(form.pp), exame_fisico: form.exame_fisico,
        },
        historia_clinica: {
          hist_familiar_dm: form.hist_familiar_dm,
          hist_familiar_has: form.hist_familiar_has,
          hist_familiar_dvc: form.hist_familiar_dvc,
          hist_familiar_cancer: form.hist_familiar_cancer,
          hist_familiar_outras: form.hist_familiar_outras,
          tem_diagnostico: form.tem_diagnostico,
          diagnosticos: form.diagnosticos,
        },
        estilo_vida: {
          bebida_alcoolica: form.bebida_alcoolica || null,
          fuma: form.fuma || null,
          atividade_fisica: form.atividade_fisica,
          horas_sono: num(form.horas_sono),
          fez_dieta_antes: form.fez_dieta_antes,
        },
        funcao_intestinal: {
          habito_intestinal: form.habito_intestinal || null,
          agua_dia: num(form.agua_dia),
          cor_urina: form.cor_urina || null,
          alergia_intolerancia: form.alergia_intolerancia,
          suplementos_medicamentos: form.suplementos_medicamentos,
        },
      };
      await fichaMedicaService.create(payload);
      setSucesso('Ficha médica salva com sucesso!');
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao salvar a ficha médica.');
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7f5', fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ margin: '0 0 8px', color: '#1a1a1a' }}>Ficha Médica</h2>
        <p style={{ marginTop: 0, color: '#888' }}>Dados da consulta e anamnese do paciente.</p>

        {erro && <div style={{ background: '#ffebee', color: '#c62828', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{erro}</div>}
        {sucesso && <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{sucesso}</div>}

        <form onSubmit={handleSubmit}>
          {/* Identificação */}
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Identificação</h3>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>ID do paciente</label>
              <input style={inputStyle} type="number" name="paciente_id" value={form.paciente_id} onChange={handleChange} required />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Data da consulta</label>
              <input style={inputStyle} type="date" name="data_consulta" value={form.data_consulta} onChange={handleChange} required />
            </div>
            <div>
              <label style={labelStyle}>Objetivo / história</label>
              <textarea style={inputStyle} name="objetivo_historia" value={form.objetivo_historia} onChange={handleChange} rows={3} />
            </div>
          </div>

          {/* Antropometria */}
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Antropometria</h3>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Pressão arterial (PA)</label>
              <input style={inputStyle} name="pa" value={form.pa} onChange={handleChange} />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Altura (m)</label>
              <input style={inputStyle} type="number" step="0.01" name="altura" value={form.altura} onChange={handleChange} />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Peso atual (kg)</label>
              <input style={inputStyle} type="number" step="0.1" name="pp" value={form.pp} onChange={handleChange} />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>IMC</label>
              <input style={inputStyle} type="number" step="0.1" name="imc" value={form.imc} onChange={handleChange} />
            </div>
            <div>
              <label style={labelStyle}>Exame físico</label>
              <textarea style={inputStyle} name="exame_fisico" value={form.exame_fisico} onChange={handleChange} rows={2} />
            </div>
          </div>

          {/* História clínica */}
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>História clínica familiar</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginBottom: '14px' }}>
              <label><input type="checkbox" name="hist_familiar_dm" checked={form.hist_familiar_dm} onChange={handleChange} /> Diabetes</label>
              <label><input type="checkbox" name="hist_familiar_has" checked={form.hist_familiar_has} onChange={handleChange} /> Hipertensão</label>
              <label><input type="checkbox" name="hist_familiar_dvc" checked={form.hist_familiar_dvc} onChange={handleChange} /> Doença cardiovascular</label>
              <label><input type="checkbox" name="hist_familiar_cancer" checked={form.hist_familiar_cancer} onChange={handleChange} /> Câncer</label>
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Outras (família)</label>
              <input style={inputStyle} name="hist_familiar_outras" value={form.hist_familiar_outras} onChange={handleChange} />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label><input type="checkbox" name="tem_diagnostico" checked={form.tem_diagnostico} onChange={handleChange} /> Possui diagnóstico</label>
            </div>
            {form.tem_diagnostico && (
              <div>
                <label style={labelStyle}>Diagnósticos</label>
                <textarea style={inputStyle} name="diagnosticos" value={form.diagnosticos} onChange={handleChange} rows={2} />
              </div>
            )}
          </div>

          {/* Estilo de vida */}
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Estilo de vida</h3>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Bebida alcoólica</label>
              <select style={inputStyle} name="bebida_alcoolica" value={form.bebida_alcoolica} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="Nunca">Nunca</option>
                <option value="Uma_vez_mes">1x por mês</option>
                <option value="Um_dois_mes">1 a 2x por mês</option>
                <option value="Tres_quatro_mes">3 a 4x por mês</option>
                <option value="Diariamente">Diariamente</option>
              </select>
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Fuma</label>
              <select style={inputStyle} name="fuma" value={form.fuma} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="Nunca">Nunca</option>
                <option value="Raramente">Raramente</option>
                <option value="Diariamente">Diariamente</option>
              </select>
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Atividade física</label>
              <input style={inputStyle} name="atividade_fisica" value={form.atividade_fisica} onChange={handleChange} />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Horas de sono</label>
              <input style={inputStyle} type="number" step="0.5" name="horas_sono" value={form.horas_sono} onChange={handleChange} />
            </div>
            <div>
              <label><input type="checkbox" name="fez_dieta_antes" checked={form.fez_dieta_antes} onChange={handleChange} /> Já fez dieta antes</label>
            </div>
          </div>

          {/* Função intestinal / urinária */}
          <div style={cardStyle}>
            <h3 style={{ marginTop: 0 }}>Função intestinal e urinária</h3>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Hábito intestinal</label>
              <select style={inputStyle} name="habito_intestinal" value={form.habito_intestinal} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="Diario">Diário</option>
                <option value="Dias_alternados">Dias alternados</option>
                <option value="Mais_2_dias">Mais de 2 dias</option>
              </select>
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Água por dia (L)</label>
              <input style={inputStyle} type="number" step="0.1" name="agua_dia" value={form.agua_dia} onChange={handleChange} />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Cor da urina</label>
              <select style={inputStyle} name="cor_urina" value={form.cor_urina} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="Transparente">Transparente</option>
                <option value="Clara">Clara</option>
                <option value="Escura">Escura</option>
              </select>
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Alergias / intolerâncias</label>
              <input style={inputStyle} name="alergia_intolerancia" value={form.alergia_intolerancia} onChange={handleChange} />
            </div>
            <div>
              <label style={labelStyle}>Suplementos / medicamentos</label>
              <input style={inputStyle} name="suplementos_medicamentos" value={form.suplementos_medicamentos} onChange={handleChange} />
            </div>
          </div>

          <button type="submit" disabled={salvando}
            style={{ padding: '12px 24px', background: '#2d7a4f', color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
            {salvando ? 'Salvando...' : 'Salvar ficha médica'}
          </button>
        </form>
      </div>
    </div>
  );
}