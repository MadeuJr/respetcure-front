import { useState } from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Link } from "react-router-dom"

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

const ADOPTION_PETS: Pet[] = [
  {
    id: "1",
    name: "Bolinha",
    age: "2 anos",
    breed: "Golden Retriever",
    image: "https://placedog.net/400/400?id=1",
    description:
      "Bolinha é extremamente dócil e adora brincar com crianças. Procura um lar cheio de amor.",
    status: "adoption",
    contact: "(11) 99999-0001",
  },
  {
    id: "2",
    name: "Luna",
    age: "1 ano",
    breed: "Srd",
    image: "https://placedog.net/400/400?id=2",
    description:
      "Luna é esperta, ativa e já sabe fazer algumas manobras básicas. Muito carinhosa.",
    status: "adoption",
    contact: "(11) 99999-0002",
  },
  {
    id: "3",
    name: "Max",
    age: "4 anos",
    breed: "Labrador",
    image: "https://placedog.net/400/400?id=3",
    description:
      "Max é um companheiro fiel e tranquilo. Ideal para apartamentos.",
    status: "adoption",
    contact: "(11) 99999-0003",
  },
  {
    id: "4",
    name: "Mel",
    age: "3 anos",
    breed: "Poodle",
    image: "https://placedog.net/400/400?id=4",
    description: "Mel é super companheira e adora passear no parque.",
    status: "adoption",
    contact: "(11) 99999-0004",
  },
  {
    id: "4",
    name: "Mel",
    age: "3 anos",
    breed: "Poodle",
    image: "https://placedog.net/400/400?id=4",
    description: "Mel é super companheira e adora passear no parque.",
    status: "adoption",
    contact: "(11) 99999-0004",
  },
  {
    id: "4",
    name: "Mel",
    age: "3 anos",
    breed: "Poodle",
    image: "https://placedog.net/400/400?id=4",
    description: "Mel é super companheira e adora passear no parque.",
    status: "adoption",
    contact: "(11) 99999-0004",
  },
]

const LOST_FOUND_PETS: Pet[] = [
  {
    id: "5",
    name: "Toby",
    age: "5 anos",
    breed: "Beagle",
    image: "https://placedog.net/400/400?id=5",
    description:
      "Toby sumiu perto do Parque Ibirapuera no dia 20/05. Tem uma mancha branca na pata esquerda.",
    status: "lost",
    contact: "(11) 98888-1111",
  },
  {
    id: "6",
    name: "Desconhecido",
    age: "Aprox. 2 anos",
    breed: "Srd",
    image: "https://placedog.net/400/400?id=6",
    description:
      "Encontrado vagando próximo à Avenida Paulista. Muito dócil e parece ter dono.",
    status: "found",
    contact: "(11) 97777-2222",
  },
  {
    id: "7",
    name: "Bento",
    age: "1 ano",
    breed: "Pug",
    image: "https://placedog.net/400/400?id=7",
    description:
      "Bento foi visto pela última vez no bairro de Pinheiros. É muito assustado.",
    status: "lost",
    contact: "(11) 96666-3333",
  },
  {
    id: "8",
    name: "Lola",
    age: "Aprox. 3 anos",
    breed: "Shih Tzu",
    image: "https://placedog.net/400/400?id=8",
    description:
      "Lola foi encontrada com uma coleira azul. Estamos procurando os donos!",
    status: "found",
    contact: "(11) 95555-4444",
  },
  {
    id: "8",
    name: "Lola",
    age: "Aprox. 3 anos",
    breed: "Shih Tzu",
    image: "https://placedog.net/400/400?id=8",
    description:
      "Lola foi encontrada com uma coleira azul. Estamos procurando os donos!",
    status: "found",
    contact: "(11) 95555-4444",
  },
  {
    id: "8",
    name: "Lola",
    age: "Aprox. 3 anos",
    breed: "Shih Tzu",
    image: "https://placedog.net/400/400?id=8",
    description:
      "Lola foi encontrada com uma coleira azul. Estamos procurando os donos!",
    status: "found",
    contact: "(11) 95555-4444",
  },
  {
    id: "8",
    name: "Lola",
    age: "Aprox. 3 anos",
    breed: "Shih Tzu",
    image: "https://placedog.net/400/400?id=8",
    description:
      "Lola foi encontrada com uma coleira azul. Estamos procurando os donos!",
    status: "found",
    contact: "(11) 95555-4444",
  },
  {
    id: "8",
    name: "Lola",
    age: "Aprox. 3 anos",
    breed: "Shih Tzu",
    image: "https://placedog.net/400/400?id=8",
    description:
      "Lola foi encontrada com uma coleira azul. Estamos procurando os donos!",
    status: "found",
    contact: "(11) 95555-4444",
  },
]

function PetCard({ pet }: { pet: Pet }) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Dialog>
      <DialogTrigger>
        <Card className="w-full cursor-pointer overflow-auto border border-gray-900 bg-transparent shadow-2xl backdrop-blur-xs transition-transform hover:scale-105">
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
          <div className="relative h-64 w-full overflow-hidden rounded-lg">
            {isLoading && (
              <Skeleton className="border-md absolute inset-0 z-10 h-60 w-60" />
            )}
            <img
              src={pet.image}
              alt={pet.name}
              className={`h-full w-full object-cover transition-opacity duration-300 ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setIsLoading(false)}
            />
          </div>
          <p className="text-lg text-gray-700">{pet.description}</p>
          <div className="rounded-lg bg-gray-100 p-4">
            <p className="font-semibold text-gray-900">Contato:</p>
            <p className="text-orange-600">{pet.contact || "Não informado"}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col gap-12 p-6">
      <p className="text-3xl text-white">
        <span className="subtitle">Olá, Teste!</span> 👋
      </p>

      <section>
        <Card className="relative border-2 border-gray-900 px-12 shadow-2xl backdrop-blur-md">
          <CardContent className="p-0">
            <h2 className="mb-6 text-3xl font-bold text-white">
              <span className="subtitle">Pets para Adoção</span> 🐾
            </h2>
            <div className="relative px-12">
              <Carousel className="mx-auto w-full max-w-5xl">
                <CarouselContent className="mx-8 my-2">
                  {ADOPTION_PETS.map((pet) => (
                    <CarouselItem key={pet.id} className="basis-1/4">
                      <PetCard pet={pet} />
                    </CarouselItem>
                  ))}
                  <CarouselItem className="basis-1/6 my-auto">
                    <Link to="/app/adoption" className="block h-fit w-fit">
                      <Card className="h-fit w-fit  cursor-pointer overflow-auto border border-gray-900 bg-transparent shadow-2xl backdrop-blur-xs transition-transform hover:scale-105">
                        <CardContent className="p-0">
                          <div className="flex h-fit items-center justify-center gap-4 p-4">
                            <p className="text-xl text-center font-bold text-gray-900">
                              Ver mais pets para adoção
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="border-card text-orange-800 hover:bg-white/20" />
                <CarouselNext className="border-card text-orange-800 hover:bg-white/20" />
              </Carousel>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="relative border-2 border-gray-900 px-12 shadow-2xl backdrop-blur-md">
          <CardContent className="p-0">
            <h2 className="mb-6 text-3xl font-bold text-white">
              <span className="subtitle">Achados e Perdidos</span> 🔍
            </h2>

            <Carousel className="mx-auto w-full max-w-5xl">
              <CarouselContent className="mx-8 my-2">
                {LOST_FOUND_PETS.map((pet) => (
                  <CarouselItem key={pet.id} className="basis-1/4">
                    <PetCard pet={pet} />
                  </CarouselItem>
                ))}
                <CarouselItem className="basis-1/6 my-auto">
                  <Link to="/app/lostfound" className="block h-fit w-fit">
                    <Card className="h-fit w-fit cursor-pointer overflow-auto border border-gray-900 bg-transparent shadow-2xl backdrop-blur-xs transition-transform hover:scale-105">
                      <CardContent className="p-0">
                        <div className="flex h-fit items-center justify-center gap-4 p-4">
                          <p className="text-xl text-center font-bold text-gray-900">
                            Ver mais pets achados e perdidos
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="border-card text-orange-800 hover:bg-white/20" />
              <CarouselNext className="border-card text-orange-800 hover:bg-white/20" />
            </Carousel>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
