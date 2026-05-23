import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import BackgroundLayout from "@/layouts/BackgroundLayout"

export function PhoneInput() {
  const [ddd, setDdd] = useState("")
  const [phone, setPhone] = useState("")

  return (
    <div className="flex items-center">
      <Label className="w-24 text-xl font-semibold text-white">Celular</Label>
      {/* DDD */}
      <Input
        placeholder="(99)"
        maxLength={2}
        value={ddd}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, "")
          setDdd(value)
        }}
        className="mr-1 w-16 border-gray-900 bg-white text-center"
      />

      {/* Número */}
      <Input
        placeholder="99999-9999"
        value={phone}
        onChange={(e) => {
          let value = e.target.value.replace(/\D/g, "")

          // formatação automática
          if (value.length > 5) {
            value = value.replace(/(\d{5})(\d+)/, "$1-$2")
          }

          setPhone(value)
        }}
        className="w-40 border-gray-900 bg-white"
      />
    </div>
  )
}

export function LocationSelect() {
  interface Uf {
    sigla: string
    nome: string
  }

  interface Cidade {
    id: number
    nome: string
  }

  const [ufs, setUfs] = useState<Uf[]>([])
  const [selectedUf, setSelectedUf] = useState("")
  const [cidades, setCidades] = useState<Cidade[]>([])
  const [selectedCidade, setSelectedCidade] = useState("")

  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((res) => res.json())
      .then((data: Uf[]) => setUfs(data))
  }, [])

  useEffect(() => {
    if (selectedUf) {
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
        .then((res) => res.json())
        .then((data: Cidade[]) => setCidades(data))
    }
  }, [selectedUf])

  return (
    <>
      <div className="flex items-center">
        {/* UF */}
        <Label className="w-24 text-xl font-semibold text-white">Estado</Label>
        <Select
          onValueChange={(value) => {
            setSelectedUf(value as string)
            setSelectedCidade("") // reseta cidade ao trocar UF
          }}
        >
          <SelectTrigger className="w-48 border-gray-900 bg-white">
            <SelectValue placeholder="Selecione o Estado" />
          </SelectTrigger>

          <SelectContent>
            {ufs.map((Uf) => (
              <SelectItem key={Uf.sigla} value={Uf.sigla}>
                {Uf.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Cidade */}
        <Label className="ml-5 w-24 text-xl font-semibold text-white">
          Cidade
        </Label>
        <Select
          disabled={!selectedUf}
          onValueChange={(value) => setSelectedCidade(value as string)}
        >
          <SelectTrigger className="border-gray-900 bg-white">
            <SelectValue placeholder="Selecione a cidade" />
          </SelectTrigger>

          <SelectContent>
            {cidades.map((cidade) => (
              <SelectItem key={cidade.id} value={cidade.nome}>
                {cidade.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  )
}

export function Register() {
  return (
    <BackgroundLayout>
      <h1 className="title mb-2 self-center">Cadastro</h1>
      <Card className="w-2xl self-center border-2 border-gray-900 p-6">
        <div className="flex items-center gap-4">
          <Label className="w-24 text-xl font-semibold text-white">Nome</Label>
          <Input
            type="text"
            placeholder="Seu nome"
            className="border-gray-900 bg-white"
          />
        </div>
        <div className="flex items-center gap-4">
          <Label className="w-24 text-xl font-semibold text-white">
            E-mail
          </Label>
          <Input
            type="email"
            placeholder="email_exemplo@gmail.com"
            className="border-gray-900 bg-white"
          />
        </div>

        <PhoneInput />

        <LocationSelect />

        <div className="flex items-center gap-4">
          <Label className="w-24 text-xl font-semibold text-white">Senha</Label>
          <Input
            type="password"
            placeholder="email_exemplo@gmail.com"
            className="border-gray-900 bg-white"
          />
        </div>
        <div className="flex items-center gap-4">
          <Label className="w-32 text-xl font-semibold text-white">
            Confirme sua Senha
          </Label>
          <Input
            type="password"
            placeholder="email_exemplo@gmail.com"
            className="border-gray-900 bg-white"
          />
        </div>

        <div className="flex justify-evenly pt-4">
          <Link to="/login">
            <Button className="border-2 border-gray-900 px-10 py-2 text-lg hover:bg-orange-400">
              Voltar
            </Button>
          </Link>
          <Button className="border-2 border-gray-900 bg-primary px-10 py-2 text-lg hover:bg-orange-600">
            Cadastrar
          </Button>
        </div>

        <div className="space-y-2 text-center">
          <Link to="/recoverpass">
            <span className="cursor-pointer text-white underline">
              Esqueceu a senha?
            </span>
          </Link>
        </div>
      </Card>
    </BackgroundLayout>
  )
}
