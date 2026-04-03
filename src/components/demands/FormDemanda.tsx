'use client'

import { useState, useRef } from 'react'
import { useDemandStore } from '@/stores/useDemandStore'
import { Demand } from '@/types/demand'

const CATEGORIAS = [
  "Iluminação Pública",
  "Manutenção de vias",
  "Saneamento",
  "Coleta de lixo",
  "Fiscalização",
  "Segurança",
  "Sinalização de Trânsito",
  "Outros Empecilhos"
]

const REGIOES = [
    "Região Metropolitana do Recife",
    "Zona da Mata", 
    "Agreste", 
    "Sertão", 
    "Outra"
]

export function FormDemanda() {
  const addDemand = useDemandStore((state) => state.addDemand)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Estado para armazenar as imagens selecionadas (preview)
  const [images, setImages] = useState<string[]>([])

  const [formData, setFormData] = useState({
    titulo: '',
    categoria: '',
    regiao: '',
    endereco: '',
    descricao: ''
  })

  // Função para lidar com a seleção de arquivos
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      const newUrls = newFiles.map(file => URL.createObjectURL(file))
      setImages(prev => [...prev, ...newUrls].slice(0, 3)) // Limita a 3 imagens
    }
  }

  const removeImage = (indexToRemove: number, e: React.MouseEvent) => {
  e.stopPropagation(); // Impede que o clique abra a janela de seleção de arquivos
  setImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.titulo || !formData.categoria || !formData.regiao || !formData.endereco || !formData.descricao) {
      alert("⚠️ Preencha todos os campos obrigatórios!")
      return
    }

    const novaDenuncia: Demand = {
      id: Math.random().toString(36).substring(2, 9),
      title: formData.titulo,
      location: formData.endereco,
      category: formData.categoria as any,
      region: formData.regiao as any,
      status: "Aberta", // Fixo pois é nova
      priority: "Media", // Fixo pois removemos o campo
      description: formData.descricao,
      createdAt: new Date().toLocaleDateString('pt-BR')
    }

    addDemand(novaDenuncia)
    alert("✅ Demanda salva com sucesso!")

    // LIMPA TUDO: Texto e Imagens
    setFormData({ titulo: '', categoria: '', regiao: '', endereco: '', descricao: '' })
    setImages([])
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] shadow-xl w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
      
      {/* COLUNA ESQUERDA */}
      <div className="flex flex-col gap-5">
        <input 
          type="text" required placeholder="Título *" 
          className="w-full py-2 border border-gray-300 rounded-full text-center outline-none focus:border-purple-500"
          value={formData.titulo}
          onChange={(e) => setFormData({...formData, titulo: e.target.value})}
        />

        <select 
          required className="w-full py-2 border border-gray-300 rounded-full text-center outline-none bg-white text-gray-600 focus:border-purple-500"
          value={formData.categoria}
          onChange={(e) => setFormData({...formData, categoria: e.target.value})}
        >
          <option value="" disabled>Selecione a Categoria *</option>
          {CATEGORIAS.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        <select 
          required className="w-full py-2 border border-gray-300 rounded-full text-center outline-none bg-white text-gray-600 focus:border-purple-500"
          value={formData.regiao}
          onChange={(e) => setFormData({...formData, regiao: e.target.value})}
        >
          <option value="" disabled>Selecione a Região *</option>
          {REGIOES.map(reg => <option key={reg} value={reg}>{reg}</option>)}
        </select>

        <input 
          type="text" required placeholder="Endereço Completo *" 
          className="w-full py-2 border border-gray-300 rounded-full text-center outline-none focus:border-purple-500"
          value={formData.endereco}
          onChange={(e) => setFormData({...formData, endereco: e.target.value})}
        />

        <textarea 
          required placeholder="Descrição detalhada *" rows={5}
          className="w-full py-4 px-6 border border-gray-300 rounded-2xl outline-none focus:border-purple-500 resize-none text-center"
          value={formData.descricao}
          onChange={(e) => setFormData({...formData, descricao: e.target.value})}
        />
      </div>

      {/* COLUNA DIREITA */}
      <div className="flex flex-col gap-6">
        
        {/* Input escondido que atende a todos os cliques de imagem */}
        <input 
            type="file" ref={fileInputRef} className="hidden" 
            multiple accept="image/*" onChange={handleFileChange} 
        />

        {/* Área Principal de Imagem */}
       <div 
        onClick={() => fileInputRef.current?.click()}
        className="relative flex-grow border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center overflow-hidden hover:border-purple-400 transition-colors cursor-pointer"
        >
        {images[0] ? (
            <>
            <img src={images[0]} alt="Preview" className="w-full h-full object-cover" />
            <button 
                onClick={(e) => removeImage(0, e)}
                className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
            >
                ✕
            </button>
            </>
        ) : (
            <>
            <span className="text-4xl mb-2">📷</span>
            <p className="font-semibold text-gray-500 text-center px-4">Adicione imagens</p>
            </>
        )}
        </div>

        {/* Espaços Extras */}
        <div className="flex gap-4">
        {[1, 2].map((i) => (
            <div 
            key={i}
            onClick={() => fileInputRef.current?.click()}
            className="relative w-1/2 h-32 border border-gray-300 rounded-2xl flex items-center justify-center overflow-hidden hover:bg-gray-50 cursor-pointer"
            >
            {images[i] ? (
                <>
                <img src={images[i]} alt="Preview small" className="w-full h-full object-cover" />
                <button 
                    onClick={(e) => removeImage(i, e)}
                    className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-md hover:bg-red-600 transition-colors"
                >
                    ✕
                </button>
                </>
            ) : (
                <span className="text-4xl text-gray-300">+</span>
            )}
            </div>
        ))}
        </div>

        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95 uppercase tracking-wider">
          Salvar Denúncia
        </button>
      </div>
    </form>
  )
}