'use client'

import { useState, useRef } from 'react'
import { useDemandStore } from '@/stores/useDemandStore'
import { Demand } from '@/types/demand'
import { useRouter } from "next/navigation"

const CATEGORIAS = [
  "Iluminação Pública", "Manutenção de vias", "Saneamento", 
  "Coleta de lixo", "Fiscalização", "Segurança", 
  "Sinalização de Trânsito", "Outros Empecilhos"
]

const REGIOES = ["Região Metropolitana do Recife", "Zona da Mata", "Agreste", "Sertão", "Outra"]

const PROBLEMAS_POR_CATEGORIA: Record<string, string[]> = {
  "Iluminação Pública": ["Poste com lâmpada apagada", "Lâmpada acesa durante o dia", "Poste caído", "Fiação exposta", "Rua inteira sem iluminação"],
  "Manutenção de vias": ["Buraco no asfalto", "Calçada irregular", "Meio-fio quebrado", "Tampa de bueiro solta ou batendo"],
  "Saneamento": ["Vazamento de água limpa", "Esgoto a céu aberto", "Bueiro entupido", "Mau cheiro", "Inundação recorrente"],
  "Coleta de lixo": ["Lixo acumulado", "Caminhão da coleta não passou", "Descarte de entulhos", "Lixeira pública quebrada", "Acúmulo de lixo em bueiros"],
  "Fiscalização": ["Obra irregular", "Invasão de área pública", "Poluição sonora", "Comércio ambulante sem autorização", "Terreno baldio com mato alto"],
  "Segurança": ["Câmera quebrada", "Atividade suspeita", "Praça sem policiamento", "Vidros quebrados", "Vandalismo"],
  "Sinalização de Trânsito": ["Semáforo com defeito", "Placa caída ou pichada", "Faixa de pedestre apagada", "Placa de sinalização faltando", "Semáforo de pedestre sem som"],
  "Outros Empecilhos": ["Risco de queda de árvore", "Carro abandonado", "Animal morto na pista", "Criadouro de insetos", "Objeto obstruindo passagem"]
};

export function FormDemanda() {
  const router = useRouter()
  const addDemand = useDemandStore((state) => state.addDemand)
  const userEmail = useDemandStore((state) => state.userEmail) 
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [images, setImages] = useState<(string | null)[]>([null, null, null])
  const [targetIndex, setTargetIndex] = useState<number>(0)

  const [formData, setFormData] = useState({
    problema: '', 
    categoria: '', 
    regiao: '', 
    endereco: '', 
    descricao: ''
  })

  const openExplorer = (index: number) => {
    setTargetIndex(index)
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const url = URL.createObjectURL(file)
      const newImages = [...images]
      newImages[targetIndex] = url 
      setImages(newImages)
      e.target.value = ""
    }
  }

  const removeImage = (indexToRemove: number, e: React.MouseEvent) => {
    e.stopPropagation()
    const newImages = [...images]
    newImages[indexToRemove] = null
    setImages(newImages)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.problema || !formData.categoria || !formData.regiao || !formData.endereco || !formData.descricao) {
      alert("⚠️ Preencha todos os campos obrigatórios!")
      return
    }

    const novaDenuncia: Demand = {
      id: Math.random().toString(36).substring(2, 9),
      problema: formData.problema as any, 
      location: formData.endereco,
      category: formData.categoria as any,
      region: formData.regiao as any,
      status: "Aberta", 
      priority: "Media", 
      description: formData.descricao,
      createdAt: new Date().toLocaleDateString('pt-BR'),
      fotoUrl: images[0] || "", 
      endereco: formData.endereco,
      
      solicitante: userEmail || "Usuário Anônimo", 
      dataRegistro: new Date().toLocaleString('pt-BR'),
      detalhes: formData.descricao,
    }

    addDemand(novaDenuncia)
    alert("✅ Demanda salva com sucesso!")
    router.push("/telaUsuario")
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-4xl shadow-xl w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
      
      <div className="flex flex-col gap-5">
        <select 
          required 
          className="w-full py-3 border border-gray-300 rounded-full text-center outline-none bg-white text-gray-600 focus:border-purple-500 cursor-pointer"
          value={formData.categoria}
          onChange={(e) => setFormData({...formData, categoria: e.target.value, problema: ''})}
        >
          <option value="" disabled> Selecione a Categoria *</option>
          {CATEGORIAS.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        <select 
          required 
          disabled={!formData.categoria} 
          className="w-full py-3 border border-gray-300 rounded-full text-center outline-none bg-white text-gray-600 focus:border-purple-500 disabled:bg-gray-50 disabled:cursor-not-allowed cursor-pointer"
          value={formData.problema}
          onChange={(e) => setFormData({...formData, problema: e.target.value})}
        >
          <option value="" disabled> Problema Urbano Encontrado*</option>
          {formData.categoria && PROBLEMAS_POR_CATEGORIA[formData.categoria].map(prob => (
            <option key={prob} value={prob}>{prob}</option>
          ))}
        </select>        

        <select 
          required 
          className="w-full py-3 border border-gray-300 rounded-full text-center outline-none bg-white text-gray-600 focus:border-purple-500 cursor-pointer"
          value={formData.regiao}
          onChange={(e) => setFormData({...formData, regiao: e.target.value})}
        >
          <option value="" disabled>Selecione a Região *</option>
          {REGIOES.map(reg => <option key={reg} value={reg}>{reg}</option>)}
        </select>

        <input 
          type="text" required placeholder="Endereço Completo *" 
          className="w-full py-3 border border-gray-300 rounded-full text-center outline-none focus:border-purple-500"
          value={formData.endereco}
          onChange={(e) => setFormData({...formData, endereco: e.target.value})}
        />

        <textarea 
          required placeholder="Descrição detalhada *" rows={4}
          className="w-full py-4 px-6 border border-gray-300 rounded-2xl outline-none focus:border-purple-500 resize-none text-center"
          value={formData.descricao}
          onChange={(e) => setFormData({...formData, descricao: e.target.value})}
        />
      </div>

      <div className="flex flex-col gap-6">
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />

        <div 
          onClick={() => openExplorer(0)} 
          className="relative grow border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center overflow-hidden hover:border-purple-400 hover:bg-purple-50 transition-all cursor-pointer min-h-[200px] bg-gray-50"
        >
          {images[0] ? (
            <>
              <img src={images[0]} alt="Preview" className="w-full h-full object-cover" />
              <button type="button" onClick={(e) => removeImage(0, e)} className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors cursor-pointer">✕</button>
            </>
          ) : (
            <div className="text-center">
              <span className="text-4xl mb-2 block">📷</span>
              <p className="font-semibold text-gray-500 px-4">Anexar imagem principal</p>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          {[1, 2].map((i) => (
            <div 
              key={i} 
              onClick={() => openExplorer(i)} 
              className="relative w-1/2 h-32 border border-gray-300 rounded-2xl flex items-center justify-center overflow-hidden hover:bg-gray-100 hover:border-purple-300 cursor-pointer bg-white transition-all"
            >
              {images[i] ? (
                <>
                  <img src={images[i]} alt="Preview small" className="w-full h-full object-cover" />
                  <button type="button" onClick={(e) => removeImage(i, e)} className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md hover:bg-red-600 transition-colors cursor-pointer">✕</button>
                </>
              ) : (
                <span className="text-4xl text-gray-300">+</span>
              )}
            </div>
          ))}
        </div>

        <button 
          type="submit" 
          className="w-full bg-purple-600 text-white font-bold py-4 rounded-xl uppercase tracking-wider transition-all duration-200 cursor-pointer hover:bg-purple-700 hover:shadow-2xl hover:-translate-y-1 active:scale-95 active:translate-y-0 shadow-lg"
        >
          Salvar Denúncia
        </button>
      </div>
    </form>
  )
}