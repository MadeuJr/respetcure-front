import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { PhoneInput, LocationSelect } from "./Register"

interface Pet {
  id: string
  name: string
  age: string
  breed: string
  image: string
  description: string
  status: "adoption" | "lost" | "found"
  contact?: string
}

const MOCK_USER = {
  name: "Teste",
  email: "teste@example.com",
  phone: "(11) 99999-0000",
  location: "São Paulo, SP",
}

const MOCK_USER_PETS: Pet[] = [
  {
    id: "101",
    name: "Bolinha",
    age: "2 anos",
    breed: "Golden Retriever",
    image: "https://placedog.net/400/400?id=10",
    description:
      "Meu cachorro querido, está para adoção por motivo de mudança.",
    status: "adoption",
    contact: "(11) 99999-0000",
  },
  {
    id: "102",
    name: "Toby",
    age: "5 anos",
    breed: "Beagle",
    image: "https://placedog.net/400/400?id=11",
    description: "Sumiu no parque, procuro desesperadamente!",
    status: "lost",
    contact: "(11) 99999-0000",
  },
  {
    id: "102",
    name: "Toby",
    age: "5 anos",
    breed: "Beagle",
    image: "https://placedog.net/400/400?id=11",
    description: "Sumiu no parque, procuro desesperadamente!",
    status: "lost",
    contact: "(11) 99999-0000",
  },
  {
    id: "102",
    name: "Toby",
    age: "5 anos",
    breed: "Beagle",
    image: "https://placedog.net/400/400?id=11",
    description: "Sumiu no parque, procuro desesperadamente!",
    status: "lost",
    contact: "(11) 99999-0000",
  },
  {
    id: "102",
    name: "Toby",
    age: "5 anos",
    breed: "Beagle",
    image: "https://placedog.net/400/400?id=11",
    description: "Sumiu no parque, procuro desesperadamente!",
    status: "lost",
    contact: "(11) 99999-0000",
  },
]

function PetItem({ pet }: { pet: Pet }) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Dialog>
      <DialogTrigger>
        <Card className="ww-full cursor-pointer overflow-auto border border-gray-900 bg-transparent shadow-2xl backdrop-blur-xs transition-transform hover:scale-105">
          <CardContent className="p-0">
            <div className="relative aspect-square w-full overflow-hidden">
              {isLoading && (
                <Skeleton className="absolute inset-0 z-10 m-2 h-40 w-40" />
              )}
              <img
                src={pet.image}
                alt={pet.name}
                className={`m-2 h-40 w-40 rounded-md object-cover transition-opacity duration-300 ${
                  isLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setIsLoading(false)}
              />
            </div>
            <div className="p-4 text-center">
              <p className="text-xl font-bold text-gray-900">{pet.name}</p>
              <p className="text-sm text-gray-300">{pet.breed}</p>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{pet.name}</DialogTitle>
          <DialogDescription className="text-base text-gray-600">
            {pet.breed} • {pet.age}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-4">
          <img
            src={pet.image}
            alt={pet.name}
            className="h-64 w-full rounded-lg object-cover"
          />
          <p className="text-lg text-gray-700">{pet.description}</p>
          <Button
            className="bg-primary text-white hover:bg-orange-600"
            onClick={() => alert(`Navegando para edição do pet ${pet.id}...`)}
          >
            Editar Pet
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function Profile() {
  const [userImage, setUserImage] = useState<string | null>(
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
  )
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(MOCK_USER.name)
  const [email, setEmail] = useState(MOCK_USER.email)
  // Parse phone from MOCK_USER.phone format "(11) 99999-0000"
  const [ddd, setDdd] = useState(MOCK_USER.phone?.slice(1, 3) ?? "")
  const [phone, setPhone] = useState(MOCK_USER.phone?.slice(4) ?? "")
  // Parse location from MOCK_USER.location format "São Paulo, SP"
  const [selectedUf, setSelectedUf] = useState(MOCK_USER.location?.split(', ')[1] ?? "")
  const [selectedCidade, setSelectedCidade] = useState(MOCK_USER.location?.split(', ')[0] ?? "")

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUserImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    // In a real app, you would send data to the server
    setIsEditing(false)
    alert("Perfil salvo com sucesso!")
  }

  const handleCancel = () => {
    // Reset fields to original values
    setName(MOCK_USER.name)
    setEmail(MOCK_USER.email)
    setDdd(MOCK_USER.phone?.slice(1, 3) ?? "")
    setPhone(MOCK_USER.phone?.slice(4) ?? "")
    setSelectedUf(MOCK_USER.location?.split(', ')[1] ?? "")
    setSelectedCidade(MOCK_USER.location?.split(', ')[0] ?? "")
    setIsEditing(false)
  }


  
  return (
    <div className="flex flex-col gap-12 p-6">
      <section className="flex items-center justify-center gap-8">
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-gray-900 bg-gray-200">
            {userImage && (
              <img
                src={userImage}
                alt="User"
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <label className="mt-2 cursor-pointer text-sm font-semibold text-white hover:underline">
            Alterar Imagem
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <Card className="w-2xl border-2 border-gray-900 p-6 shadow-xl backdrop-blur-md">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-4">
              <Label className="w-24 text-xl font-semibold text-white">
                Nome
              </Label>
              <Input
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                }}
                readOnly={!isEditing}
                className="border-gray-900 bg-white/50"
              />
            </div>
            <div className="flex items-center gap-4">
              <Label className="w-24 text-xl font-semibold text-white">
                E-mail
              </Label>
              <Input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                readOnly={!isEditing}
                className="border-gray-900 bg-white/50"
              />
            </div>
            <div className="flex items-center gap-4">
              <Label className="w-24 text-xl font-semibold text-white">
                Celular
              </Label>
              <PhoneInput
                ddd={ddd}
                setDdd={setDdd}
                phone={phone}
                setPhone={setPhone}
                readOnly={!isEditing}
              />
            </div>
            <div className="flex items-center gap-4">
              <LocationSelect
                selectedUf={selectedUf}
                setSelectedUf={setSelectedUf}
                selectedCidade={selectedCidade}
                setSelectedCidade={setSelectedCidade}
                readOnly={!isEditing}
              />
            </div>
          </div>
          {!isEditing ? (
            <Button
              className="mt-4 bg-primary text-white hover:bg-orange-600"
              onClick={() => setIsEditing(true)}
            >
              Editar Perfil
            </Button>
          ) : (
            <div className="mt-4 flex justify-end gap-2">
              <Button
                className="bg-primary text-white hover:bg-orange-600"
                onClick={handleSave}
              >
                Salvar
              </Button>
              <Button
                className="border-2 border-gray-900 text-gray-900 hover:bg-orange-50"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
            </div>
          )}
        </Card>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">
            {" "}
            <span className="subtitle">Meus Pets para Adoção </span> 🐾
          </h2>
          <Button className="bg-primary p-4 text-white hover:bg-orange-600">
            + Adicionar Pet
          </Button>
        </div>
        <Card className="relative border-2 border-gray-900 p-6 shadow-2xl backdrop-blur-md">
          <CardContent className="flex flex-wrap justify-center gap-4">
            {MOCK_USER_PETS.filter((p) => p.status === "adoption").map(
              (pet) => (
                <div key={pet.id} className="w-fit">
                  <PetItem pet={pet} />
                </div>
              )
            )}
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">
            {" "}
            <span className="subtitle">Meus Pets Achados e Perdidos </span> 🔍
          </h2>
          <Button className="bg-primary p-4 text-white hover:bg-orange-600">
            + Adicionar Pet
          </Button>
        </div>
        <Card className="relative border-2 border-gray-900 p-6 shadow-2xl backdrop-blur-md">
          <CardContent className="flex flex-wrap justify-center gap-4">
            {MOCK_USER_PETS.filter((p) => p.status !== "adoption").map(
              (pet) => (
                <div key={pet.id} className="w-fit">
                  <PetItem pet={pet} />
                </div>
              )
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
